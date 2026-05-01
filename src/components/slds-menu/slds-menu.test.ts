import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsMenu from "./slds-menu.vue"
import type { DropdownOption } from "../slds-dropdown/dropdown-option"

const OPTIONS: DropdownOption[] = [
    { label: "Edit", value: "edit" },
    { label: "Delete", value: "delete" },
]

describe("SldsMenu", () => {
    it("renders the menu trigger", () => {
        const wrapper = mount(SldsMenu, {
            props: { options: OPTIONS, title: "Actions" },
        })

        expect(wrapper.find(".slds-dropdown-trigger").exists()).toBe(true)
        expect(wrapper.find("button.slds-button_icon").exists()).toBe(true)
    })

    it("opens the dropdown when the trigger button is clicked", async () => {
        const wrapper = mount(SldsMenu, {
            props: { options: OPTIONS, title: "Actions" },
            attachTo: document.body,
        })

        await wrapper.find("button").trigger("click")
        expect(wrapper.find("[role=\"listbox\"]").exists()).toBe(true)

        wrapper.unmount()
    })

    it("toggles the dropdown closed when the trigger is clicked again", async () => {
        const wrapper = mount(SldsMenu, {
            props: { options: OPTIONS, title: "Actions" },
            attachTo: document.body,
        })

        await wrapper.find("button").trigger("click")
        expect(wrapper.find("[role=\"listbox\"]").exists()).toBe(true)

        await wrapper.find("button").trigger("click")
        expect(wrapper.find("[role=\"listbox\"]").exists()).toBe(false)

        wrapper.unmount()
    })

    it("does not open the dropdown when disabled", async () => {
        const wrapper = mount(SldsMenu, {
            props: { options: OPTIONS, title: "Actions", disabled: true },
            attachTo: document.body,
        })

        await wrapper.find("button").trigger("click")
        expect(wrapper.find("[role=\"listbox\"]").exists()).toBe(false)

        wrapper.unmount()
    })

    it("emits the option's value as event name when an option is clicked", async () => {
        const wrapper = mount(SldsMenu, {
            props: { options: OPTIONS, title: "Actions" },
            attachTo: document.body,
        })

        await wrapper.find("button").trigger("click")
        const items = wrapper.findAll("[role=\"option\"]")
        await items[0].trigger("click")

        expect(wrapper.emitted("edit")).toBeTruthy()
        expect(wrapper.find("[role=\"listbox\"]").exists()).toBe(false)

        wrapper.unmount()
    })

    it("does not emit anything when a disabled option is clicked", async () => {
        const optionsWithDisabled: DropdownOption[] = [
            { label: "Edit", value: "edit", disabled: true },
            { label: "Delete", value: "delete" },
        ]
        const wrapper = mount(SldsMenu, {
            props: { options: optionsWithDisabled, title: "Actions" },
            attachTo: document.body,
        })

        await wrapper.find("button").trigger("click")
        const items = wrapper.findAll("[role=\"option\"]")
        await items[0].trigger("click")

        expect(wrapper.emitted("edit")).toBeFalsy()

        wrapper.unmount()
    })

    it("does not emit when menu is disabled and an option is invoked programmatically", async () => {
        const wrapper: any = mount(SldsMenu, {
            props: { options: OPTIONS, title: "Actions", disabled: true },
            attachTo: document.body,
        })

        wrapper.vm.handleClickOption(OPTIONS[0])
        expect(wrapper.emitted("edit")).toBeFalsy()

        wrapper.unmount()
    })

    it("opens via ArrowDown and selects with Enter", async () => {
        const wrapper = mount(SldsMenu, {
            props: { options: OPTIONS, title: "Actions" },
            attachTo: document.body,
        })

        await wrapper.find(".slds-dropdown-trigger").trigger("keyup.down")
        expect(wrapper.find("[role=\"listbox\"]").exists()).toBe(true)

        await wrapper.find(".slds-dropdown-trigger").trigger("keyup.enter")
        expect(wrapper.emitted("edit")).toBeTruthy()

        wrapper.unmount()
    })

    it("opens via ArrowUp keypress", async () => {
        const wrapper = mount(SldsMenu, {
            props: { options: OPTIONS, title: "Actions" },
            attachTo: document.body,
        })

        await wrapper.find(".slds-dropdown-trigger").trigger("keyup.up")
        expect(wrapper.find("[role=\"listbox\"]").exists()).toBe(true)

        wrapper.unmount()
    })

    it("opens via Enter keypress", async () => {
        const wrapper = mount(SldsMenu, {
            props: { options: OPTIONS, title: "Actions" },
            attachTo: document.body,
        })

        await wrapper.find(".slds-dropdown-trigger").trigger("keyup.enter")
        expect(wrapper.find("[role=\"listbox\"]").exists()).toBe(true)

        wrapper.unmount()
    })

    it("navigates options with ArrowDown then ArrowUp and selects with Enter", async () => {
        const wrapper = mount(SldsMenu, {
            props: { options: OPTIONS, title: "Actions" },
            attachTo: document.body,
        })

        await wrapper.find(".slds-dropdown-trigger").trigger("keyup.down") // open + focus first
        await wrapper.find(".slds-dropdown-trigger").trigger("keyup.down") // focus second
        await wrapper.find(".slds-dropdown-trigger").trigger("keyup.up")   // back to first
        await wrapper.find(".slds-dropdown-trigger").trigger("keyup.enter")

        expect(wrapper.emitted("edit")).toBeTruthy()

        wrapper.unmount()
    })

    it("closes the dropdown on Escape", async () => {
        const wrapper = mount(SldsMenu, {
            props: { options: OPTIONS, title: "Actions" },
            attachTo: document.body,
        })

        await wrapper.find("button").trigger("click")
        expect(wrapper.find("[role=\"listbox\"]").exists()).toBe(true)

        await wrapper.find(".slds-dropdown-trigger").trigger("keyup.esc")
        expect(wrapper.find("[role=\"listbox\"]").exists()).toBe(false)

        wrapper.unmount()
    })

    it("ignores Escape when dropdown is already closed", async () => {
        const wrapper = mount(SldsMenu, {
            props: { options: OPTIONS, title: "Actions" },
            attachTo: document.body,
        })

        await wrapper.find(".slds-dropdown-trigger").trigger("keyup.esc")
        expect(wrapper.find("[role=\"listbox\"]").exists()).toBe(false)

        wrapper.unmount()
    })

    it("closes the dropdown when handleClickOutside is invoked", async () => {
        const wrapper: any = mount(SldsMenu, {
            props: { options: OPTIONS, title: "Actions" },
            attachTo: document.body,
        })

        await wrapper.find("button").trigger("click")
        expect(wrapper.find("[role=\"listbox\"]").exists()).toBe(true)

        wrapper.vm.handleClickOutside()
        await wrapper.vm.$nextTick()
        expect(wrapper.find("[role=\"listbox\"]").exists()).toBe(false)

        wrapper.unmount()
    })

    it("renders with an empty options array without throwing on keyboard nav", async () => {
        const wrapper = mount(SldsMenu, {
            props: { options: [], title: "Actions" },
            attachTo: document.body,
        })

        await wrapper.find("button").trigger("click")
        await wrapper.find(".slds-dropdown-trigger").trigger("keyup.down")
        await wrapper.find(".slds-dropdown-trigger").trigger("keyup.up")
        await wrapper.find(".slds-dropdown-trigger").trigger("keyup.enter")

        expect(wrapper.emitted()).toBeTruthy()

        wrapper.unmount()
    })

    it("renders the bare variant without bordered fallback", () => {
        const wrapper = mount(SldsMenu, {
            props: { options: OPTIONS, title: "Actions", bare: true },
        })

        expect(wrapper.find("button").exists()).toBe(true)
    })

    it("renders the borderedFilled variant", () => {
        const wrapper = mount(SldsMenu, {
            props: { options: OPTIONS, title: "Actions", borderedFilled: true },
        })

        expect(wrapper.find("button").exists()).toBe(true)
    })

    it("renders the inverse variant", () => {
        const wrapper = mount(SldsMenu, {
            props: { options: OPTIONS, title: "Actions", inverse: true },
        })

        expect(wrapper.find("button").exists()).toBe(true)
    })

    it("renders the bordered variant explicitly", () => {
        const wrapper = mount(SldsMenu, {
            props: { options: OPTIONS, title: "Actions", bordered: true },
        })

        expect(wrapper.find("button").exists()).toBe(true)
    })

    it("renders before/after slot content inside the dropdown", async () => {
        const wrapper = mount(SldsMenu, {
            props: { options: OPTIONS, title: "Actions" },
            slots: {
                before: "<div data-testid='before-slot'>Before</div>",
                after: "<div data-testid='after-slot'>After</div>",
            },
            attachTo: document.body,
        })

        await wrapper.find("button").trigger("click")
        expect(wrapper.find("[data-testid=\"before-slot\"]").exists()).toBe(true)
        expect(wrapper.find("[data-testid=\"after-slot\"]").exists()).toBe(true)

        wrapper.unmount()
    })

    it("has no axe-detectable accessibility violations in its default state", async () => {
        const wrapper = mount(SldsMenu, {
            props: { options: OPTIONS, title: "Actions" },
            attachTo: document.body,
        })

        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)

        wrapper.unmount()
    })
})
