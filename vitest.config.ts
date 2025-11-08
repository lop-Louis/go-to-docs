import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'happy-dom',
    include: ['tests/components/**/*.test.ts', 'tests/accessibility/**/*.test.ts'],
    exclude: ['tests/*.test.mjs', 'node_modules/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'tests/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/mockData',
        'docs/.vitepress/dist/'
      ]
    }
  },
  resolve: {
    alias: {
      '@theme': resolve(__dirname, './docs/.vitepress/theme')
    }
  }
})
