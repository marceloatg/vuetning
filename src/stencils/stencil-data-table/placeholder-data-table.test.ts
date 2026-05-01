import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import PlaceholderDataTable from "./placeholder-data-table.vue"

describe("PlaceholderDataTable", () => {
    it("renders the list view placeholder", () => {
        const wrapper = mount(PlaceholderDataTable)
        expect(wrapper.find(".forceListViewPlaceholder").exists()).toBe(true)
    })

    it("renders ten skeleton rows by default", () => {
        const wrapper = mount(PlaceholderDataTable)
        expect(wrapper.findAll(".forcePlaceholder").length).toBe(10)
    })


    it("has no axe-detectable accessibility violations in its default state", async () => {
        const wrapper = mount(PlaceholderDataTable, { attachTo: document.body })
        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)
        wrapper.unmount()
    })
})
