import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsToast from "./slds-toast.vue"

describe("SldsToast", () => {
    it("renders a notify toast with a status role", () => {
        const wrapper = mount(SldsToast, {
            slots: { heading: "Saved" },
        })

        const root = wrapper.find("[role=\"status\"]")
        expect(root.exists()).toBe(true)
        expect(root.classes()).toContain("slds-notify_toast")
        expect(wrapper.text()).toContain("Saved")
    })

    it("applies the success theme when the success prop is set", () => {
        const wrapper = mount(SldsToast, {
            props: { success: true },
            slots: { heading: "OK" },
        })

        expect(wrapper.find("[role=\"status\"]").classes()).toContain("slds-theme_success")
    })

    it("emits close when the close button is clicked", async () => {
        const wrapper = mount(SldsToast, {
            slots: { heading: "Hi" },
        })

        await wrapper.find(".slds-notify__close button").trigger("click")
        expect(wrapper.emitted("close")).toHaveLength(1)
    })

    it("applies the info theme by default when no variant prop is set", () => {
        const wrapper = mount(SldsToast, {
            slots: { heading: "Hi" },
        })
        expect(wrapper.find("[role=\"status\"]").classes()).toContain("slds-theme_info")
    })

    it("applies the error theme and error icon class when error is true", () => {
        const wrapper: any = mount(SldsToast, {
            props: { error: true, icon: "utility:error" },
            slots: { heading: "Bad" },
        })
        expect(wrapper.find("[role=\"status\"]").classes()).toContain("slds-theme_error")
        expect(wrapper.vm.iconClassNames).toContain("slds-icon-utility-error")
    })

    it("applies the warning theme and warning icon class when warning is true", () => {
        const wrapper: any = mount(SldsToast, {
            props: { warning: true, icon: "utility:warning" },
            slots: { heading: "Warn" },
        })
        expect(wrapper.find("[role=\"status\"]").classes()).toContain("slds-theme_warning")
        expect(wrapper.vm.iconClassNames).toContain("slds-icon-utility-warning")
    })

    it("uses the success icon class when success is true and an icon is provided", () => {
        const wrapper: any = mount(SldsToast, {
            props: { success: true, icon: "utility:success" },
            slots: { heading: "OK" },
        })
        expect(wrapper.vm.iconClassNames).toContain("slds-icon-utility-success")
    })

    it("uses the info icon class by default when an icon is provided without a variant", () => {
        const wrapper: any = mount(SldsToast, {
            props: { icon: "utility:info" },
            slots: { heading: "Hi" },
        })
        expect(wrapper.vm.iconClassNames).toContain("slds-icon-utility-info")
    })

    it("renders assistive text when assistiveText is provided", () => {
        const wrapper = mount(SldsToast, {
            props: { assistiveText: "Announcement" },
            slots: { heading: "Hi" },
        })
        expect(wrapper.find(".slds-assistive-text").text()).toBe("Announcement")
    })

    it("renders the details slot", () => {
        const wrapper = mount(SldsToast, {
            slots: { heading: "Saved", details: "<p>Extra details</p>" },
        })
        expect(wrapper.text()).toContain("Extra details")
    })

    it("does not render the icon when no icon prop is provided", () => {
        const wrapper = mount(SldsToast, {
            slots: { heading: "Hi" },
        })
        expect(wrapper.find(".slds-icon-utility-info").exists()).toBe(false)
    })

    it("has no axe-detectable accessibility violations in its default state", async () => {
        const wrapper = mount(SldsToast, {
            slots: { heading: "Saved" },
            attachTo: document.body,
        })

        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)

        wrapper.unmount()
    })
})
