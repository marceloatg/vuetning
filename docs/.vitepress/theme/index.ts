// https://vitepress.dev/guide/custom-theme
import type { Component } from "vue"
import { h } from "vue"
import Theme from "vitepress/theme"
import * as components from "@/components"
import * as stencils from "@/stencils"
import "@/styles"
import "./style.css"

export default {
    ...Theme,
    Layout: () => {
        return h(Theme.Layout, null, {
            // https://vitepress.dev/guide/extending-default-theme#layout-slots
        })
    },
    enhanceApp({ app }) {
        // main.ts deliberately does not export components, so register the full
        // set globally here for the docs pages that reference them in markdown.
        for (const [name, component] of Object.entries({ ...components, ...stencils })) {
            app.component(name, component as Component)
        }
    },
}
