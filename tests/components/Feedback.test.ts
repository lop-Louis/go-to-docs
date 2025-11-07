/* eslint-env browser */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import Feedback from '@theme/Feedback.vue'

let mockFrontmatterLabels: unknown
let mockSkipFeedback = false
let mockFrontmatterLayout: string | undefined
let mockRoutePath = '/playbook/test'

vi.mock('vitepress', () => ({
  useRoute: () => ({
    get path() {
      return mockRoutePath
    }
  }),
  useData: () => ({
    page: {
      value: {
        frontmatter: {
          get labels() {
            return mockFrontmatterLabels
          },
          get skip_feedback() {
            return mockSkipFeedback
          },
          get layout() {
            return mockFrontmatterLayout
          }
        }
      }
    }
  })
}))

describe('Feedback.vue', () => {
  beforeEach(() => {
    mockFrontmatterLabels = undefined
    mockSkipFeedback = false
    mockFrontmatterLayout = undefined
    mockRoutePath = '/playbook/test'
    vi.restoreAllMocks()
  })

  const mountComponent = async () => {
    const gtagSpy = vi.fn()
    Object.defineProperty(globalThis, 'gtag', {
      value: gtagSpy,
      configurable: true
    })
    const wrapper = mount(Feedback)
    await nextTick()
    return { wrapper, gtagSpy }
  }

  it('renders prompt and three actions for playbooks', async () => {
    const { wrapper } = await mountComponent()
    const links = wrapper.findAll('a')

    expect(wrapper.text()).toContain('Was this helpful?')
    expect(links).toHaveLength(3)
    expect(links.map(link => link.text().trim())).toEqual(['👍 Yes', '👎 No', '❓ Ask KL'])
  })
  it('hides feedback when skip_feedback is true', async () => {
    mockSkipFeedback = true
    const { wrapper } = await mountComponent()
    expect(wrapper.find('.vp-feedback').exists()).toBe(false)
  })
  it('hides feedback on Home layout pages', async () => {
    mockFrontmatterLayout = 'home'
    const { wrapper } = await mountComponent()
    expect(wrapper.find('.vp-feedback').exists()).toBe(false)
  })

  it('builds helpful URL with feedback labels', async () => {
    const { wrapper } = await mountComponent()
    const helpful = wrapper.findAll('a')[0]
    const href = helpful.attributes('href')

    expect(href).toContain('github.com/lop-louis/northbook/issues/new')
    expect(href).toContain('labels=feedback,kl,helpful')
    expect(href).toContain('%5BHelpful%5D')
  })

  it('builds not helpful URL with feedback labels', async () => {
    const { wrapper } = await mountComponent()
    const notHelpful = wrapper.findAll('a')[1]
    const href = notHelpful.attributes('href')

    expect(href).toContain('labels=feedback,kl,not-helpful')
    expect(href).toContain('%5BNot%20Helpful%5D')
  })

  it('builds Ask KL URL with question label and extra frontmatter labels', async () => {
    mockFrontmatterLabels = ['finance', 'finance']
    const { wrapper } = await mountComponent()
    const ask = wrapper.findAll('a')[2]
    const href = ask.attributes('href')

    expect(href).toContain('labels=question,kl,finance')
    expect(href).toContain('%5BQuestion%5D')
  })

  it('sets accessibility attributes', async () => {
    const { wrapper } = await mountComponent()
    const region = wrapper.find('[role="region"]')

    expect(region.exists()).toBe(true)
    expect(region.attributes('aria-label')).toBe('Page feedback')

    wrapper.findAll('a').forEach(link => {
      expect(link.attributes('target')).toBe('_blank')
      expect(link.attributes('rel')).toBe('noopener')
    })
  })

  it('emits GA tracking events when window.gtag exists', async () => {
    const { wrapper, gtagSpy } = await mountComponent()
    const helpful = wrapper.findAll('a')[0]

    await helpful.trigger('click')

    expect(gtagSpy).toHaveBeenCalledWith(
      'event',
      'feedback_click',
      expect.objectContaining({
        feedback_type: 'helpful',
        page_path: globalThis.location?.pathname ?? '',
        site_version: 'v1'
      })
    )
  })

  it('does not throw when gtag is absent', async () => {
    const { gtagSpy, wrapper } = await mountComponent()
    // Remove gtag and ensure click still works
    delete (globalThis as typeof globalThis & { gtag?: unknown }).gtag

    await expect(wrapper.findAll('a')[1].trigger('click')).resolves.toBeUndefined()
    expect(gtagSpy).toHaveBeenCalledTimes(0)
  })
})
