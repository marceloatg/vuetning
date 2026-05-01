import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsText from "./slds-text.vue"

describe("SldsText", () => {
    it("renders a div with the slot content", () => {
        const wrapper = mount(SldsText, {
            slots: { default: "Hello" },
        })

        expect(wrapper.find("div").exists()).toBe(true)
        expect(wrapper.text()).toBe("Hello")
    })

    it("applies the heading-large class when headingLarge is true", () => {
        const wrapper = mount(SldsText, {
            props: { headingLarge: true },
            slots: { default: "Heading" },
        })
        expect(wrapper.classes()).toContain("slds-text-heading_large")
    })

    it("applies the heading-medium class when headingMedium is true", () => {
        const wrapper = mount(SldsText, {
            props: { headingMedium: true },
            slots: { default: "Heading" },
        })
        expect(wrapper.classes()).toContain("slds-text-heading_medium")
    })

    it("applies the heading-small class when headingSmall is true", () => {
        const wrapper = mount(SldsText, {
            props: { headingSmall: true },
            slots: { default: "Heading" },
        })
        expect(wrapper.classes()).toContain("slds-text-heading_small")
    })

    it("applies the body small class", () => {
        const wrapper = mount(SldsText, {
            props: { small: true },
            slots: { default: "Body" },
        })
        expect(wrapper.classes()).toContain("slds-text-body_small")
    })

    it("applies the body regular class", () => {
        const wrapper = mount(SldsText, {
            props: { regular: true },
            slots: { default: "Body" },
        })
        expect(wrapper.classes()).toContain("slds-text-body_regular")
    })

    it("applies the title class", () => {
        const wrapper = mount(SldsText, {
            props: { title: true },
            slots: { default: "Title" },
        })
        expect(wrapper.classes()).toContain("slds-text-title")
    })

    it("applies the title-uppercase class", () => {
        const wrapper = mount(SldsText, {
            props: { titleUppercase: true },
            slots: { default: "Title" },
        })
        expect(wrapper.classes()).toContain("slds-text-title_caps")
    })

    it("applies the longform class", () => {
        const wrapper = mount(SldsText, {
            props: { longForm: true },
            slots: { default: "Long body" },
        })
        expect(wrapper.classes()).toContain("slds-text-longform")
    })

    it("applies left/right/center alignment classes", () => {
        const left = mount(SldsText, { props: { alignLeft: true }, slots: { default: "x" } })
        expect(left.classes()).toContain("slds-text-align_left")

        const right = mount(SldsText, { props: { alignRight: true }, slots: { default: "x" } })
        expect(right.classes()).toContain("slds-text-align_right")

        const center = mount(SldsText, { props: { alignCenter: true }, slots: { default: "x" } })
        expect(center.classes()).toContain("slds-text-align_center")
    })

    it("applies each color modifier class", () => {
        const cases: Array<[Record<string, boolean>, string]> = [
            [{ default: true }, "slds-text-color_default"],
            [{ success: true }, "slds-text-color_success"],
            [{ weak: true }, "slds-text-color_weak"],
            [{ error: true }, "slds-text-color_error"],
            [{ destructive: true }, "slds-text-color_destructive"],
            [{ inverse: true }, "slds-text-color_inverse"],
            [{ inverseWeak: true }, "slds-text-color_inverse-weak"],
        ]

        for (const [props, expected] of cases) {
            const wrapper = mount(SldsText, { props, slots: { default: "x" } })
            expect(wrapper.classes()).toContain(expected)
        }
    })

    it("applies the monospace class", () => {
        const wrapper = mount(SldsText, {
            props: { monospace: true },
            slots: { default: "code" },
        })
        expect(wrapper.classes()).toContain("slds-text-font_monospace")
    })

    it("renders without any modifier classes by default", () => {
        const wrapper = mount(SldsText, {
            slots: { default: "Hello" },
        })
        // Drops the empty className string and ensures no modifier was applied
        expect(wrapper.classes().filter(c => c.startsWith("slds-text-"))).toHaveLength(0)
    })


    it("has no axe-detectable accessibility violations in its default state", async () => {
        const wrapper = mount(SldsText, {
            slots: { default: "Hello" },
            attachTo: document.body,
        })
        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)
        wrapper.unmount()
    })
})
