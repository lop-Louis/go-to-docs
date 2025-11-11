#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'

const args = process.argv.slice(2)
const flags = new Map()
for (let i = 0; i < args.length; i++) {
  const arg = args[i]
  if (arg.startsWith('--')) {
    const key = arg.replace(/^--/, '')
    const value = args[i + 1] && !args[i + 1].startsWith('--') ? args[++i] : 'true'
    flags.set(key, value)
  }
}

const navFile = path.resolve(
  process.cwd(),
  flags.get('nav') || 'docs/.vitepress/navigation.generated.ts'
)
const outputFile = path.resolve(process.cwd(), flags.get('output') || 'smoke-targets.json')

if (!fs.existsSync(navFile)) {
  console.error(`[smoke] Navigation file not found: ${navFile}`)
  process.exit(1)
}

const source = fs.readFileSync(navFile, 'utf8')

function extractConst(name) {
  const regex = new RegExp(`export const ${name}\\s*=\\s*([\\s\\S]+?)\\s+as\\s+`)
  const match = source.match(regex)
  if (!match) {
    throw new Error(`Unable to find "${name}" in ${navFile}`)
  }
  const evaluator = new Function(`return (${match[1]});`)
  return evaluator()
}

function normalizeRoute(route) {
  if (!route) return '/'
  let next = route.trim()
  if (!next.startsWith('/')) next = `/${next}`
  if (!next.endsWith('/')) next = `${next}/`
  return next.replace(/\/{2,}/g, '/')
}

const generatedNav = extractConst('generatedNav')
const topNav = Array.from(new Set(generatedNav.map(entry => normalizeRoute(entry.link))))

const payload = {
  topNav
}

fs.writeFileSync(outputFile, JSON.stringify(payload, null, 2))
console.log(`[smoke] wrote ${topNav.length} nav targets to ${outputFile}`)
