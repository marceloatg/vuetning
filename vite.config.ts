import vue from "@vitejs/plugin-vue"
import { defineConfig } from "vite"
import { resolve } from "path"

export default defineConfig({
    plugins: [vue()],
    build: {
        lib: {
            entry: resolve(__dirname, "src/main.ts"),
            name: "Vuetning",
            fileName: (format) => `vuetning.${format}.js`,
        },
        rollupOptions: {
            external: ["vue"],
            output: {
                exports: "named",
                globals: {
                    vue: "Vue",
                },
            },
        },
    },
})
