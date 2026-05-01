import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import { defineComponent, h } from "vue"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsTab from "./slds-tab.vue"

describe("SldsTab", () => {
    it("renders an <li> with a tab role anchor", () => {
        const wrapper = mount(SldsTab, {
            props: { label: "Details", name: "details" },
        })

        expect(wrapper.find("li.slds-tabs_default__item").exists()).toBe(true)
        expect(wrapper.find("[role=\"tab\"]").exists()).toBe(true)
        expect(wrapper.text()).toContain("Details")
    })

    it("does not apply slds-is-active when isActive is false", () => {
        const wrapper = mount(SldsTab, {
            props: { label: "Details", name: "details" },
        })

        expect(wrapper.find("li").classes()).not.toContain("slds-is-active")
        expect(wrapper.find("[role=\"tab\"]").attributes("aria-selected")).toBe("false")
        expect(wrapper.find("[role=\"tab\"]").attributes("tabindex")).toBe("-1")
    })

    it("adds the slds-is-active class when isActive is true", () => {
        const wrapper = mount(SldsTab, {
            props: { label: "Details", name: "details", isActive: true },
        })

        expect(wrapper.find("li").classes()).toContain("slds-is-active")
        expect(wrapper.find("[role=\"tab\"]").attributes("aria-selected")).toBe("true")
        expect(wrapper.find("[role=\"tab\"]").attributes("tabindex")).toBe("0")
    })

    it("uses the name to compose anchor and aria-controls ids", () => {
        const wrapper = mount(SldsTab, {
            props: { label: "Details", name: "details" },
        })

        const anchor = wrapper.find("[role=\"tab\"]")
        expect(anchor.attributes("id")).toBe("tab-default-details__item")
        expect(anchor.attributes("aria-controls")).toBe("tab-default-details")
    })

    it("does not render the icon when iconName is missing", () => {
        const wrapper = mount(SldsTab, {
            props: { label: "Details", name: "details" },
        })

        expect(wrapper.find(".slds-tabs__left-icon").findComponent({ name: "slds-icon" }).exists()).toBe(false)
    })

    it("renders the icon when iconName is provided", () => {
        const wrapper = mount(SldsTab, {
            props: { label: "Details", name: "details", iconName: "utility:home" },
        })

        expect(wrapper.find(".slds-tabs__left-icon").findComponent({ name: "slds-icon" }).exists()).toBe(true)
    })

    it("does not render the error icon when hasError is false", () => {
        const wrapper = mount(SldsTab, {
            props: { label: "Details", name: "details" },
        })

        expect(wrapper.find(".slds-tabs__right-icon").findComponent({ name: "slds-icon" }).exists()).toBe(false)
    })

    it("renders the error icon when hasError is true", () => {
        const wrapper = mount(SldsTab, {
            props: { label: "Details", name: "details", hasError: true },
        })

        expect(wrapper.find(".slds-tabs__right-icon").findComponent({ name: "slds-icon" }).exists()).toBe(true)
    })


    it("has no axe-detectable accessibility violations when wrapped in a tablist with a matching panel", async () => {
        const Host = defineComponent({
            components: { SldsTab },
            render() {
                return h("div", {}, [
                    h("ul", { class: "slds-tabs_default__nav", role: "tablist" }, [
                        h(SldsTab, { label: "Details", name: "details", isActive: true }),
                    ]),
                    h("div", { id: "tab-default-details", role: "tabpanel", "aria-labelledby": "tab-default-details__item" }, "Body"),
                ])
            },
        })

        const wrapper = mount(Host, { attachTo: document.body })
        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)
        wrapper.unmount()
    })
})
