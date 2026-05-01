import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsCounter from "./slds-counter.vue"

describe("SldsCounter", () => {
    it("renders the counter input with decrement/increment buttons", () => {
        const wrapper = mount(SldsCounter, {
            props: { label: "Quantity", modelValue: 5 },
        })

        expect(wrapper.find("input.slds-input_counter").exists()).toBe(true)
        expect(wrapper.findAll("button").length).toBeGreaterThanOrEqual(2)
    })

    it("renders the input as a native number input", () => {
        const wrapper = mount(SldsCounter, {
            props: { label: "Quantity", modelValue: 5 },
        })

        expect(wrapper.find("input.slds-input_counter").attributes("type")).toBe("number")
    })

    it("reflects the modelValue prop on the input", () => {
        const wrapper = mount(SldsCounter, {
            props: { label: "Quantity", modelValue: 7 },
        })

        const input = wrapper.find("input.slds-input_counter")
        expect((input.element as HTMLInputElement).value).toBe("7")
    })

    it("disables both buttons when disabled is true", () => {
        const wrapper = mount(SldsCounter, {
            props: { label: "Quantity", modelValue: 5, disabled: true },
        })
        const buttons = wrapper.findAll("button")
        for (const button of buttons) {
            expect(button.attributes("disabled")).toBeDefined()
        }
    })

    it("disables the underlying input when disabled is true", () => {
        const wrapper = mount(SldsCounter, {
            props: { label: "Quantity", modelValue: 5, disabled: true },
        })

        expect(wrapper.find("input.slds-input_counter").attributes("disabled")).toBeDefined()
    })

    it("emits update:modelValue with value-1 when the decrement button is clicked", async () => {
        const wrapper = mount(SldsCounter, {
            props: { label: "Quantity", modelValue: 5 },
        })

        await wrapper.findAll("button")[0].trigger("click")
        const emitted = wrapper.emitted("update:modelValue")
        expect(emitted).toBeTruthy()
        expect(emitted![0]).toEqual([4])
    })

    it("emits update:modelValue with value+1 when the increment button is clicked", async () => {
        const wrapper = mount(SldsCounter, {
            props: { label: "Quantity", modelValue: 5 },
        })

        await wrapper.findAll("button")[1].trigger("click")
        const emitted = wrapper.emitted("update:modelValue")
        expect(emitted).toBeTruthy()
        expect(emitted![0]).toEqual([6])
    })

    it("respects custom step on increment", async () => {
        const wrapper = mount(SldsCounter, {
            props: { label: "Quantity", modelValue: 5, step: 3 },
        })

        await wrapper.findAll("button")[1].trigger("click")
        expect(wrapper.emitted("update:modelValue")![0]).toEqual([8])
    })

    it("respects custom step on decrement", async () => {
        const wrapper = mount(SldsCounter, {
            props: { label: "Quantity", modelValue: 10, step: 4 },
        })

        await wrapper.findAll("button")[0].trigger("click")
        expect(wrapper.emitted("update:modelValue")![0]).toEqual([6])
    })

    it("does not emit when decrement would go below min", async () => {
        const wrapper = mount(SldsCounter, {
            props: { label: "Quantity", modelValue: 0, min: 0 },
        })

        await wrapper.findAll("button")[0].trigger("click")
        expect(wrapper.emitted("update:modelValue")).toBeFalsy()
    })

    it("emits when decrement keeps the value at min", async () => {
        const wrapper = mount(SldsCounter, {
            props: { label: "Quantity", modelValue: 1, min: 0 },
        })

        await wrapper.findAll("button")[0].trigger("click")
        expect(wrapper.emitted("update:modelValue")![0]).toEqual([0])
    })

    it("does not emit when increment would go above max", async () => {
        const wrapper = mount(SldsCounter, {
            props: { label: "Quantity", modelValue: 10, max: 10 },
        })

        await wrapper.findAll("button")[1].trigger("click")
        expect(wrapper.emitted("update:modelValue")).toBeFalsy()
    })

    it("emits when increment keeps the value at max", async () => {
        const wrapper = mount(SldsCounter, {
            props: { label: "Quantity", modelValue: 9, max: 10 },
        })

        await wrapper.findAll("button")[1].trigger("click")
        expect(wrapper.emitted("update:modelValue")![0]).toEqual([10])
    })

    it("treats string min/max props the same as numeric ones", async () => {
        const wrapper = mount(SldsCounter, {
            props: { label: "Quantity", modelValue: 5, min: "5", max: "5" },
        })

        await wrapper.findAll("button")[0].trigger("click")
        await wrapper.findAll("button")[1].trigger("click")
        expect(wrapper.emitted("update:modelValue")).toBeFalsy()
    })

    it("emits update:modelValue with the typed numeric value when the user types", async () => {
        const wrapper = mount(SldsCounter, {
            props: { label: "Quantity", modelValue: 0 },
        })

        const input = wrapper.find("input.slds-input_counter")
        ;(input.element as HTMLInputElement).value = "42"
        await input.trigger("input")

        const emitted = wrapper.emitted("update:modelValue")
        expect(emitted).toBeTruthy()
        expect(emitted![0]).toEqual([42])
    })

    it("calls input.select() when the input is clicked", async () => {
        const wrapper = mount(SldsCounter, {
            props: { label: "Quantity", modelValue: 123 },
            attachTo: document.body,
        })

        const input = wrapper.find("input.slds-input_counter")
        const element = input.element as HTMLInputElement

        let selectCalled = false
        const originalSelect = element.select
        element.select = function (...args: unknown[]) {
            selectCalled = true
            return originalSelect.apply(this, args as [])
        }

        await input.trigger("click")
        expect(selectCalled).toBe(true)

        wrapper.unmount()
    })

    it("renders the label text from the label prop", () => {
        const wrapper = mount(SldsCounter, {
            props: { label: "Quantity", modelValue: 0 },
        })

        expect(wrapper.text()).toContain("Quantity")
    })

    it("renders a help slot when provided", () => {
        const wrapper = mount(SldsCounter, {
            props: { label: "Quantity", modelValue: 0 },
            slots: { help: "<span class='custom-help'>helper</span>" },
        })

        expect(wrapper.find(".custom-help").exists()).toBe(true)
    })

    it("forwards a tooltip slot down to the form-element wrapper", () => {
        const wrapper = mount(SldsCounter, {
            props: { label: "Quantity", modelValue: 0 },
            slots: { tooltip: "<span class='custom-tip'>?</span>" },
        })

        // form-element renders the tooltip lazily on hover, so we verify the
        // tooltip slot is wired into the form-element wrapper.
        const formElement = wrapper.findComponent({ name: "SldsFormElement" })
        expect(formElement.exists()).toBe(true)
        expect(formElement.vm.$slots.tooltip).toBeDefined()
    })

    it("forwards data-* attributes to the form element wrapper", () => {
        const wrapper = mount(SldsCounter, {
            props: { label: "Quantity", modelValue: 0 },
            attrs: { "data-testid": "my-counter" },
        })

        expect(wrapper.attributes("data-testid")).toBe("my-counter")
    })

    it("forwards non-data attributes onto the input element", () => {
        const wrapper = mount(SldsCounter, {
            props: { label: "Quantity", modelValue: 0 },
            attrs: { autocomplete: "off" },
        })

        const input = wrapper.find("input.slds-input_counter")
        expect(input.attributes("autocomplete")).toBe("off")
    })

    it("has no axe-detectable accessibility violations when given a label", async () => {
        const wrapper = mount(SldsCounter, {
            props: { label: "Count", modelValue: 0 },
            attachTo: document.body,
        })

        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)

        wrapper.unmount()
    })
})
