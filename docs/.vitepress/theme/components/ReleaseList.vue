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
const entries = computed<ReleaseEntry[]>(() => release.value?.[props.kind] ?? [])

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
        <a :href="toHref(entry.path)">{{ entry.title }}</a>
        <Badge v-if="entry.bucket" type="info" class="release-list__meta">{{ entry.bucket }}</Badge>
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
  list-style: disc;
  padding-left: 1.25rem;
  margin: 0;
}

.release-list__item + .release-list__item {
  margin-top: 0.35rem;
}

.release-list__meta {
  margin-left: 0.5rem;
}

.release-list__empty {
  color: var(--vp-c-text-3);
  font-style: italic;
  margin: 0;
}
</style>
