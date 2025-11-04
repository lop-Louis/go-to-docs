import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Chapter Go-To',
  description: 'Reusable practices, sanitized for public use.',
  base: '/go-to-docs/',
  lastUpdated: true,
  head: [
    // Cloudflare minimal analytics, cookie free (replace YOUR_TOKEN with actual token)
    [
      'script',
      {
        defer: '',
        src: 'https://static.cloudflareinsights.com/beacon.min.js',
        'data-cf-beacon': '{"token":"YOUR_TOKEN_REPLACE_ME"}'
      }
    ]
  ],
  themeConfig: {
    nav: [
      { text: 'Decision Spine', link: '/decision-spine' },
      { text: 'Facilitation', link: '/facilitation' },
      { text: 'Ledger Pattern', link: '/answer-ledger' }
    ],
    sidebar: [
      {
        text: 'Start',
        items: [
          { text: 'What is Band A', link: '/band-a' },
          { text: 'Sanitization Checklist', link: '/sanitization' }
        ]
      },
      {
        text: 'Practices',
        items: [
          { text: 'Decision Spine', link: '/decision-spine' },
          { text: 'Facilitation', link: '/facilitation' },
          { text: 'Answer Ledger', link: '/answer-ledger' },
          { text: 'Accessibility Quick Wins', link: '/accessibility-quick-wins' },
          { text: 'FAQ for New Joiners', link: '/faq-new-joiners' }
        ]
      }
    ],
    footer: {
      message: 'Text © CC BY-NC 4.0 • Code samples MIT • Views are my own.'
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/lop-Louis/go-to-docs' }]
  }
})
