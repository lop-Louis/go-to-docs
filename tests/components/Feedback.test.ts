import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Feedback from '@theme/Feedback.vue'

// Mock VitePress composables
vi.mock('vitepress', () => ({
  useRoute: () => ({
    path: '/test-page'
  }),
  useData: () => ({
    site: {
      value: {
        base: '/go-to-docs/'
      }
    }
  })
}))

describe('Feedback.vue', () => {
  it('renders feedback prompt', () => {
    const wrapper = mount(Feedback)
    expect(wrapper.text()).toContain('Was this page useful')
  })

  it('renders yes and no buttons', () => {
    const wrapper = mount(Feedback)
    const links = wrapper.findAll('a')
    expect(links).toHaveLength(2)
    expect(links[0].text()).toContain('Yes')
    expect(links[1].text()).toContain('No')
  })

  it('generates correct GitHub issue link for helpful feedback', () => {
    const wrapper = mount(Feedback)
    const helpfulLink = wrapper.findAll('a')[0]
    const href = helpfulLink.attributes('href')

    expect(href).toContain('github.com/lop-Louis/go-to-docs/issues/new')
    expect(href).toContain('labels=feedback,helpful')
    expect(href).toContain('%5BHelpful%5D') // URL encoded [Helpful]
    expect(href).toContain('%2Ftest-page') // URL encoded /test-page
  })

  it('generates correct GitHub issue link for not helpful feedback', () => {
    const wrapper = mount(Feedback)
    const notHelpfulLink = wrapper.findAll('a')[1]
    const href = notHelpfulLink.attributes('href')

    expect(href).toContain('github.com/lop-Louis/go-to-docs/issues/new')
    expect(href).toContain('labels=feedback,not-helpful')
    expect(href).toContain('%5BNot%20Helpful%5D') // URL encoded [Not Helpful]
  })

  it('uses target="_blank" and rel="noopener" for security', () => {
    const wrapper = mount(Feedback)
    const links = wrapper.findAll('a')

    links.forEach(link => {
      expect(link.attributes('target')).toBe('_blank')
      expect(link.attributes('rel')).toBe('noopener')
    })
  })

  it('handles SSR environment gracefully', () => {
    // The component already uses window check, so it should mount without error
    expect(() => mount(Feedback)).not.toThrow()
  })
})
