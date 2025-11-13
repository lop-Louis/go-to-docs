#!/usr/bin/env node
import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const BLOCKING_REASON = {
  redline: 'red-line violation',
  budget: 'ci budget exceeded (>5 minutes)'
}

const steps = [
  { name: 'frontmatter:lint', mode: 'block', reason: BLOCKING_REASON.traceability },
  { name: 'guard', mode: 'block', reason: BLOCKING_REASON.redline },
  { name: 'drift', mode: 'warn' },
  { name: 'release:folders:check', mode: 'warn' }
]

const warnings = []
const startTime = Date.now()

function runStep({ name, mode, reason }) {
  const result = spawnSync('pnpm', ['run', name], { stdio: 'inherit' })
  if (result.status === 0) return

  if (mode === 'warn') {
    warnings.push(`${name} failed (nudge only)`)
    return
  }

  const message = reason
    ? `Blocking step "${name}" failed: ${reason}`
    : `Blocking step "${name}" failed`
  console.error(message)
  process.exit(result.status ?? 1)
}

for (const step of steps) {
  runStep(step)
}

const sitemapFiles = ['public/sitemap.xml', 'public/feed.rss', 'public/feed.xml']
for (const file of sitemapFiles) {
  const abs = path.join(process.cwd(), file)
  if (!fs.existsSync(abs)) continue
  const content = fs.readFileSync(abs, 'utf8')
  if (content.includes('/drafts/')) {
    console.error(`docs:guard failed - ${file} contains /drafts/ entries`)
    process.exit(1)
  }
}

const totalMs = Date.now() - startTime
const maxMs = 5 * 60 * 1000
if (totalMs > maxMs) {
  console.error(
    `docs:guard exceeded budget (${(totalMs / 1000).toFixed(1)}s > ${(maxMs / 1000).toFixed(0)}s)`
  )
  process.exit(1)
}

if (warnings.length) {
  console.warn('docs:guard completed with warnings:')
  for (const warn of warnings) {
    console.warn(` - ${warn}`)
  }
}

console.log(`docs:guard finished in ${(totalMs / 1000).toFixed(1)}s`)
