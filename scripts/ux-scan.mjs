import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const repoRoot = process.cwd()
const docsRoot = process.env.DOCS
  ? path.resolve(repoRoot, process.env.DOCS)
  : path.join(repoRoot, 'docs')
const runbooksRoot = process.env.RUNBOOKS
  ? path.resolve(repoRoot, process.env.RUNBOOKS)
  : path.join(repoRoot, 'runbooks')
const roots = [docsRoot, runbooksRoot]
const excludedDirs = new Set(['.git', 'node_modules', 'public', '.vitepress'])

const MARKDOWN_LINK_REGEX = /(?<!\!)\[([^\]]+)\]\(([^)\s]+(?:\s+[^)]*)?)\)/g
const toneLintPath = path.join(repoRoot, 'ops', 'tone_lint.json')
const ctaMapPath = path.join(repoRoot, 'ops', 'cta-map.json')
let ctaBanlist = []
let ctaKeys = new Set()
if (fs.existsSync(toneLintPath)) {
  try {
    const toneConfig = JSON.parse(fs.readFileSync(toneLintPath, 'utf8'))
    ctaBanlist = (toneConfig.banlist_terms || []).map(term => term.toLowerCase().trim())
  } catch (error) {
    console.warn(`Warning: unable to parse ${toneLintPath}: ${error.message}`)
  }
}
if (fs.existsSync(ctaMapPath)) {
  try {
    const ctaConfig = JSON.parse(fs.readFileSync(ctaMapPath, 'utf8'))
    ctaKeys = new Set(Object.keys(ctaConfig || {}))
  } catch (error) {
    console.warn(`Warning: unable to parse ${ctaMapPath}: ${error.message}`)
  }
}

function collectMarkdownFiles() {
  const files = []

  for (const root of roots) {
    if (!fs.existsSync(root)) continue
    walk(root, files)
  }

  return files
}

function walk(dir, bucket) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })

  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue
    if (excludedDirs.has(entry.name)) continue

    const entryPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      walk(entryPath, bucket)
      continue
    }

    if (entry.isFile() && entry.name.endsWith('.md')) {
      bucket.push(entryPath)
    }
  }
}

function extractIntro(content) {
  const markerIndex = content.indexOf('\n## ')
  const section = markerIndex === -1 ? content : content.slice(0, markerIndex)
  return stripLeadingHeading(section)
}

function stripLeadingHeading(block) {
  if (!block.startsWith('# ')) return block
  const firstBreak = block.indexOf('\n')
  return firstBreak === -1 ? '' : block.slice(firstBreak + 1)
}

function firstContentLine(block) {
  const lines = block.split('\n')
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) continue
    return trimmed
  }
  return ''
}

function stripHtmlAndMd(text) {
  return text
    .replace(/`[^`]+`/g, '')
    .replace(/!\[[^\]]*\]\([^)]+\)/g, '')
    .replace(/\[[^\]]*\]\([^)]+\)/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/^>+\s*/gm, '')
    .replace(/\*\*?|__?/g, '')
    .trim()
}

function runScan() {
  const files = collectMarkdownFiles()
  const issues = []
  let inspected = 0

  for (const filePath of files) {
    const raw = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(raw)
    const relative = path.relative(repoRoot, filePath)

    const isHome = data && data.layout === 'home'
    const isBandA = data && data.band === 'A'
    if (isHome || !isBandA) continue

    const intro = extractIntro(content)
    const linkMatches = []
    MARKDOWN_LINK_REGEX.lastIndex = 0
    let match
    while ((match = MARKDOWN_LINK_REGEX.exec(intro)) !== null) {
      linkMatches.push({ index: match.index, raw: match[0] })
      if (linkMatches.length >= 2) break
    }

    const missing = []
    if (linkMatches.length < 1) missing.push('primary action')
    if (linkMatches.length < 2) missing.push('secondary action')

    const rawFirstLine = firstContentLine(intro || '')
    const normalizedFirstLine = stripHtmlAndMd(rawFirstLine)
    const trimmedFirst = rawFirstLine.trim().toLowerCase()
    const hasPlainspokenOpener =
      normalizedFirstLine.length > 0 &&
      !trimmedFirst.startsWith('<a ') &&
      !trimmedFirst.startsWith('[')

    const firstLinkIndex = linkMatches[0]?.index ?? -1
    const introBeforePrimary =
      firstLinkIndex >= 0 && stripHtmlAndMd(intro.slice(0, firstLinkIndex)).length > 0

    if (!hasPlainspokenOpener || (firstLinkIndex >= 0 && !introBeforePrimary)) {
      missing.push('plainspoken opener before CTA pair')
    }

    if (ctaBanlist.length) {
      const labels = [data?.cta_primary_label, data?.cta_secondary_label]
      for (const label of labels) {
        if (!label || typeof label !== 'string') continue
        const lower = label.toLowerCase()
        if (ctaKeys.has(label.trim())) continue
        const bannedHit = ctaBanlist.find(term => term && lower.includes(term))
        if (bannedHit) {
          missing.push(`CTA label "${label}" contains banned term "${bannedHit}"`)
          break
        }
      }
    }

    if (missing.length) {
      issues.push(
        `${relative}: CTA contract violation — ${missing.join(
          ', '
        )} ahead of the first "##" heading`
      )
    } else {
      inspected++
    }
  }

  if (issues.length) {
    console.log('UX scan found issues:')
    for (const issue of issues) {
      console.log(`- ${issue}`)
    }
    process.exitCode = 1
    return
  }

  console.log(`UX scan passed across ${inspected} markdown files with CTA pairs.`)
}

runScan()
