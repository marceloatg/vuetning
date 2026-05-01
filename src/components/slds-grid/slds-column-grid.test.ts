import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsColumnGrid from "./slds-column-grid.vue"

describe("SldsColumnGrid", () => {
    it("renders a slds-col + slds-grid container", () => {
        const wrapper = mount(SldsColumnGrid, {
            slots: { default: "Cell" },
        })

        expect(wrapper.classes()).toContain("slds-col")
        expect(wrapper.classes()).toContain("slds-grid")
    })

    it("applies the size modifier from the size prop", () => {
        const wrapper = mount(SldsColumnGrid, {
            props: { size: "1/2" },
            slots: { default: "Cell" },
        })
        expect(wrapper.classes().some(c => c.includes("size"))).toBe(true)
    })


    it("has no axe-detectable accessibility violations in its default state", async () => {
        const wrapper = mount(SldsColumnGrid, {
            slots: { default: "Cell" },
            attachTo: document.body,
        })
        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)
        wrapper.unmount()
    })
})
