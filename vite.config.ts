import { fileURLToPath } from "node:url"
import { resolve, relative } from "node:path"

import vue from "@vitejs/plugin-vue"
import { defineConfig } from "vite"
import { libInjectCss } from "vite-plugin-lib-inject-css"
import { visualizer } from "rollup-plugin-visualizer"
import { globSync } from "glob"

const root = fileURLToPath(new URL(".", import.meta.url))
const srcDir = resolve(root, "src")

// Collect every component, stencil, mixin, util, constant, and the styles entry
// as its own input so Rollup can keep them as separate chunks (preserveModules).
const componentEntries = globSync("src/components/*/*.vue", { cwd: root })
const stencilEntries = globSync("src/stencils/*/*.vue", { cwd: root })
const tsModules = globSync(
    [
        "src/main.ts",
        "src/resolver.ts",
        "src/styles.ts",
        "src/components/index.ts",
        "src/components/*/index.ts",
        "src/components/types.ts",
        "src/stencils/index.ts",
        "src/stencils/*/index.ts",
        "src/constants/index.ts",
        "src/constants/*.ts",
        "src/mixins/*.ts",
        "src/utils/*.ts",
    ],
    {
        cwd: root,
        ignore: ["**/*.test.ts", "**/*.spec.ts"],
    },
)

const inputEntries = Object.fromEntries(
    [...componentEntries, ...stencilEntries, ...tsModules].map((file) => {
        const absolute = resolve(root, file)
        const key = relative(srcDir, absolute).replace(/\.(ts|vue)$/, "")
        return [key, absolute]
    }),
)

// Peer dependencies we must NEVER bundle into the library output.
// These are declared as peerDependencies in package.json so the host app
// provides them and we avoid duplication / version skew.
const externalPeers = [
    "vue",
    "vue-router",
    "vue-i18n",
    "@vueuse/core",
    "@vueuse/components",
    "@formkit/auto-animate",
    "@formkit/auto-animate/vue",
    "vue-observe-visibility",
    "gsap",
    "moment",
    "numeral",
    "uuid",
    "scrollparent",
]

function isExternal(id: string): boolean {
    return externalPeers.some((dep) => id === dep || id.startsWith(`${dep}/`))
}

export default defineConfig({
    plugins: [
        vue(),
        libInjectCss(),
        visualizer({
            filename: "dist/bundle-analysis.html",
            gzipSize: true,
            brotliSize: true,
            template: "treemap",
        }),
    ],
    build: {
        outDir: "dist",
        cssCodeSplit: true,
        sourcemap: false,
        target: "es2020",
        minify: "esbuild",
        emptyOutDir: true,
        lib: {
            entry: inputEntries,
            formats: ["es"],
        },
        rollupOptions: {
            external: isExternal,
            input: inputEntries,
            output: {
                format: "es",
                preserveModules: true,
                preserveModulesRoot: "src",
                entryFileNames: "[name].js",
                assetFileNames: "[name][extname]",
                chunkFileNames: "chunks/[name]-[hash].js",
                exports: "named",
            },
        },
    },
})
