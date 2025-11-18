<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'
import releasesData from '../../ops/releases.generated.json'

type ReleaseEntry = {
  title: string
  path: string
  bucket: string | null
  owner: string | null
  status: string | null
  decision_id: string | null
  leading_metric: string | null
  lagging_metric: string | null
  list_label?: string | null
}

type ReleaseBlock = {
  pages: ReleaseEntry[]
  decisions: ReleaseEntry[]
}

const props = withDefaults(
  defineProps<{
    releaseTag: string
    kind: 'pages' | 'decisions'
    emptyText?: string
  }>(),
  {
    emptyText: 'Nothing has been linked to this release yet.'
  }
)

const releases = releasesData.releases as Record<string, ReleaseBlock>
const release = computed(() => releases?.[props.releaseTag] ?? null)
const entries = computed<ReleaseEntry[]>(() => {
  const list = release.value?.[props.kind] ?? []
  return list.filter(entry => entry.status !== 'archived')
})

function toHref(path: string | null) {
  if (!path) return '#'
  if (path.startsWith('http')) return path
  const needsHtml = !path.endsWith('/') && !path.endsWith('.html')
  const target = needsHtml ? `${path}.html` : path
  return withBase(target)
}
</script>

<template>
  <div class="release-list">
    <ul v-if="entries.length" class="release-list__items">
      <li v-for="entry in entries" :key="entry.path" class="release-list__item">
        <a class="release-list__link" :href="toHref(entry.path)">
          <span class="release-list__title">
            {{ entry.title }}
            <div class="release-list__meta">
              <Badge v-if="entry.bucket" type="info">{{ entry.bucket }}</Badge>
              <Badge v-if="entry.status" :type="entry.status === 'pilot' ? 'warning' : 'tip'">
                {{ entry.status }}
              </Badge>
            </div>
          </span>
          <p v-if="entry.list_label" class="release-list__summary">
            {{ entry.list_label }}
          </p>
        </a>
      </li>
    </ul>
    <p v-else class="release-list__empty">
      {{ emptyText }}
      <span v-if="!release"> (release tag "{{ props.releaseTag }}" not found) </span>
    </p>
  </div>
</template>

<style scoped>
.release-list__items {
  list-style: none;
  padding: 0;
  margin: 0;
}

.release-list__item + .release-list__item {
  margin-top: 0.5rem;
}

.release-list__link {
  display: block;
  padding: 0.75rem 1rem;
  border: 1px solid color-mix(in srgb, var(--vp-c-text-2) 20%, transparent);
  border-radius: 0.65rem;
  text-decoration: none;
  background: transparent;
  transition:
    border-color 0.2s ease,
    background 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.release-list__link:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

.release-list__link:hover {
  border-color: var(--vp-c-brand-1);
  background: color-mix(in srgb, var(--vp-c-brand-soft) 30%, transparent);
  box-shadow: 0 6px 16px rgba(15, 23, 42, 0.08);
}

.release-list__title {
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  color: var(--vp-c-text-1);
}

.release-list__meta {
  display: flex;
  gap: 0.5rem;
}

.release-list__summary {
  margin: 0.35rem 0 0;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  line-height: 1.4;
}

.release-list__empty {
  color: var(--vp-c-text-3);
  font-style: italic;
  margin: 0;
}
</style>
