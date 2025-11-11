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

// Inclusive language patterns (generate warnings with suggestions)
const inclusiveLanguagePatterns = [
  { pattern: /\bwhitelist\b/gi, suggestion: 'allowlist' },
  { pattern: /\bblacklist\b/gi, suggestion: 'denylist or blocklist' },
  { pattern: /\bmaster\b(?![-\s]?(class|key|plan|branch))/gi, suggestion: 'primary or main' },
  { pattern: /\bslave\b/gi, suggestion: 'replica or secondary' },
  { pattern: /\bguys\b/gi, suggestion: 'folks, people, team, or everyone' },
  { pattern: /\bgrandfathered\b/gi, suggestion: 'legacy or established' },
  { pattern: /\bsanity[- ]check\b/gi, suggestion: 'coherence check or smoke test' }
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

const toneLintPath = path.join(process.cwd(), 'ops', 'tone_lint.json')
let ctaAllowlist = []
let ctaBanlist = []
if (fs.existsSync(toneLintPath)) {
  try {
    const toneConfig = JSON.parse(fs.readFileSync(toneLintPath, 'utf8'))
    ctaAllowlist = (toneConfig.allowlist_cta || []).map(entry => entry.toLowerCase().trim())
    ctaBanlist = (toneConfig.banlist_terms || []).map(entry => entry.toLowerCase().trim())
  } catch (error) {
    console.warn(`Warning: unable to parse ${toneLintPath}: ${error.message}`)
  }
}

function checkCtaLabel(filePath, labelType, value) {
  if (!value || typeof value !== 'string') return
  const trimmed = value.trim()
  if (!trimmed) return
  const lower = trimmed.toLowerCase()

  for (const banned of ctaBanlist) {
    if (banned && lower.includes(banned)) {
      red.push(
        `${filePath}: CTA ${labelType} label "${trimmed}" contains banned term "${banned}" (blocking)`
      )
      checkCount++
      return
    }
  }

  if (ctaAllowlist.length && !ctaAllowlist.some(entry => entry && lower.startsWith(entry))) {
    yellow.push(
      `${filePath}: CTA ${labelType} label "${trimmed}" is not in the allowlist (nudge only)`
    )
    checkCount++
  }
}

function checkFile(p) {
  fileCount++
  const raw = fs.readFileSync(p, 'utf8')
  const { content, data } = matter(raw)

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

  // Check external links for security attributes
  const externalLinkPattern = /<a\s+[^>]*href=["']https?:\/\/[^"']+["'][^>]*>/gi
  const externalLinks = content.match(externalLinkPattern) || []

  for (const link of externalLinks) {
    const hasTargetBlank = /target=["']_blank["']/.test(link)
    const hasNoopener = /rel=["'][^"']*noopener[^"']*["']/.test(link)
    const hasNoreferrer = /rel=["'][^"']*noreferrer[^"']*["']/.test(link)

    if (hasTargetBlank && (!hasNoopener || !hasNoreferrer)) {
      yellow.push(`${p}: External link with target="_blank" missing rel="noopener noreferrer"`)
      checkCount++
    }
  }

  // Check for non-inclusive language
  for (const { pattern, suggestion } of inclusiveLanguagePatterns) {
    const matches = content.match(pattern)
    if (matches) {
      yellow.push(
        `${p}: Consider replacing "${matches[0]}" with "${suggestion}" for more inclusive language`
      )
      checkCount++
    }
  }

  // Check for external links in markdown without UTM parameters
  // Pattern: [text](https://external-domain.com/path) where external-domain is not northbook.guide
  const markdownLinkPattern = /\[([^\]]+)\]\((https?:\/\/(?!northbook\.guide)[^)]+)\)/gi
  let mdLinkMatch
  while ((mdLinkMatch = markdownLinkPattern.exec(content)) !== null) {
    const url = mdLinkMatch[2]
    // Allow GitHub links and common dev resources without UTM
    if (
      url.includes('github.com') ||
      url.includes('developer.mozilla.org') ||
      url.includes('wikipedia.org') ||
      url.includes('?utm_source=') ||
      url.includes('&utm_source=')
    ) {
      continue
    }
    yellow.push(`${p}: External link to ${url} missing utm_source=northbook for analytics tracking`)
    checkCount++
  }

  const receiptsLinkPattern = /\[See the receipts\]\(([^)]+)\)/gi
  let receiptsMatch
  while ((receiptsMatch = receiptsLinkPattern.exec(content)) !== null) {
    const link = receiptsMatch[1]
    const normalized = link.split('#')[0]
    const isReceiptsPath =
      normalized.startsWith('/signals/receipts/') || normalized.startsWith('../signals/receipts/')

    if (!isReceiptsPath) {
      red.push(`${p}: Receipts link "${link}" must point to /signals/receipts/<tag>.md (blocking)`)
      checkCount++
      continue
    }

    if (!normalized.startsWith('http')) {
      let target
      if (normalized.startsWith('/')) {
        target = path.join(process.cwd(), normalized.replace(/^\//, ''))
      } else {
        target = path.resolve(path.dirname(p), normalized)
      }
      if (!fs.existsSync(target)) {
        red.push(`${p}: Receipts link target "${normalized}" not found on disk (blocking)`)
        checkCount++
      }
    }
  }

  if (data) {
    checkCtaLabel(p, 'primary', data.cta_primary_label)
    checkCtaLabel(p, 'secondary', data.cta_secondary_label)
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

// Persist yellow flags to reports/yellow-flags.json
const reportsDir = path.join(process.cwd(), 'reports')
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true })
}
fs.writeFileSync(
  path.join(reportsDir, 'yellow-flags.json'),
  JSON.stringify(yellow, null, 2),
  'utf8'
)

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

  console.log(`\n📝 Yellow flags persisted to reports/yellow-flags.json`)
}

if (status === 'red') {
  process.exit(1)
}

process.exit(0)
