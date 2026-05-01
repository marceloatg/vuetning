import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsPageHeader from "./slds-page-header.vue"
import type { PageHeaderDropdownOption } from "./page-header-dropdown-option"

const DROPDOWN_OPTIONS: PageHeaderDropdownOption[] = [
    { isHeading: false, label: "All", value: "all", disabled: false },
    { isHeading: false, label: "Mine", value: "mine", disabled: false },
]

describe("SldsPageHeader", () => {
    it("renders the page header container with the title", () => {
        const wrapper = mount(SldsPageHeader, {
            props: { title: "Acme", meta: "Account" },
        })

        expect(wrapper.find(".slds-page-header").exists()).toBe(true)
        expect(wrapper.find("[data-testid=\"pageHeaderTitle\"]").exists()).toBe(true)
        expect(wrapper.text()).toContain("Acme")
    })

    it("renders the meta text in the base body", () => {
        const wrapper = mount(SldsPageHeader, {
            props: { title: "Acme", meta: "Account" },
        })

        expect(wrapper.text()).toContain("Account")
    })

    it("renders the icon when iconName is provided", () => {
        const wrapper = mount(SldsPageHeader, {
            props: { title: "Acme", iconName: "standard:account" },
        })

        expect(wrapper.find(".slds-page-header__icon").exists()).toBe(true)
    })

    it("does not render the icon when relatedList is true", () => {
        const wrapper = mount(SldsPageHeader, {
            props: { title: "Related", iconName: "standard:account", relatedList: true },
        })

        expect(wrapper.find(".slds-page-header__icon").exists()).toBe(false)
    })

    it("renders the actions slot", () => {
        const wrapper = mount(SldsPageHeader, {
            props: { title: "Acme" },
            slots: { actions: "<button data-testid='action'>Edit</button>" },
        })

        const actions = wrapper.find("[data-testid=\"pageHeaderActions\"]")
        expect(actions.exists()).toBe(true)
        expect(actions.find("[data-testid=\"action\"]").exists()).toBe(true)
    })

    it("renders the controls row when objectHome is true and a controls slot is provided", () => {
        const wrapper = mount(SldsPageHeader, {
            props: { title: "Acme", objectHome: true, meta: "5 items" },
            slots: { controls: "<button data-testid='ctl'>New</button>" },
        })

        const controls = wrapper.find("[data-testid=\"pageHeaderControls\"]")
        expect(controls.exists()).toBe(true)
        expect(controls.text()).toContain("5 items")
        expect(controls.find("[data-testid=\"ctl\"]").exists()).toBe(true)
    })

    it("renders the controls row when relatedList is true", () => {
        const wrapper = mount(SldsPageHeader, {
            props: { title: "Related", relatedList: true, meta: "3 items" },
        })

        expect(wrapper.find("[data-testid=\"pageHeaderControls\"]").exists()).toBe(true)
    })

    it("renders the details row when recordHome is true", () => {
        const wrapper = mount(SldsPageHeader, {
            props: { title: "Acme", recordHome: true, iconName: "standard:account" },
            slots: { details: "<li data-testid='detail'>Owner</li>" },
        })

        const details = wrapper.find("[data-testid=\"pageHeaderDetails\"]")
        expect(details.exists()).toBe(true)
        expect(details.find("[data-testid=\"detail\"]").exists()).toBe(true)
    })

    it("renders the breadcrumbs slot when not in base body mode", () => {
        const wrapper = mount(SldsPageHeader, {
            props: { title: "Acme", recordHome: true, iconName: "standard:account" },
            slots: { breadcrumbs: "<nav data-testid='breadcrumbs'>Home / Acme</nav>" },
        })

        expect(wrapper.find("[data-testid=\"breadcrumbs\"]").exists()).toBe(true)
    })

    it("falls back to the name prop when no breadcrumbs slot is supplied", () => {
        const wrapper = mount(SldsPageHeader, {
            props: { title: "Acme", recordHome: true, iconName: "standard:account", name: "Accounts" },
        })

        expect(wrapper.text()).toContain("Accounts")
    })

    it("renders the dropdown title when hasDropdown is true (recordHome)", async () => {
        const wrapper = mount(SldsPageHeader, {
            props: {
                title: "Acme",
                recordHome: true,
                iconName: "standard:account",
                hasDropdown: true,
            },
            attachTo: document.body,
        })

        expect(wrapper.find(".slds-dropdown-trigger").exists()).toBe(true)

        wrapper.unmount()
    })

    it("opens the dropdown and emits dropdown-click when the dropdown trigger is clicked", async () => {
        const wrapper: any = mount(SldsPageHeader, {
            props: {
                title: "Acme",
                recordHome: true,
                iconName: "standard:account",
                hasDropdown: true,
                options: DROPDOWN_OPTIONS,
            } as any,
            attachTo: document.body,
        })

        await wrapper.find(".slds-button_reset").trigger("click")

        expect(wrapper.emitted("dropdown-click")).toBeTruthy()
        expect(wrapper.vm.isOpen).toBe(true)

        wrapper.unmount()
    })

    it("does not re-open the dropdown when already open (onClickDropdown early return)", async () => {
        const wrapper: any = mount(SldsPageHeader, {
            props: {
                title: "Acme",
                recordHome: true,
                iconName: "standard:account",
                hasDropdown: true,
            },
            attachTo: document.body,
        })

        await wrapper.find(".slds-button_reset").trigger("click")
        expect(wrapper.emitted("dropdown-click")).toHaveLength(1)

        await wrapper.find(".slds-button_reset").trigger("click")
        expect(wrapper.emitted("dropdown-click")).toHaveLength(1)

        wrapper.unmount()
    })

    it("emits dropdown-select when an option is selected via onClickOption", async () => {
        const wrapper: any = mount(SldsPageHeader, {
            props: {
                title: "Acme",
                recordHome: true,
                iconName: "standard:account",
                hasDropdown: true,
            },
            attachTo: document.body,
        })

        wrapper.vm.onClickOption("mine")

        expect(wrapper.emitted("dropdown-select")).toBeTruthy()
        expect(wrapper.emitted("dropdown-select")![0]).toEqual(["mine"])
        expect(wrapper.vm.isOpen).toBe(false)

        wrapper.unmount()
    })

    it("hides the dropdown via the click-outside handler", async () => {
        const wrapper: any = mount(SldsPageHeader, {
            props: {
                title: "Acme",
                recordHome: true,
                iconName: "standard:account",
                hasDropdown: true,
            },
            attachTo: document.body,
        })

        await wrapper.find(".slds-button_reset").trigger("click")
        expect(wrapper.vm.isOpen).toBe(true)

        wrapper.vm.hideDropdown()
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.isOpen).toBe(false)

        wrapper.unmount()
    })

    it("onMouseOverOption sets the focused option when not empty", async () => {
        const option = { label: "Mine", value: "mine" }
        const wrapper: any = mount(SldsPageHeader, {
            props: {
                title: "Acme",
                recordHome: true,
                iconName: "standard:account",
                hasDropdown: true,
                options: [option],
            } as any,
            attachTo: document.body,
        })

        wrapper.vm.onMouseOverOption(option)
        expect(wrapper.vm.focusedOption).toEqual(option)

        wrapper.unmount()
    })

    it("setFocusedOption short-circuits when there are no options (isEmpty)", () => {
        const wrapper: any = mount(SldsPageHeader, {
            props: { title: "Acme" },
        })

        wrapper.vm.setFocusedOption()
        expect(wrapper.vm.focusedOption).toBeFalsy()
    })

    it("renders with neither objectHome, relatedList nor recordHome (base body)", () => {
        const wrapper = mount(SldsPageHeader, {
            props: { title: "Acme", meta: "Solo" },
        })

        // Lower row gated by objectHome/relatedList - should not exist
        expect(wrapper.find("[data-testid=\"pageHeaderControls\"]").exists()).toBe(false)
        expect(wrapper.find("[data-testid=\"pageHeaderDetails\"]").exists()).toBe(false)
    })

    it("has no axe-detectable accessibility violations in its default state", async () => {
        const wrapper = mount(SldsPageHeader, {
            props: { title: "Acme", meta: "Account" },
            attachTo: document.body,
        })

        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)

        wrapper.unmount()
    })
})
