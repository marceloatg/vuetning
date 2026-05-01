import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import StencilForm from "./stencil-form.vue"

describe("StencilForm", () => {
    it("renders the placeholder container", () => {
        const wrapper = mount(StencilForm)
        expect(wrapper.find(".forcePlaceholder").exists()).toBe(true)
    })

    it("renders single-column layout when singleColumn is true", () => {
        const wrapper = mount(StencilForm, {
            props: { singleColumn: true, rows: 3 },
        })
        expect(wrapper.find(".left-column").exists()).toBe(false)
        expect(wrapper.find(".right-column").exists()).toBe(false)
    })


    it("has no axe-detectable accessibility violations in its default state", async () => {
        const wrapper = mount(StencilForm, { attachTo: document.body })
        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)
        wrapper.unmount()
    })
})
