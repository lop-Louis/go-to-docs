<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useData } from 'vitepress'

const route = useRoute()
const { page } = useData()
const repo = 'lop-Louis/go-to-docs'
const feedbackGiven = ref(false)

const resolveExtraLabels = () => {
  const raw = page?.value?.frontmatter?.labels
  if (!Array.isArray(raw)) return []
  return raw
    .filter((item): item is string => typeof item === 'string')
    .map(label => label.trim())
    .filter(Boolean)
}

const mk = (label: string, prefix: string) => {
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  const title = encodeURIComponent(`[${prefix}] ${route.path}`)
  const body = encodeURIComponent(`Page: ${origin}${route.path}\nVersion: v1\n\nWhat happened:`)

  const base = label === 'question' ? ['question', 'kl'] : ['feedback', label, 'kl']
  const labels = [...new Set([...base, ...resolveExtraLabels()])].join(',')

  return `https://github.com/${repo}/issues/new?labels=${labels}&title=${title}&body=${body}`
}

const handleFeedback = (type: 'helpful' | 'not-helpful' | 'question') => {
  const urls: Record<typeof type, string> = {
    helpful: mk('helpful', 'Helpful'),
    'not-helpful': mk('not-helpful', 'Not Helpful'),
    question: mk('question', 'Question')
  }

  if (typeof window !== 'undefined') {
    window.open(urls[type], '_blank', 'noopener,noreferrer')
  }

  feedbackGiven.value = true
}
</script>

<template>
  <div class="feedback vp-doc-feedback" role="region" aria-label="Page feedback">
    <div class="feedback-title">Was this page helpful?</div>
    <div v-if="!feedbackGiven" class="feedback-buttons feedback-prompt">
      <button
        class="vp-button vp-button-brand"
        aria-label="Yes, this page was helpful"
        @click="handleFeedback('helpful')"
      >
        <span aria-hidden="true">👍</span> Yes
      </button>
      <button
        class="vp-button vp-button-alt"
        aria-label="No, this page was not helpful"
        @click="handleFeedback('not-helpful')"
      >
        <span aria-hidden="true">👎</span> No
      </button>
      <button
        class="vp-button vp-button-alt"
        aria-label="Ask a follow-up question"
        @click="handleFeedback('question')"
      >
        <span aria-hidden="true">❓</span> Ask KL
      </button>
    </div>
    <div v-else class="feedback-thanks" role="status" aria-live="polite">
      Thank you for your feedback! 🙏
    </div>
  </div>
</template>

<style scoped>
.feedback {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid var(--vp-c-divider);
}

.feedback-title {
  font-size: 0.9rem;
  opacity: 0.9;
  margin-bottom: 0.5rem;
}

.feedback-buttons {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.feedback-buttons .vp-button {
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
  cursor: pointer;
  transition:
    border-color 0.25s,
    background-color 0.25s,
    color 0.25s;
}

.feedback-buttons .vp-button:hover {
  border-color: var(--vp-button-alt-hover-border);
  background-color: var(--vp-button-alt-hover-bg);
  color: var(--vp-button-alt-hover-text);
}

.feedback-buttons .vp-button:focus-visible {
  outline: 2px solid var(--vp-c-brand);
  outline-offset: 2px;
}

.feedback-buttons .vp-button-brand {
  border-color: var(--vp-button-brand-border);
  background-color: var(--vp-button-brand-bg);
  color: var(--vp-button-brand-text);
}

.feedback-buttons .vp-button-brand:hover {
  border-color: var(--vp-button-brand-hover-border);
  background-color: var(--vp-button-brand-hover-bg);
  color: var(--vp-button-brand-hover-text);
}

.feedback-thanks {
  padding: 0.5rem 0;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

@media (max-width: 640px) {
  .feedback-buttons {
    flex-direction: column;
  }

  .feedback-buttons .vp-button {
    width: 100%;
  }
}
</style>
