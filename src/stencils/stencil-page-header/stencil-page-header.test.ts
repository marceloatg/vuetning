import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import StencilPageHeader from "./stencil-page-header.vue"

describe("StencilPageHeader", () => {
    it("renders the placeholder container", () => {
        const wrapper = mount(StencilPageHeader)
        expect(wrapper.find(".placeholder.record_home_anchor").exists()).toBe(true)
    })

    it("includes the has-details modifier when hasDetails is true", () => {
        const wrapper = mount(StencilPageHeader, {
            props: { hasDetails: true },
        })
        expect(wrapper.find(".body").classes()).toContain("has-details")
    })


    it("has no axe-detectable accessibility violations in its default state", async () => {
        const wrapper = mount(StencilPageHeader, { attachTo: document.body })
        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)
        wrapper.unmount()
    })
})
