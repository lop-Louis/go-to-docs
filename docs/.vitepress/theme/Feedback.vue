<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

const { page } = useData()

const feedbackPaths = computed(() => {
  const paths = page.value?.frontmatter?.feedback_paths
  if (!Array.isArray(paths)) return []
  return paths
    .map(item => {
      if (!item) return null
      const { label, href } = item as { label?: string; href?: string }
      if (!label || !href) return null
      return { label, href }
    })
    .filter(Boolean) as { label: string; href: string }[]
})

const shouldRender = computed(() => {
  const frontmatter = page.value?.frontmatter ?? {}
  if (frontmatter.skip_feedback === true) return false
  if (frontmatter.layout === 'home') return false
  return feedbackPaths.value.length > 0
})
</script>

<template>
  <div
    v-if="shouldRender"
    class="vp-feedback"
    role="region"
    aria-label="Page feedback exits"
    style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid var(--vp-c-divider)"
  >
    <div class="vp-feedback__title" style="font-size: 0.9rem; opacity: 0.85; margin-bottom: 0.4rem">
      If this page isn’t working for you, use one of these exits:
    </div>
    <div class="vp-feedback__row" style="flex-wrap: wrap; gap: 0.5rem">
      <a
        v-for="path in feedbackPaths"
        :key="path.href"
        class="vp-button"
        :href="path.href"
        target="_blank"
        rel="noopener"
      >
        {{ path.label }}
      </a>
    </div>
  </div>
</template>
