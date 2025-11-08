import { defineConfig } from 'vitepress'
import { generatedNav, generatedSidebar } from './navigation.generated'

const GA_ID = process.env.VITE_GA_ID || 'G-511628512'
const ENABLE_GA4 = process.env.ENABLE_GA4 === 'true'
const RELEASE_TAG = process.env.RELEASE_TAG || 'dev'
const SITE_BASE = '/'

export default defineConfig({
  title: 'Northbook',
  description: 'Guidance over to-do.',
  base: `${SITE_BASE}`,
  lastUpdated: true,
  sitemap: {
    hostname: 'https://northbook.guide'
  },
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
        content: 'https://northbook.guide/og-image.png'
      }
    ],
    [
      'meta',
      {
        property: 'og:url',
        content: 'https://northbook.guide/'
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
        defer: '',
        src: 'https://static.cloudflareinsights.com/beacon.min.js',
        'data-cf-beacon': '{"token":"CF_TOKEN","spa": true}'
      }
    ],
    ...(ENABLE_GA4
      ? [
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
window.ENABLE_GA4 = true;
if (window.ENABLE_GA4) {
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${GA_ID}', { anonymize_ip: true });
  (function(){
    var v = location.pathname.startsWith('/v2/') ? 'v2' : 'v1';
    gtag('event', 'page_view', { site_version: v });
  })();
}
  `
          ]
        ]
      : [['script', {}, 'window.ENABLE_GA4 = false;']])
  ],
  themeConfig: {
    siteTitle: false,
    logo: {
      light: '/logo-lockup-light.png',
      dark: '/logo-lockup-dark.png'
    },
    nav: [
      ...generatedNav,
      {
        text: 'Ask a question',
        link: 'https://github.com/lop-louis/northbook/issues/new?labels=kl,question&title=[Question]%20PATH'
      }
    ],
    sidebar: [
      {
        text: 'Start',
        items: [
          { text: 'Receipts', link: '/receipts/' },
          { text: 'Ops Quick-Run', link: '/ops/quick-run' }
        ]
      },
      ...generatedSidebar
    ],
    outline: [2, 3],
    footer: {
      message: `Privacy-friendly analytics enabled.${RELEASE_TAG !== 'dev' ? ` Release: ${RELEASE_TAG}` : ''}`,
      copyright: '© Northbook'
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/lop-louis/northbook' }],
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: 'Press K to search',
            buttonAriaLabel: 'Search documentation'
          }
        }
      }
    },
    editLink: {
      pattern: 'https://github.com/lop-louis/northbook/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    }
  }
})
