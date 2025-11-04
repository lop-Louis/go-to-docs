<script setup lang="ts">
import { useRoute } from 'vitepress'

const route = useRoute()
const repo = 'lop-Louis/go-to-docs'

const mk = (label: string, prefix: string) => {
  const title = encodeURIComponent(`[${prefix}] ${route.path}`)
  const body = encodeURIComponent(
    `Page: ${typeof window !== 'undefined' ? window.location.origin : ''}${route.path}\nVersion: v1\n\nWhat happened:`
  )
  return `https://github.com/${repo}/issues/new?labels=feedback,${label},kl&title=${title}&body=${body}`
}
</script>

<template>
  <div class="vp-feedback">
    <div class="vp-feedback__title">Was this page helpful?</div>
    <div class="vp-feedback__row">
      <a class="vp-button" :href="mk('helpful', 'Helpful')" target="_blank" rel="noopener">
        👍 Yes
      </a>
      <a class="vp-button" :href="mk('not-helpful', 'Not Helpful')" target="_blank" rel="noopener">
        👎 No
      </a>
      <a class="vp-button" :href="mk('question', 'Question')" target="_blank" rel="noopener">
        ❓ Ask KL
      </a>
    </div>
  </div>
</template>

<style scoped>
.vp-feedback {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid var(--vp-c-divider);
}

.vp-feedback__title {
  font-size: 0.9rem;
  opacity: 0.9;
  margin-bottom: 0.5rem;
}

.vp-feedback__row {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.vp-feedback__row .vp-button {
  display: inline-block;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  font-weight: 500;
  line-height: 1.5;
  text-align: center;
  white-space: nowrap;
  border: 1px solid var(--vp-button-alt-border);
  border-radius: 8px;
  background-color: var(--vp-button-alt-bg);
  color: var(--vp-button-alt-text);
  transition:
    border-color 0.25s,
    background-color 0.25s,
    color 0.25s;
  text-decoration: none;
}

.vp-feedback__row .vp-button:hover {
  border-color: var(--vp-button-alt-hover-border);
  background-color: var(--vp-button-alt-hover-bg);
  color: var(--vp-button-alt-hover-text);
}

@media (max-width: 640px) {
  .vp-feedback__row {
    flex-direction: column;
  }

  .vp-feedback__row .vp-button {
    width: 100%;
  }
}
</style>
