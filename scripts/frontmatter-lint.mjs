#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'
import Ajv from 'ajv/dist/2020.js'
import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
const draft7Meta = require('ajv/dist/refs/json-schema-draft-07.json')

const DOCS = process.env.DOCS || 'docs'
const RUNBOOKS = process.env.RUNBOOKS || 'runbooks'
const JSON_MODE = process.env.FRONTMATTER_FORMAT === 'json'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const schemaPath = path.resolve(__dirname, '../schemas/frontmatter.schema.json')
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'))

const ajv = new Ajv({ allErrors: true, strict: false })
ajv.addMetaSchema(draft7Meta)
const validate = ajv.compile(schema)

const violations = []
let fileCount = 0

const remediationHints = {
  bucket: "Add 'bucket: <navigate|operate|learn|mitigate>' to the frontmatter.",
  north_star_id: "Add 'north_star_id: ns-001'. See docs/operate/north-star-guardrails.md.",
  guardrail_id: "Add 'guardrail_id: gr-10x'. Guardrail list: docs/operate/guardrail-index.md.",
  owner: "Add 'owner: '@handle''. Use the public owner handle.",
  band: "Set 'band: A' to mark public readiness.",
  date: "Add 'date: YYYY-MM-DD' (lowercase month names converted).",
  cta_primary_label: "Add 'cta_primary_label: <cta_key>' (see ops/cta-map.json).",
  cta_secondary_label: "Add 'cta_secondary_label: <cta_key>' (see ops/cta-map.json).",
  leading_metric: "Add 'leading_metric: m-...' using ops/signal_registry_seed.csv.",
  lagging_metric: "Add 'lagging_metric: m-...' using ops/signal_registry_seed.csv.",
  list_label: "Add 'list_label: <short summary>' so release lists stay human-readable.",
  tags: "Add a 'tags:' array (e.g., 'tags: [v2025.11-governance]') to link releases."
}

function lintFile(filePath) {
  const relPath = path.relative(process.cwd(), filePath).split(path.sep).join('/')

  if (relPath.includes('.vitepress/')) return
  if (relPath.split('/').includes('drafts')) return

  const raw = fs.readFileSync(filePath, 'utf8')
  const { data } = matter(raw)
  fileCount++

  const valid = validate(data)
  if (valid) return

  for (const error of validate.errors || []) {
    const detail = formatError(error)
    violations.push({
      file: relPath,
      field: detail.field,
      message: detail.message
    })
  }
}

function formatError(error) {
  if (error.keyword === 'required') {
    const missing = error.params.missingProperty
    return {
      field: missing,
      message: remediationHints[missing]
        ? `Missing required field "${missing}". ${remediationHints[missing]}`
        : `Missing required field "${missing}".`
    }
  }

  const instancePath = error.instancePath.replace(/^\//, '')
  const field = instancePath || '(root)'

  switch (error.keyword) {
    case 'enum':
      return {
        field,
        message: `Invalid value. Allowed: ${error.params.allowedValues.join(', ')}`
      }
    case 'const':
      return {
        field,
        message: `Invalid value. Expected ${JSON.stringify(error.params.allowedValue)}`
      }
    case 'pattern':
      return {
        field,
        message: 'Value does not match required pattern'
      }
    case 'minimum':
    case 'maximum':
    case 'type':
      return {
        field,
        message: error.message || 'Invalid value'
      }
    default:
      return {
        field,
        message: error.message || 'Invalid value'
      }
  }
}

function walk(dir) {
  try {
    for (const entry of fs.readdirSync(dir)) {
      const entryPath = path.join(dir, entry)
      const stat = fs.statSync(entryPath)
      if (stat.isDirectory()) {
        if (entry === 'node_modules' || entry === '.git') continue
        walk(entryPath)
      } else if (entryPath.endsWith('.md')) {
        lintFile(entryPath)
      }
    }
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.error(`Error while reading ${dir}: ${error.message}`)
    }
  }
}

walk(DOCS)
walk(RUNBOOKS)

const payload = {
  status: violations.length ? 'failed' : 'passed',
  fileCount,
  violationCount: violations.length,
  violations
}

if (JSON_MODE) {
  console.log(JSON.stringify(payload, null, 2))
} else if (violations.length) {
  console.error('\n❌ Frontmatter schema violations found:\n')
  for (const violation of violations) {
    console.error(`- ${violation.file} [${violation.field}]: ${violation.message}`)
  }
  console.error('')
} else {
  console.log(`✅ Frontmatter schema check passed for ${fileCount} files.`)
}

process.exit(violations.length ? 1 : 0)
