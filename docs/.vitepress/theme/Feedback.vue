<script setup lang="ts">
import { useRoute, useData } from 'vitepress'
const route = useRoute()
const { site } = useData()
const repo = 'lop-Louis/go-to-docs'
const make = (label: string, prefix: string) => {
  const title = encodeURIComponent(`[${prefix}] ${route.path}`)
  const pageUrl =
    typeof window !== 'undefined' ? window.location.href : `${site.value.base}${route.path}`
  const body = encodeURIComponent(`Page: ${pageUrl}\n\nContext:`)
  return `https://github.com/${repo}/issues/new?labels=feedback,${label}&title=${title}&body=${body}`
}
</script>

<template>
  <div class="mt-8 pb-8 border-t">
    <p class="mb-2 text-sm">Was this page useful?</p>
    <a class="vp-button" :href="make('helpful', 'Helpful')" target="_blank" rel="noopener"
      >👍 Yes</a
    >
    <a
      class="vp-button"
      :href="make('not-helpful', 'Not Helpful')"
      target="_blank"
      rel="noopener"
      style="margin-left: 0.5rem"
      >👎 No</a
    >
  </div>
</template>

<style>
.vp-button {
  padding: 0.4rem 0.7rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 0.5rem;
  font-size: 0.875rem;
  text-decoration: none;
}
</style>
