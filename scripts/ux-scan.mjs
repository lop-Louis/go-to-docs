import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const repoRoot = process.cwd()
const roots = [path.join(repoRoot, 'docs'), path.join(repoRoot, 'runbooks')]
const excludedDirs = new Set(['.git', 'node_modules', 'public', '.vitepress'])

const PRIMARY_ANCHOR_REGEX = /<a\b[^>]*\bdata-primary-action\b[^>]*>/i
const SECONDARY_ANCHOR_REGEX = /<a\b[^>]*\bdata-secondary-action\b[^>]*>/i

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

    // Skip layout: home pages
    if (data && data.layout === 'home') continue

    const intro = extractIntro(content)
    const primaryMatch = PRIMARY_ANCHOR_REGEX.exec(intro)
    const secondaryMatch = SECONDARY_ANCHOR_REGEX.exec(intro)

    const missing = []
    if (!primaryMatch) missing.push('primary action')
    if (!secondaryMatch) missing.push('secondary action')

    const rawFirstLine = firstContentLine(intro || '')
    const normalizedFirstLine = stripHtmlAndMd(rawFirstLine)
    const hasPlainspokenOpener =
      normalizedFirstLine.length > 0 && !rawFirstLine.trim().toLowerCase().startsWith('<a ')

    const introBeforePrimary =
      primaryMatch && stripHtmlAndMd(intro.slice(0, primaryMatch.index)).length > 0

    if (!hasPlainspokenOpener || (primaryMatch && !introBeforePrimary)) {
      missing.push('plainspoken opener before CTA pair')
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
