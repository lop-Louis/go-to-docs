import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const DOCS = 'docs'

// Forbidden patterns that indicate internal/sensitive content
const forbidden = [
  /\bhttps?:\/\/(intra|internal|corp)[^\s)]+/i,
  /\bJIRA-\d+\b/i,
  /\b[A-Z]{2,}-\d+\b/, // Generic ticket patterns
  /\bTopdanmark\b/i,
  /\bIf Insurance\b/i,
  /\b(localhost|127\.0\.0\.1|internal\.)[^\s)]+/i,
  /\b[A-Za-z0-9._%+-]+@(company|internal|corp|topdanmark|if)\.[a-z]+/i, // Internal emails
  /\b(api[_-]?key|secret[_-]?key|access[_-]?token|password)\s*[:=]/i // Potential secrets
]

// Valid change types and their line limits
const CHANGE_LIMITS = {
  patch: 200,
  minor: 400,
  major: Infinity
}

// Valid status values
const VALID_STATUSES = ['live', 'stale', 'archived', 'draft']

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

  // Required frontmatter fields
  const required = ['title', 'band', 'owner', 'refresh_after_days', 'change_type', 'status']
  const missing = required.filter(k => data[k] == null)

  if (missing.length) {
    red.push(`${p}: Missing required frontmatter: ${missing.join(', ')}`)
    checkCount++
  }

  // Band A validation
  if (data.band && String(data.band).trim() !== 'A') {
    red.push(`${p}: band=${data.band} not allowed (must be 'A')`)
    checkCount++
  }

  // Owner validation
  if (data.owner && !String(data.owner).startsWith('@')) {
    yellow.push(`${p}: owner should start with @ (GitHub handle)`)
    checkCount++
  }

  // Refresh days validation
  if (data.refresh_after_days) {
    const days = Number(data.refresh_after_days)
    if (isNaN(days) || days < 1 || days > 365) {
      yellow.push(`${p}: refresh_after_days=${days} seems unusual (1-365 expected)`)
      checkCount++
    }
  }

  // Change type validation
  if (data.change_type && !CHANGE_LIMITS[data.change_type]) {
    red.push(`${p}: Invalid change_type='${data.change_type}' (must be patch, minor, or major)`)
    checkCount++
  }

  // Status validation
  if (data.status && !VALID_STATUSES.includes(data.status)) {
    red.push(`${p}: Invalid status='${data.status}' (must be: ${VALID_STATUSES.join(', ')})`)
    checkCount++
  }

  // Check for forbidden patterns in content
  const forbiddenMatches = []
  for (const rx of forbidden) {
    if (rx.test(content)) {
      forbiddenMatches.push(rx.toString())
    }
  }

  if (forbiddenMatches.length) {
    yellow.push(
      `${p}: Possible internal/sensitive content detected (${forbiddenMatches.length} pattern(s))`
    )
    checkCount++
  }

  // Change size vs declared change_type
  const lines = raw.split('\n').length
  if (data.change_type && CHANGE_LIMITS[data.change_type] !== Infinity) {
    const limit = CHANGE_LIMITS[data.change_type]
    if (lines > limit) {
      yellow.push(`${p}: ${lines} lines exceeds ${data.change_type} limit of ${limit} lines`)
      checkCount++
    }
  }

  // Check for common issues
  if (content.includes('TODO:') || content.includes('FIXME:')) {
    yellow.push(`${p}: Contains TODO/FIXME markers`)
    checkCount++
  }

  if (content.includes('YOUR_TOKEN') || content.includes('REPLACE_ME')) {
    red.push(`${p}: Contains placeholder values that must be replaced`)
    checkCount++
  }
}

function walk(dir) {
  try {
    for (const f of fs.readdirSync(dir)) {
      const p = path.join(dir, f)
      const s = fs.statSync(p)
      if (s.isDirectory() && f !== 'node_modules' && f !== '.git') {
        walk(p)
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
console.log('🔍 Running content guard checks...\n')

if (!fs.existsSync(DOCS)) {
  console.error(`❌ Error: docs directory not found at ${DOCS}`)
  process.exit(1)
}

walk(DOCS)

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
  process.exit(0)
}

if (red.length) {
  console.error('❌ Guard check FAILED - please fix red issues before merging')
  process.exit(1)
}

if (yellow.length) {
  console.log('⚠️  Guard check passed with warnings - review recommended')
  console.log('::warning::Yellow flags detected, manual review recommended')
  process.exit(0)
}
