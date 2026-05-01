import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsGlobalHeader from "./slds-global-header.vue"

describe("SldsGlobalHeader", () => {
    it("renders the global header container", () => {
        const wrapper = mount(SldsGlobalHeader, {
            props: { title: "App", logoAssistiveText: "App Logo" },
        })

        expect(wrapper.find("header.slds-global-header_container").exists()).toBe(true)
    })

    it("renders the title when provided", () => {
        const wrapper = mount(SldsGlobalHeader, {
            props: { title: "My App", logoAssistiveText: "My App Logo" },
        })
        expect(wrapper.text()).toContain("My App")
    })

    it("renders the badge next to the title when badge is provided", () => {
        const wrapper = mount(SldsGlobalHeader, {
            props: { title: "App", badge: "Beta" },
        })

        expect(wrapper.find(".slds-badge").exists()).toBe(true)
        expect(wrapper.find(".slds-badge").text()).toContain("Beta")
    })

    it("renders the assistive text for the default logo", () => {
        const wrapper = mount(SldsGlobalHeader, {
            props: { title: "App", logoAssistiveText: "App Logo" },
        })

        expect(wrapper.find(".slds-assistive-text").text()).toContain("App Logo")
    })

    it("hides the logo block when noLogo is true", () => {
        const wrapper = mount(SldsGlobalHeader, {
            props: { title: "App", noLogo: true },
        })

        expect(wrapper.find(".slds-global-header__logo").exists()).toBe(false)
        expect(wrapper.find(".slds-global-header__title").exists()).toBe(false)
    })

    it("renders the custom logo slot inside a grid layout", () => {
        const wrapper = mount(SldsGlobalHeader, {
            props: { title: "App" },
            slots: { logo: "<img data-testid='custom-logo' src='/x.png'>" },
        })

        expect(wrapper.find("[data-testid='custom-logo']").exists()).toBe(true)
        expect(wrapper.find(".custom-logo").exists()).toBe(true)
    })

    it("renders the custom logo slot with a badge", () => {
        const wrapper = mount(SldsGlobalHeader, {
            props: { title: "App", badge: "BB" },
            slots: { logo: "<img src='/x.png'>" },
        })

        expect(wrapper.find(".slds-badge").exists()).toBe(true)
    })

    it("does not render the title block when title is omitted", () => {
        const wrapper = mount(SldsGlobalHeader)

        expect(wrapper.find(".slds-global-header__title").exists()).toBe(false)
    })

    it("renders the actions slot inside the actions list", () => {
        const wrapper = mount(SldsGlobalHeader, {
            slots: { actions: "<li class='custom-action'/>" },
        })

        expect(wrapper.find(".slds-global-actions .custom-action").exists()).toBe(true)
    })


    it("has no axe-detectable accessibility violations in its default state", async () => {
        const wrapper = mount(SldsGlobalHeader, {
            props: { title: "App", logoAssistiveText: "App Logo" },
            attachTo: document.body,
        })
        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)
        wrapper.unmount()
    })
})
