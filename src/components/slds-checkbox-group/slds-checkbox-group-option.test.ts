import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsCheckboxGroupOption from "./slds-checkbox-group-option.vue"

describe("SldsCheckboxGroupOption", () => {
    it("renders the checkbox container with the label", () => {
        const wrapper = mount(SldsCheckboxGroupOption, {
            props: { label: "Send emails" },
        })

        expect(wrapper.find(".slds-checkbox").exists()).toBe(true)
        expect(wrapper.find("input[type=\"checkbox\"]").exists()).toBe(true)
        expect(wrapper.text()).toContain("Send emails")
    })

    it("disables the input when disabled is true", () => {
        const wrapper = mount(SldsCheckboxGroupOption, {
            props: { label: "Send emails", disabled: true },
        })
        expect(wrapper.find("input").attributes("disabled")).toBeDefined()
    })


    it("has no axe-detectable accessibility violations in its default state", async () => {
        const wrapper = mount(SldsCheckboxGroupOption, {
            props: { label: "Send emails" },
            attachTo: document.body,
        })

        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)

        wrapper.unmount()
    })
})
