import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsCheckboxToggle from "./slds-checkbox-toggle.vue"

describe("SldsCheckboxToggle", () => {
    it("renders the toggle with its label", () => {
        const wrapper = mount(SldsCheckboxToggle, {
            props: { label: "Active" },
        })

        expect(wrapper.find(".slds-checkbox_toggle").exists()).toBe(true)
        expect(wrapper.find("input[type=\"checkbox\"]").exists()).toBe(true)
    })

    it("checks the input when modelValue is true", () => {
        const wrapper = mount(SldsCheckboxToggle, {
            props: { label: "Active", modelValue: true },
        })
        expect((wrapper.find("input").element as HTMLInputElement).checked).toBe(true)
    })

    it("emits update:modelValue toggled from current value", async () => {
        const wrapper = mount(SldsCheckboxToggle, {
            props: { label: "Active", modelValue: false },
        })

        await wrapper.find("input[type=\"checkbox\"]").trigger("input")
        expect(wrapper.emitted("update:modelValue")).toBeTruthy()
        expect(wrapper.emitted("update:modelValue")![0]).toEqual([true])
    })

    it("emits update:modelValue=false when toggled from true", async () => {
        const wrapper = mount(SldsCheckboxToggle, {
            props: { label: "Active", modelValue: true },
        })

        await wrapper.find("input[type=\"checkbox\"]").trigger("input")
        expect(wrapper.emitted("update:modelValue")![0]).toEqual([false])
    })

    it("does not emit update:modelValue when disabled", async () => {
        const wrapper = mount(SldsCheckboxToggle, {
            props: { label: "Active", modelValue: false, disabled: true },
        })

        await wrapper.find("input[type=\"checkbox\"]").trigger("input")
        expect(wrapper.emitted("update:modelValue")).toBeUndefined()
    })

    it("forwards the disabled attribute to the underlying input", () => {
        const wrapper = mount(SldsCheckboxToggle, {
            props: { label: "Active", disabled: true },
        })

        expect(wrapper.find("input").attributes("disabled")).toBeDefined()
    })

    it("renders the active and inactive messages by default", () => {
        const wrapper = mount(SldsCheckboxToggle, {
            props: { label: "Active" },
        })

        expect(wrapper.find(".slds-checkbox_on").text()).toBe("Enabled")
        expect(wrapper.find(".slds-checkbox_off").text()).toBe("Disabled")
    })

    it("respects custom messageActive/messageInactive", () => {
        const wrapper = mount(SldsCheckboxToggle, {
            props: { label: "Active", messageActive: "On", messageInactive: "Off" },
        })

        expect(wrapper.find(".slds-checkbox_on").text()).toBe("On")
        expect(wrapper.find(".slds-checkbox_off").text()).toBe("Off")
    })

    it("hides messages when noMessage is true", () => {
        const wrapper = mount(SldsCheckboxToggle, {
            props: { label: "Active", noMessage: true },
        })

        expect(wrapper.find(".slds-checkbox_on").exists()).toBe(false)
        expect(wrapper.find(".slds-checkbox_off").exists()).toBe(false)
    })

    it("renders the inline label when inline is true", () => {
        const wrapper = mount(SldsCheckboxToggle, {
            props: { label: "Active", inline: true },
        })

        expect(wrapper.find(".slds-form-element__label").text()).toContain("Active")
    })

    it("renders the required asterisk when required and inline", () => {
        const wrapper = mount(SldsCheckboxToggle, {
            props: { label: "Active", inline: true, required: true },
        })

        expect(wrapper.find(".slds-required").exists()).toBe(true)
    })

    it("sets dir=rtl when rightToLeft is true", () => {
        const wrapper = mount(SldsCheckboxToggle, {
            props: { label: "Active", rightToLeft: true },
        })

        expect(wrapper.attributes("dir")).toBe("rtl")
    })

    it("renders a tooltip trigger when the tooltip slot is used", () => {
        const wrapper = mount(SldsCheckboxToggle, {
            props: { label: "Active" },
            slots: { tooltip: "<span>Tip</span>" },
        })

        expect(wrapper.find(".slds-form-element__icon").exists()).toBe(true)
    })

    it("has no axe-detectable accessibility violations in its default state", async () => {
        const wrapper = mount(SldsCheckboxToggle, {
            props: { label: "Active" },
            attachTo: document.body,
        })

        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)

        wrapper.unmount()
    })
})
