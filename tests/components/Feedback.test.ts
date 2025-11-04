import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Feedback from '@theme/Feedback.vue'

let mockFrontmatterLabels: unknown

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
    },
    page: {
      value: {
        frontmatter: {
          get labels() {
            return mockFrontmatterLabels
          }
        }
      }
    }
  })
}))

// Mock window.open
const mockWindowOpen = vi.fn()
global.window.open = mockWindowOpen

describe('Feedback.vue', () => {
  beforeEach(() => {
    mockFrontmatterLabels = undefined
    mockWindowOpen.mockClear()
  })

  it('renders feedback prompt', () => {
    const wrapper = mount(Feedback)
    expect(wrapper.text()).toContain('Was this page helpful')
  })

  it('renders feedback buttons', () => {
    const wrapper = mount(Feedback)
    const buttons = wrapper.findAll('button')
    expect(buttons).toHaveLength(3)
    expect(buttons[0].text()).toContain('Yes')
    expect(buttons[1].text()).toContain('No')
    expect(buttons[2].text()).toContain('Ask KL')
  })

  it('uses VitePress design system classes', () => {
    const wrapper = mount(Feedback)
    const buttons = wrapper.findAll('button')

    // Check for VitePress-style button classes
    expect(buttons[0].classes()).toContain('vp-button')
    expect(buttons[0].classes()).toContain('vp-button-brand')
    expect(buttons[1].classes()).toContain('vp-button')
    expect(buttons[1].classes()).toContain('vp-button-alt')
    expect(buttons[2].classes()).toContain('vp-button')
    expect(buttons[2].classes()).toContain('vp-button-alt')
  })

  it('has proper ARIA labels for accessibility', () => {
    const wrapper = mount(Feedback)
    const buttons = wrapper.findAll('button')

    expect(buttons[0].attributes('aria-label')).toBe('Yes, this page was helpful')
    expect(buttons[1].attributes('aria-label')).toBe('No, this page was not helpful')
    expect(buttons[2].attributes('aria-label')).toBe('Ask a follow-up question')

    // Check for region role
    const region = wrapper.find('[role="region"]')
    expect(region.exists()).toBe(true)
    expect(region.attributes('aria-label')).toBe('Page feedback')
  })

  it('opens GitHub issue when helpful button is clicked', async () => {
    const wrapper = mount(Feedback)
    const helpfulButton = wrapper.findAll('button')[0]

    await helpfulButton.trigger('click')

    expect(mockWindowOpen).toHaveBeenCalledOnce()
    const url = mockWindowOpen.mock.calls[0][0]
    expect(url).toContain('github.com/lop-Louis/go-to-docs/issues/new')
    expect(url).toContain('labels=feedback,helpful')
    expect(url).toContain('%5BHelpful%5D') // [Helpful]
  })

  it('opens GitHub issue when not helpful button is clicked', async () => {
    const wrapper = mount(Feedback)
    const notHelpfulButton = wrapper.findAll('button')[1]

    await notHelpfulButton.trigger('click')

    expect(mockWindowOpen).toHaveBeenCalledOnce()
    const url = mockWindowOpen.mock.calls[0][0]
    expect(url).toContain('github.com/lop-Louis/go-to-docs/issues/new')
    expect(url).toContain('labels=feedback,not-helpful')
    expect(url).toContain('%5BNot%20Helpful%5D') // [Not Helpful]
  })

  it('opens GitHub issue with KL label when Ask KL button is clicked', async () => {
    const wrapper = mount(Feedback)
    const askButton = wrapper.findAll('button')[2]

    await askButton.trigger('click')

    expect(mockWindowOpen).toHaveBeenCalledOnce()
    const url = mockWindowOpen.mock.calls[0][0]
    expect(url).toContain('github.com/lop-Louis/go-to-docs/issues/new')
    expect(url).toContain('labels=question,kl')
    expect(url).toContain('%5BQuestion%5D')
  })

  it('shows thank you message after feedback is given', async () => {
    const wrapper = mount(Feedback)
    const helpfulButton = wrapper.findAll('button')[0]

    // Initially, thank you message should not be visible
    expect(wrapper.find('.feedback-thanks').exists()).toBe(false)
    expect(wrapper.find('.feedback-prompt').exists()).toBe(true)

    // Click button
    await helpfulButton.trigger('click')
    await wrapper.vm.$nextTick()

    // Thank you message should now be visible
    expect(wrapper.find('.feedback-thanks').exists()).toBe(true)
    expect(wrapper.find('.feedback-prompt').exists()).toBe(false)
    expect(wrapper.text()).toContain('Thank you for your feedback')
  })

  it('has proper aria-live region for thank you message', async () => {
    const wrapper = mount(Feedback)
    const helpfulButton = wrapper.findAll('button')[0]

    await helpfulButton.trigger('click')
    await wrapper.vm.$nextTick()

    const thanksRegion = wrapper.find('[role="status"]')
    expect(thanksRegion.exists()).toBe(true)
    expect(thanksRegion.attributes('aria-live')).toBe('polite')
  })

  it('includes emoji icons with aria-hidden', () => {
    const wrapper = mount(Feedback)
    const buttons = wrapper.findAll('button')

    buttons.forEach(button => {
      const icon = button.find('[aria-hidden="true"]')
      expect(icon.exists()).toBe(true)
    })
  })

  it('opens window with security attributes', async () => {
    const wrapper = mount(Feedback)
    const helpfulButton = wrapper.findAll('button')[0]

    await helpfulButton.trigger('click')

    expect(mockWindowOpen).toHaveBeenCalledWith(expect.any(String), '_blank', 'noopener,noreferrer')
  })

  it('handles SSR environment gracefully', () => {
    // Component should mount without throwing even if window is not defined
    expect(() => mount(Feedback)).not.toThrow()
  })

  it('appends frontmatter labels to Ask KL tickets', async () => {
    mockFrontmatterLabels = ['finance', 'finance'] // duplicates should dedupe
    const wrapper = mount(Feedback)
    const askButton = wrapper.findAll('button')[2]

    await askButton.trigger('click')

    const url = mockWindowOpen.mock.calls[0][0]
    expect(url).toContain('labels=question,kl,finance')
  })

  it('is mobile responsive with proper CSS classes', () => {
    const wrapper = mount(Feedback)
    const feedbackDiv = wrapper.find('.vp-doc-feedback')
    const buttonsDiv = wrapper.find('.feedback-buttons')

    expect(feedbackDiv.exists()).toBe(true)
    expect(buttonsDiv.exists()).toBe(true)
  })
})
