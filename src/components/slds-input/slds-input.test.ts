import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import { nextTick } from "vue"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsInput from "./slds-input.vue"

describe("SldsInput", () => {
    it("renders an <input> inside the form element wrapper", () => {
        const wrapper = mount(SldsInput, {
            props: { label: "Name" },
        })

        const input = wrapper.find("input.slds-input")
        expect(input.exists()).toBe(true)
    })

    it("forwards the placeholder and disabled props to the underlying input", () => {
        const wrapper = mount(SldsInput, {
            props: { label: "Name", placeholder: "Type here", disabled: true },
        })

        const input = wrapper.find("input.slds-input")
        expect(input.attributes("placeholder")).toBe("Type here")
        expect(input.attributes("disabled")).toBeDefined()
    })

    it("renders the label text from the label prop", () => {
        const wrapper = mount(SldsInput, {
            props: { label: "Full name" },
        })

        expect(wrapper.text()).toContain("Full name")
    })

    it("renders a custom label slot when provided", () => {
        const wrapper = mount(SldsInput, {
            props: { label: "Ignored" },
            slots: { label: "<span>Custom Label</span>" },
        })

        expect(wrapper.text()).toContain("Custom Label")
    })

    it("forwards a tooltip slot down to the form-element wrapper", () => {
        const wrapper = mount(SldsInput, {
            props: { label: "Name" },
            slots: { tooltip: "<span class='custom-tooltip'>Tip</span>" },
        })

        // The form-element only renders the tooltip popover lazily on hover, so
        // we assert the tooltip wiring by confirming the form-element exposes a
        // tooltip slot it received from slds-input.
        const formElement = wrapper.findComponent({ name: "SldsFormElement" })
        expect(formElement.exists()).toBe(true)
        expect(formElement.vm.$slots.tooltip).toBeDefined()
    })

    it("renders a help slot when provided", () => {
        const wrapper = mount(SldsInput, {
            props: { label: "Name" },
            slots: { help: "<span class='custom-help'>Help text</span>" },
        })

        expect(wrapper.find(".custom-help").exists()).toBe(true)
    })

    it("renders an error slot when provided", () => {
        const wrapper = mount(SldsInput, {
            props: { label: "Name", errors: [{ message: "Required" }] as any },
            slots: { error: "<span class='custom-error'>Error!</span>" },
        })

        expect(wrapper.find(".custom-error").exists()).toBe(true)
    })

    it("emits update:modelValue when the user types", async () => {
        const wrapper = mount(SldsInput, {
            props: { label: "Name", modelValue: "" },
        })

        const input = wrapper.find("input.slds-input")
        ;(input.element as HTMLInputElement).value = "hi"
        await input.trigger("input")

        const emitted = wrapper.emitted("update:modelValue")
        expect(emitted).toBeTruthy()
        expect(emitted![0]).toEqual(["hi"])
    })

    it("reflects the modelValue prop on the input element", () => {
        const wrapper = mount(SldsInput, {
            props: { label: "Name", modelValue: "hello" },
        })

        const input = wrapper.find("input.slds-input")
        expect((input.element as HTMLInputElement).value).toBe("hello")
    })

    it("forwards the maxlength prop to the underlying input", () => {
        const wrapper = mount(SldsInput, {
            props: { label: "Name", maxlength: 10 },
        })

        const input = wrapper.find("input.slds-input")
        expect(input.attributes("maxlength")).toBe("10")
    })

    it("renders the clear button when modelValue is non-empty and not disabled", () => {
        const wrapper = mount(SldsInput, {
            props: { label: "Name", modelValue: "abc" },
        })

        expect(wrapper.find("[title=\"Clear\"]").exists()).toBe(true)
    })

    it("does not render the clear button when modelValue is empty", () => {
        const wrapper = mount(SldsInput, {
            props: { label: "Name", modelValue: "" },
        })

        expect(wrapper.find("[title=\"Clear\"]").exists()).toBe(false)
    })

    it("does not render the clear button when disabled, even with a value", () => {
        const wrapper = mount(SldsInput, {
            props: { label: "Name", modelValue: "abc", disabled: true },
        })

        expect(wrapper.find("[title=\"Clear\"]").exists()).toBe(false)
    })

    it("emits update:modelValue with null when the clear button is clicked", async () => {
        const wrapper = mount(SldsInput, {
            props: { label: "Name", modelValue: "abc" },
            attachTo: document.body,
        })

        await wrapper.find("[title=\"Clear\"]").trigger("click")

        const emitted = wrapper.emitted("update:modelValue")
        expect(emitted).toBeTruthy()
        expect(emitted![0]).toEqual([null])

        wrapper.unmount()
    })

    it("renders the spinner when showSpinner is true", () => {
        const wrapper = mount(SldsInput, {
            props: { label: "Name", showSpinner: true },
        })

        expect(wrapper.find(".slds-input__spinner").exists()).toBe(true)
    })

    it("does not render the spinner when showSpinner is false", () => {
        const wrapper = mount(SldsInput, {
            props: { label: "Name" },
        })

        expect(wrapper.find(".slds-input__spinner").exists()).toBe(false)
    })

    it("emits update:modelValue with null when Escape is pressed and there is a value", async () => {
        const wrapper = mount(SldsInput, {
            props: { label: "Name", modelValue: "abc" },
        })

        await wrapper.find("input.slds-input").trigger("keyup", { key: "Escape" })

        const emitted = wrapper.emitted("update:modelValue")
        expect(emitted).toBeTruthy()
        expect(emitted![0]).toEqual([null])
    })

    it("emits close when Escape is pressed and modelValue is null", async () => {
        const wrapper = mount(SldsInput, {
            props: { label: "Name", modelValue: null },
        })

        await wrapper.find("input.slds-input").trigger("keyup", { key: "Escape" })

        expect(wrapper.emitted("close")).toBeTruthy()
    })

    it("ignores non-Escape keyup events", async () => {
        const wrapper = mount(SldsInput, {
            props: { label: "Name", modelValue: "abc" },
        })

        await wrapper.find("input.slds-input").trigger("keyup", { key: "Enter" })

        expect(wrapper.emitted("update:modelValue")).toBeFalsy()
        expect(wrapper.emitted("close")).toBeFalsy()
    })

    it("forwards data-* attributes to the form element wrapper", () => {
        const wrapper = mount(SldsInput, {
            props: { label: "Name" },
            attrs: { "data-testid": "my-input" },
        })

        expect(wrapper.attributes("data-testid")).toBe("my-input")
    })

    it("forwards non-data attributes (e.g. autocomplete) onto the input element", () => {
        const wrapper = mount(SldsInput, {
            props: { label: "Name" },
            attrs: { autocomplete: "off" },
        })

        const input = wrapper.find("input.slds-input")
        expect(input.attributes("autocomplete")).toBe("off")
    })

    it("renders the required indicator on the form element when required is true", () => {
        const wrapper = mount(SldsInput, {
            props: { label: "Name", required: true },
        })

        // slds-form-element renders a required marker (asterisk).
        expect(wrapper.html()).toContain("*")
    })

    it("focuses the input after the clear button is clicked", async () => {
        const wrapper = mount(SldsInput, {
            props: { label: "Name", modelValue: "abc" },
            attachTo: document.body,
        })

        await wrapper.find("[title=\"Clear\"]").trigger("click")
        await nextTick()

        const input = wrapper.find("input.slds-input").element as HTMLInputElement
        expect(document.activeElement).toBe(input)

        wrapper.unmount()
    })

    it("has no axe-detectable accessibility violations in its default state", async () => {
        const wrapper = mount(SldsInput, {
            props: { label: "Name" },
            attachTo: document.body,
        })

        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)

        wrapper.unmount()
    })
})
