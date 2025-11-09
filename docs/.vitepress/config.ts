import { defineConfig } from 'vitepress'
import { generatedNav, generatedSidebar } from './navigation.generated'

const GA_ID = process.env.VITE_GA_ID || 'G-511628512'
const rawBase = process.env.SITE_BASE ?? '/'
const SITE_BASE = rawBase.endsWith('/') ? rawBase : `${rawBase}/`
const SKIP_ANALYTICS = process.env.SKIP_ANALYTICS === 'true'
const EDIT_BRANCH = process.env.EDIT_BRANCH ?? 'main'
const withBase = (path: string) => `${SITE_BASE}${path.replace(/^\//, '')}`

const head = [
  [
    'link',
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: withBase('favicon-32x32.png')
    }
  ],
  [
    'link',
    {
      rel: 'preload',
      href: withBase('fonts/Inter/Inter-VariableFont_opsz,wght.woff2'),
      as: 'font',
      type: 'font/woff2',
      crossorigin: ''
    }
  ],
  [
    'link',
    {
      rel: 'preload',
      href: withBase('fonts/Manrope/Manrope-VariableFont_wght.woff2'),
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
      href: withBase('favicon-16x16.png')
    }
  ],
  [
    'link',
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '192x192',
      href: withBase('android-chrome-192x192.png')
    }
  ],
  [
    'link',
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '512x512',
      href: withBase('android-chrome-512x512.png')
    }
  ],
  [
    'link',
    {
      rel: 'apple-touch-icon',
      href: withBase('apple-touch-icon.png')
    }
  ],
  [
    'link',
    {
      rel: 'manifest',
      href: withBase('site.webmanifest')
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
      content: withBase('og-image.png')
    }
  ],
  [
    'meta',
    {
      name: 'twitter:card',
      content: 'summary_large_image'
    }
  ]
]

if (!SKIP_ANALYTICS) {
  head.push(
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
  var path = location.pathname.toLowerCase();
  var version = 'root';
  if (path.startsWith('/staging/')) {
    version = 'staging';
  } else if (path.startsWith('/v2/')) {
    version = 'v2';
  } else if (path.startsWith('/v1/')) {
    version = 'v1';
  }
  gtag('event', 'page_view', { site_version: version });
})();
  `
    ]
  )
}

export default defineConfig({
  title: 'Northbook',
  description: 'Guidance over to-do.',
  base: SITE_BASE,
  lastUpdated: true,
  head,
  themeConfig: {
    siteTitle: false,
    logo: {
      light: withBase('logo-lockup-light.png'),
      dark: withBase('logo-lockup-dark.png')
    },
    nav: [
      ...generatedNav,
      {
        text: 'Ask a question',
        link: 'https://github.com/lop-louis/northbook/issues/new?labels=kl,question&title=[Question]%20PATH'
      }
    ],
    sidebar: generatedSidebar,
    outline: [2, 3],
    footer: {
      message: 'Text © CC BY-NC 4.0 • Code samples MIT • Views are my own.'
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/lop-louis/northbook' }],
    search: {
      provider: 'local'
    },
    editLink: {
      pattern: `https://github.com/lop-louis/northbook/edit/${EDIT_BRANCH}/docs/:path`,
      text: 'Edit this page on GitHub'
    }
  }
})
