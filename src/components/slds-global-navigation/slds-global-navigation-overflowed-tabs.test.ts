import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import SldsGlobalNavigationOverflowedTabs from "./slds-global-navigation-overflowed-tabs.vue"
import type { GlobalNavigationTab } from "./global-navigation-tab"

const TABS: GlobalNavigationTab[] = [
    { hasSubTabs: false, iconName: "standard:account", isActive: false, label: "Accounts" },
    { hasSubTabs: false, iconName: "standard:contact", isActive: false, label: "Contacts" },
]

describe("SldsGlobalNavigationOverflowedTabs", () => {
    it("renders the overflow trigger", () => {
        const wrapper = mount(SldsGlobalNavigationOverflowedTabs, {
            props: { overflowedTabs: TABS },
        })

        expect(wrapper.find("li.slds-context-bar__item").exists()).toBe(true)
        expect(wrapper.text()).toContain("More (2)")
    })

    it("hides the dropdown by default", () => {
        const wrapper = mount(SldsGlobalNavigationOverflowedTabs, {
            props: { overflowedTabs: TABS },
        })
        expect(wrapper.find(".slds-dropdown").exists()).toBe(false)
    })

    it("emits click when an overflowed tab is selected", async () => {
        const wrapper = mount(SldsGlobalNavigationOverflowedTabs, {
            props: { overflowedTabs: TABS },
            attachTo: document.body,
        })

        await wrapper.find("a[role=\"tab\"]").trigger("click")
        await wrapper.findAll(".slds-dropdown__item")[0].trigger("click")
        expect(wrapper.emitted("click")).toBeTruthy()

        wrapper.unmount()
    })

    it.todo("axe a11y check — overflow anchor has no href; needs triage")
})
