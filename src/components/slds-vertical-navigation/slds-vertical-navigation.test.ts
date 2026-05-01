import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsVerticalNavigation from "./slds-vertical-navigation.vue"

describe("SldsVerticalNavigation", () => {
    it("renders the nav container", () => {
        const wrapper = mount(SldsVerticalNavigation, {
            slots: { default: "<div>Items</div>" },
        })

        expect(wrapper.find("nav.slds-nav-vertical").exists()).toBe(true)
    })

    it("renders slot content under the scrollable container", () => {
        const wrapper = mount(SldsVerticalNavigation, {
            slots: { default: "<div class='child'>X</div>" },
        })

        expect(wrapper.find(".slds-scrollable_y .child").exists()).toBe(true)
    })

    it("does not apply variant classes by default", () => {
        const wrapper = mount(SldsVerticalNavigation)

        const nav = wrapper.find("nav")
        expect(nav.classes()).not.toContain("slds-nav-vertical_shade")
        expect(nav.classes()).not.toContain("slds-nav-vertical_compact")
        expect(nav.classes()).not.toContain("slds-nav-vertical_has-quickfind")
    })

    it("applies shaded modifier when shaded is true", () => {
        const wrapper = mount(SldsVerticalNavigation, {
            props: { shaded: true },
        })

        expect(wrapper.find("nav").classes()).toContain("slds-nav-vertical_shade")
    })

    it("applies compact modifier when compact is true", () => {
        const wrapper = mount(SldsVerticalNavigation, {
            props: { compact: true },
        })

        expect(wrapper.find("nav").classes()).toContain("slds-nav-vertical_compact")
    })

    it("renders the quickfind input and applies the modifier when hasQuickfind is true", () => {
        const wrapper = mount(SldsVerticalNavigation, {
            props: { hasQuickfind: true },
        })

        expect(wrapper.find("nav").classes()).toContain("slds-nav-vertical_has-quickfind")
        expect(wrapper.find("input").exists()).toBe(true)
    })

    it("does not render the quickfind input when hasQuickfind is false", () => {
        const wrapper = mount(SldsVerticalNavigation)
        expect(wrapper.find("input").exists()).toBe(false)
    })

    it("updates internal search value when the quickfind input changes", async () => {
        const wrapper = mount(SldsVerticalNavigation, {
            props: { hasQuickfind: true },
        })

        const input = wrapper.find("input")
        await input.setValue("hello")

        expect((input.element as HTMLInputElement).value).toBe("hello")
    })

    it("accepts the active prop without affecting markup", () => {
        const wrapper = mount(SldsVerticalNavigation, {
            props: { active: "items" },
            slots: { default: "<div class='child'/>" },
        })

        expect(wrapper.find(".child").exists()).toBe(true)
    })


    it("has no axe-detectable accessibility violations in its default state", async () => {
        const wrapper = mount(SldsVerticalNavigation, {
            slots: { default: "<div>Items</div>" },
            attachTo: document.body,
        })

        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)

        wrapper.unmount()
    })
})
