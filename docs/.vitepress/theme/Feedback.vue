<script setup lang="ts">
import { useRoute, useData } from 'vitepress'
import { ref } from 'vue'

const route = useRoute()
const { site } = useData()
const repo = 'lop-Louis/go-to-docs'
const feedbackGiven = ref(false)
const feedbackType = ref<'helpful' | 'not-helpful' | null>(null)

const makeIssueUrl = (label: string, prefix: string) => {
  const title = encodeURIComponent(`[${prefix}] ${route.path}`)
  const pageUrl =
    typeof window !== 'undefined' ? window.location.href : `${site.value.base}${route.path}`
  const body = encodeURIComponent(`Page: ${pageUrl}\n\nContext:`)
  return `https://github.com/${repo}/issues/new?labels=feedback,${label}&title=${title}&body=${body}`
}

const handleFeedback = (type: 'helpful' | 'not-helpful', prefix: string) => {
  feedbackType.value = type
  feedbackGiven.value = true

  // Open GitHub issue in new tab
  const url = makeIssueUrl(type, prefix)
  window.open(url, '_blank', 'noopener,noreferrer')
}
</script>

<template>
  <div class="vp-doc-feedback" role="region" aria-label="Page feedback">
    <div v-if="!feedbackGiven" class="feedback-prompt">
      <p class="feedback-question">Was this page helpful?</p>
      <div class="feedback-buttons">
        <button
          class="vp-button vp-button-brand"
          aria-label="Yes, this page was helpful"
          @click="handleFeedback('helpful', 'Helpful')"
        >
          <span class="button-icon" aria-hidden="true">👍</span>
          <span class="button-text">Yes</span>
        </button>
        <button
          class="vp-button vp-button-alt"
          aria-label="No, this page was not helpful"
          @click="handleFeedback('not-helpful', 'Not Helpful')"
        >
          <span class="button-icon" aria-hidden="true">👎</span>
          <span class="button-text">No</span>
        </button>
      </div>
    </div>

    <div v-else class="feedback-thanks" role="status" aria-live="polite">
      <p class="thanks-message">
        <span class="thanks-icon" aria-hidden="true">✓</span>
        Thank you for your feedback! A GitHub issue has been opened.
      </p>
      <p class="thanks-subtitle">Feel free to add more details there.</p>
    </div>
  </div>
</template>

<style scoped>
.vp-doc-feedback {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--vp-c-divider);
}

.feedback-prompt {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.feedback-question {
  margin: 0;
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.feedback-buttons {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.vp-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.5;
  transition: all 0.25s;
  cursor: pointer;
  border: 1px solid transparent;
}

.vp-button:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

.vp-button-brand {
  background-color: var(--vp-c-brand-1);
  color: var(--vp-c-white);
  border-color: var(--vp-c-brand-1);
}

.vp-button-brand:hover {
  background-color: var(--vp-c-brand-2);
  border-color: var(--vp-c-brand-2);
}

.vp-button-brand:active {
  background-color: var(--vp-c-brand-3);
  border-color: var(--vp-c-brand-3);
}

.vp-button-alt {
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border-color: var(--vp-c-divider);
}

.vp-button-alt:hover {
  background-color: var(--vp-c-gray-soft);
  border-color: var(--vp-c-gray-1);
}

.vp-button-alt:active {
  background-color: var(--vp-c-gray);
  border-color: var(--vp-c-gray-2);
}

.button-icon {
  font-size: 1rem;
  line-height: 1;
}

.button-text {
  font-size: 0.875rem;
}

.feedback-thanks {
  padding: 1rem;
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
}

.thanks-message {
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--vp-c-brand-1);
}

.thanks-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  background-color: var(--vp-c-brand-1);
  color: var(--vp-c-white);
  font-size: 0.75rem;
  font-weight: bold;
}

.thanks-subtitle {
  margin: 0.5rem 0 0 0;
  font-size: 0.8125rem;
  color: var(--vp-c-text-2);
}

/* Mobile responsiveness */
@media (max-width: 640px) {
  .vp-doc-feedback {
    margin-top: 1.5rem;
    padding-top: 1rem;
  }

  .feedback-buttons {
    flex-direction: column;
    gap: 0.5rem;
  }

  .vp-button {
    width: 100%;
    justify-content: center;
  }

  .feedback-question {
    font-size: 0.875rem;
  }
}
</style>
