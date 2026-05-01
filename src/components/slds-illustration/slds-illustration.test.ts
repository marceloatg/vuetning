import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsIllustration from "./slds-illustration.vue"

describe("SldsIllustration", () => {
    it("renders the illustration container with heading and message", () => {
        const wrapper = mount(SldsIllustration, {
            props: { heading: "No data", message: "Nothing here yet" },
        })

        expect(wrapper.find(".slds-illustration").exists()).toBe(true)
        expect(wrapper.text()).toContain("No data")
        expect(wrapper.text()).toContain("Nothing here yet")
    })

    it("applies the small size class by default", () => {
        const wrapper = mount(SldsIllustration, {
            props: { heading: "x", message: "y" },
        })
        expect(wrapper.classes()).toContain("slds-illustration_small")
    })

    it("applies the xSmall size class when xSmall is true", () => {
        const wrapper = mount(SldsIllustration, {
            props: { heading: "x", message: "y", xSmall: true },
        })
        expect(wrapper.classes()).toContain("slds-illustration_x-small")
    })

    it("applies the small size class when small is true", () => {
        const wrapper = mount(SldsIllustration, {
            props: { heading: "x", message: "y", small: true },
        })
        expect(wrapper.classes()).toContain("slds-illustration_small")
    })

    it("applies the large size class when large is true", () => {
        const wrapper = mount(SldsIllustration, {
            props: { heading: "x", message: "y", large: true },
        })
        expect(wrapper.classes()).toContain("slds-illustration_large")
    })

    it("renders the image when src is provided", () => {
        const wrapper = mount(SldsIllustration, {
            props: { heading: "x", message: "y", src: "/foo.svg", alternativeText: "alt" },
        })
        const image = wrapper.find("img")
        expect(image.exists()).toBe(true)
        expect(image.attributes("src")).toBe("/foo.svg")
        expect(image.attributes("alt")).toBe("alt")
    })

    it("renders the default slot when src is missing", () => {
        const wrapper = mount(SldsIllustration, {
            props: { heading: "x", message: "y" },
            slots: { default: "<svg class=\"custom-svg\"></svg>" },
        })
        expect(wrapper.find(".custom-svg").exists()).toBe(true)
    })

    it("has no axe-detectable accessibility violations in its default state", async () => {
        const wrapper = mount(SldsIllustration, {
            props: { heading: "No data", message: "Nothing here yet" },
            attachTo: document.body,
        })
        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)
        wrapper.unmount()
    })
})
