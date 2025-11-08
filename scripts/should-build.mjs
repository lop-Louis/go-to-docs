#!/usr/bin/env node
import fs from 'node:fs'

const currentPath = 'reports/build-fingerprint.json'
const previousPath = 'reports/build-fingerprint.prev.json'

if (!fs.existsSync(currentPath)) {
  console.error(`${currentPath} is missing. Run "pnpm fingerprint" first.`)
  process.exit(1)
}

const current = JSON.parse(fs.readFileSync(currentPath, 'utf8')).fingerprint
let previous = null
if (fs.existsSync(previousPath)) {
  previous = JSON.parse(fs.readFileSync(previousPath, 'utf8')).fingerprint
}

const changed = current !== previous
console.log(changed ? 'CHANGED' : 'UNCHANGED')
process.exit(changed ? 0 : 2)
