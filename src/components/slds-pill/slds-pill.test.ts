import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsPill from "./slds-pill.vue"

describe("SldsPill", () => {
    it("renders the pill with its label", () => {
        const wrapper = mount(SldsPill, {
            props: { label: "Tag" },
        })

        expect(wrapper.find(".slds-pill").exists()).toBe(true)
        expect(wrapper.text()).toContain("Tag")
    })

    it("hides the remove button when nonRemovable is true", () => {
        const wrapper = mount(SldsPill, {
            props: { label: "Tag", nonRemovable: true },
        })
        expect(wrapper.find(".slds-pill__remove").exists()).toBe(false)
    })

    it("emits remove when the remove button is clicked", async () => {
        const wrapper = mount(SldsPill, {
            props: { label: "Tag" },
        })

        await wrapper.find(".slds-pill__remove").trigger("click")
        expect(wrapper.emitted("remove")).toHaveLength(1)
    })

    it("renders an icon container when iconName is provided", () => {
        const wrapper = mount(SldsPill, {
            props: { label: "Tag", iconName: "utility:user" },
        })

        expect(wrapper.find(".slds-pill__icon_container").exists()).toBe(true)
    })

    it("renders an avatar container when src is provided", () => {
        const wrapper = mount(SldsPill, {
            props: { label: "Tag", src: "https://example.com/a.png" },
        })

        const containers = wrapper.findAll(".slds-pill__icon_container")
        expect(containers.length).toBeGreaterThan(0)
    })

    it("applies the slds-has-error class when hasError is true", () => {
        const wrapper = mount(SldsPill, {
            props: { label: "Tag", hasError: true },
        })

        expect(wrapper.find(".slds-pill").classes()).toContain("slds-has-error")
    })

    it("applies the non-removable action class when nonRemovable is true", () => {
        const wrapper = mount(SldsPill, {
            props: { label: "Tag", nonRemovable: true },
        })

        expect(wrapper.find(".slds-pill__action").classes()).toContain("non-removable")
    })

    it("applies the slds-text-link_reset class when link is false", () => {
        const wrapper = mount(SldsPill, {
            props: { label: "Tag" },
        })

        expect(wrapper.find(".slds-pill__action").classes()).toContain("slds-text-link_reset")
    })

    it("does not apply slds-text-link_reset when link is true", () => {
        const wrapper = mount(SldsPill, {
            props: { label: "Tag", link: true },
        })

        expect(wrapper.find(".slds-pill__action").classes()).not.toContain("slds-text-link_reset")
    })

    it("forwards the title attribute on the action anchor", () => {
        const wrapper = mount(SldsPill, {
            props: { label: "Tag", title: "Full label" },
        })

        expect(wrapper.find(".slds-pill__action").attributes("title")).toBe("Full label")
    })

    it("emits a click via handleClickPill when link is true", async () => {
        const wrapper: any = mount(SldsPill, {
            props: { label: "Tag", link: true, nonRemovable: true },
        })

        await wrapper.find(".slds-pill__label").trigger("click")
        const emissions = (wrapper.emitted("click") || []) as unknown[][]
        expect(emissions.length).toBeGreaterThanOrEqual(1)
    })

    it("does not emit a click via handleClickPill when link is false", () => {
        const wrapper: any = mount(SldsPill, {
            props: { label: "Tag" },
        })

        wrapper.vm.handleClickPill()
        expect(wrapper.emitted("click")).toBeFalsy()
    })

    it("has no axe-detectable accessibility violations in its default state", async () => {
        const wrapper = mount(SldsPill, {
            props: { label: "Tag" },
            attachTo: document.body,
        })
        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)
        wrapper.unmount()
    })
})
