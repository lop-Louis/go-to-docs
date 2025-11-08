#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'

const TARGETS = [
  path.join(process.cwd(), 'docs'),
  path.join(process.cwd(), 'ops'),
  path.join(process.cwd(), 'labs'),
  path.join(process.cwd(), 'scripts')
]

const hash = crypto.createHash('sha256')

function walk(dir) {
  if (!fs.existsSync(dir)) return
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      walk(fullPath)
    } else if (shouldInclude(fullPath)) {
      hash.update(fs.readFileSync(fullPath))
    }
  }
}

function shouldInclude(filePath) {
  return filePath.endsWith('.md') || filePath.endsWith('.mjs') || filePath.endsWith('.json')
}

for (const target of TARGETS) {
  walk(target)
}

const fingerprint = hash.digest('hex')
fs.mkdirSync('reports', { recursive: true })
const payload = { fingerprint, ts: Date.now() }
fs.writeFileSync('reports/build-fingerprint.json', JSON.stringify(payload, null, 2))
console.log(fingerprint)
