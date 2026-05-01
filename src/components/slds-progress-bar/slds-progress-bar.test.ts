import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsProgressBar from "./slds-progress-bar.vue"

describe("SldsProgressBar", () => {
    it("renders a progressbar role with the current/total values", () => {
        const wrapper = mount(SldsProgressBar, {
            props: { current: 25, total: 100, label: "Loading" },
        })

        const bar = wrapper.find("[role=\"progressbar\"]")
        expect(bar.exists()).toBe(true)
        expect(bar.attributes("aria-valuenow")).toBe("25")
        expect(bar.attributes("aria-valuemax")).toBe("100")
    })

    it("shows the error label when error is true", () => {
        const wrapper = mount(SldsProgressBar, {
            props: { current: 25, total: 100, error: true },
        })
        expect(wrapper.text()).toContain("Error")
    })


    it("renders the proportion text when not in error state", () => {
        const wrapper = mount(SldsProgressBar, {
            props: { current: 50, total: 100, label: "Loading" },
        })
        expect(wrapper.text()).toContain("50/100")
    })

    it("renders an empty proportion when total is 0", () => {
        const wrapper = mount(SldsProgressBar, {
            props: { current: 0, total: 0, label: "x" },
        })
        const bar = wrapper.find("[role=\"progressbar\"]")
        expect(bar.attributes("aria-valuenow")).toBe("0")
    })

    it("clamps progress to 100 when current exceeds total and applies success class", () => {
        const wrapper = mount(SldsProgressBar, {
            props: { current: 150, total: 100, label: "Done" },
        })
        const value = wrapper.find(".slds-progress-bar__value")
        expect(value.classes()).toContain("slds-progress-bar__value_success")
    })

    it("applies the success modifier when current equals total", () => {
        const wrapper = mount(SldsProgressBar, {
            props: { current: 100, total: 100, label: "Done" },
        })
        expect(wrapper.find(".slds-progress-bar__value").classes()).toContain("slds-progress-bar__value_success")
    })

    it("applies the error class to the value when error is true", () => {
        const wrapper = mount(SldsProgressBar, {
            props: { current: 25, total: 100, error: true },
        })
        expect(wrapper.find(".slds-progress-bar__value").classes()).toContain("slds-progress-bar__value_error")
    })

    it("applies the warning class to the value when warning is true", () => {
        const wrapper = mount(SldsProgressBar, {
            props: { current: 25, total: 100, warning: true },
        })
        expect(wrapper.find(".slds-progress-bar__value").classes()).toContain("slds-progress-bar__value_warning")
    })

    it("applies the circular modifier when radius is true", () => {
        const wrapper = mount(SldsProgressBar, {
            props: { current: 25, total: 100, radius: true },
        })
        expect(wrapper.find(".slds-progress-bar").classes()).toContain("slds-progress-bar_circular")
    })

    it("applies the large size modifier", () => {
        const wrapper = mount(SldsProgressBar, {
            props: { current: 25, total: 100, large: true },
        })
        expect(wrapper.find(".slds-progress-bar").classes()).toContain("slds-progress-bar_large")
    })

    it("applies the medium size modifier", () => {
        const wrapper = mount(SldsProgressBar, {
            props: { current: 25, total: 100, medium: true },
        })
        expect(wrapper.find(".slds-progress-bar").classes()).toContain("slds-progress-bar_medium")
    })

    it("applies the small size modifier", () => {
        const wrapper = mount(SldsProgressBar, {
            props: { current: 25, total: 100, small: true },
        })
        expect(wrapper.find(".slds-progress-bar").classes()).toContain("slds-progress-bar_small")
    })

    it("applies the x-small size modifier", () => {
        const wrapper = mount(SldsProgressBar, {
            props: { current: 25, total: 100, xSmall: true },
        })
        expect(wrapper.find(".slds-progress-bar").classes()).toContain("slds-progress-bar_x-small")
    })

    it("sets the inline width style based on progress", () => {
        const wrapper = mount(SldsProgressBar, {
            props: { current: 33, total: 100 },
        })
        const value = wrapper.find(".slds-progress-bar__value")
        expect((value.element as HTMLElement).getAttribute("style")).toContain("width: 33%")
    })

    it("renders an assistive text node with the percentage", () => {
        const wrapper = mount(SldsProgressBar, {
            props: { current: 25, total: 100 },
        })
        expect(wrapper.find(".slds-assistive-text").text()).toContain("25")
    })

    it("has no axe-detectable accessibility violations in its default state", async () => {
        const wrapper = mount(SldsProgressBar, {
            props: { current: 25, total: 100, label: "Loading" },
            attachTo: document.body,
        })
        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)
        wrapper.unmount()
    })
})
