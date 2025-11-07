#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'
import Ajv from 'ajv/dist/2020.js'

const DOCS = process.env.DOCS || 'docs'
const RUNBOOKS = process.env.RUNBOOKS || 'runbooks'
const JSON_MODE = process.env.FRONTMATTER_FORMAT === 'json'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const schemaPath = path.resolve(__dirname, '../schemas/frontmatter.schema.json')
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'))

const ajv = new Ajv({ allErrors: true, strict: false })
const validate = ajv.compile(schema)

const violations = []
let fileCount = 0

function lintFile(filePath) {
  const relPath = path.relative(process.cwd(), filePath).split(path.sep).join('/')

  if (relPath.includes('.vitepress/')) return

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
    return {
      field: error.params.missingProperty,
      message: `Missing required field "${error.params.missingProperty}"`
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
