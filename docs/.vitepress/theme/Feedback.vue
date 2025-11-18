<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vitepress'

const repo = 'lop-louis/northbook'
const route = useRoute()

const bucket = computed(() => {
  const segments = route.path.split('/').filter(Boolean)
  return segments[0] ?? 'root'
})

const exits = computed(() => {
  const path = route.path

  const issue = (bucketLabel: string) => ({
    label: `Open an issue tell us more`,
    href: `https://github.com/${repo}/issues/new?labels=feedback,kl,${bucketLabel}_bucket&title=%5B${encodeURIComponent(
      bucketLabel
    )}%5D%20${encodeURIComponent(path)}&body=What%20felt%20off%3F%0A%0APage%3A%20${encodeURIComponent(path)}`
  })

  switch (bucket.value) {
    case 'navigate':
      return [issue('navigate')]
    case 'operate':
      return [issue('operate')]
    case 'learn':
      return [issue('learn')]
    case 'mitigate':
      return [issue('mitigate')]
    default:
      return [issue('home')]
  }
})

function iconFor(href: string) {
  if (typeof href !== 'string') return 'book'
  return href.includes('github.com') ? 'github' : 'book'
}
</script>

<template>
  <div class="vp-feedback" role="region" aria-label="Page feedback exits">
    <h5 class="vp-feedback__title">Something isn't working?</h5>
    <div class="vp-feedback__row">
      <a
        v-for="path in exits"
        :key="path.href"
        class="vp-button"
        :href="path.href"
        target="_blank"
        rel="noopener"
      >
        <svg
          v-if="iconFor(path.href) === 'github'"
          class="vp-button__icon"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M12 2a10 10 0 0 0-3.162 19.491c.5.094.686-.217.686-.483 0-.237-.01-1.023-.014-1.855-2.79.606-3.379-1.194-3.379-1.194-.455-1.156-1.11-1.465-1.11-1.465-.907-.62.069-.608.069-.608 1.003.07 1.53 1.03 1.53 1.03.892 1.529 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.338-2.228-.253-4.57-1.115-4.57-4.961 0-1.095.39-1.99 1.029-2.69-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.503.338 1.909-1.296 2.748-1.026 2.748-1.026.546 1.378.203 2.397.1 2.65.64.7 1.028 1.595 1.028 2.69 0 3.857-2.346 4.705-4.58 4.953.36.31.679.917.679 1.85 0 1.334-.012 2.41-.012 2.737 0 .268.184.58.69.482A10 10 0 0 0 12 2Z"
          />
        </svg>
        {{ path.label }}
      </a>
    </div>
  </div>
</template>

<style scoped>
.vp-feedback {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid var(--vp-c-divider);
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.vp-feedback__title {
  line-height: 1.4;
  opacity: 0.9;
}

.vp-feedback__row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.vp-button {
  font-size: 0.95rem;
  line-height: 1.4;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.45rem 0.75rem;
  border-radius: 8px;
  border: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition:
    background 0.15s ease,
    border-color 0.15s ease,
    color 0.15s ease,
    box-shadow 0.15s ease;
}

.vp-button:hover {
  background: var(--vp-c-bg-soft);
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-text-1);
}

.vp-button:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--vp-c-brand-1);
}

.vp-button__icon {
  width: 1rem;
  height: 1rem;
  margin-right: 0.4rem;
  flex-shrink: 0;
}
</style>
