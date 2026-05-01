import { fileURLToPath } from "node:url"
import { resolve } from "node:path"

import vue from "@vitejs/plugin-vue"
import { defineConfig } from "vitest/config"

const root = fileURLToPath(new URL(".", import.meta.url))

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            "@": resolve(root, "src"),
        },
    },
    test: {
        globals: true,
        environment: "node",
        include: ["tests/ssr-smoke.test.ts"],
    },
})
