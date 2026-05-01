import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsScopedNotification from "./slds-scoped-notification.vue"

describe("SldsScopedNotification", () => {
    it("renders the notification with status role", () => {
        const wrapper = mount(SldsScopedNotification, {
            slots: { default: "<p>Heads up</p>" },
        })

        expect(wrapper.find(".slds-scoped-notification").exists()).toBe(true)
        expect(wrapper.attributes("role")).toBe("status")
    })

    it("applies the warning theme when warning is true", () => {
        const wrapper = mount(SldsScopedNotification, {
            props: { warning: true },
            slots: { default: "<p>Body</p>" },
        })
        expect(wrapper.find(".slds-scoped-notification").classes()).toContain("slds-theme_warning")
    })


    it("uses the light variant by default when no theme is set", () => {
        const wrapper = mount(SldsScopedNotification, { slots: { default: "<p>Hi</p>" } })
        expect(wrapper.find(".slds-scoped-notification").classes()).toContain("slds-scoped-notification_light")
    })

    it("applies the error theme when error is true", () => {
        const wrapper = mount(SldsScopedNotification, { props: { error: true }, slots: { default: "<p>x</p>" } })
        expect(wrapper.find(".slds-scoped-notification").classes()).toContain("slds-theme_error")
    })

    it("applies the info theme when info is true", () => {
        const wrapper = mount(SldsScopedNotification, { props: { info: true }, slots: { default: "<p>x</p>" } })
        expect(wrapper.find(".slds-scoped-notification").classes()).toContain("slds-theme_info")
    })

    it("applies the success theme when success is true", () => {
        const wrapper = mount(SldsScopedNotification, { props: { success: true }, slots: { default: "<p>x</p>" } })
        expect(wrapper.find(".slds-scoped-notification").classes()).toContain("slds-theme_success")
    })

    it("uses an explicit iconName when provided", () => {
        const wrapper = mount(SldsScopedNotification, {
            props: { iconName: "utility:announcement" },
            slots: { default: "<p>x</p>" },
        })
        expect(wrapper.find(".slds-icon").exists()).toBe(true)
    })

    it("falls back to the success icon name when success is true and no iconName provided", () => {
        const wrapper: any = mount(SldsScopedNotification, { props: { success: true }, slots: { default: "<p>x</p>" } })
        expect(wrapper.vm.fallbackIconName).toBe("utility:success")
    })

    it("falls back to the warning icon name when warning is true and no iconName provided", () => {
        const wrapper: any = mount(SldsScopedNotification, { props: { warning: true }, slots: { default: "<p>x</p>" } })
        expect(wrapper.vm.fallbackIconName).toBe("utility:warning")
    })

    it("falls back to the error icon name when error is true and no iconName provided", () => {
        const wrapper: any = mount(SldsScopedNotification, { props: { error: true }, slots: { default: "<p>x</p>" } })
        expect(wrapper.vm.fallbackIconName).toBe("utility:error")
    })

    it("falls back to the info icon name by default", () => {
        const wrapper: any = mount(SldsScopedNotification, { slots: { default: "<p>x</p>" } })
        expect(wrapper.vm.fallbackIconName).toBe("utility:info")
    })

    it("uses the inverse theme when error/info/success", () => {
        const errorWrapper: any = mount(SldsScopedNotification, { props: { error: true }, slots: { default: "<p>x</p>" } })
        expect(errorWrapper.vm.inverse).toBe(true)
        const warningWrapper: any = mount(SldsScopedNotification, { props: { warning: true }, slots: { default: "<p>x</p>" } })
        expect(warningWrapper.vm.inverse).toBe(false)
    })

    it("has no axe-detectable accessibility violations in its default state", async () => {
        const wrapper = mount(SldsScopedNotification, {
            slots: { default: "<p>Heads up</p>" },
            attachTo: document.body,
        })
        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)
        wrapper.unmount()
    })
})
