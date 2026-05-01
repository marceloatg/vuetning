import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsBrandBand from "./slds-brand-band.vue"

describe("SldsBrandBand", () => {
    it("renders the brand band div", () => {
        const wrapper = mount(SldsBrandBand)
        expect(wrapper.find(".slds-brand-band").exists()).toBe(true)
    })

    it("applies the large size modifier when large is true", () => {
        const wrapper = mount(SldsBrandBand, {
            props: { large: true },
        })
        expect(wrapper.classes()).toContain("slds-brand-band_large")
    })


    it("has no axe-detectable accessibility violations in its default state", async () => {
        const wrapper = mount(SldsBrandBand, { attachTo: document.body })
        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)
        wrapper.unmount()
    })

    it("uses the medium size by default", () => {
        const wrapper = mount(SldsBrandBand)
        expect(wrapper.classes()).toContain("slds-brand-band_medium")
    })

    it("applies the small size modifier", () => {
        const wrapper = mount(SldsBrandBand, { props: { small: true } })
        expect(wrapper.classes()).toContain("slds-brand-band_small")
    })

    it("uses the default theme when no theme prop is set", () => {
        const wrapper = mount(SldsBrandBand)
        expect(wrapper.classes()).toContain("slds-brand-band_default")
    })

    it("applies the no-theme modifier when noTheme is true", () => {
        const wrapper = mount(SldsBrandBand, { props: { noTheme: true } })
        expect(wrapper.classes()).toContain("slds-brand-band_none")
    })

    it("applies the user theme modifier when userTheme is true", () => {
        const wrapper = mount(SldsBrandBand, { props: { userTheme: true } })
        expect(wrapper.classes()).toContain("slds-brand-band_user")
    })

    it("applies the public group theme modifier", () => {
        const wrapper = mount(SldsBrandBand, { props: { groupPublicTheme: true } })
        expect(wrapper.classes()).toContain("slds-brand-band_group-public")
    })

    it("applies the private group theme modifier", () => {
        const wrapper = mount(SldsBrandBand, { props: { groupPrivateTheme: true } })
        expect(wrapper.classes()).toContain("slds-brand-band_group-private")
    })

    it("sets default CSS custom properties on mount", () => {
        const wrapper = mount(SldsBrandBand, { attachTo: document.body })
        const element = wrapper.element as HTMLElement
        expect(element.style.getPropertyValue("--start-color")).toBe("rgb(27, 95, 158)")
        expect(element.style.getPropertyValue("--end-color")).toBe("rgb(176, 196, 223)")
        wrapper.unmount()
    })

    it("uses startColor and endColor props when provided", () => {
        const wrapper = mount(SldsBrandBand, {
            props: { startColor: "#ff0000", endColor: "#00ff00" },
            attachTo: document.body,
        })
        const element = wrapper.element as HTMLElement
        expect(element.style.getPropertyValue("--start-color")).toBe("#ff0000")
        expect(element.style.getPropertyValue("--end-color")).toBe("#00ff00")
        wrapper.unmount()
    })

    it("re-applies CSS variables when startColor changes", async () => {
        const wrapper = mount(SldsBrandBand, {
            props: { startColor: "#ff0000" },
            attachTo: document.body,
        })

        await wrapper.setProps({ startColor: "#0000ff" })
        const element = wrapper.element as HTMLElement
        expect(element.style.getPropertyValue("--start-color")).toBe("#0000ff")
        wrapper.unmount()
    })

    it("re-applies CSS variables when endColor changes", async () => {
        const wrapper = mount(SldsBrandBand, {
            props: { endColor: "#00ff00" },
            attachTo: document.body,
        })

        await wrapper.setProps({ endColor: "#ff00ff" })
        const element = wrapper.element as HTMLElement
        expect(element.style.getPropertyValue("--end-color")).toBe("#ff00ff")
        wrapper.unmount()
    })
})
