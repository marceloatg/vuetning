import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsWideRadioGroup from "./slds-wide-radio-group.vue"
import type { WideRadioGroupOption } from "./wide-radio-group-option"

const OPTIONS: WideRadioGroupOption[] = [
    { label: "Public", value: "public", description: "Anyone can see this" },
    { label: "Private", value: "private", description: "Only you" },
]

describe("SldsWideRadioGroup", () => {
    it("renders a fieldset with one radio per option", () => {
        const wrapper = mount(SldsWideRadioGroup, {
            props: { label: "Visibility", options: OPTIONS, modelValue: "public" },
        })

        expect(wrapper.find("fieldset.slds-form-element").exists()).toBe(true)
        expect(wrapper.findAll("input[type=\"radio\"]").length).toBe(2)
    })

    it("applies the slds-has-error class when error is true", () => {
        const wrapper = mount(SldsWideRadioGroup, {
            props: { label: "Visibility", options: OPTIONS, error: true },
        })
        expect(wrapper.find("fieldset").classes()).toContain("slds-has-error")
    })

    it("emits update:modelValue when an option is selected", async () => {
        const wrapper = mount(SldsWideRadioGroup, {
            props: { label: "Visibility", options: OPTIONS, modelValue: "public" },
        })

        await wrapper.findAll("input[type=\"radio\"]")[1].trigger("input")
        expect(wrapper.emitted("update:modelValue")).toBeTruthy()
        expect(wrapper.emitted("update:modelValue")![0]).toEqual(["private"])
    })

    it("renders the required asterisk when required is true", () => {
        const wrapper = mount(SldsWideRadioGroup, {
            props: { label: "Visibility", options: OPTIONS, required: true },
        })

        expect(wrapper.find(".slds-required").exists()).toBe(true)
    })

    it("does not render the required asterisk when required is false", () => {
        const wrapper = mount(SldsWideRadioGroup, {
            props: { label: "Visibility", options: OPTIONS },
        })

        expect(wrapper.find(".slds-required").exists()).toBe(false)
    })

    it("disables all radios when disabled is true", () => {
        const wrapper = mount(SldsWideRadioGroup, {
            props: { label: "Visibility", options: OPTIONS, disabled: true },
        })

        const inputs = wrapper.findAll("input[type=\"radio\"]")
        for (const input of inputs) {
            expect(input.attributes("disabled")).toBeDefined()
        }
    })

    it("renders the option description when provided", () => {
        const wrapper = mount(SldsWideRadioGroup, {
            props: { label: "Visibility", options: OPTIONS },
        })

        expect(wrapper.text()).toContain("Anyone can see this")
        expect(wrapper.text()).toContain("Only you")
    })

    it("does not render description block when option has none", () => {
        const wrapper = mount(SldsWideRadioGroup, {
            props: {
                label: "Visibility",
                options: [{ label: "X", value: "x" }] as WideRadioGroupOption[],
            },
        })

        expect(wrapper.findAll(".slds-form-element__description").length).toBe(0)
    })

    it("renders the error slot when error is true", () => {
        const wrapper = mount(SldsWideRadioGroup, {
            props: { label: "Visibility", options: OPTIONS, error: true },
            slots: { error: "<span data-testid='err'>Bad</span>" },
        })

        expect(wrapper.find("[data-testid='err']").exists()).toBe(true)
    })

    it("checks the input matching modelValue", () => {
        const wrapper = mount(SldsWideRadioGroup, {
            props: { label: "Visibility", options: OPTIONS, modelValue: "private" },
        })

        const inputs = wrapper.findAll("input[type=\"radio\"]")
        expect((inputs[0].element as HTMLInputElement).checked).toBe(false)
        expect((inputs[1].element as HTMLInputElement).checked).toBe(true)
    })

    it("has no axe-detectable accessibility violations in its default state", async () => {
        const wrapper = mount(SldsWideRadioGroup, {
            props: { label: "Visibility", options: OPTIONS, modelValue: "public" },
            attachTo: document.body,
        })
        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)
        wrapper.unmount()
    })
})
