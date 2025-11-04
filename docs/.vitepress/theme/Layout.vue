<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import Feedback from './Feedback.vue'

const { Layout } = DefaultTheme
const { page } = useData()
</script>

<template>
  <Layout>
    <template #doc-before>
      <div
        v-if="page.frontmatter.status === 'stale'"
        style="
          padding: 0.8rem;
          border: 1px solid var(--vp-c-divider);
          border-radius: 0.5rem;
          background: var(--vp-c-bg-soft);
          margin-bottom: 1rem;
        "
      >
        ⚠️ This page is due for review. Content may be outdated.
        <a
          href="https://github.com/lop-Louis/go-to-docs/issues?q=label%3Astale"
          target="_blank"
          rel="noopener"
        >
          See issue
        </a>
      </div>
    </template>

    <!-- Optional: swap for Giscus if you want discussions -->
    <template #doc-after>
      <div class="vp-feedback">
        <Feedback />
      </div>
    </template>
  </Layout>
</template>
