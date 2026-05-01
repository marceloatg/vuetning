import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsSpinnerContainer from "./slds-spinner-container.vue"

describe("SldsSpinnerContainer", () => {
    it("renders the spinner container", () => {
        const wrapper = mount(SldsSpinnerContainer, {
            slots: { default: "<div class='spinner'/>" },
        })
        expect(wrapper.classes()).toContain("slds-spinner_container")
    })

    it("applies the fixed modifier when fixed is true", () => {
        const wrapper = mount(SldsSpinnerContainer, {
            props: { fixed: true },
        })
        expect(wrapper.classes()).toContain("slds-is-fixed")
    })


    it("has no axe-detectable accessibility violations in its default state", async () => {
        const wrapper = mount(SldsSpinnerContainer, {
            slots: { default: "<div class='spinner'/>" },
            attachTo: document.body,
        })
        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)
        wrapper.unmount()
    })
})
