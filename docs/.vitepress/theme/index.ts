import DefaultTheme from 'vitepress/theme'
import type { App } from 'vue'
import Layout from './Layout.vue'
import ReleaseList from './components/ReleaseList.vue'
import './custom.css'
import './style.css'
export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }: { app: App }) {
    app.component('ReleaseList', ReleaseList)
  }
}
