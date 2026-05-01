import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import SldsButtonGroupDropdown from "./slds-button-group-dropdown.vue"
import type { DropdownOption } from "../slds-dropdown/dropdown-option"

const OPTIONS: DropdownOption[] = [
    { label: "Edit", value: "edit" },
    { label: "Delete", value: "delete" },
]

describe("SldsButtonGroupDropdown", () => {
    it("renders nothing when isOpen is false", () => {
        const wrapper = mount(SldsButtonGroupDropdown, {
            props: { isOpen: false, dropdownOptions: OPTIONS },
        })
        expect(wrapper.find(".slds-dropdown").exists()).toBe(false)
    })

    it("renders the menu when isOpen is true", () => {
        const wrapper = mount(SldsButtonGroupDropdown, {
            props: { isOpen: true, dropdownOptions: OPTIONS },
        })
        expect(wrapper.find(".slds-dropdown").exists()).toBe(true)
        expect(wrapper.findAll(".slds-dropdown__item").length).toBe(2)
    })

    it("emits click-option with the clicked option", async () => {
        const wrapper = mount(SldsButtonGroupDropdown, {
            props: { isOpen: true, dropdownOptions: OPTIONS },
        })

        await wrapper.findAll(".slds-dropdown__item")[0].trigger("click")
        expect(wrapper.emitted("click-option")).toBeTruthy()
        expect(wrapper.emitted("click-option")![0][0]).toEqual(OPTIONS[0])
    })

    it("does not emit click-option when a divider is clicked", async () => {
        const options: DropdownOption[] = [
            { label: "Section", isDivider: true },
            { label: "Edit", value: "edit" },
        ]
        const wrapper = mount(SldsButtonGroupDropdown, {
            props: { isOpen: true, dropdownOptions: options },
        })

        await wrapper.findAll(".slds-dropdown__item")[0].trigger("click")
        expect(wrapper.emitted("click-option")).toBeUndefined()
    })

    it("does not emit click-option when a heading is clicked", async () => {
        const options: DropdownOption[] = [
            { label: "Heading", isHeading: true },
            { label: "Edit", value: "edit" },
        ]
        const wrapper = mount(SldsButtonGroupDropdown, {
            props: { isOpen: true, dropdownOptions: options },
        })

        await wrapper.findAll(".slds-dropdown__item")[0].trigger("click")
        expect(wrapper.emitted("click-option")).toBeUndefined()
    })

    it("falls back to an empty options list when dropdownOptions prop is omitted", () => {
        const wrapper = mount(SldsButtonGroupDropdown, {
            props: { isOpen: true },
        })

        expect(wrapper.findAll(".slds-dropdown__item").length).toBe(0)
    })

    it.todo("axe a11y check — menuitem anchors lack href; needs triage")
})
