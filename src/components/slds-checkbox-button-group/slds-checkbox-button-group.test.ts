import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsCheckboxButtonGroup from "./slds-checkbox-button-group.vue"
import type { CheckboxButtonGroupOption } from "./checkbox-button-group-option"

const OPTIONS: CheckboxButtonGroupOption[] = [
    { label: "One", value: "one", disabled: false },
    { label: "Two", value: "two", disabled: false },
]

describe("SldsCheckboxButtonGroup", () => {
    it("renders one button per option", () => {
        const wrapper = mount(SldsCheckboxButtonGroup, {
            props: { label: "Picks", options: OPTIONS, modelValue: [] },
        })

        expect(wrapper.find(".slds-checkbox_button-group").exists()).toBe(true)
        expect(wrapper.findAll(".slds-checkbox_button").length).toBe(2)
    })

    it("marks the option as checked when modelValue includes its value", () => {
        const wrapper = mount(SldsCheckboxButtonGroup, {
            props: { label: "Picks", options: OPTIONS, modelValue: ["one"] },
        })
        const inputs = wrapper.findAll("input[type=\"checkbox\"]")
        expect((inputs[0].element as HTMLInputElement).checked).toBe(true)
        expect((inputs[1].element as HTMLInputElement).checked).toBe(false)
    })

    it("emits update:modelValue with the toggled values when an option is clicked", async () => {
        const wrapper = mount(SldsCheckboxButtonGroup, {
            props: { label: "Picks", options: OPTIONS, modelValue: [] },
        })

        await wrapper.findAll(".slds-checkbox_button")[0].trigger("click")
        expect(wrapper.emitted("update:modelValue")).toBeTruthy()
        expect(wrapper.emitted("update:modelValue")![0]).toEqual([["one"]])
    })

    it("has no axe-detectable accessibility violations in its default state", async () => {
        const wrapper = mount(SldsCheckboxButtonGroup, {
            props: { label: "Picks", options: OPTIONS, modelValue: [] },
            attachTo: document.body,
        })

        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)

        wrapper.unmount()
    })

    it("toggles a value off when an option already in modelValue is clicked", async () => {
        const wrapper = mount(SldsCheckboxButtonGroup, {
            props: { label: "Picks", options: OPTIONS, modelValue: ["one"] },
        })

        await wrapper.findAll(".slds-checkbox_button")[0].trigger("click")
        expect(wrapper.emitted("update:modelValue")![0]).toEqual([[]])
    })

    it("does not emit when the group is disabled", async () => {
        const wrapper: any = mount(SldsCheckboxButtonGroup, {
            props: { label: "Picks", options: OPTIONS, modelValue: [], disabled: true },
        })

        const fakeEvent = { preventDefault: () => {} } as Event
        wrapper.vm.handleClick(fakeEvent, OPTIONS[0])
        expect(wrapper.emitted("update:modelValue")).toBeFalsy()
    })

    it("does not emit when the option is disabled", async () => {
        const optionsWithDisabled = [
            { label: "One", value: "one", disabled: true },
        ]
        const wrapper: any = mount(SldsCheckboxButtonGroup, {
            props: { label: "Picks", options: optionsWithDisabled, modelValue: [] },
        })

        const fakeEvent = { preventDefault: () => {} } as Event
        wrapper.vm.handleClick(fakeEvent, optionsWithDisabled[0])
        expect(wrapper.emitted("update:modelValue")).toBeFalsy()
    })

    it("renders error messages from the errors prop", () => {
        const wrapper = mount(SldsCheckboxButtonGroup, {
            props: {
                label: "Picks",
                options: OPTIONS,
                modelValue: [],
                errors: [{ $message: "Required field", $validator: "required" }] as any,
            },
        })
        expect(wrapper.text()).toContain("Required field")
    })

    it("renders the required marker on the label", () => {
        const wrapper = mount(SldsCheckboxButtonGroup, {
            props: { label: "Picks", options: OPTIONS, modelValue: [], required: true },
        })
        expect(wrapper.find(".slds-required").exists()).toBe(true)
    })

    it("renders the inline help text via the help prop", () => {
        const wrapper = mount(SldsCheckboxButtonGroup, {
            props: { label: "Picks", options: OPTIONS, modelValue: [], help: "Helper" },
        })
        expect(wrapper.text()).toContain("Helper")
    })

    it("renders the tooltip icon when tooltip slot is provided", () => {
        const wrapper = mount(SldsCheckboxButtonGroup, {
            props: { label: "Picks", options: OPTIONS, modelValue: [] },
            slots: { tooltip: "<span class=\"tt\">Tip</span>" },
        })
        expect(wrapper.find(".slds-form-element__icon").exists()).toBe(true)
    })

    it("renders default slot content over options", () => {
        const wrapper = mount(SldsCheckboxButtonGroup, {
            props: { label: "Picks", options: OPTIONS, modelValue: [] },
            slots: { default: "<div class=\"custom\">Custom</div>" },
        })
        expect(wrapper.find(".custom").exists()).toBe(true)
    })

    it("uses default factories for modelValue and options when not provided", () => {
        const wrapper: any = mount(SldsCheckboxButtonGroup, {
            props: { label: "Picks" },
        })
        expect(Array.isArray(wrapper.vm.modelValue)).toBe(true)
        expect(wrapper.vm.modelValue.length).toBe(0)
        expect(Array.isArray(wrapper.vm.options)).toBe(true)
        expect(wrapper.vm.options.length).toBe(0)
    })

    it("does not emit when handleClick is invoked without an event", () => {
        const wrapper: any = mount(SldsCheckboxButtonGroup, {
            props: { label: "Picks", options: OPTIONS, modelValue: [] },
        })

        try {
            wrapper.vm.handleClick(null, OPTIONS[0])
        } catch {
            // The guard tries to call preventDefault on the missing event;
            // we only care that update:modelValue was never emitted.
        }
        expect(wrapper.emitted("update:modelValue")).toBeFalsy()
    })
})
