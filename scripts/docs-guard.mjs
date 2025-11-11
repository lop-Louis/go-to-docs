#!/usr/bin/env node
import { spawnSync } from 'node:child_process'

const BLOCKING_REASON = {
  redline: 'red-line violation',
  traceability: 'traceability gap',
  budget: 'ci budget exceeded (>5 minutes)'
}

const steps = [
  { name: 'frontmatter:lint', mode: 'block', reason: BLOCKING_REASON.traceability },
  { name: 'guard', mode: 'block', reason: BLOCKING_REASON.redline },
  { name: 'drift', mode: 'warn' },
  { name: 'release:folders:check', mode: 'warn' },
  { name: 'state:check', mode: 'warn' },
  { name: 'traceability:check', mode: 'block', reason: BLOCKING_REASON.traceability },
  { name: 'ux:scan', mode: 'warn' }
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
