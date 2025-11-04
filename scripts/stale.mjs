import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { execSync } from 'node:child_process'

function lastCommitDate(p) {
  try {
    const result = execSync(`git log -1 --format=%cI -- "${p}"`, { encoding: 'utf8' }).trim()
    return result ? new Date(result) : null
  } catch {
    return null
  }
}

const rows = []
const errors = []
let fileCount = 0

function scan(dir = 'docs') {
  try {
    if (!fs.existsSync(dir)) {
      console.error(`❌ Error: Directory ${dir} not found`)
      process.exit(1)
    }

    for (const f of fs.readdirSync(dir)) {
      const p = path.join(dir, f)

      try {
        const s = fs.statSync(p)

        if (s.isDirectory() && f !== 'node_modules' && f !== '.git' && !f.startsWith('.')) {
          scan(p)
        } else if (p.endsWith('.md') && !p.includes('.vitepress')) {
          fileCount++
          const raw = fs.readFileSync(p, 'utf8')
          const { data } = matter(raw)

          const refresh = Number(data.refresh_after_days ?? 90)
          const last = lastCommitDate(p) || new Date(s.mtime)
          const age = Math.floor((Date.now() - last.getTime()) / 86400000)

          const status = data.status || 'unknown'
          const owner = data.owner || 'unassigned'

          if (age > refresh) {
            rows.push({
              path: p,
              age,
              refresh,
              status,
              owner,
              lastUpdate: last.toISOString().split('T')[0]
            })
          }

          // Additional staleness indicators
          if (age > refresh * 2) {
            errors.push(`${p} is severely stale (${age} days, 2x the threshold)`)
          }
        }
      } catch (err) {
        console.warn(`⚠️  Warning: Could not process ${p}: ${err.message}`)
      }
    }
  } catch (err) {
    console.error(`❌ Error scanning directory ${dir}:`, err.message)
    process.exit(1)
  }
}

// Main execution
console.log('🔍 Scanning for stale pages...\n')

scan()

console.log(`📊 Scanned ${fileCount} files\n`)

if (!rows.length) {
  console.log('# Stale Pages Report')
  console.log('')
  console.log('✅ **No stale pages found!** All content is within its refresh window.')
  console.log('')
  console.log(`- Total files checked: ${fileCount}`)
  console.log(`- Generated: ${new Date().toISOString().split('T')[0]}`)
  process.exit(0)
}

// Generate markdown report for GitHub issue
console.log('# Stale Pages Report')
console.log('')
console.log(`Found **${rows.length}** page(s) that need review:`)
console.log('')
console.log('| Page | Status | Owner | Age (days) | Threshold | Last Update |')
console.log('|------|--------|-------|------------|-----------|-------------|')

const sorted = rows.sort((a, b) => b.age - a.age)

for (const r of sorted) {
  const emoji = r.age > r.refresh * 2 ? '🔴' : '🟡'
  console.log(
    `| ${emoji} ${r.path} | ${r.status} | ${r.owner} | ${r.age} | ${r.refresh} | ${r.lastUpdate} |`
  )
}

console.log('')
console.log('## Actions Required')
console.log('')
console.log('For each stale page:')
console.log('1. Review the content for accuracy')
console.log("2. Update if needed, or confirm it's still valid")
console.log('3. If valid, extend `refresh_after_days` in frontmatter')
console.log('4. If outdated, either update or set `status: archived`')
console.log('')

if (errors.length) {
  console.log('## ⚠️ Severely Stale (Priority)')
  console.log('')
  errors.forEach(e => console.log(`- ${e}`))
  console.log('')
}

console.log('---')
console.log(`Generated: ${new Date().toISOString()}`)
console.log(`Total files: ${fileCount} | Stale: ${rows.length}`)
console.log('')
console.log(
  '💡 **Tip:** Pages become stale when not updated within their `refresh_after_days` window.'
)

// Exit with code 0 (report is informational, not blocking)
process.exit(0)
