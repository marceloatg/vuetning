import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import { defineComponent, h } from "vue"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsPageHeaderDropdownOption from "./slds-page-header-dropdown-option.vue"

describe("SldsPageHeaderDropdownOption", () => {
    it("renders the option with its label", () => {
        const wrapper = mount(SldsPageHeaderDropdownOption, {
            props: { label: "Mine" },
        })

        expect(wrapper.find("li.slds-listbox__item").exists()).toBe(true)
        expect(wrapper.text()).toContain("Mine")
    })

    it("emits click when the option is clicked", async () => {
        const wrapper = mount(SldsPageHeaderDropdownOption, {
            props: { label: "Mine" },
        })

        await wrapper.trigger("click")
        expect(wrapper.emitted("click")).toBeTruthy()
    })

    it("emits click-disabled instead of click when the option is disabled", async () => {
        const wrapper = mount(SldsPageHeaderDropdownOption, {
            props: { label: "Mine", disabled: true },
        })

        await wrapper.trigger("click")
        expect(wrapper.emitted("click-disabled")).toBeTruthy()
    })

    it("emits mouseover when hovered", async () => {
        const wrapper = mount(SldsPageHeaderDropdownOption, {
            props: { label: "Mine" },
        })

        await wrapper.trigger("mouseover")
        expect(wrapper.emitted("mouseover")).toBeTruthy()
    })

    it("renders the meta text when provided", () => {
        const wrapper = mount(SldsPageHeaderDropdownOption, {
            props: { label: "Mine", meta: "5 records" },
        })

        expect(wrapper.find(".slds-listbox__option-meta").exists()).toBe(true)
        expect(wrapper.text()).toContain("5 records")
    })

    it("renders the custom icon when icon prop is provided", () => {
        const wrapper = mount(SldsPageHeaderDropdownOption, {
            props: { label: "Mine", icon: "utility:user" },
        })

        expect(wrapper.find(".slds-icon_container").exists()).toBe(true)
    })

    it("renders the left icon when leftIcon prop is provided (and icon is absent)", () => {
        const wrapper = mount(SldsPageHeaderDropdownOption, {
            props: { label: "Mine", leftIcon: "utility:add" },
        })

        // Left icon path renders an SldsIcon with x-small attribute.
        expect(wrapper.findAll(".slds-icon_container").length).toBeGreaterThan(0)
    })

    it("renders the check icon when isSelectable is true and no custom icon is supplied", () => {
        const wrapper = mount(SldsPageHeaderDropdownOption, {
            props: { label: "Mine", isSelectable: true },
        })

        expect(wrapper.find(".slds-icon-utility-check").exists()).toBe(true)
    })

    it("renders the right icon when rightIcon prop is provided", () => {
        const wrapper = mount(SldsPageHeaderDropdownOption, {
            props: { label: "Mine", rightIcon: "utility:chevronright" },
        })

        // figure-reverse slot renders right icon with margin class
        expect(wrapper.find(".slds-m-left_small").exists()).toBe(true)
    })

    it("applies the slds-is-selected class when isSelected is true", () => {
        const wrapper = mount(SldsPageHeaderDropdownOption, {
            props: { label: "Mine", isSelected: true, isSelectable: true },
        })

        expect(wrapper.find(".slds-is-selected").exists()).toBe(true)
    })

    it("applies the slds-has-focus class when hasFocus is true", () => {
        const wrapper = mount(SldsPageHeaderDropdownOption, {
            props: { label: "Mine", hasFocus: true },
        })

        expect(wrapper.find(".slds-has-focus").exists()).toBe(true)
    })

    it("applies the slds-is-disabled class when disabled is true", () => {
        const wrapper = mount(SldsPageHeaderDropdownOption, {
            props: { label: "Mine", disabled: true, isSelectable: true },
        })

        expect(wrapper.find(".slds-is-disabled").exists()).toBe(true)
        expect(wrapper.find(".slds-listbox__option-icon-disabled").exists()).toBe(true)
    })

    it("applies a level class when level is provided", () => {
        const wrapper = mount(SldsPageHeaderDropdownOption, {
            props: { label: "Error", level: "error" },
        })

        expect(wrapper.find(".slds-has-error").exists()).toBe(true)
    })

    it("applies vertical/horizontal padding when not selectable", () => {
        const wrapper = mount(SldsPageHeaderDropdownOption, {
            props: { label: "Mine" },
        })

        expect(wrapper.find(".slds-p-vertical_x-small.slds-p-horizontal_small").exists()).toBe(true)
    })

    it("renders raw label when no filter is provided", () => {
        const wrapper = mount(SldsPageHeaderDropdownOption, {
            props: { label: "Acme Corporation" },
        })

        expect(wrapper.find("mark").exists()).toBe(false)
        expect(wrapper.text()).toContain("Acme Corporation")
    })

    it("highlights filter matches with <mark> when filter is provided", () => {
        const wrapper = mount(SldsPageHeaderDropdownOption, {
            props: { label: "Acme Corporation", filter: "co" },
        })

        const marks = wrapper.findAll("mark")
        expect(marks.length).toBeGreaterThan(0)
    })

    it("renders an empty highlighted label when filter is empty string", () => {
        const wrapper = mount(SldsPageHeaderDropdownOption, {
            props: { label: "Acme", filter: "" },
        })

        // No indices found -> filteredLabel branch returns empty before postfix logic
        expect(wrapper.find("li.slds-listbox__item").exists()).toBe(true)
    })

    it("highlights match at start of label", () => {
        const wrapper = mount(SldsPageHeaderDropdownOption, {
            props: { label: "Acme", filter: "Ac" },
        })

        const marks = wrapper.findAll("mark")
        expect(marks.length).toBe(1)
    })

    it("highlights match at end of label", () => {
        const wrapper = mount(SldsPageHeaderDropdownOption, {
            props: { label: "Acme", filter: "me" },
        })

        const marks = wrapper.findAll("mark")
        expect(marks.length).toBe(1)
    })

    it("has no axe-detectable accessibility violations when wrapped in a labeled listbox", async () => {
        const Host = defineComponent({
            components: { SldsPageHeaderDropdownOption },
            render() {
                return h("ul", { role: "listbox", "aria-label": "Options" }, [
                    h(SldsPageHeaderDropdownOption, { label: "Mine" }),
                ])
            },
        })

        const wrapper = mount(Host, { attachTo: document.body })
        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)
        wrapper.unmount()
    })
})
