import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsAccordion from "./slds-accordion.vue"
import type { AccordionSection } from "./accordion-section"

const SECTIONS: AccordionSection[] = [
    { id: "1", name: "first", label: "First", content: "First content" },
    { id: "2", name: "second", label: "Second", content: "Second content" },
]

describe("SldsAccordion", () => {
    it("renders the accordion list with one item per section", () => {
        const wrapper = mount(SldsAccordion, {
            props: { sections: SECTIONS, activeSectionName: "first" },
        })

        expect(wrapper.find("ul.slds-accordion").exists()).toBe(true)
        expect(wrapper.findAll(".slds-accordion__list-item").length).toBe(2)
    })

    it("opens the active section based on activeSectionName", () => {
        const wrapper = mount(SldsAccordion, {
            props: { sections: SECTIONS, activeSectionName: "first" },
        })
        const sections = wrapper.findAll(".slds-accordion__section")
        expect(sections[0].classes()).toContain("slds-is-open")
        expect(sections[1].classes()).not.toContain("slds-is-open")
    })

    it("emits active-section-change when a section header is clicked", async () => {
        const wrapper = mount(SldsAccordion, {
            props: { sections: SECTIONS, activeSectionName: "first" },
        })

        await wrapper.findAll(".slds-accordion__summary-action")[1].trigger("click")
        expect(wrapper.emitted("active-section-change")).toBeTruthy()
    })

    it("has no axe-detectable accessibility violations in its default state", async () => {
        const wrapper = mount(SldsAccordion, {
            props: { sections: SECTIONS, activeSectionName: "first" },
            attachTo: document.body,
        })
        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)
        wrapper.unmount()
    })

    it("collapses the active section when its header is clicked again (single mode)", async () => {
        const wrapper = mount(SldsAccordion, {
            props: { sections: SECTIONS, activeSectionName: "first" },
        })

        await wrapper.findAll(".slds-accordion__summary-action")[0].trigger("click")
        const sections = wrapper.findAll(".slds-accordion__section")
        expect(sections[0].classes()).not.toContain("slds-is-open")
    })

    it("opens multiple sections when allowMultipleSectionsOpen is true", async () => {
        const wrapper = mount(SldsAccordion, {
            props: { sections: SECTIONS, activeSectionNames: ["first"], allowMultipleSectionsOpen: true },
        })

        await wrapper.findAll(".slds-accordion__summary-action")[1].trigger("click")
        const sections = wrapper.findAll(".slds-accordion__section")
        expect(sections[0].classes()).toContain("slds-is-open")
        expect(sections[1].classes()).toContain("slds-is-open")
    })

    it("toggles a section closed in multiple mode when clicked twice", async () => {
        const wrapper = mount(SldsAccordion, {
            props: { sections: SECTIONS, activeSectionNames: ["first"], allowMultipleSectionsOpen: true },
        })

        await wrapper.findAll(".slds-accordion__summary-action")[0].trigger("click")
        const sections = wrapper.findAll(".slds-accordion__section")
        expect(sections[0].classes()).not.toContain("slds-is-open")
    })

    it("reacts to activeSectionName prop changes", async () => {
        const wrapper = mount(SldsAccordion, {
            props: { sections: SECTIONS, activeSectionName: "first" },
        })

        await wrapper.setProps({ activeSectionName: "second" })
        expect(wrapper.emitted("active-section-change")).toBeTruthy()
    })

    it("does nothing when activeSectionName prop is set to the same value", async () => {
        const wrapper = mount(SldsAccordion, {
            props: { sections: SECTIONS, activeSectionName: "first" },
        })

        ;(wrapper.vm as any).internalActiveSectionName = "first"
        await wrapper.setProps({ activeSectionName: "first" })
        expect(wrapper.emitted("active-section-change")).toBeFalsy()
    })

    it("reacts to activeSectionNames prop changes (multi mode)", async () => {
        const wrapper = mount(SldsAccordion, {
            props: { sections: SECTIONS, activeSectionNames: ["first"], allowMultipleSectionsOpen: true },
        })

        await wrapper.setProps({ activeSectionNames: ["second"] })
        expect(wrapper.emitted("active-section-change")).toBeTruthy()
    })

    it("re-evaluates open sections when sections prop changes (multi mode)", async () => {
        const wrapper = mount(SldsAccordion, {
            props: { sections: SECTIONS, activeSectionNames: ["first"], allowMultipleSectionsOpen: true },
        })

        await wrapper.setProps({ sections: [...SECTIONS, { id: "3", name: "third", label: "Third", content: "Third content" }] })
        expect(wrapper.findAll(".slds-accordion__list-item").length).toBe(3)
    })

    it("re-evaluates open sections when sections prop changes (single mode)", async () => {
        const wrapper = mount(SldsAccordion, {
            props: { sections: SECTIONS, activeSectionName: "first" },
        })

        await wrapper.setProps({ sections: [{ id: "1", name: "first", label: "First updated", content: "x" }] })
        expect(wrapper.text()).toContain("First updated")
    })

    it("throws when allowMultipleSectionsOpen is true but a non-array is provided", () => {
        const wrapper = mount(SldsAccordion, {
            props: { sections: SECTIONS, activeSectionNames: ["first"], allowMultipleSectionsOpen: true },
        })

        expect(() => (wrapper.vm as any).handleActiveSectionChange("not-an-array")).toThrow()
    })

    it("renders default slot content when provided instead of sections", () => {
        const wrapper = mount(SldsAccordion, {
            slots: { default: "<li class=\"custom-section\">Custom</li>" },
        })

        expect(wrapper.find(".custom-section").exists()).toBe(true)
    })
})
