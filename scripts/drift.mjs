#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const repoRoot = process.cwd()
const DOCS = path.join(repoRoot, process.env.DOCS || 'docs')
const RUNBOOKS = path.join(repoRoot, process.env.RUNBOOKS || 'runbooks')
const JSON_MODE = process.env.DRIFT_FORMAT === 'json'

const storytellingPrefixes = [/^docs\/playbook\//i, /^docs\/runbooks\//i, /^docs\/start-here\//i]

const storytellingFields = ['audience', 'tone', 'narrative_goal']

const inclusiveHeuristics = [
  /\bwhitelist\b/i,
  /\bblacklist\b/i,
  /\bmaster\b/i,
  /\bslave\b/i,
  /\bguys\b/i,
  /\bsanity check\b/i,
  /\btribe\b/i,
  /\bninja\b/i,
  /\brockstar\b/i
]

const DRIFT_WARNINGS = []
let fileCount = 0
let checkCount = 0

function warn(message) {
  DRIFT_WARNINGS.push(message)
  checkCount++
}

function checkFile(p) {
  const raw = fs.readFileSync(p, 'utf8')
  const { data, content } = matter(raw)

  // Skip VitePress internals
  if (p.includes('.vitepress')) return

  const relPath = path.relative(repoRoot, p).split(path.sep).join('/')
  if (relPath.split('/').includes('drafts')) return

  fileCount++

  // Storytelling metadata expectations for certain sections
  const needsStorytelling = storytellingPrefixes.some(rx => rx.test(relPath))
  if (needsStorytelling) {
    const missing = storytellingFields.filter(key => data[key] == null)
    if (missing.length) {
      warn(`${relPath}: Missing storytelling frontmatter (${missing.join(', ')})`)
    }
  }

  // GitHub owner handle hint
  if (data.owner && !String(data.owner).startsWith('@')) {
    warn(`${relPath}: owner should reference a GitHub handle (prefix with @)`)
  }

  // Refresh window sanity
  if (data.refresh_after_days) {
    const days = Number(data.refresh_after_days)
    if (isNaN(days) || days < 1 || days > 365) {
      warn(`${relPath}: refresh_after_days=${days} is outside the expected 1-365 window`)
    }
  }

  // Title length guidance for sidebar/mobile
  if (data.title) {
    const titleLength = String(data.title).length
    if (titleLength > 50) {
      warn(`${relPath}: title length ${titleLength} may truncate on mobile navigation`)
    } else if (titleLength > 40) {
      warn(`${relPath}: title length ${titleLength} is approaching the 50 char guideline`)
    }
  }

  // TODO / placeholder sweeps
  if (content.includes('TODO:') || content.includes('FIXME:')) {
    warn(`${relPath}: contains TODO/FIXME markers that should be resolved`)
  }

  if (content.includes('YOUR_TOKEN') || content.includes('REPLACE_ME')) {
    warn(`${relPath}: contains placeholder strings that should be replaced`)
  }

  // Non-inclusive terminology heuristics
  const nonInclusive = []
  for (const rx of inclusiveHeuristics) {
    if (rx.test(content)) nonInclusive.push(rx.source)
  }
  if (nonInclusive.length) {
    warn(`${relPath}: non-inclusive terminology flagged (${nonInclusive.length} match(es))`)
  }

  // Rough change-size guardrails vs declared change_type
  const changeType = data.change_type
  if (changeType && changeType !== 'major') {
    const limit = changeType === 'minor' ? 400 : 200
    const lines = raw.split('\n').length
    if (lines > limit) {
      warn(`${relPath}: ${lines} lines exceeds ${changeType} guideline of ${limit} lines`)
    }
  }
}

function walk(dir) {
  try {
    for (const entry of fs.readdirSync(dir)) {
      const entryPath = path.join(dir, entry)
      const stat = fs.statSync(entryPath)
      if (stat.isDirectory() && entry !== 'node_modules' && entry !== '.git') {
        walk(entryPath)
      } else if (entryPath.endsWith('.md')) {
        checkFile(entryPath)
      }
    }
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.error(`Error reading ${dir}: ${error.message}`)
    }
  }
}

if (!JSON_MODE) {
  console.log('🧭 Running drift detection...')
}

if (fs.existsSync(DOCS)) {
  walk(DOCS)
} else if (!JSON_MODE) {
  console.warn(`Warning: docs directory missing at ${DOCS}, skipping.`)
}

if (fs.existsSync(RUNBOOKS)) {
  walk(RUNBOOKS)
}

const payload = {
  status: DRIFT_WARNINGS.length ? 'warning' : 'clear',
  fileCount,
  checkCount,
  warnings: DRIFT_WARNINGS
}

if (JSON_MODE) {
  console.log(JSON.stringify(payload))
} else if (DRIFT_WARNINGS.length) {
  console.log(
    `\n⚠️  Drift audit flagged ${DRIFT_WARNINGS.length} item(s) across ${fileCount} files:\n`
  )
  for (const warning of DRIFT_WARNINGS) {
    console.log(` - ${warning}`)
  }
  console.log(
    '\nThese are guidance-only nudges (non-blocking). Address them to keep docs consistent.'
  )
} else {
  console.log(`✅ Drift audit clear across ${fileCount} files.`)
}

process.exit(0)
