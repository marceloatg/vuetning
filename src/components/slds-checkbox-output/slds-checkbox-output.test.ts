import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsCheckboxOutput from "./slds-checkbox-output.vue"

describe("SldsCheckboxOutput", () => {
    it("renders the form element with the static check/uncheck icon", () => {
        const wrapper = mount(SldsCheckboxOutput, {
            props: { label: "Active", value: true },
        })

        expect(wrapper.find(".slds-form-element").exists()).toBe(true)
        expect(wrapper.find(".slds-form-element__static").exists()).toBe(true)
    })

    it("renders the unchecked icon when value is false", () => {
        const wrapper = mount(SldsCheckboxOutput, {
            props: { label: "Active", value: false },
        })
        expect(wrapper.find(".slds-form-element__static").exists()).toBe(true)
    })


    it("has no axe-detectable accessibility violations in its default state", async () => {
        const wrapper = mount(SldsCheckboxOutput, {
            props: { label: "Active", value: true },
            attachTo: document.body,
        })
        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)
        wrapper.unmount()
    })
})
