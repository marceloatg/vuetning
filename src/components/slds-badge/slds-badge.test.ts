import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsBadge from "./slds-badge.vue"

describe("SldsBadge", () => {
    it("renders a span with the badge label", () => {
        const wrapper = mount(SldsBadge, {
            props: { label: "Beta" },
        })

        expect(wrapper.find("span.slds-badge").exists()).toBe(true)
        expect(wrapper.text()).toContain("Beta")
    })

    it("renders default slot content over label", () => {
        const wrapper = mount(SldsBadge, {
            props: { label: "Ignored" },
            slots: { default: "From slot" },
        })

        expect(wrapper.text()).toContain("From slot")
    })

    const themes: Array<[string, string]> = [
        ["brand", "slds-badge_brand"],
        ["error", "slds-badge_error"],
        ["inverse", "slds-badge_inverse"],
        ["lightest", "slds-badge_lightest"],
        ["outlineBrand", "slds-badge_outline-brand"],
        ["outlineError", "slds-badge_outline-error"],
        ["outlineSuccess", "slds-badge_outline-success"],
        ["outlineWarning", "slds-badge_outline-warning"],
        ["success", "slds-badge_success"],
        ["warning", "slds-badge_warning"],
    ]

    for (const [prop, expected] of themes) {
        it(`applies the ${expected} class for the ${prop} theme`, () => {
            const wrapper = mount(SldsBadge, {
                props: { label: "Beta", [prop]: true },
            })
            expect(wrapper.find(".slds-badge").classes()).toContain(expected)
        })
    }

    it("renders a left-positioned icon when iconName is provided (default)", () => {
        const wrapper = mount(SldsBadge, {
            props: { label: "Beta", iconName: "utility:check" },
        })

        const left = wrapper.find(".slds-badge__icon_left")
        expect(left.exists()).toBe(true)
    })

    it("renders a right-positioned icon when iconRight is true", () => {
        const wrapper = mount(SldsBadge, {
            props: { label: "Beta", iconName: "utility:check", iconRight: true },
        })

        expect(wrapper.find(".slds-badge__icon_right").exists()).toBe(true)
        expect(wrapper.find(".slds-badge__icon_left").exists()).toBe(false)
    })

    it("renders no icon when iconName is omitted", () => {
        const wrapper = mount(SldsBadge, {
            props: { label: "Beta" },
        })

        expect(wrapper.find(".slds-badge__icon").exists()).toBe(false)
    })


    it("has no axe-detectable accessibility violations in its default state", async () => {
        const wrapper = mount(SldsBadge, {
            props: { label: "Beta" },
            attachTo: document.body,
        })
        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)
        wrapper.unmount()
    })
})
