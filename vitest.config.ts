import { fileURLToPath } from "node:url"
import { resolve } from "node:path"

import vue from "@vitejs/plugin-vue"
import { playwright } from "@vitest/browser-playwright"
import { defineConfig } from "vitest/config"

const root = fileURLToPath(new URL(".", import.meta.url))

export default defineConfig({
    plugins: [vue()],
    // Vite 8.0.14+ has a dep-optimizer regression: when @vue/shared is hoisted
    // into a shared chunk, the prebundled @vue/test-utils calls
    // init_shared_esm_bundler() without importing it, so every browser test
    // file fails to import with "init_shared_esm_bundler is not defined".
    // Excluding the vue chain from prebundling sidesteps the broken split.
    // Remove once the optimizer bug is fixed upstream.
    optimizeDeps: {
        exclude: ["@vue/test-utils", "@vue/server-renderer", "vue"],
    },
    resolve: {
        alias: {
            "@": resolve(root, "src"),
        },
    },
    test: {
        globals: true,
        setupFiles: ["./tests/setup.ts"],
        include: ["src/**/*.{test,spec}.ts"],
        coverage: {
            provider: "v8",
            include: ["src/**/*.{vue,ts}"],
            exclude: [
                "src/**/*.{test,spec}.ts",
                "src/**/index.ts",
                "src/main.ts",
                "src/styles.ts",
                "src/shims.d.ts",
                // Sprite components are static SVG markup with no logic.
                "src/components/slds-svg/slds-svg-*-sprite.vue",
            ],
            reporter: ["text-summary", "html"],
        },
        // Run component tests in real Chromium via Playwright so DOM-dependent
        // behaviour (focus management, computed styles, ARIA tree, axe rules)
        // matches what end users actually experience.
        browser: {
            enabled: true,
            provider: playwright(),
            headless: true,
            screenshotFailures: false,
            instances: [
                { browser: "chromium" },
            ],
        },
    },
})
