// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import Vuetning from '@/main'
import Theme from 'vitepress/theme'
import './style.css'

export default {
    ...Theme,
    Layout: () => {
        return h(Theme.Layout, null, {
            // https://vitepress.dev/guide/extending-default-theme#layout-slots
        })
    },
    enhanceApp({ app }) {
        app.use(Vuetning)
    }
}
