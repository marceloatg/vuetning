import { describe, it, expect, vi } from "vitest"
import { mount, flushPromises } from "@vue/test-utils"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsSvg from "./slds-svg.vue"

describe("SldsSvg", () => {
    it("renders an <svg> element", async () => {
        const wrapper = mount(SldsSvg, {
            props: { icon: "utility:close" },
        })

        await flushPromises()
        expect(wrapper.find("svg").exists()).toBe(true)
    })

    it("includes a data attribute keyed by the icon name", async () => {
        const wrapper = mount(SldsSvg, {
            props: { icon: "utility:close" },
        })

        await flushPromises()
        expect(wrapper.find("svg").attributes("data-slds-svg-utility-close")).toBeDefined()
    })

    it("uses the utility viewBox (0 0 52 52) for utility icons", async () => {
        const wrapper = mount(SldsSvg, {
            props: { icon: "utility:close" },
        })

        await flushPromises()
        expect((wrapper.find("svg").element as SVGElement).getAttribute("viewBox")).toBe("0 0 52 52")
    })

    it("uses the action viewBox for action icons", async () => {
        const wrapper = mount(SldsSvg, {
            props: { icon: "action:approval" },
        })

        await flushPromises()
        expect((wrapper.find("svg").element as SVGElement).getAttribute("viewBox")).toBe("0 0 52 52")
    })

    it("uses the brand viewBox and height for brand icons", async () => {
        const wrapper = mount(SldsSvg, {
            props: { icon: "brand:salesforce" },
        })

        await flushPromises()
        const svg = wrapper.find("svg").element as SVGElement
        expect(svg.getAttribute("viewBox")).toBe("0 0 512 512")
        expect(svg.getAttribute("height")).toBe("52")
    })

    it("uses the doctype viewBox for doctype icons", async () => {
        const wrapper = mount(SldsSvg, {
            props: { icon: "doctype:pdf" },
        })

        await flushPromises()
        expect((wrapper.find("svg").element as SVGElement).getAttribute("viewBox")).toBe("0 0 56 64")
    })

    it("uses the standard viewBox (0 0 100 100) for standard icons", async () => {
        const wrapper = mount(SldsSvg, {
            props: { icon: "standard:account" },
        })

        await flushPromises()
        expect((wrapper.find("svg").element as SVGElement).getAttribute("viewBox")).toBe("0 0 100 100")
    })

    it("uses the custom viewBox for custom icons", async () => {
        const wrapper = mount(SldsSvg, {
            props: { icon: "custom:custom1" },
        })

        await flushPromises()
        expect((wrapper.find("svg").element as SVGElement).getAttribute("viewBox")).toBe("0 0 100 100")
    })

    it("falls back to the default standard category and warns on invalid icon names", async () => {
        const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {})
        const wrapper = mount(SldsSvg, {
            props: { icon: "not-a-valid-icon" },
        })

        await flushPromises()
        expect(warnSpy).toHaveBeenCalled()
        // standard viewBox confirms the fallback category
        expect((wrapper.find("svg").element as SVGElement).getAttribute("viewBox")).toBe("0 0 100 100")
        warnSpy.mockRestore()
    })

    it("re-evaluates the icon when the prop changes", async () => {
        const wrapper = mount(SldsSvg, {
            props: { icon: "utility:close" },
        })

        await flushPromises()
        await wrapper.setProps({ icon: "standard:account" })
        await flushPromises()

        expect(wrapper.find("svg").attributes("data-slds-svg-standard-account")).toBeDefined()
    })

    it("warns when the icon prop changes to an invalid value", async () => {
        const wrapper = mount(SldsSvg, {
            props: { icon: "utility:close" },
        })
        await flushPromises()

        const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {})
        await wrapper.setProps({ icon: "garbage" })
        await flushPromises()

        expect(warnSpy).toHaveBeenCalled()
        warnSpy.mockRestore()
    })

    it("applies the standard-format-offset class for non-standard icons in standard format", async () => {
        const wrapper = mount(SldsSvg, {
            props: { icon: "utility:close", standardFormat: true },
        })

        await flushPromises()
        expect(wrapper.find("svg").classes()).toContain("standard-format-offset")
    })

    it("does not apply the standard-format-offset class for standard icons", async () => {
        const wrapper = mount(SldsSvg, {
            props: { icon: "standard:account", standardFormat: true },
        })

        await flushPromises()
        expect(wrapper.find("svg").classes()).not.toContain("standard-format-offset")
    })


    it("has no axe-detectable accessibility violations when assistiveText is provided", async () => {
        const wrapper = mount(SldsSvg, {
            props: { icon: "utility:close", assistiveText: "Search" },
            attachTo: document.body,
        })

        await flushPromises()
        const svg = wrapper.find("svg").element as SVGElement
        expect(svg.getAttribute("aria-label")).toBe("Search")

        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)

        wrapper.unmount()
    })

    it("hides the svg from assistive technology when assistiveText is omitted", async () => {
        const wrapper = mount(SldsSvg, {
            props: { icon: "utility:close" },
            attachTo: document.body,
        })

        await flushPromises()
        const svg = wrapper.find("svg").element as SVGElement
        expect(svg.getAttribute("aria-hidden")).toBe("true")

        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)

        wrapper.unmount()
    })
})
