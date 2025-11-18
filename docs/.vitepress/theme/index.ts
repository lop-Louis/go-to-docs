import DefaultTheme from 'vitepress/theme'
import type { App } from 'vue'
import Layout from './Layout.vue'
import ReleaseList from './components/ReleaseList.vue'
import PageCTA from './components/PageCtas.vue'
import PilotPageList from './components/PilotPageList.vue'
import './custom.css'
import './style.css'
export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }: { app: App }) {
    app.component('ReleaseList', ReleaseList)
    app.component('PageCTA', PageCTA)
    app.component('PilotPageList', PilotPageList)
  }
}
