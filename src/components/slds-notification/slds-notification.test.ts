import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsNotification from "./slds-notification.vue"

describe("SldsNotification", () => {
    it("renders the notification with subject and message", () => {
        const wrapper = mount(SldsNotification, {
            props: { subject: "Heads up", message: "Something happened" },
        })

        expect(wrapper.find("section.slds-notification").exists()).toBe(true)
        expect(wrapper.text()).toContain("Heads up")
        expect(wrapper.text()).toContain("Something happened")
    })

    it("emits click when the body is clicked", async () => {
        const wrapper = mount(SldsNotification, {
            props: { subject: "Heads up", message: "Something happened" },
        })

        await wrapper.find(".slds-notification__target").trigger("click")
        expect(wrapper.emitted("click")).toBeTruthy()
    })

    it("emits close when the close button is clicked", async () => {
        const wrapper = mount(SldsNotification, {
            props: { subject: "Heads up", message: "Something happened" },
        })

        await wrapper.find(".slds-notification__close").trigger("click")
        expect(wrapper.emitted("close")).toHaveLength(1)
    })

    it("renders an icon when iconName is provided", () => {
        const wrapper = mount(SldsNotification, {
            props: { subject: "Heads up", message: "Hi", iconName: "utility:notification" },
        })

        expect(wrapper.find(".slds-icon").exists()).toBe(true)
    })

    it("does not render an icon when iconName is omitted", () => {
        const wrapper = mount(SldsNotification, {
            props: { subject: "Heads up", message: "Hi" },
        })

        expect(wrapper.find(".slds-icon").exists()).toBe(false)
    })

    it("forwards iconClass to the icon when iconName is provided", () => {
        const wrapper = mount(SldsNotification, {
            props: {
                subject: "Heads up",
                message: "Hi",
                iconName: "utility:notification",
                iconClass: "custom-icon-class",
            },
        })

        expect(wrapper.html()).toContain("custom-icon-class")
    })

    it("has no axe-detectable accessibility violations in its default state", async () => {
        const wrapper = mount(SldsNotification, {
            props: { subject: "Heads up", message: "Something happened" },
            attachTo: document.body,
        })
        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)
        wrapper.unmount()
    })
})
