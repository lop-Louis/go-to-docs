import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { resolve } from 'path'

describe('Layout.vue', () => {
  const layoutPath = resolve(__dirname, '../../docs/.vitepress/theme/Layout.vue')
  const layoutContent = readFileSync(layoutPath, 'utf-8')

  it('contains stale banner logic', () => {
    expect(layoutContent).toContain("page.frontmatter.status === 'stale'")
    expect(layoutContent).toContain('This page is due for review')
  })

  it('links to GitHub issues with stale label filter', () => {
    expect(layoutContent).toContain('github.com/lop-Louis/go-to-docs/issues')
    expect(layoutContent).toContain('label%3Astale')
  })

  it('uses correct security attributes for external links', () => {
    expect(layoutContent).toContain('target="_blank"')
    expect(layoutContent).toContain('rel="noopener"')
  })

  it('includes Feedback component', () => {
    expect(layoutContent).toContain('<Feedback')
    expect(layoutContent).toContain('import Feedback')
  })

  it('uses doc-before and doc-after slots', () => {
    expect(layoutContent).toContain('#doc-before')
    expect(layoutContent).toContain('#doc-after')
  })
})
