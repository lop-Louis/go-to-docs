#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const repoRoot = process.cwd()
const docsDir = path.join(repoRoot, 'docs')
const signalsCsv = path.join(repoRoot, 'ops', 'signal_registry_seed.csv')
const canonicalGuardrailsFile = path.join(repoRoot, 'ops', 'canonical_ids.md')
const receiptsDir = path.join(docsDir, 'signals', 'receipts')

const allowedGuardrails = new Set()
if (fs.existsSync(canonicalGuardrailsFile)) {
  const guardrailLines = fs
    .readFileSync(canonicalGuardrailsFile, 'utf8')
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.startsWith('- gr-'))

  for (const line of guardrailLines) {
    const match = line.match(/-(\s+)?(gr-\d{3})/i)
    if (match) allowedGuardrails.add(match[2])
  }
}

const signalIds = new Set()
if (fs.existsSync(signalsCsv)) {
  const rows = fs.readFileSync(signalsCsv, 'utf8').trim().split(/\r?\n/).slice(1)
  for (const row of rows) {
    const [signalIdRaw] = row.split(',')
    const trimmed = signalIdRaw?.trim()
    if (trimmed) signalIds.add(trimmed)
  }
}

const receiptCoverage = new Map()
if (fs.existsSync(receiptsDir)) {
  for (const entry of fs.readdirSync(receiptsDir)) {
    if (!entry.endsWith('.md')) continue
    const abs = path.join(receiptsDir, entry)
    const rel = path.relative(repoRoot, abs)
    const { content } = matter.read(abs)
    const matches = content.match(/m-[a-z0-9-]+/gi) || []
    for (const metric of matches) {
      const key = metric.toLowerCase()
      if (!receiptCoverage.has(key)) receiptCoverage.set(key, new Set())
      receiptCoverage.get(key).add(rel)
    }
  }
}

function walkDocs(dir, list) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue
    if (entry.name === 'node_modules' || entry.name === '.vitepress') continue
    const abs = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      walkDocs(abs, list)
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      list.push(abs)
    }
  }
  return list
}

function resolveDecisionLink(pagePath, linkValue) {
  if (!linkValue || typeof linkValue !== 'string') return null
  let target = linkValue.trim()
  if (!target) return null

  if (target.startsWith('http://') || target.startsWith('https://')) {
    return target
  }

  if (target.includes('#')) {
    const parts = target.split('#')
    target = parts[0]
  }

  if (!target.endsWith('.md') && !target.endsWith('.mdx')) {
    target = target.replace(/\/$/, '')
    target = `${target}.md`
  }

  if (target.startsWith('/')) {
    target = target.replace(/^\//, '')
    return path.join(docsDir, target)
  }

  return path.resolve(path.dirname(pagePath), target)
}

const pages = walkDocs(docsDir, [])
const errors = []
const decisionCache = new Map()

function getDecisionMeta(targetPath) {
  if (decisionCache.has(targetPath)) return decisionCache.get(targetPath)
  if (!fs.existsSync(targetPath)) return null
  const raw = fs.readFileSync(targetPath, 'utf8')
  const parsed = matter(raw)
  const data = parsed.data || {}
  decisionCache.set(targetPath, data)
  return data
}

for (const page of pages) {
  const relPath = path.relative(repoRoot, page)
  const raw = fs.readFileSync(page, 'utf8')
  const parsed = matter(raw)
  const data = parsed.data || {}

  if (!data || String(data.band).toUpperCase() !== 'A') continue

  const decisionLink = data.decision_link
  if (!decisionLink) {
    errors.push(`${relPath}: missing decision_link for traceability`)
  } else {
    const resolved = resolveDecisionLink(page, decisionLink)
    if (!resolved) {
      errors.push(`${relPath}: decision_link "${decisionLink}" cannot be resolved`)
    } else if (!resolved.startsWith('http') && !fs.existsSync(resolved)) {
      errors.push(`${relPath}: decision link target "${decisionLink}" not found on disk`)
    } else if (!resolved.startsWith('http')) {
      const decisionMeta = getDecisionMeta(resolved)
      const decisionRel = path.relative(repoRoot, resolved)
      if (!decisionMeta || !decisionMeta.decision_id) {
        errors.push(
          `${relPath}: decision link target "${decisionRel}" missing decision_id in frontmatter`
        )
      } else if (!/^dec-[a-z0-9-]+$/.test(decisionMeta.decision_id)) {
        errors.push(
          `${relPath}: decision link target "${decisionRel}" has invalid decision_id "${decisionMeta.decision_id}"`
        )
      }
    }
  }

  const guardrailId = data.guardrail_id
  if (!guardrailId) {
    errors.push(`${relPath}: missing guardrail_id`)
  } else if (allowedGuardrails.size && !allowedGuardrails.has(guardrailId)) {
    errors.push(`${relPath}: guardrail_id "${guardrailId}" not in canonical list`)
  }

  const metrics = [data.leading_metric, data.lagging_metric].filter(Boolean)
  for (const metric of metrics) {
    if (!signalIds.has(metric)) {
      errors.push(`${relPath}: metric "${metric}" not found in signal registry`)
      continue
    }
    const coverage = receiptCoverage.get(metric.toLowerCase())
    if (!coverage || !coverage.size) {
      errors.push(
        `${relPath}: metric "${metric}" is not referenced in any receipts file under docs/signals/receipts`
      )
    }
  }
}

if (errors.length) {
  console.error('Traceability check failed:')
  for (const err of errors) {
    console.error(` - ${err}`)
  }
  process.exit(1)
} else {
  console.log('Traceability coverage verified across Band-A docs.')
}
