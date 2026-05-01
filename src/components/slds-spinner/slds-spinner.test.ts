import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsSpinner from "./slds-spinner.vue"

describe("SldsSpinner", () => {
    it("renders a status role spinner", () => {
        const wrapper = mount(SldsSpinner, {
            props: { assistiveText: "Loading" },
        })

        expect(wrapper.attributes("role")).toBe("status")
        expect(wrapper.classes()).toContain("slds-spinner")
    })

    it("applies the medium size class by default", () => {
        const wrapper = mount(SldsSpinner, {
            props: { assistiveText: "Loading" },
        })
        expect(wrapper.classes()).toContain("slds-spinner_medium")
    })

    it("applies the brand variant class when brand is true", () => {
        const wrapper = mount(SldsSpinner, {
            props: { assistiveText: "Loading", brand: true },
        })
        expect(wrapper.classes()).toContain("slds-spinner_brand")
    })

    it("applies the inverse variant class when inverse is true", () => {
        const wrapper = mount(SldsSpinner, {
            props: { assistiveText: "Loading", inverse: true },
        })
        expect(wrapper.classes()).toContain("slds-spinner_inverse")
    })

    it("applies the xx-small size class", () => {
        const wrapper = mount(SldsSpinner, {
            props: { assistiveText: "x", xxSmall: true },
        })
        expect(wrapper.classes()).toContain("slds-spinner_xx-small")
    })

    it("applies the x-small size class", () => {
        const wrapper = mount(SldsSpinner, {
            props: { assistiveText: "x", xSmall: true },
        })
        expect(wrapper.classes()).toContain("slds-spinner_x-small")
    })

    it("applies the small size class", () => {
        const wrapper = mount(SldsSpinner, {
            props: { assistiveText: "x", small: true },
        })
        expect(wrapper.classes()).toContain("slds-spinner_small")
    })

    it("applies the large size class", () => {
        const wrapper = mount(SldsSpinner, {
            props: { assistiveText: "x", large: true },
        })
        expect(wrapper.classes()).toContain("slds-spinner_large")
    })

    it("applies the delayed modifier when delayed is true", () => {
        const wrapper = mount(SldsSpinner, {
            props: { assistiveText: "x", delayed: true },
        })
        expect(wrapper.classes()).toContain("slds-spinner_delayed")
    })

    it("applies the inline modifier when inline is true", () => {
        const wrapper = mount(SldsSpinner, {
            props: { assistiveText: "x", inline: true },
        })
        expect(wrapper.classes()).toContain("slds-spinner_inline")
    })

    it("renders the assistive text when provided", () => {
        const wrapper = mount(SldsSpinner, {
            props: { assistiveText: "Please wait" },
        })
        expect(wrapper.find(".slds-assistive-text").text()).toBe("Please wait")
    })

    it("does not render the assistive text node when missing", () => {
        const wrapper = mount(SldsSpinner)
        expect(wrapper.find(".slds-assistive-text").exists()).toBe(false)
    })

    it("renders the optional text element when text is provided", () => {
        const wrapper = mount(SldsSpinner, {
            props: { assistiveText: "x", text: "Loading data" },
        })
        expect(wrapper.find(".slds-text").text()).toBe("Loading data")
    })

    it("does not render the optional text element when text is missing", () => {
        const wrapper = mount(SldsSpinner, {
            props: { assistiveText: "x" },
        })
        expect(wrapper.find(".slds-text").exists()).toBe(false)
    })

    it("prevents the default action on scroll events", async () => {
        const wrapper = mount(SldsSpinner, {
            props: { assistiveText: "Loading" },
            attachTo: document.body,
        })

        const event = new Event("scroll", { cancelable: true, bubbles: true })
        wrapper.element.dispatchEvent(event)
        expect(event.defaultPrevented).toBe(true)

        wrapper.unmount()
    })

    it("has no axe-detectable accessibility violations in its default state", async () => {
        const wrapper = mount(SldsSpinner, {
            props: { assistiveText: "Loading" },
            attachTo: document.body,
        })
        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)
        wrapper.unmount()
    })
})
