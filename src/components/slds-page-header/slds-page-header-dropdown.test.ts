import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import { defineComponent, h } from "vue"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsPageHeaderDropdown from "./slds-page-header-dropdown.vue"
import type { PageHeaderDropdownOption } from "./page-header-dropdown-option"

const OPTIONS: PageHeaderDropdownOption[] = [
    { value: "section", label: "Section", isHeading: true, disabled: false },
    { value: "all", label: "All", isHeading: false, disabled: false },
    { value: "mine", label: "Mine", isHeading: false, disabled: false },
]

describe("SldsPageHeaderDropdown", () => {
    it("renders the dropdown listbox", () => {
        const wrapper = mount(SldsPageHeaderDropdown, {
            props: { options: OPTIONS, value: "all" },
        })

        expect(wrapper.find("[role=\"listbox\"]").exists()).toBe(true)
        expect(wrapper.text()).toContain("All")
        expect(wrapper.text()).toContain("Mine")
    })

    it("renders the spinner when showSpinner is true", () => {
        const wrapper = mount(SldsPageHeaderDropdown, {
            props: { options: OPTIONS, value: "all", showSpinner: true },
        })
        expect(wrapper.find(".slds-spinner").exists()).toBe(true)
    })

    it("emits click with the option value when an option is clicked", async () => {
        const wrapper = mount(SldsPageHeaderDropdown, {
            props: { options: OPTIONS, value: "all" },
            attachTo: document.body,
        })

        // Last listbox__item is the "mine" option (heading + 2 options)
        const items = wrapper.findAll(".slds-listbox__item")
        await items[items.length - 1].trigger("click")
        expect(wrapper.emitted("click")).toBeTruthy()
        // The dropdown forwards option.value verbatim as the click payload
        expect(wrapper.emitted("click")!.flat()).toContain("mine")

        wrapper.unmount()
    })

    it("emits mouseover with the option value when an option is hovered", async () => {
        const wrapper = mount(SldsPageHeaderDropdown, {
            props: { options: OPTIONS, value: "all" },
            attachTo: document.body,
        })

        const items = wrapper.findAll(".slds-listbox__item")
        await items[0].trigger("mouseover")
        expect(wrapper.emitted("mouseover")).toBeTruthy()

        wrapper.unmount()
    })

    it("renders heading entries from options that have isHeading=true", () => {
        const wrapper = mount(SldsPageHeaderDropdown, {
            props: { options: OPTIONS, value: "all" },
        })

        // The dropdown heading renders the section label
        expect(wrapper.text()).toContain("Section")
    })

    it("renders the default slot in place of options when provided", () => {
        const wrapper = mount(SldsPageHeaderDropdown, {
            props: { options: OPTIONS, value: "all" },
            slots: { default: "<li class='custom-option'>Custom</li>" },
        })

        expect(wrapper.find(".custom-option").exists()).toBe(true)
        // Prop-driven options should be hidden when default slot is present
        expect(wrapper.text()).not.toContain("All")
    })

    it("marks the matching value option as selected", () => {
        const wrapper = mount(SldsPageHeaderDropdown, {
            props: { options: OPTIONS, value: "mine" },
        })

        // The selected option carries the slds-is-selected class via mediaObjectClassNames
        const selected = wrapper.findAll(".slds-is-selected")
        expect(selected.length).toBeGreaterThan(0)
    })

    it("highlights the focusedOption using has-focus", () => {
        const wrapper = mount(SldsPageHeaderDropdown, {
            props: { options: OPTIONS, value: "all", focusedOption: "mine" },
        })

        expect(wrapper.findAll(".slds-has-focus").length).toBeGreaterThan(0)
    })

    it("has no axe-detectable accessibility violations when given an aria-label and option-only values", async () => {
        const OPTION_ONLY: PageHeaderDropdownOption[] = [
            { value: "all", label: "All", isHeading: false, disabled: false },
            { value: "mine", label: "Mine", isHeading: false, disabled: false },
        ]

        const Host = defineComponent({
            components: { SldsPageHeaderDropdown },
            render() {
                return h(SldsPageHeaderDropdown, {
                    options: OPTION_ONLY,
                    value: "all",
                    "aria-label": "Section filter",
                })
            },
        })

        const wrapper = mount(Host, { attachTo: document.body })
        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)
        wrapper.unmount()
    })
})
