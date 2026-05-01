import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import SldsGlobalNavigationTab from "./slds-global-navigation-tab.vue"

describe("SldsGlobalNavigationTab", () => {
    it("renders the tab item with its label", () => {
        const wrapper = mount(SldsGlobalNavigationTab, {
            props: { iconName: "standard:account", label: "Accounts" },
        })

        expect(wrapper.find("li").exists()).toBe(true)
        expect(wrapper.text()).toContain("Accounts")
    })

    it("forwards the label as the anchor title", () => {
        const wrapper = mount(SldsGlobalNavigationTab, {
            props: { iconName: "standard:account", label: "Accounts" },
        })

        expect(wrapper.find("a[role=\"tab\"]").attributes("title")).toBe("Accounts")
    })

    it("applies the base context-bar classes", () => {
        const wrapper = mount(SldsGlobalNavigationTab, {
            props: { iconName: "standard:account", label: "Accounts" },
        })

        const li = wrapper.find("li")
        expect(li.classes()).toContain("slds-context-bar__item")
        expect(li.classes()).toContain("slds-context-bar__item_tab")
        expect(li.classes()).not.toContain("slds-has-sub-tabs")
        expect(li.classes()).not.toContain("slds-is-active")
    })

    it("adds slds-has-sub-tabs class when hasSubTabs is true", () => {
        const wrapper = mount(SldsGlobalNavigationTab, {
            props: { iconName: "standard:account", label: "Accounts", hasSubTabs: true },
        })

        expect(wrapper.find("li").classes()).toContain("slds-has-sub-tabs")
    })

    it("adds slds-is-active class when isActive is true", () => {
        const wrapper = mount(SldsGlobalNavigationTab, {
            props: { iconName: "standard:account", label: "Accounts", isActive: true },
        })

        expect(wrapper.find("li").classes()).toContain("slds-is-active")
    })

    it("emits close when the close button is clicked", async () => {
        const wrapper = mount(SldsGlobalNavigationTab, {
            props: { iconName: "standard:account", label: "Accounts" },
        })

        const buttons = wrapper.findAll("button")
        await buttons[buttons.length - 1].trigger("click")
        expect(wrapper.emitted("close")).toBeTruthy()
    })

    it.todo("emits close on a middle-click on the li — Vue's .middle modifier requires a synthetic mouseup event that test-utils' trigger() does not synthesize correctly in browser mode")

    it("opens the dropdown when chevron is clicked and toggles closed on second click", async () => {
        const wrapper = mount(SldsGlobalNavigationTab, {
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
        const wrapper = mount(SldsGlobalNavigationTab, {
            props: { iconName: "standard:account", label: "Accounts" },
        })

        await wrapper.findAll("button")[0].trigger("click")
        const items = wrapper.findAll("[role=\"menuitem\"]")
        await items[0].trigger("click")

        expect(wrapper.emitted("refresh")).toBeTruthy()
        expect(wrapper.find(".slds-dropdown").exists()).toBe(false)
    })

    it("emits close-all from the dropdown Close All item", async () => {
        const wrapper = mount(SldsGlobalNavigationTab, {
            props: { iconName: "standard:account", label: "Accounts" },
        })

        await wrapper.findAll("button")[0].trigger("click")
        const items = wrapper.findAll("[role=\"menuitem\"]")
        await items[1].trigger("click")

        expect(wrapper.emitted("close-all")).toBeTruthy()
    })

    it("emits close from the dropdown Close item", async () => {
        const wrapper = mount(SldsGlobalNavigationTab, {
            props: { iconName: "standard:account", label: "Accounts" },
        })

        await wrapper.findAll("button")[0].trigger("click")
        const items = wrapper.findAll("[role=\"menuitem\"]")
        await items[2].trigger("click")

        expect(wrapper.emitted("close")).toBeTruthy()
    })

    it.todo("axe a11y check — tab anchor has no href; needs triage")
})
