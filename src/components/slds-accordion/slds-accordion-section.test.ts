import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import { h } from "vue"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsAccordion from "./slds-accordion.vue"
import SldsAccordionSection from "./slds-accordion-section.vue"

describe("SldsAccordionSection", () => {
    it("renders an accordion section with the label", () => {
        const wrapper = mount(SldsAccordion, {
            props: { activeSectionName: "first" },
            slots: {
                default: () => [
                    h(SldsAccordionSection, { name: "first", label: "First", content: "Body" }),
                ],
            },
        })
        expect(wrapper.find(".slds-accordion__section").exists()).toBe(true)
        expect(wrapper.text()).toContain("First")
    })

    it("shows content when its parent's active section matches its name", () => {
        const wrapper = mount(SldsAccordion, {
            props: { activeSectionName: "first" },
            slots: {
                default: () => [
                    h(SldsAccordionSection, { name: "first", label: "First", content: "Body" }),
                ],
            },
        })
        expect(wrapper.find(".slds-accordion__section").classes()).toContain("slds-is-open")
        expect(wrapper.text()).toContain("Body")
    })

    it("emits active-section-change when its summary button is clicked", async () => {
        const wrapper = mount(SldsAccordion, {
            props: { activeSectionName: "first" },
            slots: {
                default: () => [
                    h(SldsAccordionSection, { name: "first", label: "First", content: "Body" }),
                ],
            },
        })

        await wrapper.find(".slds-accordion__summary-action").trigger("click")
        // The accordion parent re-emits, but the section also emits its own event.
        const section = wrapper.findComponent(SldsAccordionSection)
        expect(section.emitted("active-section-change")).toBeTruthy()
    })

    it("has no axe-detectable accessibility violations in its default state", async () => {
        const wrapper = mount(SldsAccordion, {
            props: { activeSectionName: "first" },
            slots: {
                default: () => [
                    h(SldsAccordionSection, { name: "first", label: "First", content: "Body" }),
                ],
            },
            attachTo: document.body,
        })
        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)
        wrapper.unmount()
    })
})
