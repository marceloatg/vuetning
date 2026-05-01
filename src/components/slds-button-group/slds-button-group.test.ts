import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsButtonGroup from "./slds-button-group.vue"
import type { DropdownOption } from "../slds-dropdown/dropdown-option"

const OPTIONS: DropdownOption[] = [
    { label: "Open", value: "open" },
    { label: "Disabled", value: "disabledAction", disabled: true },
]

describe("SldsButtonGroup", () => {
    it("renders a button group container", () => {
        const wrapper = mount(SldsButtonGroup, {
            slots: { default: "<button>One</button><button>Two</button>" },
        })

        expect(wrapper.find(".slds-button-group").exists()).toBe(true)
        expect(wrapper.attributes("role")).toBe("group")
    })

    it("does not render the dropdown trigger when no dropdownOptions are provided", () => {
        const wrapper = mount(SldsButtonGroup)
        expect(wrapper.find(".slds-dropdown-trigger").exists()).toBe(false)
    })

    it("does not render the dropdown trigger when dropdownOptions is empty", () => {
        const wrapper = mount(SldsButtonGroup, {
            props: { dropdownOptions: [] },
        })
        expect(wrapper.find(".slds-dropdown-trigger").exists()).toBe(false)
    })

    it("renders the dropdown trigger when dropdownOptions are provided", () => {
        const wrapper = mount(SldsButtonGroup, {
            props: { dropdownOptions: OPTIONS },
        })
        expect(wrapper.find(".slds-dropdown-trigger").exists()).toBe(true)
    })

    it("opens the dropdown when the trigger button is clicked", async () => {
        const wrapper: any = mount(SldsButtonGroup, {
            props: { dropdownOptions: OPTIONS },
        })

        expect(wrapper.vm.isOpen).toBe(false)
        wrapper.vm.handleClickButton()
        expect(wrapper.vm.isOpen).toBe(true)
    })

    it("closes the dropdown when the trigger is clicked while open", () => {
        const wrapper: any = mount(SldsButtonGroup, {
            props: { dropdownOptions: OPTIONS },
        })

        wrapper.vm.isOpen = true
        wrapper.vm.handleClickButton()
        expect(wrapper.vm.isOpen).toBe(false)
    })

    it("does not open the dropdown when disabled", () => {
        const wrapper: any = mount(SldsButtonGroup, {
            props: { dropdownOptions: OPTIONS, disabled: true },
        })

        wrapper.vm.handleClickButton()
        expect(wrapper.vm.isOpen).toBe(false)
    })

    it("emits the option's value as event name when an enabled option is clicked", () => {
        const wrapper: any = mount(SldsButtonGroup, {
            props: { dropdownOptions: OPTIONS },
        })

        wrapper.vm.isOpen = true
        wrapper.vm.handleClickOption(OPTIONS[0])
        expect(wrapper.emitted("open")).toHaveLength(1)
        expect(wrapper.vm.isOpen).toBe(false)
    })

    it("does not emit when the clicked option is disabled", () => {
        const wrapper: any = mount(SldsButtonGroup, {
            props: { dropdownOptions: OPTIONS },
        })

        wrapper.vm.handleClickOption(OPTIONS[1])
        expect(wrapper.emitted("disabledAction")).toBeFalsy()
    })

    it("does not emit when the group is disabled", () => {
        const wrapper: any = mount(SldsButtonGroup, {
            props: { dropdownOptions: OPTIONS, disabled: true },
        })

        wrapper.vm.handleClickOption(OPTIONS[0])
        expect(wrapper.emitted("open")).toBeFalsy()
    })

    it("hides the dropdown when handleClickOutside fires", () => {
        const wrapper: any = mount(SldsButtonGroup, {
            props: { dropdownOptions: OPTIONS },
        })

        wrapper.vm.isOpen = true
        wrapper.vm.handleClickOutside()
        expect(wrapper.vm.isOpen).toBe(false)
    })

    it("forwards brand prop to the trigger button", () => {
        const wrapper = mount(SldsButtonGroup, {
            props: { dropdownOptions: OPTIONS, brand: true },
        })
        expect(wrapper.find(".slds-button_icon-brand").exists()).toBe(true)
    })

    it("forwards disabled prop to the trigger button", () => {
        const wrapper = mount(SldsButtonGroup, {
            props: { dropdownOptions: OPTIONS, disabled: true },
        })
        expect(wrapper.find("button[disabled]").exists()).toBe(true)
    })

    it("forwards inverse prop to the trigger button", () => {
        const wrapper = mount(SldsButtonGroup, {
            props: { dropdownOptions: OPTIONS, inverse: true },
        })
        expect(wrapper.html()).toContain("slds-button_icon-inverse")
    })

    it("has no axe-detectable accessibility violations in its default state", async () => {
        const wrapper = mount(SldsButtonGroup, {
            slots: { default: "<button class='slds-button'>One</button><button class='slds-button'>Two</button>" },
            attachTo: document.body,
        })
        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)
        wrapper.unmount()
    })
})
