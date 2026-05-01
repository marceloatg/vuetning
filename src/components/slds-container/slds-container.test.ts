import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsContainer from "./slds-container.vue"

describe("SldsContainer", () => {
    it("renders a container div with the medium size by default", () => {
        const wrapper = mount(SldsContainer, {
            slots: { default: "Content" },
        })
        expect(wrapper.classes()).toContain("slds-container_medium")
    })

    it("applies the large modifier when large is true", () => {
        const wrapper = mount(SldsContainer, {
            props: { large: true },
            slots: { default: "Content" },
        })
        expect(wrapper.classes()).toContain("slds-container_large")
    })

    it("applies the small modifier when small is true", () => {
        const wrapper = mount(SldsContainer, {
            props: { small: true },
            slots: { default: "Content" },
        })
        expect(wrapper.classes()).toContain("slds-container_small")
    })

    it("applies the x-large modifier when xLarge is true", () => {
        const wrapper = mount(SldsContainer, {
            props: { xLarge: true },
            slots: { default: "Content" },
        })
        expect(wrapper.classes()).toContain("slds-container_x-large")
    })


    it("has no axe-detectable accessibility violations in its default state", async () => {
        const wrapper = mount(SldsContainer, {
            slots: { default: "Content" },
            attachTo: document.body,
        })
        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)
        wrapper.unmount()
    })
})
