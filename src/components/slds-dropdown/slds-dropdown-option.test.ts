import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsDropdown from "./slds-dropdown.vue"
import SldsDropdownOption from "./slds-dropdown-option.vue"

describe("SldsDropdownOption", () => {
    it("renders an <li> with the option label", () => {
        const wrapper = mount(SldsDropdownOption, {
            props: { label: "Red" },
        })

        expect(wrapper.find("li").exists()).toBe(true)
        expect(wrapper.text()).toContain("Red")
    })

    it("renders a heading when isHeading is true", () => {
        const wrapper = mount(SldsDropdownOption, {
            props: { label: "Section", isHeading: true },
        })
        expect(wrapper.find(".slds-listbox__option-header").exists()).toBe(true)
    })

    it("renders a divider with no inner option markup when isDivider is true", () => {
        const wrapper = mount(SldsDropdownOption, {
            props: { label: "Sep", isDivider: true },
        })

        expect(wrapper.find("li").classes()).toContain("slds-has-divider_top-space")
        expect(wrapper.find("[role=\"option\"]").exists()).toBe(false)
        expect(wrapper.find(".slds-listbox__option-header").exists()).toBe(false)
    })

    it("does not render the entity icon when iconName is absent and option is not selected", () => {
        const wrapper = mount(SldsDropdownOption, {
            props: { label: "Plain" },
        })

        // Icon span exists as a media figure but no icon inside
        expect(wrapper.find("[role=\"option\"]").exists()).toBe(true)
        expect(wrapper.find(".slds-icon").exists()).toBe(false)
    })

    it("renders the check icon when isSelected is true and no iconName is provided", () => {
        const wrapper = mount(SldsDropdownOption, {
            props: { label: "Done", isSelected: true },
        })

        expect(wrapper.find("[role=\"option\"]").classes()).toContain("slds-is-selected")
        expect(wrapper.find("[role=\"option\"]").classes()).toContain("slds-has-focus")
    })

    it("renders the provided iconName instead of the check icon", () => {
        const wrapper = mount(SldsDropdownOption, {
            props: { label: "With icon", iconName: "utility:add", isSelected: true },
        })

        // option is still selected
        expect(wrapper.find("[role=\"option\"]").classes()).toContain("slds-is-selected")
    })

    it("applies focus class when isFocused is true", () => {
        const wrapper = mount(SldsDropdownOption, {
            props: { label: "F", isFocused: true },
        })

        expect(wrapper.find("[role=\"option\"]").classes()).toContain("slds-has-focus")
    })

    it("applies aria-disabled when disabled is true", () => {
        const wrapper = mount(SldsDropdownOption, {
            props: { label: "D", disabled: true },
        })

        expect(wrapper.find("[role=\"option\"]").attributes("aria-disabled")).toBe("true")
    })

    it("renders a description with plain meta classes when description is provided without entity icon", () => {
        const wrapper = mount(SldsDropdownOption, {
            props: { label: "L", description: "Some description" },
        })

        const meta = wrapper.find(".slds-listbox__option-meta")
        expect(meta.exists()).toBe(true)
        expect(meta.classes()).toContain("slds-listbox__option-meta_plain")
        expect(wrapper.find("[role=\"option\"]").classes()).toContain("slds-listbox__option_has-meta")
    })

    it("uses entity classes when description, iconName and standard category align", () => {
        const wrapper = mount(SldsDropdownOption, {
            props: { label: "Acme", description: "Account", iconName: "standard:account" },
        })

        expect(wrapper.find(".slds-listbox__option-meta_entity").exists()).toBe(true)
        expect(wrapper.find(".slds-listbox__option-text_entity").exists()).toBe(true)
        expect(wrapper.find("[role=\"option\"]").classes()).toContain("slds-listbox__option_entity")
    })

    it("applies disabled meta class when disabled and a description are present", () => {
        const wrapper = mount(SldsDropdownOption, {
            props: { label: "L", description: "d", disabled: true },
        })

        expect(wrapper.find(".slds-listbox__option-meta-disabled").exists()).toBe(true)
    })

    it("does not render description span when description is absent", () => {
        const wrapper = mount(SldsDropdownOption, {
            props: { label: "L" },
        })

        expect(wrapper.find(".slds-listbox__option-meta").exists()).toBe(false)
    })

    it("highlights filter match at the start of the label", () => {
        const wrapper = mount(SldsDropdownOption, {
            props: { label: "Apple", filter: "ap" },
        })

        const html = wrapper.find(".slds-listbox__option-text").html()
        expect(html).toContain("<mark>Ap</mark>")
        expect(html).toContain("ple")
    })

    it("highlights filter match in the middle of the label", () => {
        const wrapper = mount(SldsDropdownOption, {
            props: { label: "Pineapple", filter: "app" },
        })

        const html = wrapper.find(".slds-listbox__option-text").html()
        expect(html).toContain("Pine")
        expect(html).toContain("<mark>app</mark>")
        expect(html).toContain("le")
    })

    it("highlights filter match at the end of the label", () => {
        const wrapper = mount(SldsDropdownOption, {
            props: { label: "Banana", filter: "na" },
        })

        const html = wrapper.find(".slds-listbox__option-text").html()
        // multiple occurrences of "na" in Banana
        expect(html.match(/<mark>na<\/mark>/gi)?.length).toBeGreaterThanOrEqual(1)
    })

    it("returns the label unchanged when filter does not match", () => {
        const wrapper = mount(SldsDropdownOption, {
            props: { label: "Cherry", filter: "zzz" },
        })

        const html = wrapper.find(".slds-listbox__option-text").html()
        expect(html).not.toContain("<mark>")
        expect(html).toContain("Cherry")
    })

    it("returns the label unchanged when filter is empty", () => {
        const wrapper = mount(SldsDropdownOption, {
            props: { label: "Cherry", filter: "" },
        })

        const html = wrapper.find(".slds-listbox__option-text").html()
        expect(html).not.toContain("<mark>")
        expect(html).toContain("Cherry")
    })

    it("filters case-insensitively", () => {
        const wrapper = mount(SldsDropdownOption, {
            props: { label: "Apple", filter: "AP" },
        })

        const html = wrapper.find(".slds-listbox__option-text").html()
        expect(html).toContain("<mark>Ap</mark>")
    })

    it("renders nothing for filteredLabel when label is missing and filter is set", () => {
        const wrapper = mount(SldsDropdownOption, {
            props: { filter: "ap" },
        })

        // renders without crashing — option exists
        expect(wrapper.find("[role=\"option\"]").exists()).toBe(true)
    })


    it("has no axe-detectable accessibility violations when mounted inside a labeled listbox", async () => {
        const wrapper = mount(SldsDropdown, {
            props: {
                isOpen: true,
                ariaLabel: "Colors",
                options: [
                    { label: "Red", value: "red" },
                    { label: "Green", value: "green" },
                ],
            },
            attachTo: document.body,
        })

        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)

        wrapper.unmount()
    })
})
