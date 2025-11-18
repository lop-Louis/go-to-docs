<script setup lang="ts">
import { computed } from 'vue'
import { withBase, useRoute, useData } from 'vitepress'
import releasesData from '../../ops/releases.generated.json'

type ReleaseEntry = {
  title: string
  path: string
  bucket: string | null
  status?: string | null
  list_label?: string | null
}

type ReleaseBlock = {
  pages: ReleaseEntry[]
}

const props = withDefaults(
  defineProps<{
    releaseTag?: string
    bucket?: 'navigate' | 'operate' | 'learn' | 'mitigate'
    maxItems?: number
  }>(),
  {
    releaseTag: 'site-v2025.11'
  }
)

const releases = releasesData.releases as Record<string, ReleaseBlock>
const route = useRoute()
const { page } = useData()

const normalizePath = (value?: string | null) => {
  if (!value) return '/'
  return (
    value
      .replace(/\/index(?:\.html|\.md)?$/, '/')
      .replace(/\.(html|md)$/, '')
      .replace(/\/+$/, '/') || '/'
  )
}

const currentPath = computed(() => normalizePath(route.path))

const items = computed(() => {
  const release = releases?.[props.releaseTag]
  if (!release) return []

  let pages = release.pages ?? []
  if (props.bucket) {
    pages = pages.filter(page => page.bucket === props.bucket)
  }
  const currentTitle = page.value?.frontmatter?.title ?? page.value?.title ?? ''
  pages = pages.filter(entry => {
    if (entry.status === 'archived') return false
    if (normalizePath(entry.path)?.includes('/index')) return false
    if (normalizePath(entry.path) === currentPath.value) return false
    if (currentTitle && entry.title === currentTitle) return false
    return true
  })

  pages = pages.slice().sort((a, b) => (a.title || '').localeCompare(b.title || ''))
  if (props.maxItems && props.maxItems > 0) {
    pages = pages.slice(0, props.maxItems)
  }
  return pages
})

const toHref = (path: string | null | undefined) => {
  if (!path) return '#'
  if (path.startsWith('http')) return path
  return withBase(path)
}
</script>

<template>
  <div class="pilot-list">
    <ul v-if="items.length" class="pilot-list__items">
      <li v-for="page in items" :key="page.path" class="pilot-list__item">
        <a class="pilot-list__link" :href="toHref(page.path)">
          <span class="pilot-list__title">
            {{ page.title }}
          </span>
          <p v-if="page.list_label" class="pilot-list__summary">
            {{ page.list_label }}
          </p>
        </a>
      </li>
    </ul>
    <p v-else class="pilot-list__empty">No pilot pages found.</p>
  </div>
</template>

<style scoped>
.pilot-list__items {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.pilot-list__item {
  list-style: none;
}

.pilot-list__link {
  display: block;
  padding: 0.75rem 0.85rem;
  border: 1px solid color-mix(in srgb, var(--vp-c-text-2) 20%, transparent);
  border-radius: 0.5rem;
  background: transparent;
  text-decoration: none;
  color: inherit;
  transition:
    border-color 0.2s ease,
    background 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;
}

.pilot-list__link:hover,
.pilot-list__link:focus-visible {
  border-color: var(--vp-c-brand-1);
  background: color-mix(in srgb, var(--vp-c-brand-soft) 20%, transparent);
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08);
  transform: translateY(-1px);
  outline: none;
}

.pilot-list__title {
  display: block;
  font-weight: 600;
  font-size: 1rem;
  margin: 0 0 0.25rem;
}

.pilot-list__summary {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.92rem;
}

.pilot-list__empty {
  color: var(--vp-c-text-3);
  font-style: italic;
}
</style>
