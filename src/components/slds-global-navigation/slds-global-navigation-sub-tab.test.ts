import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import SldsGlobalNavigationSubTab from "./slds-global-navigation-sub-tab.vue"

describe("SldsGlobalNavigationSubTab", () => {
    it("renders the sub-tab item with its label", () => {
        const wrapper = mount(SldsGlobalNavigationSubTab, {
            props: { iconName: "standard:account", label: "Accounts" },
        })

        expect(wrapper.find("li").exists()).toBe(true)
        expect(wrapper.text()).toContain("Accounts")
    })

    it("forwards label as the anchor title", () => {
        const wrapper = mount(SldsGlobalNavigationSubTab, {
            props: { iconName: "standard:account", label: "Accounts" },
        })

        expect(wrapper.find("a[role=\"tab\"]").attributes("title")).toBe("Accounts")
    })

    it("applies the base item class names", () => {
        const wrapper = mount(SldsGlobalNavigationSubTab, {
            props: { iconName: "standard:account", label: "Accounts" },
        })

        const li = wrapper.find("li")
        expect(li.classes()).toContain("slds-tabs_default__item")
        expect(li.classes()).toContain("slds-sub-tabs__item")
        expect(li.classes()).not.toContain("slds-active")
    })

    it("applies the slds-active class when isActive is true", () => {
        const wrapper = mount(SldsGlobalNavigationSubTab, {
            props: { iconName: "standard:account", label: "Accounts", isActive: true },
        })

        expect(wrapper.find("li").classes()).toContain("slds-active")
    })

    it("hides the close/dropdown buttons when isMain is true", () => {
        const wrapper = mount(SldsGlobalNavigationSubTab, {
            props: { iconName: "standard:account", label: "Accounts", isMain: true },
        })

        expect(wrapper.findAll("button").length).toBe(0)
    })

    it("renders the chevron and close buttons when not main", () => {
        const wrapper = mount(SldsGlobalNavigationSubTab, {
            props: { iconName: "standard:account", label: "Accounts" },
        })

        expect(wrapper.findAll("button").length).toBe(2)
    })

    it("emits close when the close button is clicked", async () => {
        const wrapper = mount(SldsGlobalNavigationSubTab, {
            props: { iconName: "standard:account", label: "Accounts" },
        })

        const buttons = wrapper.findAll("button")
        await buttons[buttons.length - 1].trigger("click")
        expect(wrapper.emitted("close")).toBeTruthy()
    })

    it("opens the dropdown when chevron is clicked and closes it on second click", async () => {
        const wrapper = mount(SldsGlobalNavigationSubTab, {
            props: { iconName: "standard:account", label: "Accounts" },
        })

        const chevron = wrapper.findAll("button")[0]
        expect(wrapper.find(".slds-dropdown").exists()).toBe(false)

        await chevron.trigger("click")
        expect(wrapper.find(".slds-dropdown").exists()).toBe(true)

        await chevron.trigger("click")
        expect(wrapper.find(".slds-dropdown").exists()).toBe(false)
    })

    it("emits refresh from the dropdown Refresh Tab item and closes the dropdown", async () => {
        const wrapper = mount(SldsGlobalNavigationSubTab, {
            props: { iconName: "standard:account", label: "Accounts" },
        })

        await wrapper.findAll("button")[0].trigger("click")
        const items = wrapper.findAll("[role=\"menuitem\"]")
        await items[0].trigger("click")

        expect(wrapper.emitted("refresh")).toBeTruthy()
        expect(wrapper.find(".slds-dropdown").exists()).toBe(false)
    })

    it("emits workspace from the dropdown Set As Workspace Tab item", async () => {
        const wrapper = mount(SldsGlobalNavigationSubTab, {
            props: { iconName: "standard:account", label: "Accounts" },
        })

        await wrapper.findAll("button")[0].trigger("click")
        const items = wrapper.findAll("[role=\"menuitem\"]")
        await items[1].trigger("click")

        expect(wrapper.emitted("workspace")).toBeTruthy()
    })

    it("emits close from the dropdown Close item", async () => {
        const wrapper = mount(SldsGlobalNavigationSubTab, {
            props: { iconName: "standard:account", label: "Accounts" },
        })

        await wrapper.findAll("button")[0].trigger("click")
        const items = wrapper.findAll("[role=\"menuitem\"]")
        await items[2].trigger("click")

        expect(wrapper.emitted("close")).toBeTruthy()
    })

    it.todo("emits close on a middle-click on the li — Vue's .middle modifier requires a synthetic mouseup event that test-utils' trigger() does not synthesize correctly in browser mode")

    it.todo("axe a11y check — tab anchor has no href; needs triage")
})
