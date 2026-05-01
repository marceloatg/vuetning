import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsRadioGroup from "./slds-radio-group.vue"
import type { Option } from "../commons/option"

const OPTIONS: Option[] = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
]

describe("SldsRadioGroup", () => {
    it("renders one radio per option", () => {
        const wrapper = mount(SldsRadioGroup, {
            props: { label: "Confirm", options: OPTIONS, modelValue: "yes" },
        })
        expect(wrapper.findAll("input[type=\"radio\"]").length).toBe(2)
    })

    it("checks the input matching modelValue", () => {
        const wrapper = mount(SldsRadioGroup, {
            props: { label: "Confirm", options: OPTIONS, modelValue: "yes" },
        })
        const inputs = wrapper.findAll("input[type=\"radio\"]")
        expect((inputs[0].element as HTMLInputElement).checked).toBe(true)
        expect((inputs[1].element as HTMLInputElement).checked).toBe(false)
    })

    it("emits update:modelValue when an option is clicked", async () => {
        const wrapper = mount(SldsRadioGroup, {
            props: { label: "Confirm", options: OPTIONS, modelValue: "yes" },
        })

        await wrapper.findAll(".slds-radio")[1].trigger("click")
        expect(wrapper.emitted("update:modelValue")).toBeTruthy()
        expect(wrapper.emitted("update:modelValue")![0]).toEqual(["no"])
    })

    it("has no axe-detectable accessibility violations in its default state", async () => {
        const wrapper = mount(SldsRadioGroup, {
            props: { label: "Confirm", options: OPTIONS, modelValue: "yes" },
            attachTo: document.body,
        })

        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)

        wrapper.unmount()
    })

    it("forwards rightToLeft to the form element direction", () => {
        const wrapper = mount(SldsRadioGroup, {
            props: { label: "Confirm", options: OPTIONS, modelValue: "yes", rightToLeft: true },
        })
        expect(wrapper.find("[dir=\"rtl\"]").exists()).toBe(true)
    })

    it("uses ltr direction by default", () => {
        const wrapper = mount(SldsRadioGroup, {
            props: { label: "Confirm", options: OPTIONS, modelValue: "yes" },
        })
        expect(wrapper.find("[dir=\"ltr\"]").exists()).toBe(true)
    })

    it("disables every option when disabled is true", () => {
        const wrapper = mount(SldsRadioGroup, {
            props: { label: "Confirm", options: OPTIONS, modelValue: "yes", disabled: true },
        })

        const inputs = wrapper.findAll("input[type=\"radio\"]")
        for (const input of inputs) {
            expect(input.attributes("disabled")).toBeDefined()
        }
    })

    it("renders the required marker on the label", () => {
        const wrapper = mount(SldsRadioGroup, {
            props: { label: "Confirm", options: OPTIONS, modelValue: "yes", required: true },
        })
        expect(wrapper.find(".slds-required").exists()).toBe(true)
    })

    it("renders error messages from the errors prop", () => {
        const wrapper = mount(SldsRadioGroup, {
            props: {
                label: "Confirm",
                options: OPTIONS,
                modelValue: "yes",
                errors: [{ $message: "Required field", $validator: "required" }] as any,
            },
        })
        expect(wrapper.text()).toContain("Required field")
    })

    it("renders the tooltip icon when tooltip prop is provided", () => {
        const wrapper = mount(SldsRadioGroup, {
            props: { label: "Confirm", options: OPTIONS, modelValue: "yes", tooltip: "Helper" },
        })
        expect(wrapper.find(".slds-form-element__icon").exists()).toBe(true)
    })

    it("renders the tooltip icon when tooltip slot is provided", () => {
        const wrapper = mount(SldsRadioGroup, {
            props: { label: "Confirm", options: OPTIONS, modelValue: "yes" },
            slots: { tooltip: "<span class=\"tt\">Tip</span>" },
        })
        expect(wrapper.find(".slds-form-element__icon").exists()).toBe(true)
    })

    it("renders label slot content over the prop", () => {
        const wrapper = mount(SldsRadioGroup, {
            props: { options: OPTIONS, modelValue: "yes" },
            slots: { label: "<span class=\"lbl\">Custom</span>" },
        })
        expect(wrapper.find(".lbl").exists()).toBe(true)
    })

    it("renders default slot content over options", () => {
        const wrapper = mount(SldsRadioGroup, {
            props: { label: "Confirm", options: OPTIONS, modelValue: "yes" },
            slots: { default: "<div class=\"custom\">Custom</div>" },
        })
        expect(wrapper.find(".custom").exists()).toBe(true)
    })

    it("does not emit when a disabled option is clicked", async () => {
        const wrapper = mount(SldsRadioGroup, {
            props: { label: "Confirm", options: OPTIONS, modelValue: "yes", disabled: true },
        })

        await wrapper.findAll(".slds-radio")[1].trigger("click")
        expect(wrapper.emitted("update:modelValue")).toBeFalsy()
    })

    it("forwards data- attributes to the form element", () => {
        const wrapper = mount(SldsRadioGroup, {
            props: { label: "Confirm", options: OPTIONS, modelValue: "yes" },
            attrs: { "data-cy": "radio-group" },
        })
        expect(wrapper.find("[data-cy=\"radio-group\"]").exists()).toBe(true)
    })

    it("forwards the class attribute to the form element", () => {
        const wrapper = mount(SldsRadioGroup, {
            props: { label: "Confirm", options: OPTIONS, modelValue: "yes" },
            attrs: { class: "custom-cls" },
        })
        expect(wrapper.find(".custom-cls").exists()).toBe(true)
    })

    it("uses default factories for options and errors when not provided", () => {
        const wrapper: any = mount(SldsRadioGroup, {
            props: { label: "Confirm", modelValue: null },
        })
        expect(Array.isArray(wrapper.vm.options)).toBe(true)
        expect(wrapper.vm.options.length).toBe(0)
        expect(Array.isArray(wrapper.vm.errors)).toBe(true)
        expect(wrapper.vm.errors.length).toBe(0)
    })

    it("ignores non-data, non-class attributes when computing formElementAttributes", () => {
        const wrapper: any = mount(SldsRadioGroup, {
            props: { label: "Confirm", options: OPTIONS, modelValue: "yes" },
            attrs: { id: "ignored-id", "data-test": "kept" },
        })

        const keys = Object.keys(wrapper.vm.formElementAttributes)
        expect(keys).toContain("data-test")
        expect(keys).not.toContain("id")
    })
})
