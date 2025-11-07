#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const DOCS_DIR = path.join(ROOT, 'docs')
const linkRegex = /\[[^\]]+\]\(([^)]+)\)/g
const externalLinks = new Set()
const internalLinks = []
const anchorLinks = [] // Track links with anchors

function collectLinks(file) {
  const text = fs.readFileSync(file, 'utf8')
  let m
  while ((m = linkRegex.exec(text)) !== null) {
    const url = m[1].trim()
    if (!url) continue

    // Handle anchor-only links (#section)
    if (url.startsWith('#')) {
      anchorLinks.push({ from: file, target: file, anchor: url.slice(1), fullUrl: url })
      continue
    }

    // Handle links with anchors (./page#section or /path#section)
    const hashIndex = url.indexOf('#')
    if (hashIndex > 0) {
      const pathPart = url.slice(0, hashIndex)
      const anchorPart = url.slice(hashIndex + 1)

      if (/^https?:\/\//i.test(pathPart)) {
        externalLinks.add(url.split('#')[0].split('?')[0])
      } else {
        // Internal link with anchor
        const cleanPath = pathPart.split('?')[0]
        if (cleanPath.startsWith('./') || cleanPath.startsWith('../')) {
          internalLinks.push({ from: file, target: cleanPath })
          anchorLinks.push({ from: file, target: cleanPath, anchor: anchorPart, fullUrl: url })
        } else if (cleanPath.startsWith('/')) {
          internalLinks.push({ from: file, target: cleanPath })
          anchorLinks.push({ from: file, target: cleanPath, anchor: anchorPart, fullUrl: url })
        } else {
          internalLinks.push({ from: file, target: './' + cleanPath })
          anchorLinks.push({
            from: file,
            target: './' + cleanPath,
            anchor: anchorPart,
            fullUrl: url
          })
        }
      }
      continue
    }

    // Strip query/hash
    const clean = url.split('#')[0].split('?')[0]
    if (/^https?:\/\//i.test(clean)) {
      externalLinks.add(clean)
    } else if (clean.startsWith('./') || clean.startsWith('../')) {
      internalLinks.push({ from: file, target: clean })
    } else if (
      clean.startsWith('/') === false &&
      !clean.startsWith('./') &&
      !clean.startsWith('../') &&
      !/^mailto:/i.test(clean)
    ) {
      // Treat relative without ./ as local to current folder
      internalLinks.push({ from: file, target: './' + clean })
    }
  }
}

// Generate anchor ID from heading text (matches VitePress/markdown-it behavior)
function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Extract all heading anchors from a markdown file
function extractAnchors(filePath) {
  const text = fs.readFileSync(filePath, 'utf8')
  const headingRegex = /^#{1,6}\s+(.+)$/gm
  const anchors = new Set()
  let m
  while ((m = headingRegex.exec(text)) !== null) {
    const headingText = m[1].trim()
    const slug = slugify(headingText)
    if (slug) anchors.add(slug)
  }
  return anchors
}

function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f)
    const s = fs.statSync(p)
    if (s.isDirectory()) walk(p)
    else if (p.endsWith('.md')) collectLinks(p)
  }
}

if (!fs.existsSync(DOCS_DIR)) {
  console.error('Docs directory not found')
  process.exit(1)
}

walk(DOCS_DIR)

// Validate internal links
const brokenInternal = []
for (const l of internalLinks) {
  // Normalize target path relative to origin directory
  const originDir = path.dirname(l.from)
  let targetRel = l.target.replace(/\.md$/, '') // our convention is no .md in published links
  // Compute actual file path possibilities
  const candidate = path.join(originDir, targetRel)
  const withMd = candidate + '.md'
  if (!fs.existsSync(candidate) && !fs.existsSync(withMd)) {
    brokenInternal.push(l)
  }
}

// Validate anchor links
const brokenAnchors = []
for (const link of anchorLinks) {
  let targetFile

  if (link.target === link.from) {
    // Same-file anchor (#section)
    targetFile = link.from
  } else {
    // Cross-file anchor (./page#section or /path#section)
    const originDir = path.dirname(link.from)
    let targetPath = link.target

    // Handle absolute paths from docs root
    if (targetPath.startsWith('/')) {
      targetPath = path.join(DOCS_DIR, targetPath)
    } else {
      targetPath = path.join(originDir, targetPath)
    }

    // Try with and without .md extension
    if (fs.existsSync(targetPath)) {
      targetFile = targetPath
    } else if (fs.existsSync(targetPath + '.md')) {
      targetFile = targetPath + '.md'
    } else {
      // File doesn't exist, will be caught by internal link check
      continue
    }
  }

  // Extract anchors from target file
  const availableAnchors = extractAnchors(targetFile)

  // Check if anchor exists
  const anchorSlug = slugify(link.anchor)
  if (!availableAnchors.has(anchorSlug) && !availableAnchors.has(link.anchor)) {
    brokenAnchors.push({
      from: path.relative(ROOT, link.from),
      target: path.relative(ROOT, targetFile),
      anchor: link.anchor,
      fullUrl: link.fullUrl
    })
  }
}

// Fetch external links (basic HEAD/GET)
const fetch = global.fetch
const externalStatuses = []
async function checkExternal() {
  for (const url of externalLinks) {
    try {
      const ctrl = new AbortController()
      const t = setTimeout(() => ctrl.abort(), 8000)
      const res = await fetch(url, { method: 'HEAD', signal: ctrl.signal })
      clearTimeout(t)
      if (!res.ok) {
        // Retry with GET if HEAD not allowed
        const resGet = await fetch(url, { method: 'GET', signal: ctrl.signal })
        externalStatuses.push({ url, status: resGet.status })
      } else {
        externalStatuses.push({ url, status: res.status })
      }
    } catch {
      externalStatuses.push({ url, status: 'ERROR' })
    }
  }
}

;(async () => {
  await checkExternal()
  console.log(`Total internal links: ${internalLinks.length}`)
  console.log(`Total anchor links: ${anchorLinks.length}`)
  console.log(`Total external links: ${externalLinks.size}`)

  let hasErrors = false

  if (brokenInternal.length) {
    console.log('\n❌ Broken Internal Links:')
    for (const b of brokenInternal) {
      console.log(`  - ${path.relative(ROOT, b.from)} -> ${b.target}`)
    }
    hasErrors = true
  } else {
    console.log('\n✅ No broken internal links detected')
  }

  if (brokenAnchors.length) {
    console.log('\n❌ Broken Anchor Links:')
    for (const b of brokenAnchors) {
      if (b.from === b.target) {
        console.log(`  - ${b.from}: #${b.anchor} (anchor not found)`)
      } else {
        console.log(`  - ${b.from} -> ${b.target}#${b.anchor} (anchor not found)`)
      }
    }
    hasErrors = true
  } else {
    console.log('\n✅ No broken anchor links detected')
  }

  const badExternal = externalStatuses.filter(x => x.status === 'ERROR' || Number(x.status) >= 400)
  if (badExternal.length) {
    console.log('\n⚠️ External Link Issues:')
    badExternal.forEach(x => console.log(`  - ${x.url} (status: ${x.status})`))
  } else {
    console.log('\n✅ All external links responded successfully (>=200 <400)')
  }

  // Exit code: 1 if internal broken or anchors broken (blocking), 0 otherwise
  process.exit(hasErrors ? 1 : 0)
})()
