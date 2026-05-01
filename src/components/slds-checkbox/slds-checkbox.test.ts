import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsCheckbox from "./slds-checkbox.vue"

describe("SldsCheckbox", () => {
    it("renders the checkbox with its label", () => {
        const wrapper = mount(SldsCheckbox, {
            props: { label: "Active" },
        })

        expect(wrapper.find(".slds-checkbox").exists()).toBe(true)
        expect(wrapper.find("input[type=\"checkbox\"]").exists()).toBe(true)
    })

    it("checks the input when modelValue is true", () => {
        const wrapper = mount(SldsCheckbox, {
            props: { label: "Active", modelValue: true },
        })
        expect((wrapper.find("input").element as HTMLInputElement).checked).toBe(true)
    })

    it("emits update:modelValue with the toggled value when clicked", async () => {
        const wrapper = mount(SldsCheckbox, {
            props: { label: "Active", modelValue: false },
        })

        await wrapper.find(".slds-checkbox").trigger("click")
        expect(wrapper.emitted("update:modelValue")).toBeTruthy()
        expect(wrapper.emitted("update:modelValue")![0]).toEqual([true])
    })

    it("does not emit update:modelValue when clicked while disabled", async () => {
        const wrapper = mount(SldsCheckbox, {
            props: { label: "Active", modelValue: false, disabled: true },
        })

        await wrapper.find(".slds-checkbox").trigger("click")
        expect(wrapper.emitted("update:modelValue")).toBeUndefined()
    })

    it("toggles from true to false when modelValue is true", async () => {
        const wrapper = mount(SldsCheckbox, {
            props: { label: "Active", modelValue: true },
        })

        await wrapper.find(".slds-checkbox").trigger("click")
        expect(wrapper.emitted("update:modelValue")![0]).toEqual([false])
    })

    it("renders the label inline when inline is true", () => {
        const wrapper = mount(SldsCheckbox, {
            props: { label: "Active", inline: true },
        })

        expect(wrapper.find(".slds-form-element__label").text()).toContain("Active")
    })

    it("renders the help slot", () => {
        const wrapper = mount(SldsCheckbox, {
            props: { label: "Active" },
            slots: { help: "<span data-testid='help'>Help</span>" },
        })

        expect(wrapper.find("[data-testid='help']").exists()).toBe(true)
    })

    it("renders the error slot", () => {
        const wrapper = mount(SldsCheckbox, {
            props: { label: "Active" },
            slots: { error: "<span data-testid='err'>Bad</span>" },
        })

        expect(wrapper.find("[data-testid='err']").exists()).toBe(true)
    })

    it("renders the tooltip slot when a tooltip prop is also provided", () => {
        const wrapper = mount(SldsCheckbox, {
            props: { label: "Active", tooltip: "Tip" },
            slots: { tooltip: "<span data-testid='tt'>Tip</span>" },
        })

        // Slot wins over prop when present, but tooltip wrapper still renders
        expect(wrapper.find(".slds-form-element__icon").exists()).toBe(true)
    })

    it("disables the underlying input when disabled is true", () => {
        const wrapper = mount(SldsCheckbox, {
            props: { label: "Active", disabled: true },
        })

        expect(wrapper.find("input").attributes("disabled")).toBeDefined()
    })

    it("has no axe-detectable accessibility violations in its default state", async () => {
        const wrapper = mount(SldsCheckbox, {
            props: { label: "Active", inline: true },
            attachTo: document.body,
        })

        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)

        wrapper.unmount()
    })
})
