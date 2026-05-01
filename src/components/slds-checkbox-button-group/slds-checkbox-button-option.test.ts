import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsCheckboxButtonOption from "./slds-checkbox-button-option.vue"

describe("SldsCheckboxButtonOption", () => {
    it("renders the checkbox button with the label", () => {
        const wrapper = mount(SldsCheckboxButtonOption, {
            props: { label: "Toggle me" },
        })

        expect(wrapper.find(".slds-checkbox_button").exists()).toBe(true)
        expect(wrapper.text()).toContain("Toggle me")
    })

    it("applies the selected modifier when checked is true", () => {
        const wrapper = mount(SldsCheckboxButtonOption, {
            props: { label: "Toggle me", checked: true },
        })
        expect(wrapper.find("label").classes()).toContain("slds-checkbox-button_is-selected")
    })


    it("has no axe-detectable accessibility violations in its default state", async () => {
        const wrapper = mount(SldsCheckboxButtonOption, {
            props: { label: "Toggle me" },
            attachTo: document.body,
        })

        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)

        wrapper.unmount()
    })
})
