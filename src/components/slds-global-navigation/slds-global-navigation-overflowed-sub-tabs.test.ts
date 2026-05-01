import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import SldsGlobalNavigationOverflowedSubTabs from "./slds-global-navigation-overflowed-sub-tabs.vue"
import type { GlobalNavigationSubTab } from "./global-navigation-sub-tab"

const SUB_TABS: GlobalNavigationSubTab[] = [
    { iconName: "standard:account", isActive: false, isMain: false, label: "Accounts", name: "accounts" },
    { iconName: "standard:contact", isActive: false, isMain: false, label: "Contacts", name: "contacts" },
]

describe("SldsGlobalNavigationOverflowedSubTabs", () => {
    it("renders the overflow trigger", () => {
        const wrapper = mount(SldsGlobalNavigationOverflowedSubTabs, {
            props: { overflowedSubTabs: SUB_TABS },
        })

        expect(wrapper.find("li").exists()).toBe(true)
        expect(wrapper.text()).toContain("More (2)")
    })

    it("hides the dropdown by default", () => {
        const wrapper = mount(SldsGlobalNavigationOverflowedSubTabs, {
            props: { overflowedSubTabs: SUB_TABS },
        })
        expect(wrapper.find(".slds-dropdown").exists()).toBe(false)
    })

    it("emits click when an overflowed sub-tab is selected", async () => {
        const wrapper = mount(SldsGlobalNavigationOverflowedSubTabs, {
            props: { overflowedSubTabs: SUB_TABS },
            attachTo: document.body,
        })

        await wrapper.find("a[role=\"tab\"]").trigger("click")
        await wrapper.findAll(".slds-dropdown__item")[0].trigger("click")
        expect(wrapper.emitted("click")).toBeTruthy()

        wrapper.unmount()
    })

    it.todo("axe a11y check — overflow anchor has no href; needs triage")
})
