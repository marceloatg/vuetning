import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import { defineComponent, h } from "vue"

import SldsVerticalNavigationItem from "./slds-vertical-navigation-item.vue"
import SldsVerticalNavigation from "./slds-vertical-navigation.vue"

describe("SldsVerticalNavigationItem", () => {
    it("renders the navigation item with its label", () => {
        const wrapper = mount(SldsVerticalNavigationItem, {
            props: { label: "Reports", name: "reports" },
        })

        expect(wrapper.find("li.slds-nav-vertical__item").exists()).toBe(true)
        expect(wrapper.text()).toContain("Reports")
    })

    it("does not render the icon when iconName is missing", () => {
        const wrapper = mount(SldsVerticalNavigationItem, {
            props: { label: "Reports", name: "reports" },
        })

        expect(wrapper.findComponent({ name: "slds-icon" }).exists()).toBe(false)
    })

    it("renders the icon when iconName is provided", () => {
        const wrapper = mount(SldsVerticalNavigationItem, {
            props: { label: "Reports", name: "reports", iconName: "utility:report" },
        })

        expect(wrapper.findComponent({ name: "slds-icon" }).exists()).toBe(true)
    })

    it("renders the badge when provided", () => {
        const wrapper = mount(SldsVerticalNavigationItem, {
            props: { label: "Reports", name: "reports", badge: "5" },
        })

        expect(wrapper.find(".slds-badge").text()).toBe("5")
    })

    it("does not render a badge when no badge is provided", () => {
        const wrapper = mount(SldsVerticalNavigationItem, {
            props: { label: "Reports", name: "reports" },
        })

        expect(wrapper.find(".slds-badge").exists()).toBe(false)
    })

    it("does not apply slds-is-active when no parent active matches", () => {
        const wrapper = mount(SldsVerticalNavigationItem, {
            props: { label: "Reports", name: "reports" },
        })

        expect(wrapper.find("li").classes()).not.toContain("slds-is-active")
    })

    it("applies slds-is-active when parent navigation marks this item active", () => {
        const Host = defineComponent({
            render() {
                return h(SldsVerticalNavigation, { active: "reports" }, {
                    default: () => h(SldsVerticalNavigationItem, { label: "Reports", name: "reports" }),
                })
            },
        })

        const wrapper = mount(Host)
        expect(wrapper.find("li.slds-nav-vertical__item").classes()).toContain("slds-is-active")
    })


    it.todo("axe a11y check — anchor element has no href; needs triage")
})
