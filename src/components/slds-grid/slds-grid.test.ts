import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsGrid from "./slds-grid.vue"

describe("SldsGrid", () => {
    it("renders a slds-grid container", () => {
        const wrapper = mount(SldsGrid, {
            slots: { default: "<div>Cell</div>" },
        })

        expect(wrapper.classes()).toContain("slds-grid")
    })

    it("applies slds-gutters when gutters is true", () => {
        const wrapper = mount(SldsGrid, {
            props: { gutters: true },
        })
        expect(wrapper.classes()).toContain("slds-gutters")
    })

    it("applies slds-gutters_direct when directGutters is true", () => {
        const wrapper = mount(SldsGrid, {
            props: { directGutters: true },
        })
        expect(wrapper.classes()).toContain("slds-gutters_direct")
    })

    it("prefers gutters over directGutters when both are set", () => {
        const wrapper = mount(SldsGrid, {
            props: { gutters: true, directGutters: true },
        })
        expect(wrapper.classes()).toContain("slds-gutters")
        expect(wrapper.classes()).not.toContain("slds-gutters_direct")
    })

    it("applies slds-wrap when wrap is true", () => {
        const wrapper = mount(SldsGrid, {
            props: { wrap: true },
        })
        expect(wrapper.classes()).toContain("slds-wrap")
    })

    it("applies slds-grid_vertical when vertical is true", () => {
        const wrapper = mount(SldsGrid, {
            props: { vertical: true },
        })
        expect(wrapper.classes()).toContain("slds-grid_vertical")
    })

    it("applies slds-grid_fill when fill is true", () => {
        const wrapper = mount(SldsGrid, {
            props: { fill: true },
        })
        expect(wrapper.classes()).toContain("slds-grid_fill")
    })

    it("applies slds-grid_align-center when alignCenter is true", () => {
        const wrapper = mount(SldsGrid, {
            props: { alignCenter: true },
        })
        expect(wrapper.classes()).toContain("slds-grid_align-center")
    })

    it("applies slds-grid_align-end when alignEnd is true", () => {
        const wrapper = mount(SldsGrid, {
            props: { alignEnd: true },
        })
        expect(wrapper.classes()).toContain("slds-grid_align-end")
    })

    it("applies slds-grid_align-space when alignSpaced is true", () => {
        const wrapper = mount(SldsGrid, {
            props: { alignSpaced: true },
        })
        expect(wrapper.classes()).toContain("slds-grid_align-space")
    })

    it("applies slds-grid_align-spread when alignSpread is true", () => {
        const wrapper = mount(SldsGrid, {
            props: { alignSpread: true },
        })
        expect(wrapper.classes()).toContain("slds-grid_align-spread")
    })

    it("applies slds-grid_vertical-align-end when alignBottom is true", () => {
        const wrapper = mount(SldsGrid, {
            props: { alignBottom: true },
        })
        expect(wrapper.classes()).toContain("slds-grid_vertical-align-end")
    })

    it("applies slds-grid_vertical-align-center when alignMiddle is true", () => {
        const wrapper = mount(SldsGrid, {
            props: { alignMiddle: true },
        })
        expect(wrapper.classes()).toContain("slds-grid_vertical-align-center")
    })

    it("applies slds-grid_vertical-align-start when alignStart is true", () => {
        const wrapper = mount(SldsGrid, {
            props: { alignStart: true },
        })
        expect(wrapper.classes()).toContain("slds-grid_vertical-align-start")
    })

    it("has no axe-detectable accessibility violations in its default state", async () => {
        const wrapper = mount(SldsGrid, {
            slots: { default: "Cell" },
            attachTo: document.body,
        })
        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)
        wrapper.unmount()
    })
})
