import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const DOCS = process.env.DOCS || 'docs'
const RUNBOOKS = process.env.RUNBOOKS || 'runbooks'
const JSON_MODE = process.env.GUARD_FORMAT === 'json'

// Test fixtures under docs-stale-debug are ignored (used for stale tests only)
const pathLower = DOCS.toLowerCase()
if (pathLower.includes('docs-stale-debug')) {
  if (JSON_MODE) {
    console.log(
      JSON.stringify({
        status: 'skipped',
        reason: 'docs-stale-debug',
        fileCount: 0,
        checkCount: 0,
        red: [],
        yellow: []
      })
    )
  } else {
    console.log('Doc Guard: skipping stale fixture directory', DOCS)
  }
  process.exit(0)
}

// Forbidden patterns that indicate internal/sensitive content
const forbidden = [
  /\bhttps?:\/\/(intra|internal|corp)[^\s)]+/i,
  /\bJIRA-\d+\b/i,
  /\b[A-Z]{2,}-\d+\b/, // Generic ticket patterns
  /\biWow\b/i, // Internal system name (keep out of public docs)
  /\bTopdanmark\b/i,
  /\bIf Insurance\b/i,
  /\b(localhost|127\.0\.0\.1|internal\.)[^\s)]+/i,
  /\b[A-Za-z0-9._%+-]+@(company|internal|corp|topdanmark|if)\.[a-z]+/i, // Internal emails
  /\b(api[_-]?key|secret[_-]?key|access[_-]?token|password)\s*[:=]/i, // Potential secrets
  /\b\d{4}-\d{2}-\d{2}\b/, // ISO dates (YYYY-MM-DD)
  /\bQ[1-4]\s+20\d{2}\b/i, // Quarter dates (Q1 2024)
  /\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+20\d{2}\b/i // Calendar dates
]

// Allowed placeholders (won't trigger forbidden pattern warnings)
const allowedPlaceholders = [
  'TICKET-ID',
  'INTERNAL-URL',
  'REDACTED',
  '@handle',
  'YYYY-MM-DD',
  'company-name',
  'product-name',
  'vendor-name'
]

let red = []
let yellow = []
let fileCount = 0
let checkCount = 0

function checkFile(p) {
  fileCount++
  const raw = fs.readFileSync(p, 'utf8')
  const { data, content } = matter(raw)

  // Skip VitePress config directory
  if (p.includes('.vitepress')) return

  // Check for forbidden patterns in content
  const forbiddenMatches = []
  for (const rx of forbidden) {
    const matches = content.match(rx)
    if (matches) {
      // Filter out allowed placeholders
      const hasAllowedPlaceholder = allowedPlaceholders.some(placeholder =>
        matches.some(match => match.includes(placeholder))
      )
      if (!hasAllowedPlaceholder) {
        forbiddenMatches.push(rx.toString())
      }
    }
  }

  if (forbiddenMatches.length) {
    red.push(
      `${p}: Possible internal/sensitive content detected (${forbiddenMatches.length} pattern(s))`
    )
    checkCount++
  }
}

function walk(dir, withinDocs = false) {
  try {
    for (const f of fs.readdirSync(dir)) {
      const p = path.join(dir, f)
      const s = fs.statSync(p)
      if (s.isDirectory() && f !== 'node_modules' && f !== '.git') {
        const nextWithinDocs = withinDocs || path.resolve(p).startsWith(path.resolve(DOCS))
        walk(p, nextWithinDocs)
      } else if (p.endsWith('.md')) {
        checkFile(p)
      }
    }
  } catch (err) {
    if (err.code !== 'ENOENT') {
      console.error(`Error reading directory ${dir}:`, err.message)
    }
  }
}

// Main execution
if (!JSON_MODE) {
  console.log('🔍 Running content guard checks...\n')
}

if (!fs.existsSync(DOCS)) {
  if (JSON_MODE) {
    console.log(
      JSON.stringify({
        status: 'error',
        error: `docs directory not found at ${DOCS}`,
        fileCount: 0,
        checkCount: 0,
        red: [],
        yellow: []
      })
    )
  } else {
    console.error(`❌ Error: docs directory not found at ${DOCS}`)
  }
  process.exit(1)
}

walk(DOCS, true)
if (fs.existsSync(RUNBOOKS)) {
  walk(RUNBOOKS, false)
}

const status = red.length ? 'red' : yellow.length ? 'yellow' : 'green'
const payload = {
  status,
  fileCount,
  checkCount,
  red,
  yellow
}

if (JSON_MODE) {
  console.log(JSON.stringify(payload))
} else {
  console.log(`📊 Checked ${fileCount} files with ${checkCount} checks performed\n`)

  if (red.length) {
    console.error('🔴 RED FAILURES (blocking):')
    red.forEach(x => console.error(`  - ${x}`))
    console.error('')
  }

  if (yellow.length) {
    console.log('🟡 YELLOW WARNINGS (review recommended):')
    yellow.forEach(x => console.log(`  - ${x}`))
    console.log('')
  }

  if (!red.length && !yellow.length) {
    console.log('✅ All checks passed! Content is Band A compliant.')
  } else if (red.length) {
    console.error('❌ Guard check FAILED - please fix red issues before merging')
  } else if (yellow.length) {
    console.log('⚠️  Guard check passed with warnings - review recommended')
    console.log('::warning::Yellow flags detected, manual review recommended')
  }
}

if (status === 'red') {
  process.exit(1)
}

process.exit(0)
