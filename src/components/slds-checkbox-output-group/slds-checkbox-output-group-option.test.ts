import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsCheckboxOutputGroupOption from "./slds-checkbox-output-group-option.vue"

describe("SldsCheckboxOutputGroupOption", () => {
    it("renders the option container with the label", () => {
        const wrapper = mount(SldsCheckboxOutputGroupOption, {
            props: { label: "Active" },
        })

        expect(wrapper.find(".slds-checkbox").exists()).toBe(true)
        expect(wrapper.text()).toContain("Active")
    })

    it("uses the check icon when value is truthy", () => {
        const wrapper = mount(SldsCheckboxOutputGroupOption, {
            props: { label: "Active", value: true },
        })
        expect(wrapper.find(".slds-icon-utility-check").exists() || wrapper.find("[data-slds-svg-utility-check]").exists()).toBe(true)
    })


    it("has no axe-detectable accessibility violations in its default state", async () => {
        const wrapper = mount(SldsCheckboxOutputGroupOption, {
            props: { label: "Active" },
            attachTo: document.body,
        })
        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)
        wrapper.unmount()
    })
})
