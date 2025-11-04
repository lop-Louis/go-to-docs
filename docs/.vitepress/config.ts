import { defineConfig } from 'vitepress'

// Google Analytics 4 Measurement ID
const GA_ID = process.env.VITE_GA_ID || 'G-FZ8N89SQKN'

export default defineConfig({
  title: 'Go-To Docs & Governance',
  description: 'Reusable practices, sanitized for public use.',
  base: '/go-to-docs/',
  lastUpdated: true,
  head: [
    [
      'script',
      {
        async: '',
        src: `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
      }
    ],
    [
      'script',
      {},
      `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}', {
  page_path: window.location.pathname,
  anonymize_ip: true
});

// Version signal for v1/v2 adoption tracking
(function(){
  var v = location.pathname.startsWith('/v2/') ? 'v2' : 'v1';
  gtag('event', 'page_view', { site_version: v });
})();
  `
    ]
  ],
  themeConfig: {
    nav: [
      { text: 'Start', link: '/' },
      {
        text: 'Ask a question',
        link: 'https://github.com/lop-Louis/go-to-docs/issues/new?labels=kl,question&title=[Question]%20'
      }
    ],
    sidebar: [
      {
        text: 'Start here',
        collapsed: false,
        items: [
          { text: 'What is Band A', link: '/band-a' },
          { text: 'FAQ for New Joiners', link: '/faq-new-joiners' },
          { text: 'Monthly Release Rhythm', link: '/monthly-release' }
        ]
      },
      {
        text: 'Public Guides',
        collapsed: false,
        items: [
          { text: 'Decision Spine', link: '/decision-spine' },
          { text: 'Facilitation Techniques', link: '/facilitation' },
          { text: 'Accessibility Quick Wins', link: '/accessibility-quick-wins' }
        ]
      },
      {
        text: 'Contributor Kit',
        collapsed: false,
        items: [
          { text: 'Sanitization Checklist', link: '/sanitization' },
          { text: 'Answer Ledger Pattern', link: '/answer-ledger' },
          { text: 'API Guidelines', link: '/api-guidelines' }
        ]
      },
      {
        text: 'Moderator Ops',
        collapsed: false,
        items: [{ text: 'Governance Policy', link: '/governance' }]
      }
    ],
    outline: [2, 3],
    footer: {
      message: 'Text © CC BY-NC 4.0 • Code samples MIT • Views are my own.'
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/lop-Louis/go-to-docs' }],
    search: {
      provider: 'local'
    },
    editLink: {
      pattern: 'https://github.com/lop-Louis/go-to-docs/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    }
  }
})
