import { describe, it } from 'node:test'
import assert from 'node:assert'
import fs from 'node:fs'
import path from 'node:path'

const REQUIRED_FILES = [
  'docs/.vitepress/config.ts',
  'docs/.vitepress/theme/Layout.vue',
  'docs/.vitepress/theme/Feedback.vue',
  'docs/.vitepress/theme/index.ts',
  'scripts/guard.mjs',
  'scripts/stale.mjs',
  '.github/workflows/pages.yml',
  '.github/workflows/content-guard.yml',
  '.github/workflows/stale-pages.yml',
  '.github/pull_request_template.md',
  '.github/dependabot.yml',
  '.lychee.toml',
  'GOVERNANCE.md',
  'CODEOWNERS',
  'LICENSE',
  'LICENSE-docs',
  'package.json'
]

const REQUIRED_DOCS = [
  'docs/band-a.md',
  'docs/sanitization.md',
  'docs/decision-spine.md',
  'docs/facilitation.md',
  'docs/answer-ledger.md',
  'docs/accessibility-quick-wins.md',
  'docs/faq-new-joiners.md'
]

describe('Project Structure - Documentation Pages', () => {
  for (const doc of REQUIRED_DOCS) {
    it(`should have ${doc}`, () => {
      assert.ok(fs.existsSync(doc), `Missing documentation page: ${doc}`)
    })
  }
})

describe('Project Configuration - package.json', () => {
  it('should have required npm scripts', () => {
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'))
    const requiredScripts = ['docs:dev', 'docs:build', 'docs:preview', 'guard', 'stale', 'test']

    for (const script of requiredScripts) {
      assert.ok(pkg.scripts[script], `Missing npm script: ${script}`)
    }
  })

  it('should have type: module for ES modules', () => {
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'))
    assert.strictEqual(pkg.type, 'module', 'package.json should specify type: module')
  })

  it('should have required dependencies', () => {
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'))
    assert.ok(pkg.devDependencies.vitepress, 'Missing vitepress dependency')
    assert.ok(pkg.devDependencies['gray-matter'], 'Missing gray-matter dependency')
  })
})

describe('Documentation - Frontmatter Validation', () => {
  for (const doc of REQUIRED_DOCS) {
    it(`${doc} should have valid frontmatter`, () => {
      const content = fs.readFileSync(doc, 'utf8')

      // Check for frontmatter delimiters
      assert.match(content, /^---\n/, 'Should start with frontmatter delimiter')

      // Check required fields
      assert.match(content, /title:/i, 'Should have title')
      assert.match(content, /band:\s*A/i, 'Should have band: A')
      assert.match(content, /owner:\s*['"]?@/i, 'Should have owner')
      assert.match(content, /refresh_after_days:/i, 'Should have refresh_after_days')
      assert.match(content, /change_type:/i, 'Should have change_type')
      assert.match(content, /status:/i, 'Should have status')
    })
  }
})

describe('Security Configuration', () => {
  it('should have link checker config', () => {
    const config = fs.readFileSync('.lychee.toml', 'utf8')
    assert.ok(config.includes('exclude'), 'Lychee config should have exclude patterns')
  })

  it('should have gitleaks ignore file', () => {
    assert.ok(fs.existsSync('.gitleaksignore'), 'Should have .gitleaksignore')
  })
})

describe('Governance', () => {
  it('should have comprehensive GOVERNANCE.md', () => {
    const gov = fs.readFileSync('GOVERNANCE.md', 'utf8')
    assert.match(gov, /Band A/i, 'Should define Band A')
    assert.match(gov, /RACI/i, 'Should have RACI matrix')
    assert.match(gov, /SLO/i, 'Should have SLOs')
    assert.match(gov, /Stop Rule/i, 'Should have stop rules')
  })

  it('should have CODEOWNERS', () => {
    const owners = fs.readFileSync('CODEOWNERS', 'utf8')
    assert.match(owners, /\/docs\//, 'Should specify docs ownership')
    assert.match(owners, /@\w+/, 'Should have GitHub usernames')
  })
})

describe('Scripts - Executable', () => {
  it('guard.mjs should be runnable', () => {
    const content = fs.readFileSync('scripts/guard.mjs', 'utf8')
    assert.match(content, /import.*fs/i, 'Should import fs module')
    assert.match(content, /import.*matter/i, 'Should import gray-matter')
  })

  it('stale.mjs should be runnable', () => {
    const content = fs.readFileSync('scripts/stale.mjs', 'utf8')
    assert.match(content, /import.*fs/i, 'Should import fs module')
    assert.match(content, /import.*matter/i, 'Should import gray-matter')
  })
})

console.log('✅ All integration tests configured')
