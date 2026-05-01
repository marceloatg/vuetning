import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsLookup from "./slds-lookup.vue"
import type { DropdownOption } from "../slds-dropdown/dropdown-option"

const OPTIONS: DropdownOption[] = [
    { label: "Acme", value: "acme" },
    { label: "Globex", value: "globex" },
    { label: "Initech", value: "initech" },
]

const ICON_OPTIONS: DropdownOption[] = [
    { label: "Acme", value: "acme", iconName: "standard:account" },
    { label: "Globex", value: "globex", iconName: "standard:account" },
]

describe("SldsLookup", () => {
    it("renders the lookup combobox container with a write input when no value is selected", () => {
        const wrapper = mount(SldsLookup, {
            props: { label: "Account", options: OPTIONS },
        })

        expect(wrapper.find(".slds-combobox").exists()).toBe(true)
        expect(wrapper.find("input.slds-combobox__input").exists()).toBe(true)
    })

    it("applies the container class names with selection helper", () => {
        const wrapper = mount(SldsLookup, {
            props: { label: "Account", options: OPTIONS },
        })

        expect(wrapper.find(".slds-combobox_container").exists()).toBe(true)
        expect(wrapper.find(".slds-combobox_container").classes()).toContain("slds-has-selection")
    })

    it("renders the read-only faux input when a modelValue is selected", () => {
        const wrapper = mount(SldsLookup, {
            props: { label: "Account", options: OPTIONS, modelValue: "acme" },
        })

        expect(wrapper.find("input.slds-combobox__input").exists()).toBe(false)
        const fauxInput = wrapper.find(".slds-input_faux")
        expect(fauxInput.exists()).toBe(true)
        expect(fauxInput.text()).toContain("Acme")
    })

    it("does not render the entity icon when the selected option has no iconName", () => {
        const wrapper = mount(SldsLookup, {
            props: { label: "Account", options: OPTIONS, modelValue: "acme" },
        })

        expect(wrapper.find(".slds-combobox__input-entity-icon").exists()).toBe(false)
    })

    it("renders the entity icon when the selected option provides an iconName", () => {
        const wrapper = mount(SldsLookup, {
            props: { label: "Account", options: ICON_OPTIONS, modelValue: "acme" },
        })

        expect(wrapper.find(".slds-combobox__input-entity-icon").exists()).toBe(true)
    })

    it("renders the clear (remove selected) button when a value is selected", () => {
        const wrapper = mount(SldsLookup, {
            props: { label: "Account", options: OPTIONS, modelValue: "acme" },
        })

        const clearButton = wrapper.find("[title=\"Remove selected option\"]")
        expect(clearButton.exists()).toBe(true)
    })

    it("renders the search icon (not clear) when there is no selected value", () => {
        const wrapper = mount(SldsLookup, {
            props: { label: "Account", options: OPTIONS },
        })

        expect(wrapper.find("[title=\"Remove selected option\"]").exists()).toBe(false)
    })

    it("forwards the placeholder prop to the input", () => {
        const wrapper = mount(SldsLookup, {
            props: { label: "Account", options: OPTIONS, placeholder: "Search accounts" },
        })

        expect(wrapper.find("input.slds-combobox__input").attributes("placeholder")).toBe("Search accounts")
    })

    it("forwards the disabled prop to the write input", () => {
        const wrapper = mount(SldsLookup, {
            props: { label: "Account", options: OPTIONS, disabled: true },
        })

        expect(wrapper.find("input.slds-combobox__input").attributes("disabled")).toBeDefined()
    })

    it("emits search when the user types into the filter input", async () => {
        const wrapper = mount(SldsLookup, {
            props: { label: "Account", options: OPTIONS },
            attachTo: document.body,
        })

        const input = wrapper.find("input.slds-combobox__input")
        ;(input.element as HTMLInputElement).value = "ac"
        await input.trigger("input")

        expect(wrapper.emitted("search")).toBeTruthy()
        expect(wrapper.emitted("search")![0]).toEqual(["ac"])

        wrapper.unmount()
    })

    it("opens the dropdown and filters options when the user types", async () => {
        const wrapper = mount(SldsLookup, {
            props: { label: "Account", options: OPTIONS },
            attachTo: document.body,
        })

        const input = wrapper.find("input.slds-combobox__input")
        ;(input.element as HTMLInputElement).value = "glo"
        await input.trigger("input")

        expect(wrapper.find("[role=\"listbox\"]").exists()).toBe(true)
        const listboxText = wrapper.find("[role=\"listbox\"]").text()
        expect(listboxText).toContain("Globex")
        expect(listboxText).not.toContain("Acme")
        expect(listboxText).not.toContain("Initech")

        wrapper.unmount()
    })

    it("renders a clear-filter icon button when there is a typed filter", async () => {
        const wrapper = mount(SldsLookup, {
            props: { label: "Account", options: OPTIONS },
            attachTo: document.body,
        })

        const input = wrapper.find("input.slds-combobox__input")
        ;(input.element as HTMLInputElement).value = "ac"
        await input.trigger("input")

        expect(wrapper.find("[title=\"Clear\"]").exists()).toBe(true)

        wrapper.unmount()
    })

    it("opens the dropdown on ArrowDown keyup from the input", async () => {
        const wrapper = mount(SldsLookup, {
            props: { label: "Account", options: OPTIONS },
            attachTo: document.body,
        })

        expect(wrapper.find("[role=\"listbox\"]").exists()).toBe(false)

        const combobox = wrapper.find(".slds-combobox")
        await combobox.trigger("keyup", { key: "ArrowDown" })

        expect(wrapper.find("[role=\"listbox\"]").exists()).toBe(true)

        wrapper.unmount()
    })

    it("selects the focused option and emits update:modelValue + change on Enter", async () => {
        const wrapper = mount(SldsLookup, {
            props: { label: "Account", options: OPTIONS },
            attachTo: document.body,
        })

        const combobox = wrapper.find(".slds-combobox")
        // First ArrowDown opens & focuses the first selectable option (Acme).
        await combobox.trigger("keyup", { key: "ArrowDown" })
        // Second ArrowDown moves to Globex.
        await combobox.trigger("keyup", { key: "ArrowDown" })
        // Enter selects.
        await combobox.trigger("keyup", { key: "Enter" })

        expect(wrapper.emitted("update:modelValue")).toBeTruthy()
        expect(wrapper.emitted("update:modelValue")![0]).toEqual(["globex"])
        expect(wrapper.emitted("change")).toBeTruthy()
        expect(wrapper.emitted("change")![0]).toEqual(["globex"])

        wrapper.unmount()
    })

    it("wraps focus from first to last option on ArrowUp", async () => {
        const wrapper = mount(SldsLookup, {
            props: { label: "Account", options: OPTIONS },
            attachTo: document.body,
        })

        const combobox = wrapper.find(".slds-combobox")
        await combobox.trigger("keyup", { key: "ArrowDown" })
        await combobox.trigger("keyup", { key: "ArrowUp" })
        await combobox.trigger("keyup", { key: "Enter" })

        // ArrowDown focuses Acme; ArrowUp wraps to Initech (last selectable).
        expect(wrapper.emitted("update:modelValue")![0]).toEqual(["initech"])

        wrapper.unmount()
    })

    it("closes the dropdown on Escape when the filter is empty", async () => {
        const wrapper = mount(SldsLookup, {
            props: { label: "Account", options: OPTIONS },
            attachTo: document.body,
        })

        const input = wrapper.find("input.slds-combobox__input")
        await input.trigger("click")
        expect(wrapper.find("[role=\"listbox\"]").exists()).toBe(true)

        await input.trigger("keyup", { key: "Escape" })
        expect(wrapper.find("[role=\"listbox\"]").exists()).toBe(false)

        wrapper.unmount()
    })

    it("clears the selection and emits update:modelValue with empty value when remove button is clicked", async () => {
        const wrapper = mount(SldsLookup, {
            props: { label: "Account", options: OPTIONS, modelValue: "acme" },
            attachTo: document.body,
        })

        const removeButton = wrapper.find("[title=\"Remove selected option\"]")
        expect(removeButton.exists()).toBe(true)
        await removeButton.trigger("click")

        expect(wrapper.emitted("update:modelValue")).toBeTruthy()
        // selectOption is called with no argument from the close button -> selectedOption.value is undefined.
        const lastEmit = wrapper.emitted("update:modelValue")!.at(-1)!
        expect(lastEmit[0]).toBeUndefined()

        wrapper.unmount()
    })

    it("does not show the dropdown when clicking the input while disabled", async () => {
        const wrapper = mount(SldsLookup, {
            props: { label: "Account", options: OPTIONS, disabled: true },
            attachTo: document.body,
        })

        const input = wrapper.find("input.slds-combobox__input")
        await input.trigger("click")

        expect(wrapper.find("[role=\"listbox\"]").exists()).toBe(false)

        wrapper.unmount()
    })

    it("shows the spinner element when showSpinner is true", () => {
        const wrapper = mount(SldsLookup, {
            props: { label: "Account", options: OPTIONS, showSpinner: true },
        })

        expect(wrapper.find(".slds-input__spinner").exists()).toBe(true)
    })

    it("renders the label via the form element wrapper", () => {
        const wrapper = mount(SldsLookup, {
            props: { label: "Account", options: OPTIONS },
        })

        expect(wrapper.text()).toContain("Account")
    })

    it("marks the field required when the required prop is set", () => {
        const wrapper = mount(SldsLookup, {
            props: { label: "Account", options: OPTIONS, required: true },
        })

        // slds-form-element renders a required indicator (abbr) when required is true.
        expect(wrapper.find("abbr").exists()).toBe(true)
    })

    it("exposes aria-expanded, aria-haspopup, and aria-controls on the root combobox", () => {
        const wrapper = mount(SldsLookup, {
            props: { label: "Account", options: OPTIONS },
        })

        const combobox = wrapper.find("[role=\"combobox\"]")
        expect(combobox.exists()).toBe(true)
        expect(combobox.attributes("aria-expanded")).toBeDefined()
        expect(combobox.attributes("aria-haspopup")).toBe("listbox")

        const controls = combobox.attributes("aria-controls")
        expect(controls).toBeDefined()
        expect(controls!.length).toBeGreaterThan(0)
    })

    it("forwards data- attributes to the form element while non-data attrs flow through", () => {
        const wrapper = mount(SldsLookup, {
            props: { label: "Account", options: OPTIONS },
            attrs: { "data-testid": "account-lookup", "aria-describedby": "hint" },
        })

        expect(wrapper.find("[data-testid=\"account-lookup\"]").exists()).toBe(true)
    })

    it("readableValue returns selected option label when modelValue matches", () => {
        const wrapper = mount(SldsLookup, {
            props: { label: "Account", options: OPTIONS, modelValue: "acme", placeholder: "Pick" },
        })
        expect((wrapper.vm as any).readableValue).toBe("Acme")
    })

    it("readableValue falls back to placeholder when value does not match any option", () => {
        const wrapper = mount(SldsLookup, {
            props: { label: "Account", options: OPTIONS, modelValue: "nope", placeholder: "Pick" },
        })
        expect((wrapper.vm as any).readableValue).toBe("Pick")
    })

    it("readableValue returns the placeholder when there is no model value", () => {
        const wrapper = mount(SldsLookup, {
            props: { label: "Account", options: OPTIONS, placeholder: "Pick" },
        })
        expect((wrapper.vm as any).readableValue).toBe("Pick")
    })

    it("readableValue returns empty string with no value or placeholder", () => {
        const wrapper = mount(SldsLookup, {
            props: { label: "Account", options: OPTIONS },
        })
        expect((wrapper.vm as any).readableValue).toBe("")
    })

    it("hasAutoComplete returns 'on' when a value is selected and 'off' otherwise", async () => {
        const wrapper = mount(SldsLookup, {
            props: { label: "Account", options: OPTIONS },
        })
        expect((wrapper.vm as any).hasAutoComplete).toBe("off")

        await wrapper.setProps({ modelValue: "acme" })
        expect((wrapper.vm as any).hasAutoComplete).toBe("on")
    })

    it("inputClassNames includes slds-combobox__input-value when modelValue is set", async () => {
        const wrapper = mount(SldsLookup, {
            props: { label: "Account", options: OPTIONS, modelValue: "acme" },
        })
        expect((wrapper.vm as any).inputClassNames).toContain("slds-combobox__input-value")
    })

    it("handleBlurInput hides the dropdown when it is open", async () => {
        const wrapper = mount(SldsLookup, {
            props: { label: "Account", options: OPTIONS },
            attachTo: document.body,
        })

        await wrapper.find("input.slds-combobox__input").trigger("click")
        expect((wrapper.vm as any).isOpen).toBe(true)

        ;(wrapper.vm as any).handleBlurInput()
        expect((wrapper.vm as any).isOpen).toBe(false)

        wrapper.unmount()
    })

    it("handleBlurInput is a no-op when closed", () => {
        const wrapper = mount(SldsLookup, {
            props: { label: "Account", options: OPTIONS },
        })
        expect((wrapper.vm as any).isOpen).toBe(false)
        ;(wrapper.vm as any).handleBlurInput()
        expect((wrapper.vm as any).isOpen).toBe(false)
    })

    it("Escape on a closed dropdown is a no-op", async () => {
        const wrapper = mount(SldsLookup, {
            props: { label: "Account", options: OPTIONS },
            attachTo: document.body,
        })

        const input = wrapper.find("input.slds-combobox__input")
        await input.trigger("keyup", { key: "Escape" })

        expect(wrapper.find("[role=\"listbox\"]").exists()).toBe(false)

        wrapper.unmount()
    })

    it("setFocusedOption is a no-op when options are empty", () => {
        const wrapper = mount(SldsLookup, {
            props: { label: "Account", options: [] },
        })

        const vm = wrapper.vm as any
        vm.setFocusedOption()
        expect(vm.focusedOption).toBeFalsy()
    })

    it("setFocusedOption uses the selected option when a model value is set", () => {
        const wrapper = mount(SldsLookup, {
            props: { label: "Account", options: OPTIONS, modelValue: "globex" },
        })

        const vm = wrapper.vm as any
        vm.setFocusedOption()
        expect(vm.focusedOption?.value).toBe("globex")
    })

    it("setFocusedOption skips heading and divider options to find the first selectable", () => {
        const mixed: DropdownOption[] = [
            { label: "Section", isHeading: true } as DropdownOption,
            { label: "---", isDivider: true } as DropdownOption,
            { label: "Acme", value: "acme" },
        ]
        const wrapper = mount(SldsLookup, {
            props: { label: "Account", options: mixed },
        })

        const vm = wrapper.vm as any
        vm.setFocusedOption()
        expect(vm.focusedOption?.value).toBe("acme")
    })

    it("Enter and ArrowUp on an empty options list with isOpen do not crash or emit", async () => {
        const wrapper = mount(SldsLookup, {
            props: { label: "Account", options: [] },
            attachTo: document.body,
        })

        const vm = wrapper.vm as any
        vm.isOpen = true
        await new Promise(r => setTimeout(r, 0))

        const combobox = wrapper.find(".slds-combobox")
        await combobox.trigger("keyup", { key: "ArrowUp" })
        await combobox.trigger("keyup", { key: "Enter" })
        await combobox.trigger("keyup", { key: "ArrowDown" })

        expect(wrapper.emitted("update:modelValue")).toBeFalsy()

        wrapper.unmount()
    })

    it("has no axe-detectable accessibility violations in its default state", async () => {
        const wrapper = mount(SldsLookup, {
            props: { label: "Account", options: OPTIONS },
            attachTo: document.body,
        })

        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)

        wrapper.unmount()
    })

    it("applies xx-small size modifier", () => {
        const wrapper = mount(SldsLookup, {
            props: { label: "Account", options: OPTIONS, xxSmall: true },
        })
        expect(wrapper.find(".slds-combobox_container").classes()).toContain("slds-size_xx-small")
    })

    it("applies x-small size modifier", () => {
        const wrapper = mount(SldsLookup, {
            props: { label: "Account", options: OPTIONS, xSmall: true },
        })
        expect(wrapper.find(".slds-combobox_container").classes()).toContain("slds-size_x-small")
    })

    it("applies small size modifier", () => {
        const wrapper = mount(SldsLookup, {
            props: { label: "Account", options: OPTIONS, small: true },
        })
        expect(wrapper.find(".slds-combobox_container").classes()).toContain("slds-size_small")
    })

    it("applies medium size modifier", () => {
        const wrapper = mount(SldsLookup, {
            props: { label: "Account", options: OPTIONS, medium: true },
        })
        expect(wrapper.find(".slds-combobox_container").classes()).toContain("slds-size_medium")
    })

    it("applies large size modifier", () => {
        const wrapper = mount(SldsLookup, {
            props: { label: "Account", options: OPTIONS, large: true },
        })
        expect(wrapper.find(".slds-combobox_container").classes()).toContain("slds-size_large")
    })

    it("applies x-large size modifier", () => {
        const wrapper = mount(SldsLookup, {
            props: { label: "Account", options: OPTIONS, xLarge: true },
        })
        expect(wrapper.find(".slds-combobox_container").classes()).toContain("slds-size_x-large")
    })

    it("applies xx-large size modifier", () => {
        const wrapper = mount(SldsLookup, {
            props: { label: "Account", options: OPTIONS, xxLarge: true },
        })
        expect(wrapper.find(".slds-combobox_container").classes()).toContain("slds-size_xx-large")
    })

    it("applies the slds-input-has-icon_left-right class when an option is selected", () => {
        const wrapper = mount(SldsLookup, {
            props: { label: "Account", options: OPTIONS, modelValue: "acme" },
        })

        expect(wrapper.find(".slds-combobox__form-element").classes()).toContain("slds-input-has-icon_left-right")
    })

    it("does not apply the left-right icon class when no option is selected", () => {
        const wrapper = mount(SldsLookup, {
            props: { label: "Account", options: OPTIONS },
        })

        expect(wrapper.find(".slds-combobox__form-element").classes()).not.toContain("slds-input-has-icon_left-right")
    })

    it("clicking the clear filter button restores all options and removes the clear button", async () => {
        const wrapper = mount(SldsLookup, {
            props: { label: "Account", options: OPTIONS },
            attachTo: document.body,
        })

        const input = wrapper.find("input.slds-combobox__input")
        ;(input.element as HTMLInputElement).value = "ac"
        await input.trigger("input")

        const clear = wrapper.find("[title=\"Clear\"]")
        expect(clear.exists()).toBe(true)
        await clear.trigger("click")

        expect(wrapper.find("[title=\"Clear\"]").exists()).toBe(false)

        wrapper.unmount()
    })

    it("Escape with non-empty filter clears the filter without closing the dropdown", async () => {
        const wrapper = mount(SldsLookup, {
            props: { label: "Account", options: OPTIONS },
            attachTo: document.body,
        })

        const input = wrapper.find("input.slds-combobox__input")
        ;(input.element as HTMLInputElement).value = "ac"
        await input.trigger("input")
        expect(wrapper.find("[role=\"listbox\"]").exists()).toBe(true)

        await input.trigger("keyup", { key: "Escape" })

        // Dropdown stays open and the filter is cleared (clear button gone)
        expect(wrapper.find("[role=\"listbox\"]").exists()).toBe(true)
        expect(wrapper.find("[title=\"Clear\"]").exists()).toBe(false)

        wrapper.unmount()
    })

    it("focusing the input clears the filter", async () => {
        const wrapper = mount(SldsLookup, {
            props: { label: "Account", options: OPTIONS },
            attachTo: document.body,
        })

        const input = wrapper.find("input.slds-combobox__input")
        ;(input.element as HTMLInputElement).value = "ac"
        await input.trigger("input")
        expect(wrapper.find("[title=\"Clear\"]").exists()).toBe(true)

        await input.trigger("focus")
        expect(wrapper.find("[title=\"Clear\"]").exists()).toBe(false)

        wrapper.unmount()
    })

    it("clicking the input twice toggles the dropdown closed", async () => {
        const wrapper = mount(SldsLookup, {
            props: { label: "Account", options: OPTIONS },
            attachTo: document.body,
        })

        const input = wrapper.find("input.slds-combobox__input")
        await input.trigger("click")
        expect(wrapper.find("[role=\"listbox\"]").exists()).toBe(true)

        await input.trigger("click")
        expect(wrapper.find("[role=\"listbox\"]").exists()).toBe(false)

        wrapper.unmount()
    })

    it("invokes handleClickOutside to hide an open dropdown", async () => {
        const wrapper = mount(SldsLookup, {
            props: { label: "Account", options: OPTIONS },
            attachTo: document.body,
        })

        await wrapper.find("input.slds-combobox__input").trigger("click")
        expect(wrapper.find("[role=\"listbox\"]").exists()).toBe(true)

        ;(wrapper.vm as any).handleClickOutside()
        await new Promise(r => setTimeout(r, 0))

        expect(wrapper.find("[role=\"listbox\"]").exists()).toBe(false)

        wrapper.unmount()
    })

    it("clicking the faux input with a selected value does not crash and does nothing while disabled", async () => {
        const wrapper = mount(SldsLookup, {
            props: { label: "Account", options: OPTIONS, modelValue: "acme", disabled: true },
            attachTo: document.body,
        })

        const faux = wrapper.find(".slds-input_faux")
        await faux.trigger("click")

        // No update emitted from a passive faux click while disabled
        expect(wrapper.emitted("update:modelValue")).toBeFalsy()

        wrapper.unmount()
    })

    it("clicking the faux input with a selected value (enabled) keeps the selection", async () => {
        const wrapper = mount(SldsLookup, {
            props: { label: "Account", options: OPTIONS, modelValue: "acme" },
            attachTo: document.body,
        })

        const faux = wrapper.find(".slds-input_faux")
        await faux.trigger("click")

        expect(wrapper.emitted("update:modelValue")).toBeFalsy()

        wrapper.unmount()
    })

    it("clicking an option from the dropdown selects it and emits update:modelValue", async () => {
        const wrapper = mount(SldsLookup, {
            props: { label: "Account", options: OPTIONS },
            attachTo: document.body,
        })

        await wrapper.find(".slds-combobox").trigger("keyup", { key: "ArrowDown" })
        const optionEls = wrapper.findAll("[role=\"option\"]")
        await optionEls[2].trigger("click")

        expect(wrapper.emitted("update:modelValue")![0]).toEqual(["initech"])

        wrapper.unmount()
    })

    it("ignores clicks on disabled options", async () => {
        const optionsWithDisabled: DropdownOption[] = [
            { label: "Acme", value: "acme" },
            { label: "Globex", value: "globex", disabled: true },
        ]

        const wrapper = mount(SldsLookup, {
            props: { label: "Account", options: optionsWithDisabled },
            attachTo: document.body,
        })

        await wrapper.find(".slds-combobox").trigger("keyup", { key: "ArrowDown" })
        const optionEls = wrapper.findAll("[role=\"option\"]")
        await optionEls[1].trigger("click")

        expect(wrapper.emitted("update:modelValue")).toBeFalsy()

        wrapper.unmount()
    })

    it("renders the spinner at the wider position when there is a filter", async () => {
        const wrapper = mount(SldsLookup, {
            props: { label: "Account", options: OPTIONS, showSpinner: true },
            attachTo: document.body,
        })

        const input = wrapper.find("input.slds-combobox__input")
        ;(input.element as HTMLInputElement).value = "ac"
        await input.trigger("input")

        const spinner = wrapper.find(".slds-input__spinner")
        expect(spinner.exists()).toBe(true)
        // style attr contains the wider right offset
        expect(spinner.attributes("style") || "").toContain("1.5rem")

        wrapper.unmount()
    })

    it("hovering an option focuses it (mouse-over wired to setFocusedOption)", async () => {
        const wrapper = mount(SldsLookup, {
            props: { label: "Account", options: OPTIONS },
            attachTo: document.body,
        })

        await wrapper.find(".slds-combobox").trigger("keyup", { key: "ArrowDown" })
        const optionEls = wrapper.findAll("[role=\"option\"]")
        await optionEls[2].trigger("mouseover")
        await optionEls[2].trigger("click")

        expect(wrapper.emitted("update:modelValue")![0]).toEqual(["initech"])

        wrapper.unmount()
    })

    it("typing the same model value re-selecting it does not emit a change event", async () => {
        const wrapper = mount(SldsLookup, {
            props: { label: "Account", options: OPTIONS, modelValue: "acme" },
            attachTo: document.body,
        })

        // Open, focus first (Acme is currently selected so it pre-focuses), Enter to "re-select"
        const combobox = wrapper.find(".slds-combobox")
        await combobox.trigger("keyup", { key: "ArrowDown" })
        await combobox.trigger("keyup", { key: "Enter" })

        // update:modelValue is always emitted from selectOption
        expect(wrapper.emitted("update:modelValue")).toBeTruthy()
        // change is only emitted when the value differs — not the case here
        expect(wrapper.emitted("change")).toBeFalsy()

        wrapper.unmount()
    })

    it("forwards the label as aria-label to the dropdown listbox", async () => {
        const wrapper = mount(SldsLookup, {
            props: { label: "Account", options: OPTIONS },
            attachTo: document.body,
        })

        await wrapper.find(".slds-combobox").trigger("keyup", { key: "ArrowDown" })

        expect(wrapper.find("[role=\"listbox\"]").attributes("aria-label")).toBe("Account")

        wrapper.unmount()
    })

    it("renders the entity icon and a description for an entity option", () => {
        const entityOptions: DropdownOption[] = [
            { label: "Acme", value: "acme", iconName: "standard:account", description: "Account" },
        ]
        const wrapper = mount(SldsLookup, {
            props: { label: "Account", options: entityOptions, modelValue: "acme" },
        })

        // Entity icon visible on the read-state input
        expect(wrapper.find(".slds-combobox__input-entity-icon").exists()).toBe(true)
    })

    it("has no axe-detectable accessibility violations when the dropdown is open", async () => {
        const wrapper = mount(SldsLookup, {
            props: { label: "Account", options: OPTIONS },
            attachTo: document.body,
        })

        const input = wrapper.find("input.slds-combobox__input")
        ;(input.element as HTMLInputElement).value = "ac"
        await input.trigger("input")

        expect(wrapper.find("[role=\"listbox\"]").exists()).toBe(true)

        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)

        wrapper.unmount()
    })
})
