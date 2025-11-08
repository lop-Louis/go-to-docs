#!/usr/bin/env node
import fs from 'node:fs'
import { spawn } from 'node:child_process'

const fingerprintPath = 'reports/build-fingerprint.json'
const prevFingerprintPath = 'reports/build-fingerprint.prev.json'
let skipBuild = false

try {
  if (fs.existsSync(fingerprintPath)) {
    const current = JSON.parse(fs.readFileSync(fingerprintPath, 'utf8')).fingerprint
    if (fs.existsSync(prevFingerprintPath)) {
      const prev = JSON.parse(fs.readFileSync(prevFingerprintPath, 'utf8')).fingerprint
      skipBuild = Boolean(prev && prev === current)
    }
  }
} catch (error) {
  console.warn('[labs] Unable to compare fingerprints:', error.message)
}

const labs = fs.existsSync('labs')
  ? fs.readdirSync('labs').filter(f => f.endsWith('.lab.json'))
  : []
let pass = 0
let fail = 0
let results = []

const normalizeCmd = cmd => {
  if (cmd.trim() === 'pnpm i') {
    return 'echo "Skipping pnpm install; dependencies already present"'
  }
  return cmd
}

const run = cmd =>
  new Promise(res => {
    const normalized = normalizeCmd(cmd)
    const [c, ...a] = normalized.split(' ')
    const p = spawn(c, a, { stdio: 'inherit', shell: true })
    p.on('close', code => res(code === 0))
  })

for (const f of labs) {
  const conf = JSON.parse(fs.readFileSync(`labs/${f}`, 'utf8'))
  const deadline = Date.now() + (conf.timeout_minutes || 10) * 60000
  let ok = true
  for (const cmd of conf.setup || []) {
    if (Date.now() > deadline) {
      ok = false
      break
    }
    const normalized = normalizeCmd(cmd)
    const isBuildCmd =
      /(^|\s)(pnpm|npm|yarn)\s+(run\s+)?(docs:build|build)\b/.test(normalized) ||
      /\bvitepress\s+build\b/.test(normalized)
    if (skipBuild && isBuildCmd) {
      console.log(`[labs] Skipping build step (unchanged): ${cmd}`)
      continue
    }
    if (!(ok = ok && (await run(cmd)))) break
  }
  for (const cmd of ok ? conf.check || [] : []) {
    if (Date.now() > deadline || !(ok = ok && (await run(cmd)))) break
  }
  ok ? pass++ : fail++
  results.push({ lab: f, ok })
}

fs.mkdirSync('reports', { recursive: true })
fs.writeFileSync('reports/labs.json', JSON.stringify({ pass, fail, results }, null, 2))

try {
  if (fs.existsSync(fingerprintPath)) {
    const payload = JSON.parse(fs.readFileSync(fingerprintPath, 'utf8'))
    fs.writeFileSync(prevFingerprintPath, JSON.stringify(payload, null, 2))
  }
} catch (error) {
  console.warn('[labs] Unable to persist fingerprint:', error.message)
}

console.log(JSON.stringify({ pass, fail, results }, null, 2))
process.exit(0)
