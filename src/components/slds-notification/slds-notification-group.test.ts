import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsNotificationGroup from "./slds-notification-group.vue"
import type { Notification } from "./notification"

const NOTIFICATIONS: Notification[] = [
    { id: "1", subject: "Heads up", message: "Something happened" },
    { id: "2", subject: "Notice", message: "Another thing" },
]

describe("SldsNotificationGroup", () => {
    it("renders one notification per item", () => {
        const wrapper = mount(SldsNotificationGroup, {
            props: { notifications: NOTIFICATIONS },
        })

        expect(wrapper.findAll(".slds-notification").length).toBe(2)
    })

    it("renders the notification subjects", () => {
        const wrapper = mount(SldsNotificationGroup, {
            props: { notifications: NOTIFICATIONS },
        })
        expect(wrapper.text()).toContain("Heads up")
        expect(wrapper.text()).toContain("Notice")
    })

    it("emits close with the closed notification when a child notification is closed", async () => {
        const wrapper = mount(SldsNotificationGroup, {
            props: { notifications: NOTIFICATIONS },
        })

        await wrapper.findAll(".slds-notification__close")[0].trigger("click")
        expect(wrapper.emitted("close")).toBeTruthy()
        expect(wrapper.emitted("close")![0][0]).toEqual(NOTIFICATIONS[0])
    })

    it("uses notification-fade animation when 3 or fewer notifications", () => {
        const wrapper = mount(SldsNotificationGroup, {
            props: { notifications: NOTIFICATIONS },
        })

        expect(wrapper.html()).not.toContain("notification-fade-overflow")
    })

    it("uses notification-fade-overflow when more than 3 notifications", () => {
        const many: Notification[] = [
            { id: "1", subject: "A", message: "1" },
            { id: "2", subject: "B", message: "2" },
            { id: "3", subject: "C", message: "3" },
            { id: "4", subject: "D", message: "4" },
        ]

        const wrapper = mount(SldsNotificationGroup, {
            props: { notifications: many },
        })

        expect(wrapper.findAll(".slds-notification").length).toBe(4)
    })

    it("falls back to the default empty notifications list", () => {
        const wrapper = mount(SldsNotificationGroup)

        expect(wrapper.findAll(".slds-notification").length).toBe(0)
    })

    it("has no axe-detectable accessibility violations in its default state", async () => {
        const wrapper = mount(SldsNotificationGroup, {
            props: { notifications: NOTIFICATIONS },
            attachTo: document.body,
        })
        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)
        wrapper.unmount()
    })
})
