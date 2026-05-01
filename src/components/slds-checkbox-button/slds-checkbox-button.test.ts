import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsCheckboxButton from "./slds-checkbox-button.vue"

describe("SldsCheckboxButton", () => {
    it("renders the checkbox button label", () => {
        const wrapper = mount(SldsCheckboxButton, {
            props: { label: "Active", assistiveText: "Toggle active" },
        })

        expect(wrapper.find(".slds-checkbox-button").exists()).toBe(true)
        expect(wrapper.find("input[type=\"checkbox\"]").exists()).toBe(true)
    })

    it("applies the checked modifier when modelValue is true", () => {
        const wrapper = mount(SldsCheckboxButton, {
            props: { label: "Active", assistiveText: "Toggle active", modelValue: true },
        })
        expect(wrapper.find(".slds-checkbox-button").classes()).toContain("slds-checkbox-button_is-checked")
    })

    it("emits update:modelValue when the input is changed", async () => {
        const wrapper = mount(SldsCheckboxButton, {
            props: { label: "Active", assistiveText: "Toggle active", modelValue: false },
        })

        await wrapper.find("input[type=\"checkbox\"]").trigger("input")
        expect(wrapper.emitted("update:modelValue")).toBeTruthy()
    })

    it("has no axe-detectable accessibility violations in its default state", async () => {
        const wrapper = mount(SldsCheckboxButton, {
            props: { label: "Active", assistiveText: "Toggle active" },
            attachTo: document.body,
        })

        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)

        wrapper.unmount()
    })

    it("does not emit update:modelValue when disabled", async () => {
        const wrapper = mount(SldsCheckboxButton, {
            props: { label: "Active", assistiveText: "Toggle active", disabled: true, modelValue: false },
        })

        await wrapper.find("input[type=\"checkbox\"]").trigger("input")
        expect(wrapper.emitted("update:modelValue")).toBeFalsy()
    })

    it("applies the disabled modifier when disabled is true", () => {
        const wrapper = mount(SldsCheckboxButton, {
            props: { label: "Active", assistiveText: "Toggle active", disabled: true },
        })
        expect(wrapper.find(".slds-checkbox-button").classes()).toContain("slds-checkbox-button_is-disabled")
    })

    it("does not pass label to the form element when inline is true", () => {
        const wrapper = mount(SldsCheckboxButton, {
            props: { label: "Active", assistiveText: "Toggle active", inline: true },
        })
        // inline hides the form-element label; no <label class="slds-form-element__label"> with the text
        expect(wrapper.find(".slds-form-element__label").exists()).toBe(false)
    })

    it("renders the checked icon when modelValue is true", () => {
        const wrapper = mount(SldsCheckboxButton, {
            props: { label: "Active", assistiveText: "Toggle active", modelValue: true, iconChecked: "utility:check" },
        })
        expect(wrapper.find(".slds-icon").exists()).toBe(true)
    })

    it("renders the unchecked icon when modelValue is false", () => {
        const wrapper = mount(SldsCheckboxButton, {
            props: { label: "Active", assistiveText: "Toggle active", modelValue: false, iconUnchecked: "utility:add" },
        })
        expect(wrapper.find(".slds-icon").exists()).toBe(true)
    })

    it("renders the assistive text", () => {
        const wrapper = mount(SldsCheckboxButton, {
            props: { label: "Active", assistiveText: "Toggle active" },
        })
        expect(wrapper.text()).toContain("Toggle active")
    })

    it("forwards non-data attributes to the input", () => {
        const wrapper = mount(SldsCheckboxButton, {
            props: { label: "Active", assistiveText: "Toggle active" },
            attrs: { name: "field-name" },
        })
        expect(wrapper.find("input[type=\"checkbox\"]").attributes("name")).toBe("field-name")
    })

    it("renders error messages from the errors prop", () => {
        const wrapper = mount(SldsCheckboxButton, {
            props: {
                label: "Active",
                assistiveText: "Toggle active",
                errors: [{ $message: "Required field", $validator: "required" }] as any,
            },
        })
        expect(wrapper.text()).toContain("Required field")
    })

    it("renders inline help via the help prop", () => {
        const wrapper = mount(SldsCheckboxButton, {
            props: { label: "Active", assistiveText: "Toggle active", help: "Helper" },
        })
        expect(wrapper.text()).toContain("Helper")
    })

    it("renders the required marker on the label", () => {
        const wrapper = mount(SldsCheckboxButton, {
            props: { label: "Active", assistiveText: "Toggle active", required: true },
        })
        expect(wrapper.find(".slds-required").exists()).toBe(true)
    })
})
