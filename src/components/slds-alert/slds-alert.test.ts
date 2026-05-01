import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsAlert from "./slds-alert.vue"

describe("SldsAlert", () => {
    it("renders an alert role with the message", () => {
        const wrapper = mount(SldsAlert, {
            props: { message: "Heads up", assistiveText: "Notice" },
        })

        expect(wrapper.attributes("role")).toBe("alert")
        expect(wrapper.text()).toContain("Heads up")
    })

    it("hides the close button when nonCloseable is true", () => {
        const wrapper = mount(SldsAlert, {
            props: { message: "Heads up", assistiveText: "Notice", nonCloseable: true },
        })
        expect(wrapper.find(".slds-notify__close").exists()).toBe(false)
    })

    it("emits close when the close button is clicked", async () => {
        const wrapper = mount(SldsAlert, {
            props: { message: "Heads up", assistiveText: "Notice" },
        })

        await wrapper.find(".slds-notify__close button").trigger("click")
        expect(wrapper.emitted("close")).toHaveLength(1)
    })

    it("applies the info theme by default", () => {
        const wrapper = mount(SldsAlert, {
            props: { message: "Heads up", assistiveText: "Notice" },
        })
        expect(wrapper.classes()).toContain("slds-theme_info")
    })

    it("applies the error theme when error is true", () => {
        const wrapper = mount(SldsAlert, {
            props: { message: "x", assistiveText: "y", error: true },
        })
        expect(wrapper.classes()).toContain("slds-theme_error")
    })

    it("applies the offline theme when offline is true", () => {
        const wrapper = mount(SldsAlert, {
            props: { message: "x", assistiveText: "y", offline: true },
        })
        expect(wrapper.classes()).toContain("slds-theme_offline")
    })

    it("applies the warning theme when warning is true", () => {
        const wrapper = mount(SldsAlert, {
            props: { message: "x", assistiveText: "y", warning: true },
        })
        expect(wrapper.classes()).toContain("slds-theme_warning")
    })

    it("applies the no-texture modifier when noTexture is true", () => {
        const wrapper = mount(SldsAlert, {
            props: { message: "x", assistiveText: "y", noTexture: true },
        })
        expect(wrapper.classes()).toContain("slds-theme_alert-no-texture")
    })

    it("renders an icon when iconName is provided", () => {
        const wrapper = mount(SldsAlert, {
            props: { message: "x", assistiveText: "y", iconName: "utility:warning" },
        })
        expect(wrapper.find(".slds-icon").exists()).toBe(true)
    })

    it("renders the assistive-text span when assistiveText is provided", () => {
        const wrapper = mount(SldsAlert, {
            props: { message: "Heads up", assistiveText: "Notice" },
        })
        // The first assistive-text node belongs to the alert itself.
        const node = wrapper.findAll(".slds-assistive-text")[0]
        expect(node.text()).toBe("Notice")
    })

    it("renders default slot content over the message prop", () => {
        const wrapper = mount(SldsAlert, {
            props: { message: "Ignored", assistiveText: "y" },
            slots: { default: "<span class=\"custom\">Custom</span>" },
        })
        expect(wrapper.find(".custom").exists()).toBe(true)
    })

    it("has no axe-detectable accessibility violations in its default state", async () => {
        const wrapper = mount(SldsAlert, {
            props: { message: "Heads up", assistiveText: "Notice" },
            attachTo: document.body,
        })
        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)
        wrapper.unmount()
    })
})
