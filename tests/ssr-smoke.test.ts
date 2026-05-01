import { describe, expect, it } from "vitest"
import { createSSRApp, h } from "vue"
import { renderToString } from "@vue/server-renderer"

import * as components from "../src/components"

// Minimum props for components whose templates dereference required props during render.
// These crash both server- and client-side when missing; the smoke test only cares about
// SSR-specific failures, so we satisfy them with placeholders.
const minimumProps: Record<string, Record<string, unknown>> = {
    SldsSvg: { icon: "utility:close" },
    SldsIcon: { iconName: "utility:close" },
    SldsButtonIcon: { iconName: "utility:close" },
    SldsGlobalAction: { iconName: "utility:close" },
    SldsActivityTimelineItem: { iconName: "utility:close" },
    SldsDuelingPicklist: { modelValue: [], options: [] },
}

describe("SSR smoke test", () => {
    const entries = Object.entries(components).filter(([, value]) => {
        if (!value) return false
        const candidate = value as { name?: string; render?: unknown; setup?: unknown; template?: unknown }
        return Boolean(candidate.name || candidate.render || candidate.setup || candidate.template)
    })

    it("exports at least one component", () => {
        expect(entries.length).toBeGreaterThan(0)
    })

    for (const [name, component] of entries) {
        it(`renders <${name}> server-side without throwing`, async () => {
            const props = minimumProps[name]
            const app = createSSRApp({ render: () => h(component as object, props) })
            app.config.warnHandler = () => { /* swallow missing-required-prop warnings */ }
            await expect(renderToString(app)).resolves.toBeTypeOf("string")
        })
    }
})
