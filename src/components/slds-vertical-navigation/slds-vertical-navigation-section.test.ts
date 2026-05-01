import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsVerticalNavigationSection from "./slds-vertical-navigation-section.vue"

describe("SldsVerticalNavigationSection", () => {
    it("renders the section container with a list", () => {
        const wrapper = mount(SldsVerticalNavigationSection, {
            slots: { default: "<li>Item</li>" },
        })

        expect(wrapper.find(".slds-nav-vertical__section").exists()).toBe(true)
        expect(wrapper.find("ul").exists()).toBe(true)
    })

    it("renders slot content inside the ul", () => {
        const wrapper = mount(SldsVerticalNavigationSection, {
            slots: { default: "<li class='child'>Item</li>" },
        })

        expect(wrapper.find("ul .child").exists()).toBe(true)
    })

    it("renders the title when provided", () => {
        const wrapper = mount(SldsVerticalNavigationSection, {
            props: { title: "Reports" },
            slots: { default: "<li>Item</li>" },
        })

        expect(wrapper.find("h2.slds-nav-vertical__title").text()).toBe("Reports")
    })

    it("does not render the title heading when title is missing", () => {
        const wrapper = mount(SldsVerticalNavigationSection, {
            slots: { default: "<li>Item</li>" },
        })

        expect(wrapper.find("h2.slds-nav-vertical__title").exists()).toBe(false)
    })


    it("has no axe-detectable accessibility violations in its default state", async () => {
        const wrapper = mount(SldsVerticalNavigationSection, {
            props: { title: "Reports" },
            slots: { default: "<li>Item</li>" },
            attachTo: document.body,
        })

        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)

        wrapper.unmount()
    })
})
