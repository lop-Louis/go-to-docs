#!/usr/bin/env node

import { spawn } from 'node:child_process'

function run(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: 'inherit',
      shell: false,
      ...options
    })

    child.on('close', code => {
      if (code === 0) {
        resolve()
      } else {
        reject(new Error(`${command} ${args.join(' ')} exited with code ${code}`))
      }
    })
  })
}

async function main() {
  const skipGuard = process.env.SKIP_DOCS_GUARD === '1'

  if (skipGuard) {
    console.log('Skipping guard because SKIP_DOCS_GUARD=1')
  } else {
    await run('pnpm', ['run', 'guard'])
  }

  await run('pnpm', ['exec', 'vitepress', 'build', 'docs'])
  await run(process.execPath, ['scripts/verify-primary-actions.mjs'])
}

main().catch(err => {
  console.error(err.message)
  process.exit(1)
})
