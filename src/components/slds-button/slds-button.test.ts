import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsButton from "./slds-button.vue"

describe("SldsButton", () => {
    it("renders the label inside a <button>", () => {
        const wrapper = mount(SldsButton, {
            props: { label: "Save" },
        })

        const button = wrapper.find("button")
        expect(button.exists()).toBe(true)
        expect(button.text()).toContain("Save")
    })

    it("renders default slot content over the label prop", () => {
        const wrapper = mount(SldsButton, {
            props: { label: "Ignored" },
            slots: { default: "From slot" },
        })

        expect(wrapper.text()).toContain("From slot")
        expect(wrapper.text()).not.toContain("Ignored")
    })

    it("emits a native click event when not disabled", async () => {
        const wrapper = mount(SldsButton, {
            props: { label: "Save" },
        })

        await wrapper.find("button").trigger("click")
        expect(wrapper.emitted("click")).toHaveLength(1)
    })

    it("forwards the disabled attribute to the underlying <button>", () => {
        const wrapper = mount(SldsButton, {
            props: { label: "Save", disabled: true },
        })

        const button = wrapper.find("button")
        expect(button.attributes("disabled")).toBeDefined()
    })

    it("does not include slds-has-animation when disabled", () => {
        const wrapper = mount(SldsButton, {
            props: { label: "Save", disabled: true },
        })

        expect(wrapper.find("button").classes()).not.toContain("slds-has-animation")
    })

    it("includes slds-has-animation when not disabled", () => {
        const wrapper = mount(SldsButton, {
            props: { label: "Save" },
        })

        expect(wrapper.find("button").classes()).toContain("slds-has-animation")
    })

    it("applies the brand variant class for the brand theme", () => {
        const wrapper = mount(SldsButton, {
            props: { label: "Save", brand: true },
        })

        const button = wrapper.find("button")
        expect(button.classes()).toContain("slds-button_brand")
    })

    it("applies the neutral variant class", () => {
        const wrapper = mount(SldsButton, {
            props: { label: "Save", neutral: true },
        })

        expect(wrapper.find("button").classes()).toContain("slds-button_neutral")
    })

    it("applies the outlineBrand variant class", () => {
        const wrapper = mount(SldsButton, {
            props: { label: "Save", outlineBrand: true },
        })

        expect(wrapper.find("button").classes()).toContain("slds-button_outline-brand")
    })

    it("applies the destructive variant class", () => {
        const wrapper = mount(SldsButton, {
            props: { label: "Save", destructive: true },
        })

        expect(wrapper.find("button").classes()).toContain("slds-button_destructive")
    })

    it("applies the textDestructive variant class", () => {
        const wrapper = mount(SldsButton, {
            props: { label: "Save", textDestructive: true },
        })

        expect(wrapper.find("button").classes()).toContain("slds-button_text-destructive")
    })

    it("applies the success variant class", () => {
        const wrapper = mount(SldsButton, {
            props: { label: "Save", success: true },
        })

        expect(wrapper.find("button").classes()).toContain("slds-button_success")
    })

    it("applies the inverse variant class", () => {
        const wrapper = mount(SldsButton, {
            props: { label: "Save", inverse: true },
        })

        expect(wrapper.find("button").classes()).toContain("slds-button_inverse")
    })

    it("applies the stretch class when stretch is true", () => {
        const wrapper = mount(SldsButton, {
            props: { label: "Save", stretch: true },
        })

        expect(wrapper.find("button").classes()).toContain("slds-button_stretch")
    })

    it("applies slds-unclickable when showSpinner is true", () => {
        const wrapper = mount(SldsButton, {
            props: { label: "Save", showSpinner: true },
        })

        expect(wrapper.find("button").classes()).toContain("slds-unclickable")
    })

    it("applies the title attribute when provided", () => {
        const wrapper = mount(SldsButton, {
            props: { label: "Save", title: "Save changes" },
        })

        expect(wrapper.find("button").attributes("title")).toBe("Save changes")
    })

    it("respects the type prop (e.g. submit)", () => {
        const wrapper = mount(SldsButton, {
            props: { label: "Save", type: "submit" },
        })

        expect(wrapper.find("button").attributes("type")).toBe("submit")
    })

    it("defaults the native type attribute to 'button' so it doesn't submit forms by accident", () => {
        const wrapper = mount(SldsButton, {
            props: { label: "Save" },
        })

        const button = wrapper.find("button")
        expect(button.attributes("type")).toBe("button")
    })

    it("renders the spinner only when showSpinner is true", async () => {
        const wrapper = mount(SldsButton, {
            props: { label: "Save" },
        })
        expect(wrapper.find("[data-testid=\"spinner\"]").exists()).toBe(false)

        await wrapper.setProps({ showSpinner: true })
        expect(wrapper.find("[data-testid=\"spinner\"]").exists()).toBe(true)
    })

    it("applies the white spinner theme for brand buttons", () => {
        const wrapper = mount(SldsButton, {
            props: { label: "Save", brand: true, showSpinner: true },
        })

        expect(wrapper.find("[data-testid=\"spinner\"]").classes()).toContain("slds-spinner-white")
    })

    it("applies the white spinner theme for destructive buttons", () => {
        const wrapper = mount(SldsButton, {
            props: { label: "Save", destructive: true, showSpinner: true },
        })

        expect(wrapper.find("[data-testid=\"spinner\"]").classes()).toContain("slds-spinner-white")
    })

    it("applies the white spinner theme for success buttons", () => {
        const wrapper = mount(SldsButton, {
            props: { label: "Save", success: true, showSpinner: true },
        })

        expect(wrapper.find("[data-testid=\"spinner\"]").classes()).toContain("slds-spinner-white")
    })

    it("applies the brand spinner theme for outlineBrand buttons", () => {
        const wrapper = mount(SldsButton, {
            props: { label: "Save", outlineBrand: true, showSpinner: true },
        })

        expect(wrapper.find("[data-testid=\"spinner\"]").classes()).toContain("slds-spinner-brand")
    })

    it("renders an icon when iconName is provided (default left-positioned)", () => {
        const wrapper = mount(SldsButton, {
            props: { label: "Save", iconName: "utility:check" },
        })

        expect(wrapper.find("svg").exists()).toBe(true)
        const icon = wrapper.find(".slds-button__icon")
        expect(icon.classes()).toContain("slds-button__icon_left")
    })

    it("renders an icon on the right when iconRight is true", () => {
        const wrapper = mount(SldsButton, {
            props: { label: "Save", iconName: "utility:check", iconRight: true },
        })

        const icon = wrapper.find(".slds-button__icon")
        expect(icon.classes()).toContain("slds-button__icon_right")
    })

    it("hides the icon when showSpinner is true", () => {
        const wrapper = mount(SldsButton, {
            props: { label: "Save", iconName: "utility:check", showSpinner: true },
        })

        expect(wrapper.find(".slds-button__icon").classes()).toContain("slds-hidden")
    })

    it("calls preventDefault when handleClick runs while disabled", () => {
        const wrapper = mount(SldsButton, {
            props: { label: "Save", disabled: true },
        })

        const event = new MouseEvent("click", { cancelable: true })
        ;(wrapper.vm as unknown as { handleClick: (_event: Event) => void }).handleClick(event)
        expect(event.defaultPrevented).toBe(true)
    })

    it("calls preventDefault when handleClick runs while spinner is shown", () => {
        const wrapper = mount(SldsButton, {
            props: { label: "Save", showSpinner: true },
        })

        const event = new MouseEvent("click", { cancelable: true })
        ;(wrapper.vm as unknown as { handleClick: (_event: Event) => void }).handleClick(event)
        expect(event.defaultPrevented).toBe(true)
    })

    it("does not preventDefault when handleClick runs in normal state", () => {
        const wrapper = mount(SldsButton, {
            props: { label: "Save" },
        })

        const event = new MouseEvent("click", { cancelable: true })
        ;(wrapper.vm as unknown as { handleClick: (_event: Event) => void }).handleClick(event)
        expect(event.defaultPrevented).toBe(false)
    })

    it("has no axe-detectable accessibility violations in its default state", async () => {
        const wrapper = mount(SldsButton, {
            props: { label: "Save" },
            attachTo: document.body,
        })

        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)

        wrapper.unmount()
    })
})
