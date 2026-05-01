import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsScopedTabs from "./slds-scoped-tabs.vue"
import type { ScopedTab } from "./scoped-tab"

const TABS: ScopedTab[] = [
    { id: "1", name: "details", label: "Details", hasError: false },
    { id: "2", name: "history", label: "History", hasError: false },
]

describe("SldsScopedTabs", () => {
    it("renders the scoped tablist", () => {
        const wrapper = mount(SldsScopedTabs, {
            props: { scopedTabs: TABS, active: "details" },
        })

        expect(wrapper.find("[role=\"tablist\"]").exists()).toBe(true)
        expect(wrapper.text()).toContain("Details")
    })

    it("applies the large modifier when large is true", () => {
        const wrapper = mount(SldsScopedTabs, {
            props: { scopedTabs: TABS, active: "details", large: true },
        })
        expect(wrapper.find(".slds-tabs_scoped").classes()).toContain("slds-tabs_large")
    })

    it("emits click-tab with the tab name when a tab is clicked", async () => {
        const wrapper = mount(SldsScopedTabs, {
            props: { scopedTabs: TABS, active: "details" },
            attachTo: document.body,
        })

        const items = wrapper.findAll("[role=\"tablist\"] li")
        await items[1].trigger("click")
        expect(wrapper.emitted("click-tab")).toBeTruthy()
        expect(wrapper.emitted("click-tab")![0]).toEqual(["history"])

        wrapper.unmount()
    })

    it("has no axe-detectable accessibility violations in its default state", async () => {
        const wrapper = mount(SldsScopedTabs, {
            props: { scopedTabs: TABS, active: "details" },
            attachTo: document.body,
        })
        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)
        wrapper.unmount()
    })
})
