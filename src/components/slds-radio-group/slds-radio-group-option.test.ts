import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsRadioGroupOption from "./slds-radio-group-option.vue"

describe("SldsRadioGroupOption", () => {
    it("renders the radio with its label", () => {
        const wrapper = mount(SldsRadioGroupOption, {
            props: { label: "Yes", value: "yes" },
        })

        expect(wrapper.find(".slds-radio").exists()).toBe(true)
        expect(wrapper.text()).toContain("Yes")
    })

    it("checks the input when modelValue equals value", () => {
        const wrapper = mount(SldsRadioGroupOption, {
            props: { label: "Yes", value: "yes", modelValue: "yes" },
        })
        expect((wrapper.find("input").element as HTMLInputElement).checked).toBe(true)
    })

    it("emits update:modelValue with its value when clicked", async () => {
        const wrapper = mount(SldsRadioGroupOption, {
            props: { label: "Yes", value: "yes", modelValue: "no" },
        })

        await wrapper.find("input").trigger("change")
        expect(wrapper.emitted("update:modelValue")).toBeTruthy()
        expect(wrapper.emitted("update:modelValue")![0]).toEqual(["yes"])
    })

    it("has no axe-detectable accessibility violations in its default state", async () => {
        const wrapper = mount(SldsRadioGroupOption, {
            props: { label: "Yes", value: "yes" },
            attachTo: document.body,
        })

        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)

        wrapper.unmount()
    })
})
