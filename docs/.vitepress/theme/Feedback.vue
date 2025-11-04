<script setup lang="ts">
import { useRoute, useData } from 'vitepress'

const route = useRoute()
const { page } = useData()
const repo = 'lop-louis/go-to-docs'

function mk(label: string, prefix: string) {
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  const title = encodeURIComponent(`[${prefix}] ${route.path}`)
  const body = encodeURIComponent(`Page: ${origin}${route.path}\nVersion: v1\n\nWhat happened:`)

  const base = ['feedback', 'kl', label]
  const extra = Array.isArray(page.value.frontmatter?.labels) ? page.value.frontmatter.labels : []
  const labels = [...new Set([...base, ...extra])].join(',')

  return `https://github.com/${repo}/issues/new?labels=${labels}&title=${title}&body=${body}`
}
</script>

<template>
  <div
    class="vp-feedback"
    role="region"
    aria-label="Page feedback"
    style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--vp-c-divider)"
  >
    <div class="vp-feedback__title" style="font-size: 0.9rem; opacity: 0.85; margin-bottom: 0.5rem">
      Was this page helpful
    </div>
    <div class="vp-feedback__row">
      <a class="vp-button" :href="mk('helpful', 'Helpful')" target="_blank" rel="noopener"
        >👍 Yes</a
      >
      <a
        class="vp-button"
        :href="mk('not-helpful', 'Not Helpful')"
        target="_blank"
        rel="noopener"
        style="margin-left: 0.5rem"
        >👎 No</a
      >
      <a
        class="vp-button"
        :href="mk('question', 'Question')"
        target="_blank"
        rel="noopener"
        style="margin-left: 0.5rem"
        >❓ Ask KL</a
      >
    </div>
  </div>
</template>
