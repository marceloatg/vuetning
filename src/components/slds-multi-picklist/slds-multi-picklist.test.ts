import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsMultiPicklist from "./slds-multi-picklist.vue"
import type { DropdownOption } from "../slds-dropdown/dropdown-option"

const OPTIONS: DropdownOption[] = [
    { label: "Red", value: "red" },
    { label: "Green", value: "green" },
    { label: "Blue", value: "blue" },
]

describe("SldsMultiPicklist", () => {
    it("renders the combobox container with the faux input", () => {
        const wrapper = mount(SldsMultiPicklist, {
            props: { label: "Colors", options: OPTIONS, modelValue: [] },
        })

        expect(wrapper.find(".slds-combobox").exists()).toBe(true)
        expect(wrapper.find(".slds-input_faux").exists()).toBe(true)
    })

    it("displays the placeholder when no value is selected", () => {
        const wrapper = mount(SldsMultiPicklist, {
            props: { label: "Colors", options: OPTIONS, modelValue: [], placeholder: "Pick colors" },
        })
        expect(wrapper.find(".slds-input_faux").text()).toContain("Pick colors")
    })

    it("renders no pills when modelValue is empty", () => {
        const wrapper = mount(SldsMultiPicklist, {
            props: { label: "Colors", options: OPTIONS, modelValue: [] },
        })

        expect(wrapper.findAll(".slds-pill").length).toBe(0)
    })

    it("displays singular readable value with one option selected", () => {
        const wrapper = mount(SldsMultiPicklist, {
            props: { label: "Colors", options: OPTIONS, modelValue: ["red"] },
        })

        expect(wrapper.find(".slds-input_faux").text()).toContain("1 Option Selected")
    })

    it("displays plural readable value with multiple options selected", () => {
        const wrapper = mount(SldsMultiPicklist, {
            props: { label: "Colors", options: OPTIONS, modelValue: ["red", "green"] },
        })

        expect(wrapper.find(".slds-input_faux").text()).toContain("2 Options Selected")
    })

    it("renders one pill per selected option", () => {
        const wrapper = mount(SldsMultiPicklist, {
            props: { label: "Colors", options: OPTIONS, modelValue: ["red", "green"] },
        })

        expect(wrapper.findAll(".slds-pill").length).toBe(2)
    })

    it("opens the dropdown when the input is clicked", async () => {
        const wrapper = mount(SldsMultiPicklist, {
            props: { label: "Colors", options: OPTIONS, modelValue: [] },
            attachTo: document.body,
        })

        await wrapper.find(".slds-input_faux").trigger("click")
        expect(wrapper.find(".slds-dropdown").exists()).toBe(true)

        wrapper.unmount()
    })

    it("toggles the dropdown closed when the input is clicked again", async () => {
        const wrapper = mount(SldsMultiPicklist, {
            props: { label: "Colors", options: OPTIONS, modelValue: [] },
            attachTo: document.body,
        })

        await wrapper.find(".slds-input_faux").trigger("click")
        await wrapper.find(".slds-input_faux").trigger("click")
        expect(wrapper.find(".slds-dropdown").exists()).toBe(false)

        wrapper.unmount()
    })

    it("does not open the dropdown when disabled", async () => {
        const wrapper = mount(SldsMultiPicklist, {
            props: { label: "Colors", options: OPTIONS, modelValue: [], disabled: true },
            attachTo: document.body,
        })

        await wrapper.find(".slds-input_faux").trigger("click")
        expect(wrapper.find(".slds-dropdown").exists()).toBe(false)

        wrapper.unmount()
    })

    it("emits update:modelValue with the option appended when an option is selected", async () => {
        const wrapper = mount(SldsMultiPicklist, {
            props: { label: "Colors", options: OPTIONS, modelValue: [] },
            attachTo: document.body,
        })

        await wrapper.find(".slds-input_faux").trigger("click")
        const options = wrapper.findAll(".slds-listbox__item")
        await options[0].trigger("click")

        expect(wrapper.emitted("update:modelValue")![0]).toEqual([["red"]])

        wrapper.unmount()
    })

    it("accumulates selections across re-renders", async () => {
        const wrapper = mount(SldsMultiPicklist, {
            props: { label: "Colors", options: OPTIONS, modelValue: ["red"] },
            attachTo: document.body,
        })

        await wrapper.find(".slds-input_faux").trigger("click")
        const options = wrapper.findAll(".slds-listbox__item")
        await options[1].trigger("click")

        expect(wrapper.emitted("update:modelValue")![0]).toEqual([["red", "green"]])

        wrapper.unmount()
    })

    it("toggles a value off when the same option is selected twice (no duplicate)", async () => {
        const wrapper = mount(SldsMultiPicklist, {
            props: { label: "Colors", options: OPTIONS, modelValue: ["red"] },
            attachTo: document.body,
        })

        await wrapper.find(".slds-input_faux").trigger("click")
        const options = wrapper.findAll(".slds-listbox__item")
        await options[0].trigger("click")

        // Already-selected option should be removed (toggle), not duplicated.
        expect(wrapper.emitted("update:modelValue")![0]).toEqual([[]])

        wrapper.unmount()
    })

    it("does not remove a non-removable option when re-selected", async () => {
        const optionsWithLock: DropdownOption[] = [
            { label: "Red", value: "red", nonRemovable: true },
            { label: "Green", value: "green" },
        ]
        const wrapper = mount(SldsMultiPicklist, {
            props: { label: "Colors", options: optionsWithLock, modelValue: ["red"] },
            attachTo: document.body,
        })

        await wrapper.find(".slds-input_faux").trigger("click")
        const options = wrapper.findAll(".slds-listbox__item")
        await options[0].trigger("click")

        expect(wrapper.emitted("update:modelValue")).toBeFalsy()

        wrapper.unmount()
    })

    it("ignores option clicks without a value", async () => {
        const wrapper: any = mount(SldsMultiPicklist, {
            props: { label: "Colors", options: OPTIONS, modelValue: [] },
            attachTo: document.body,
        })

        wrapper.vm.selectOption({ label: "No value" })
        expect(wrapper.emitted("update:modelValue")).toBeFalsy()

        wrapper.unmount()
    })

    it("emits update:modelValue with the option removed when a pill is removed", async () => {
        const wrapper = mount(SldsMultiPicklist, {
            props: { label: "Colors", options: OPTIONS, modelValue: ["red"] },
            attachTo: document.body,
        })

        const pill = wrapper.find(".slds-pill")
        expect(pill.exists()).toBe(true)
        await pill.find(".slds-pill__remove").trigger("click")

        expect(wrapper.emitted("update:modelValue")).toBeTruthy()
        expect(wrapper.emitted("update:modelValue")![0]).toEqual([[]])

        wrapper.unmount()
    })

    it("removes only the targeted pill from a multi-selection", async () => {
        const wrapper = mount(SldsMultiPicklist, {
            props: { label: "Colors", options: OPTIONS, modelValue: ["red", "green", "blue"] },
            attachTo: document.body,
        })

        const pills = wrapper.findAll(".slds-pill")
        expect(pills.length).toBe(3)

        await pills[1].find(".slds-pill__remove").trigger("click")

        expect(wrapper.emitted("update:modelValue")![0]).toEqual([["red", "blue"]])

        wrapper.unmount()
    })

    it("opens the dropdown via ArrowDown keypress", async () => {
        const wrapper = mount(SldsMultiPicklist, {
            props: { label: "Colors", options: OPTIONS, modelValue: [] },
            attachTo: document.body,
        })

        await wrapper.find(".slds-combobox").trigger("keyup.down")
        expect(wrapper.find(".slds-dropdown").exists()).toBe(true)

        wrapper.unmount()
    })

    it("opens the dropdown via ArrowUp keypress", async () => {
        const wrapper = mount(SldsMultiPicklist, {
            props: { label: "Colors", options: OPTIONS, modelValue: [] },
            attachTo: document.body,
        })

        await wrapper.find(".slds-combobox").trigger("keyup.up")
        expect(wrapper.find(".slds-dropdown").exists()).toBe(true)

        wrapper.unmount()
    })

    it("opens the dropdown via Enter keypress", async () => {
        const wrapper = mount(SldsMultiPicklist, {
            props: { label: "Colors", options: OPTIONS, modelValue: [] },
            attachTo: document.body,
        })

        await wrapper.find(".slds-combobox").trigger("keyup.enter")
        expect(wrapper.find(".slds-dropdown").exists()).toBe(true)

        wrapper.unmount()
    })

    it("selects the focused option when Enter is pressed", async () => {
        const wrapper = mount(SldsMultiPicklist, {
            props: { label: "Colors", options: OPTIONS, modelValue: [] },
            attachTo: document.body,
        })

        await wrapper.find(".slds-combobox").trigger("keyup.down") // open + focus first
        await wrapper.find(".slds-combobox").trigger("keyup.down") // -> Green
        await wrapper.find(".slds-combobox").trigger("keyup.enter")

        expect(wrapper.emitted("update:modelValue")![0]).toEqual([["green"]])

        wrapper.unmount()
    })

    it("navigates upward and selects with Enter", async () => {
        const wrapper = mount(SldsMultiPicklist, {
            props: { label: "Colors", options: OPTIONS, modelValue: [] },
            attachTo: document.body,
        })

        await wrapper.find(".slds-combobox").trigger("keyup.down")
        await wrapper.find(".slds-combobox").trigger("keyup.up")
        await wrapper.find(".slds-combobox").trigger("keyup.enter")

        expect(wrapper.emitted("update:modelValue")![0]).toEqual([["blue"]])

        wrapper.unmount()
    })

    it("closes the dropdown on Escape", async () => {
        const wrapper = mount(SldsMultiPicklist, {
            props: { label: "Colors", options: OPTIONS, modelValue: [] },
            attachTo: document.body,
        })

        await wrapper.find(".slds-input_faux").trigger("click")
        expect(wrapper.find(".slds-dropdown").exists()).toBe(true)

        await wrapper.find(".slds-input_faux").trigger("keyup.esc")
        expect(wrapper.find(".slds-dropdown").exists()).toBe(false)

        wrapper.unmount()
    })

    it("ignores Escape when dropdown is already closed", async () => {
        const wrapper = mount(SldsMultiPicklist, {
            props: { label: "Colors", options: OPTIONS, modelValue: [] },
            attachTo: document.body,
        })

        await wrapper.find(".slds-input_faux").trigger("keyup.esc")
        expect(wrapper.find(".slds-dropdown").exists()).toBe(false)

        wrapper.unmount()
    })

    it("toggles the focus class via focus/blur", async () => {
        const wrapper = mount(SldsMultiPicklist, {
            props: { label: "Colors", options: OPTIONS, modelValue: [] },
            attachTo: document.body,
        })

        await wrapper.find(".slds-input_faux").trigger("focus")
        expect(wrapper.find(".slds-input_faux").classes()).toContain("slds-has-focus")

        await wrapper.find(".slds-input_faux").trigger("blur")
        expect(wrapper.find(".slds-input_faux").classes()).not.toContain("slds-has-focus")

        wrapper.unmount()
    })

    it("does not change focused state on focus when disabled", async () => {
        const wrapper = mount(SldsMultiPicklist, {
            props: { label: "Colors", options: OPTIONS, modelValue: [], disabled: true },
            attachTo: document.body,
        })

        await wrapper.find(".slds-input_faux").trigger("focus")
        expect(wrapper.find(".slds-input_faux").classes()).not.toContain("slds-has-focus")

        wrapper.unmount()
    })

    it("renders the required marker on the label", () => {
        const wrapper = mount(SldsMultiPicklist, {
            props: { label: "Colors", options: OPTIONS, modelValue: [], required: true },
        })

        expect(wrapper.find(".slds-required").exists()).toBe(true)
    })

    it("renders error messages from the errors prop", () => {
        const wrapper = mount(SldsMultiPicklist, {
            props: {
                label: "Colors",
                options: OPTIONS,
                modelValue: [],
                errors: [{ $message: "Required field", $validator: "required" }] as any,
            },
        })

        expect(wrapper.text()).toContain("Required field")
    })

    it("renders with an empty options array", () => {
        const wrapper = mount(SldsMultiPicklist, {
            props: { label: "Colors", options: [], modelValue: [] },
            attachTo: document.body,
        })

        expect(wrapper.find(".slds-combobox").exists()).toBe(true)

        wrapper.unmount()
    })

    it("does not select anything when Enter is pressed with empty options", async () => {
        const wrapper = mount(SldsMultiPicklist, {
            props: { label: "Colors", options: [], modelValue: [] },
            attachTo: document.body,
        })

        await wrapper.find(".slds-combobox").trigger("keyup.down")
        await wrapper.find(".slds-combobox").trigger("keyup.enter")

        expect(wrapper.emitted("update:modelValue")).toBeFalsy()

        wrapper.unmount()
    })

    it("applies a size modifier class when a size prop is set", () => {
        const wrapper = mount(SldsMultiPicklist, {
            props: { label: "Colors", options: OPTIONS, modelValue: [], large: true },
        })

        expect(wrapper.find(".slds-combobox_container").classes()).toContain("slds-size_large")
    })

    it("hides the dropdown on click outside", async () => {
        const wrapper: any = mount(SldsMultiPicklist, {
            props: { label: "Colors", options: OPTIONS, modelValue: [] },
            attachTo: document.body,
        })

        await wrapper.find(".slds-input_faux").trigger("click")
        expect(wrapper.find(".slds-dropdown").exists()).toBe(true)

        wrapper.vm.handleClickOutside()
        await wrapper.vm.$nextTick()
        expect(wrapper.find(".slds-dropdown").exists()).toBe(false)

        wrapper.unmount()
    })

    it("does not handle option click when picklist itself is disabled", async () => {
        const wrapper: any = mount(SldsMultiPicklist, {
            props: { label: "Colors", options: OPTIONS, modelValue: [], disabled: true },
            attachTo: document.body,
        })

        wrapper.vm.handleClickOption(OPTIONS[0])
        expect(wrapper.emitted("update:modelValue")).toBeFalsy()

        wrapper.unmount()
    })

    it("does not handle option click when option is disabled", async () => {
        const optionsWithDisabled: DropdownOption[] = [
            { label: "Red", value: "red", disabled: true },
            { label: "Green", value: "green" },
        ]
        const wrapper: any = mount(SldsMultiPicklist, {
            props: { label: "Colors", options: optionsWithDisabled, modelValue: [] },
            attachTo: document.body,
        })

        wrapper.vm.handleClickOption(optionsWithDisabled[0])
        expect(wrapper.emitted("update:modelValue")).toBeFalsy()

        wrapper.unmount()
    })

    it("has no axe-detectable accessibility violations in its default state", async () => {
        const wrapper = mount(SldsMultiPicklist, {
            props: { label: "Colors", options: OPTIONS, modelValue: [] },
            attachTo: document.body,
        })

        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)

        wrapper.unmount()
    })

    it("has no axe-detectable accessibility violations when the dropdown is open", async () => {
        const wrapper = mount(SldsMultiPicklist, {
            props: { label: "Colors", options: OPTIONS, modelValue: [] },
            attachTo: document.body,
        })

        await wrapper.find(".slds-input_faux").trigger("click")
        expect(wrapper.find("[role=\"listbox\"]").exists()).toBe(true)

        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)

        wrapper.unmount()
    })

    it("applies xx-small size modifier", () => {
        const wrapper = mount(SldsMultiPicklist, {
            props: { label: "Colors", options: OPTIONS, modelValue: [], xxSmall: true },
        })
        expect(wrapper.find(".slds-combobox_container").classes()).toContain("slds-size_xx-small")
    })

    it("applies x-small size modifier", () => {
        const wrapper = mount(SldsMultiPicklist, {
            props: { label: "Colors", options: OPTIONS, modelValue: [], xSmall: true },
        })
        expect(wrapper.find(".slds-combobox_container").classes()).toContain("slds-size_x-small")
    })

    it("applies small size modifier", () => {
        const wrapper = mount(SldsMultiPicklist, {
            props: { label: "Colors", options: OPTIONS, modelValue: [], small: true },
        })
        expect(wrapper.find(".slds-combobox_container").classes()).toContain("slds-size_small")
    })

    it("applies medium size modifier", () => {
        const wrapper = mount(SldsMultiPicklist, {
            props: { label: "Colors", options: OPTIONS, modelValue: [], medium: true },
        })
        expect(wrapper.find(".slds-combobox_container").classes()).toContain("slds-size_medium")
    })

    it("applies x-large size modifier", () => {
        const wrapper = mount(SldsMultiPicklist, {
            props: { label: "Colors", options: OPTIONS, modelValue: [], xLarge: true },
        })
        expect(wrapper.find(".slds-combobox_container").classes()).toContain("slds-size_x-large")
    })

    it("applies xx-large size modifier", () => {
        const wrapper = mount(SldsMultiPicklist, {
            props: { label: "Colors", options: OPTIONS, modelValue: [], xxLarge: true },
        })
        expect(wrapper.find(".slds-combobox_container").classes()).toContain("slds-size_xx-large")
    })

    it("applies the input-value class when modelValue is non-empty", () => {
        const wrapper = mount(SldsMultiPicklist, {
            props: { label: "Colors", options: OPTIONS, modelValue: ["red"] },
        })
        expect(wrapper.find(".slds-input_faux").classes()).toContain("slds-combobox__input-value")
    })

    it("forwards data- attributes to the form element", () => {
        const wrapper = mount(SldsMultiPicklist, {
            props: { label: "Colors", options: OPTIONS, modelValue: [] },
            attrs: { "data-cy": "picker" },
        })
        expect(wrapper.find("[data-cy=\"picker\"]").exists()).toBe(true)
    })

    it("renders the tooltip icon when tooltip slot is provided", () => {
        const wrapper = mount(SldsMultiPicklist, {
            props: { label: "Colors", options: OPTIONS, modelValue: [] },
            slots: { tooltip: "<span class=\"tt\">Tip</span>" },
        })
        expect(wrapper.find(".slds-form-element__icon").exists()).toBe(true)
    })

    it("does not toggle blur focused state when disabled", async () => {
        const wrapper: any = mount(SldsMultiPicklist, {
            props: { label: "Colors", options: OPTIONS, modelValue: [], disabled: true },
            attachTo: document.body,
        })

        wrapper.vm.isFocused = true
        await wrapper.find(".slds-input_faux").trigger("blur")
        expect(wrapper.vm.isFocused).toBe(true)

        wrapper.unmount()
    })

    it("focuses the first non-disabled, non-heading option when nothing is selected", async () => {
        const optionsWithHeading: DropdownOption[] = [
            { label: "Header", value: "h", isHeading: true },
            { label: "Disabled", value: "d", disabled: true },
            { label: "Real", value: "r" },
        ]
        const wrapper: any = mount(SldsMultiPicklist, {
            props: { label: "Colors", options: optionsWithHeading, modelValue: [] },
            attachTo: document.body,
        })

        wrapper.vm.setFocusedOption()
        expect(wrapper.vm.focusedOption?.value).toBe("r")

        wrapper.unmount()
    })

    it("focuses the first selected option when modelValue is non-empty", async () => {
        const wrapper: any = mount(SldsMultiPicklist, {
            props: { label: "Colors", options: OPTIONS, modelValue: ["green"] },
            attachTo: document.body,
        })

        wrapper.vm.setFocusedOption()
        expect(wrapper.vm.focusedOption?.value).toBe("green")

        wrapper.unmount()
    })
})
