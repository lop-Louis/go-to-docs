<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useData } from 'vitepress'

const route = useRoute()
const { page } = useData()
const repo = 'lop-louis/northbook'

const shouldRender = computed(() => {
  const frontmatter = page.value?.frontmatter ?? {}
  if (frontmatter.skip_feedback === true) return false
  if (frontmatter.layout === 'home') return false
  return true
})

function mk(label: 'helpful' | 'not-helpful' | 'question', prefix: string) {
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  const title = encodeURIComponent(`[${prefix}] ${route.path}`)
  const body = encodeURIComponent(`Page: ${origin}${route.path}\nVersion: v1\n\nWhat happened:`)

  const base = label === 'question' ? ['question', 'kl'] : ['feedback', 'kl', label]
  const extra = Array.isArray(page.value.frontmatter?.labels) ? page.value.frontmatter.labels : []
  const labels = [...new Set([...base, ...extra])].join(',')

  return `https://github.com/${repo}/issues/new?labels=${labels}&title=${title}&body=${body}`
}

function track(kind: 'helpful' | 'not-helpful' | 'question') {
  if (typeof window === 'undefined' || !('gtag' in window)) return

  const version = location.pathname.startsWith('/v2/') ? 'v2' : 'v1'
  const commonPayload = {
    page_path: location.pathname,
    site_version: version
  }

  window.gtag('event', 'feedback_click', {
    feedback_type: kind,
    ...commonPayload
  })

  if (kind === 'helpful' || kind === 'not-helpful') {
    window.gtag('event', 'doc_helped', {
      ...commonPayload,
      response: kind === 'helpful' ? 'yes' : 'no',
      value: kind === 'helpful' ? 1 : 0
    })
  }
}
</script>

<template>
  <div
    v-if="shouldRender"
    class="vp-feedback"
    role="region"
    aria-label="Page feedback"
    style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid var(--vp-c-divider)"
  >
    <div class="vp-feedback__title" style="font-size: 0.9rem; opacity: 0.85; margin-bottom: 0.5rem">
      Was this helpful?
    </div>
    <div class="vp-feedback__row">
      <a
        class="vp-button"
        :href="mk('helpful', 'Helpful')"
        target="_blank"
        rel="noopener"
        @click="track('helpful')"
      >
        👍 Yes
      </a>
      <a
        class="vp-button"
        :href="mk('not-helpful', 'Not Helpful')"
        target="_blank"
        rel="noopener"
        style="margin-left: 0.5rem"
        @click="track('not-helpful')"
      >
        👎 No
      </a>
      <a
        class="vp-button"
        :href="mk('question', 'Question')"
        target="_blank"
        rel="noopener"
        style="margin-left: 0.5rem"
        @click="track('question')"
      >
        ❓ Ask KL
      </a>
    </div>
  </div>
</template>
