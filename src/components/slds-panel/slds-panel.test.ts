import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsPanel from "./slds-panel.vue"

describe("SldsPanel", () => {
    it("renders the panel with its title and body", () => {
        const wrapper = mount(SldsPanel, {
            props: { title: "Filters", assistiveText: "Close panel" },
            slots: { default: "Body" },
        })

        expect(wrapper.find(".slds-panel__header").exists()).toBe(true)
        expect(wrapper.text()).toContain("Filters")
        expect(wrapper.find(".slds-panel__body").text()).toContain("Body")
    })

    it("hides the close button when closeButton is false", () => {
        const wrapper = mount(SldsPanel, {
            props: { title: "Filters", closeButton: false },
        })
        expect(wrapper.find(".slds-panel__close").exists()).toBe(false)
    })

    it("emits close when the close button is clicked", async () => {
        const wrapper = mount(SldsPanel, {
            props: { title: "Filters", assistiveText: "Close panel" },
        })

        await wrapper.find(".slds-panel__close").trigger("click")
        expect(wrapper.emitted("close")).toHaveLength(1)
    })

    it("renders a back button when backButton is true and emits back on click", async () => {
        const wrapper = mount(SldsPanel, {
            props: { title: "Filters", backButton: true },
        })

        const back = wrapper.find(".slds-panel__back")
        expect(back.exists()).toBe(true)

        await back.trigger("click")
        expect(wrapper.emitted("back")).toHaveLength(1)
    })

    it("does not render a back button by default", () => {
        const wrapper = mount(SldsPanel, {
            props: { title: "Filters" },
        })
        expect(wrapper.find(".slds-panel__back").exists()).toBe(false)
    })

    const sizes: Array<[string, string]> = [
        ["small", "slds-size_small"],
        ["medium", "slds-size_medium"],
        ["large", "slds-size_large"],
        ["xLarge", "slds-size_x-large"],
        ["full", "slds-size_full"],
    ]

    for (const [prop, expected] of sizes) {
        it(`applies ${expected} when ${prop} is true`, () => {
            const wrapper = mount(SldsPanel, {
                props: { title: "Filters", [prop]: true },
            })
            expect(wrapper.find(".slds-panel").classes()).toContain(expected)
        })
    }

    it("defaults to slds-size_medium when no size prop is set", () => {
        const wrapper = mount(SldsPanel, {
            props: { title: "Filters" },
        })
        expect(wrapper.find(".slds-panel").classes()).toContain("slds-size_medium")
    })

    it("applies docked-right when right is true", () => {
        const wrapper = mount(SldsPanel, {
            props: { title: "Filters", right: true },
        })
        expect(wrapper.find(".slds-panel").classes()).toContain("slds-panel_docked-right")
    })

    it("applies docked-left when left is true", () => {
        const wrapper = mount(SldsPanel, {
            props: { title: "Filters", left: true },
        })
        expect(wrapper.find(".slds-panel").classes()).toContain("slds-panel_docked-left")
    })

    it("applies the centered-header class when centeredHeader is true", () => {
        const wrapper = mount(SldsPanel, {
            props: { title: "Filters", centeredHeader: true },
        })

        expect(wrapper.find(".slds-panel__header").classes()).toContain("slds-panel__header_align-center")
    })

    it("renders a custom header from the header slot and tags it as custom", () => {
        const wrapper = mount(SldsPanel, {
            props: { title: "Filters" },
            slots: { header: "<div data-testid='custom'>Custom</div>" },
        })

        expect(wrapper.find("[data-testid='custom']").exists()).toBe(true)
        const headers = wrapper.findAll(".slds-panel__header")
        // At least one header should carry the custom-header modifier
        expect(headers.some(h => h.classes().includes("slds-panel__header_custom"))).toBe(true)
    })

    it("has no axe-detectable accessibility violations in its default state", async () => {
        const wrapper = mount(SldsPanel, {
            props: { title: "Filters", ariaLabel: "Filters panel" },
            slots: { default: "<p>Body</p>" },
            attachTo: document.body,
        })

        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)

        wrapper.unmount()
    })
})
