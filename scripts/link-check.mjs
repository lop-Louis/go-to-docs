#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const DOCS_DIR = path.join(ROOT, 'docs')
const linkRegex = /\[[^\]]+\]\(([^)]+)\)/g
const externalLinks = new Set()
const internalLinks = []

function collectLinks(file) {
  const text = fs.readFileSync(file, 'utf8')
  let m
  while ((m = linkRegex.exec(text)) !== null) {
    const url = m[1].trim()
    if (!url || url.startsWith('#')) continue
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
  console.log(`Total external links: ${externalLinks.size}`)

  if (brokenInternal.length) {
    console.log('\n❌ Broken Internal Links:')
    for (const b of brokenInternal) {
      console.log(`  - ${path.relative(ROOT, b.from)} -> ${b.target}`)
    }
  } else {
    console.log('\n✅ No broken internal links detected')
  }

  const badExternal = externalStatuses.filter(x => x.status === 'ERROR' || Number(x.status) >= 400)
  if (badExternal.length) {
    console.log('\n⚠️ External Link Issues:')
    badExternal.forEach(x => console.log(`  - ${x.url} (status: ${x.status})`))
  } else {
    console.log('\n✅ All external links responded successfully (>=200 <400)')
  }

  // Exit code: 1 if internal broken (blocking), 0 otherwise
  process.exit(brokenInternal.length ? 1 : 0)
})()
