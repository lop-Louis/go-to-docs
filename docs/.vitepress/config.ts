import { defineConfig } from 'vitepress'

const GA_ID = process.env.VITE_GA_ID || 'G-511628512'
const SITE_BASE = '/'

export default defineConfig({
  title: 'Northbook',
  description: 'Guidance over to-do.',
  base: `${SITE_BASE}`,
  lastUpdated: true,
  head: [
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: `${SITE_BASE}favicon-32x32.png`
      }
    ],
    [
      'link',
      {
        rel: 'preload',
        href: `${SITE_BASE}fonts/Inter/Inter-VariableFont_opsz,wght.woff2`,
        as: 'font',
        type: 'font/woff2',
        crossorigin: ''
      }
    ],
    [
      'link',
      {
        rel: 'preload',
        href: `${SITE_BASE}fonts/Manrope/Manrope-VariableFont_wght.woff2`,
        as: 'font',
        type: 'font/woff2',
        crossorigin: ''
      }
    ],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: `${SITE_BASE}favicon-16x16.png`
      }
    ],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '192x192',
        href: `${SITE_BASE}android-chrome-192x192.png`
      }
    ],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '512x512',
        href: `${SITE_BASE}android-chrome-512x512.png`
      }
    ],
    [
      'link',
      {
        rel: 'apple-touch-icon',
        href: `${SITE_BASE}apple-touch-icon.png`
      }
    ],
    [
      'link',
      {
        rel: 'manifest',
        href: `${SITE_BASE}site.webmanifest`
      }
    ],
    [
      'meta',
      {
        property: 'og:title',
        content: 'Northbook'
      }
    ],
    [
      'meta',
      {
        property: 'og:description',
        content: 'Guidance, not chores. Principles and patterns you can link.'
      }
    ],
    [
      'meta',
      {
        property: 'og:image',
        content: `${SITE_BASE}og-image.png`
      }
    ],
    [
      'meta',
      {
        name: 'twitter:card',
        content: 'summary_large_image'
      }
    ],
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
gtag('config', '${GA_ID}', { anonymize_ip: true });
(function(){
  var v = location.pathname.startsWith('/v2/') ? 'v2' : 'v1';
  gtag('event', 'page_view', { site_version: v });
})();
  `
    ]
  ],
  themeConfig: {
    siteTitle: false,
    logo: {
      light: '/logo-lockup-light.png',
      dark: '/logo-lockup-dark.png'
    },
    nav: [
      { text: 'Start', link: '/band-a' },
      {
        text: 'Ask a question',
        link: 'https://github.com/lop-louis/northbook/issues/new?labels=kl,question&title=[Question]%20PATH'
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
        text: 'Guides',
        collapsed: false,
        items: [
          { text: 'Decision Spine', link: '/decision-spine' },
          { text: 'Facilitation', link: '/facilitation' },
          { text: 'Accessibility Quick Wins', link: '/accessibility-quick-wins' },
          { text: 'Expenses: Policy → Action', link: '/pattern-expense-sla' }
        ]
      },
      {
        text: 'Contributor Kit',
        collapsed: false,
        items: [
          { text: 'Sanitization Checklist', link: '/sanitization' },
          { text: 'Answer Ledger Pattern', link: '/answer-ledger' },
          { text: 'Governance', link: '/governance' }
        ]
      }
    ],
    outline: [2, 3],
    footer: {
      message: 'Text © CC BY-NC 4.0 • Code samples MIT • Views are my own.'
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/lop-louis/northbook' }],
    search: {
      provider: 'local'
    },
    editLink: {
      pattern: 'https://github.com/lop-louis/northbook/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    }
  }
})
