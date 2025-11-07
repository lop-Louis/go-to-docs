import fs from 'node:fs'
import path from 'node:path'

const playbookDir = path.join('docs', 'playbook')

function getMarkdownFiles(dir) {
  return fs.readdirSync(dir).filter(entry => entry.endsWith('.md'))
}

function hasPrimaryActionIntro(content) {
  const firstSectionIndex = content.indexOf('\n## ')
  const intro = firstSectionIndex === -1 ? content : content.slice(0, firstSectionIndex)
  return /primary action/i.test(intro)
}

function findNonUnderlinedLink(content) {
  const withoutCodeFences = content.replace(/```[\s\S]*?```/g, '')
  const stripped = withoutCodeFences.replace(/<u>[\s\S]*?<\/u>/g, '')
  const match = stripped.match(/\[[^\]]+\]\([^)]+\)/)
  return match ? match[0] : null
}

function runScan() {
  const files = getMarkdownFiles(playbookDir)
  const issues = []

  for (const file of files) {
    const fullPath = path.join(playbookDir, file)
    const content = fs.readFileSync(fullPath, 'utf8')

    if (!hasPrimaryActionIntro(content)) {
      issues.push(`${fullPath}: Missing Primary action callout above the first section heading`)
    }

    const rogueLink = findNonUnderlinedLink(content)
    if (rogueLink) {
      issues.push(`${fullPath}: Non-underlined link detected -> ${rogueLink}`)
    }
  }

  if (issues.length) {
    console.log('UX scan found issues:')
    for (const issue of issues) {
      console.log(`- ${issue}`)
    }
    process.exitCode = 1
  } else {
    console.log(`UX scan passed across ${files.length} playbook pages.`)
  }
}

runScan()
