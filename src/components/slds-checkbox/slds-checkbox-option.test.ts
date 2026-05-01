import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsCheckboxOption from "./slds-checkbox-option.vue"

describe("SldsCheckboxOption", () => {
    it("renders the checkbox with the option label when inline", () => {
        const wrapper = mount(SldsCheckboxOption, {
            props: { option: "Active", inline: true },
        })

        expect(wrapper.find(".slds-checkbox").exists()).toBe(true)
        expect(wrapper.text()).toContain("Active")
    })

    it("checks the input when value is true", () => {
        const wrapper = mount(SldsCheckboxOption, {
            props: { option: "Active", value: true },
        })
        expect((wrapper.find("input").element as HTMLInputElement).checked).toBe(true)
    })


    it("has no axe-detectable accessibility violations in its default state", async () => {
        const wrapper = mount(SldsCheckboxOption, {
            props: { option: "Active", inline: true },
            attachTo: document.body,
        })

        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)

        wrapper.unmount()
    })
})
