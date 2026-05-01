import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsPicklist from "./slds-picklist.vue"
import type { DropdownOption } from "../slds-dropdown/dropdown-option"

const OPTIONS: DropdownOption[] = [
    { label: "Red", value: "red" },
    { label: "Green", value: "green" },
    { label: "Blue", value: "blue" },
]

describe("SldsPicklist", () => {
    it("renders the picklist container with the faux input", () => {
        const wrapper = mount(SldsPicklist, {
            props: { label: "Color", options: OPTIONS },
        })

        expect(wrapper.find(".slds-combobox").exists()).toBe(true)
        expect(wrapper.find(".slds-input_faux").exists()).toBe(true)
    })

    it("displays the placeholder when no value is selected", () => {
        const wrapper = mount(SldsPicklist, {
            props: { label: "Color", options: OPTIONS, placeholder: "Pick a color" },
        })

        expect(wrapper.find(".slds-input_faux").text()).toContain("Pick a color")
    })

    it("displays the selected option's label inside the input", () => {
        const wrapper = mount(SldsPicklist, {
            props: { label: "Color", options: OPTIONS, modelValue: "green" },
        })

        expect(wrapper.find(".slds-input_faux").text()).toContain("Green")
        expect(wrapper.find(".slds-input_faux").classes()).toContain("slds-combobox__input-value")
    })

    it("falls back to placeholder when modelValue does not match any option", () => {
        const wrapper = mount(SldsPicklist, {
            props: { label: "Color", options: OPTIONS, modelValue: "purple", placeholder: "Pick" },
        })

        expect(wrapper.find(".slds-input_faux").text()).toContain("Pick")
    })

    it("opens the dropdown when the input is clicked", async () => {
        const wrapper = mount(SldsPicklist, {
            props: { label: "Color", options: OPTIONS },
            attachTo: document.body,
        })

        expect(wrapper.find(".slds-dropdown").exists()).toBe(false)

        await wrapper.find(".slds-input_faux").trigger("click")
        expect(wrapper.find(".slds-dropdown").exists()).toBe(true)

        wrapper.unmount()
    })

    it("toggles the dropdown closed when the input is clicked again", async () => {
        const wrapper = mount(SldsPicklist, {
            props: { label: "Color", options: OPTIONS },
            attachTo: document.body,
        })

        await wrapper.find(".slds-input_faux").trigger("click")
        expect(wrapper.find(".slds-dropdown").exists()).toBe(true)

        await wrapper.find(".slds-input_faux").trigger("click")
        expect(wrapper.find(".slds-dropdown").exists()).toBe(false)

        wrapper.unmount()
    })

    it("does not open the dropdown when disabled", async () => {
        const wrapper = mount(SldsPicklist, {
            props: { label: "Color", options: OPTIONS, disabled: true },
            attachTo: document.body,
        })

        await wrapper.find(".slds-input_faux").trigger("click")
        expect(wrapper.find(".slds-dropdown").exists()).toBe(false)
        expect(wrapper.find(".slds-input_faux").classes()).toContain("slds-is-disabled")

        wrapper.unmount()
    })

    it("opens the dropdown via ArrowDown keypress", async () => {
        const wrapper = mount(SldsPicklist, {
            props: { label: "Color", options: OPTIONS },
            attachTo: document.body,
        })

        await wrapper.find(".slds-combobox").trigger("keyup.down")
        expect(wrapper.find(".slds-dropdown").exists()).toBe(true)

        wrapper.unmount()
    })

    it("opens the dropdown via ArrowUp keypress", async () => {
        const wrapper = mount(SldsPicklist, {
            props: { label: "Color", options: OPTIONS },
            attachTo: document.body,
        })

        await wrapper.find(".slds-combobox").trigger("keyup.up")
        expect(wrapper.find(".slds-dropdown").exists()).toBe(true)

        wrapper.unmount()
    })

    it("opens the dropdown via Enter keypress", async () => {
        const wrapper = mount(SldsPicklist, {
            props: { label: "Color", options: OPTIONS },
            attachTo: document.body,
        })

        await wrapper.find(".slds-combobox").trigger("keyup.enter")
        expect(wrapper.find(".slds-dropdown").exists()).toBe(true)

        wrapper.unmount()
    })

    it("emits update:modelValue and change when a value is selected via Enter", async () => {
        const wrapper = mount(SldsPicklist, {
            props: { label: "Color", options: OPTIONS, modelValue: "" },
            attachTo: document.body,
        })

        await wrapper.find(".slds-combobox").trigger("keyup.down")
        await wrapper.find(".slds-combobox").trigger("keyup.enter")

        expect(wrapper.emitted("update:modelValue")).toBeTruthy()
        expect(wrapper.emitted("update:modelValue")![0]).toEqual(["red"])
        expect(wrapper.emitted("change")).toBeTruthy()

        wrapper.unmount()
    })

    it("navigates options with ArrowDown and selects with Enter", async () => {
        const wrapper = mount(SldsPicklist, {
            props: { label: "Color", options: OPTIONS, modelValue: "" },
            attachTo: document.body,
        })

        await wrapper.find(".slds-combobox").trigger("keyup.down") // open + focus first
        await wrapper.find(".slds-combobox").trigger("keyup.down") // move to Green
        await wrapper.find(".slds-combobox").trigger("keyup.enter")

        expect(wrapper.emitted("update:modelValue")![0]).toEqual(["green"])

        wrapper.unmount()
    })

    it("navigates options with ArrowUp and selects with Enter", async () => {
        const wrapper = mount(SldsPicklist, {
            props: { label: "Color", options: OPTIONS, modelValue: "" },
            attachTo: document.body,
        })

        await wrapper.find(".slds-combobox").trigger("keyup.down") // open
        await wrapper.find(".slds-combobox").trigger("keyup.up")   // wraps to last
        await wrapper.find(".slds-combobox").trigger("keyup.enter")

        expect(wrapper.emitted("update:modelValue")![0]).toEqual(["blue"])

        wrapper.unmount()
    })

    it("does not emit change when re-selecting the same value", async () => {
        const wrapper = mount(SldsPicklist, {
            props: { label: "Color", options: OPTIONS, modelValue: "red" },
            attachTo: document.body,
        })

        await wrapper.find(".slds-combobox").trigger("keyup.down") // open, focuses selected
        await wrapper.find(".slds-combobox").trigger("keyup.enter")

        expect(wrapper.emitted("update:modelValue")).toBeTruthy()
        expect(wrapper.emitted("change")).toBeFalsy()

        wrapper.unmount()
    })

    it("closes the dropdown on Escape", async () => {
        const wrapper = mount(SldsPicklist, {
            props: { label: "Color", options: OPTIONS },
            attachTo: document.body,
        })

        await wrapper.find(".slds-input_faux").trigger("click")
        expect(wrapper.find(".slds-dropdown").exists()).toBe(true)

        await wrapper.find(".slds-input_faux").trigger("keyup.esc")
        expect(wrapper.find(".slds-dropdown").exists()).toBe(false)

        wrapper.unmount()
    })

    it("ignores Escape when dropdown is already closed", async () => {
        const wrapper = mount(SldsPicklist, {
            props: { label: "Color", options: OPTIONS },
            attachTo: document.body,
        })

        await wrapper.find(".slds-input_faux").trigger("keyup.esc")
        expect(wrapper.find(".slds-dropdown").exists()).toBe(false)

        wrapper.unmount()
    })

    it("emits update:modelValue when an option is clicked", async () => {
        const wrapper = mount(SldsPicklist, {
            props: { label: "Color", options: OPTIONS, modelValue: "" },
            attachTo: document.body,
        })

        await wrapper.find(".slds-input_faux").trigger("click")
        const options = wrapper.findAll(".slds-listbox__item")
        await options[1].trigger("click")

        expect(wrapper.emitted("update:modelValue")![0]).toEqual(["green"])

        wrapper.unmount()
    })

    it("does not emit when clicking a disabled option", async () => {
        const optionsWithDisabled: DropdownOption[] = [
            { label: "Red", value: "red", disabled: true },
            { label: "Green", value: "green" },
        ]
        const wrapper = mount(SldsPicklist, {
            props: { label: "Color", options: optionsWithDisabled, modelValue: "" },
            attachTo: document.body,
        })

        await wrapper.find(".slds-input_faux").trigger("click")
        const options = wrapper.findAll(".slds-listbox__item")
        await options[0].trigger("click")

        expect(wrapper.emitted("update:modelValue")).toBeFalsy()

        wrapper.unmount()
    })

    it("does not handle option click when picklist itself is disabled", async () => {
        const wrapper: any = mount(SldsPicklist, {
            props: { label: "Color", options: OPTIONS, disabled: true },
            attachTo: document.body,
        })

        wrapper.vm.handleClickOption(OPTIONS[0])
        expect(wrapper.emitted("update:modelValue")).toBeFalsy()

        wrapper.unmount()
    })

    it("closes the dropdown via blur on the input", async () => {
        const wrapper = mount(SldsPicklist, {
            props: { label: "Color", options: OPTIONS },
            attachTo: document.body,
        })

        await wrapper.find(".slds-input_faux").trigger("click")
        expect(wrapper.find(".slds-dropdown").exists()).toBe(true)

        await wrapper.find(".slds-input_faux").trigger("blur")
        expect(wrapper.find(".slds-dropdown").exists()).toBe(false)

        wrapper.unmount()
    })

    it("toggles the focus class via focus/blur", async () => {
        const wrapper = mount(SldsPicklist, {
            props: { label: "Color", options: OPTIONS },
            attachTo: document.body,
        })

        await wrapper.find(".slds-input_faux").trigger("focus")
        expect(wrapper.find(".slds-input_faux").classes()).toContain("slds-has-focus")

        await wrapper.find(".slds-input_faux").trigger("blur")
        expect(wrapper.find(".slds-input_faux").classes()).not.toContain("slds-has-focus")

        wrapper.unmount()
    })

    it("does not change focused state on focus when disabled", async () => {
        const wrapper = mount(SldsPicklist, {
            props: { label: "Color", options: OPTIONS, disabled: true },
            attachTo: document.body,
        })

        await wrapper.find(".slds-input_faux").trigger("focus")
        expect(wrapper.find(".slds-input_faux").classes()).not.toContain("slds-has-focus")

        wrapper.unmount()
    })

    it("renders the required marker on the label", () => {
        const wrapper = mount(SldsPicklist, {
            props: { label: "Color", options: OPTIONS, required: true },
        })

        expect(wrapper.find(".slds-required").exists()).toBe(true)
    })

    it("renders error messages from the errors prop", () => {
        const wrapper = mount(SldsPicklist, {
            props: {
                label: "Color",
                options: OPTIONS,
                errors: [{ $message: "Required field", $validator: "required" }] as any,
            },
        })

        expect(wrapper.text()).toContain("Required field")
    })

    it("renders with an empty options array", () => {
        const wrapper = mount(SldsPicklist, {
            props: { label: "Color", options: [] },
            attachTo: document.body,
        })

        expect(wrapper.find(".slds-combobox").exists()).toBe(true)

        wrapper.unmount()
    })

    it("does not select anything when Enter is pressed with empty options", async () => {
        const wrapper = mount(SldsPicklist, {
            props: { label: "Color", options: [] },
            attachTo: document.body,
        })

        await wrapper.find(".slds-combobox").trigger("keyup.down")
        await wrapper.find(".slds-combobox").trigger("keyup.enter")

        expect(wrapper.emitted("update:modelValue")).toBeFalsy()

        wrapper.unmount()
    })

    it("applies a size modifier class when a size prop is set", () => {
        const wrapper = mount(SldsPicklist, {
            props: { label: "Color", options: OPTIONS, small: true },
        })

        expect(wrapper.find(".slds-combobox_container").classes()).toContain("slds-size_small")
    })

    it("hides the dropdown on click outside", async () => {
        const wrapper: any = mount(SldsPicklist, {
            props: { label: "Color", options: OPTIONS },
            attachTo: document.body,
        })

        await wrapper.find(".slds-input_faux").trigger("click")
        expect(wrapper.find(".slds-dropdown").exists()).toBe(true)

        wrapper.vm.handleClickOutside()
        await wrapper.vm.$nextTick()
        expect(wrapper.find(".slds-dropdown").exists()).toBe(false)

        wrapper.unmount()
    })

    it("has no axe-detectable accessibility violations in its default state", async () => {
        const wrapper = mount(SldsPicklist, {
            props: { label: "Color", options: OPTIONS },
            attachTo: document.body,
        })

        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)

        wrapper.unmount()
    })

    it("has no axe-detectable accessibility violations when the dropdown is open", async () => {
        const wrapper = mount(SldsPicklist, {
            props: { label: "Color", options: OPTIONS },
            attachTo: document.body,
        })

        await wrapper.find(".slds-input_faux").trigger("click")
        expect(wrapper.find("[role=\"listbox\"]").exists()).toBe(true)

        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)

        wrapper.unmount()
    })

    it("applies xx-small size modifier", () => {
        const wrapper = mount(SldsPicklist, { props: { label: "Color", options: OPTIONS, xxSmall: true } })
        expect(wrapper.find(".slds-combobox_container").classes()).toContain("slds-size_xx-small")
    })

    it("applies x-small size modifier", () => {
        const wrapper = mount(SldsPicklist, { props: { label: "Color", options: OPTIONS, xSmall: true } })
        expect(wrapper.find(".slds-combobox_container").classes()).toContain("slds-size_x-small")
    })

    it("applies medium size modifier", () => {
        const wrapper = mount(SldsPicklist, { props: { label: "Color", options: OPTIONS, medium: true } })
        expect(wrapper.find(".slds-combobox_container").classes()).toContain("slds-size_medium")
    })

    it("applies large size modifier", () => {
        const wrapper = mount(SldsPicklist, { props: { label: "Color", options: OPTIONS, large: true } })
        expect(wrapper.find(".slds-combobox_container").classes()).toContain("slds-size_large")
    })

    it("applies x-large size modifier", () => {
        const wrapper = mount(SldsPicklist, { props: { label: "Color", options: OPTIONS, xLarge: true } })
        expect(wrapper.find(".slds-combobox_container").classes()).toContain("slds-size_x-large")
    })

    it("applies xx-large size modifier", () => {
        const wrapper = mount(SldsPicklist, { props: { label: "Color", options: OPTIONS, xxLarge: true } })
        expect(wrapper.find(".slds-combobox_container").classes()).toContain("slds-size_xx-large")
    })

    it("forwards data- attributes to the form element", () => {
        const wrapper = mount(SldsPicklist, {
            props: { label: "Color", options: OPTIONS },
            attrs: { "data-cy": "picker" },
        })
        expect(wrapper.find("[data-cy=\"picker\"]").exists()).toBe(true)
    })

    it("renders inline help via the help prop", () => {
        const wrapper = mount(SldsPicklist, {
            props: { label: "Color", options: OPTIONS, help: "Helper" },
        })
        expect(wrapper.text()).toContain("Helper")
    })

    it("renders the tooltip icon when tooltip slot is provided", () => {
        const wrapper = mount(SldsPicklist, {
            props: { label: "Color", options: OPTIONS },
            slots: { tooltip: "<span class=\"tt\">Tip</span>" },
        })
        expect(wrapper.find(".slds-form-element__icon").exists()).toBe(true)
    })

    it("does not toggle blur focused state when disabled", async () => {
        const wrapper: any = mount(SldsPicklist, {
            props: { label: "Color", options: OPTIONS, disabled: true },
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
        const wrapper: any = mount(SldsPicklist, {
            props: { label: "Color", options: optionsWithHeading },
            attachTo: document.body,
        })

        wrapper.vm.setFocusedOption()
        expect(wrapper.vm.focusedOption?.value).toBe("r")

        wrapper.unmount()
    })

    it("focuses the selected option when modelValue is set", async () => {
        const wrapper: any = mount(SldsPicklist, {
            props: { label: "Color", options: OPTIONS, modelValue: "green" },
            attachTo: document.body,
        })

        wrapper.vm.setFocusedOption()
        expect(wrapper.vm.focusedOption?.value).toBe("green")

        wrapper.unmount()
    })
})
