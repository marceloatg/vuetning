import path from "path"
import { defineConfig } from "vitepress"

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "Vuetning",
    description: "Vuetning is a Salesforce Lightning Design System framework for Vue.js 3.",
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: "Guide", link: "/" },
            { text: "Components", link: "/markdown-examples" },
        ],

        sidebar: [
            {
                text: "Examples",
                items: [
                    { text: "Markdown Examples", link: "/markdown-examples" },
                    { text: "Runtime API Examples", link: "/api-examples" },
                ],
            },
            {
                text: "General",
                items: [
                    {
                        text: "Test",
                        link: "general/test",
                    },
                ],
            },
            {
                text: "Components",
                items: [
                    {
                        text: "Accordion",
                        link: "components/accordion",
                    },
                    {
                        text: "Spinner",
                        link: "components/spinner",
                    },
                ],
            },
            {
                text: "Stencils",
                items: [],
            },
            {
                text: "Templates",
                items: [],
            },
        ],

        socialLinks: [
            { icon: "github", link: "https://github.com/vuejs/vitepress" },
        ],
    },
    vite: {
        build: {
            // The docs theme intentionally registers the entire component library
            // globally (see theme/index.ts), so the theme chunk bundles every
            // component plus gsap/moment/numeral. That eager bundle is expected for
            // a docs site, so lift the advisory size warning above it.
            chunkSizeWarningLimit: 1000,
        },
        css: {
            preprocessorOptions: {
                scss: {
                    api: "modern-compiler",
                },
            },
        },
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "../../src"),
            },
        },
    },
})
