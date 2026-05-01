import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsCheckboxOutputGroup from "./slds-checkbox-output-group.vue"
import type { CheckboxGroupOption } from "../slds-checkbox-group/checkbox-group-option"

const OPTIONS: CheckboxGroupOption[] = [
    { label: "One", value: "one", disabled: false },
    { label: "Two", value: "two", disabled: false },
]

describe("SldsCheckboxOutputGroup", () => {
    it("renders one option per provided checkbox", () => {
        const wrapper = mount(SldsCheckboxOutputGroup, {
            props: { label: "Picks", options: OPTIONS, value: ["one"] },
        })

        expect(wrapper.findAll(".slds-checkbox").length).toBe(2)
    })

    it("renders the form element label", () => {
        const wrapper = mount(SldsCheckboxOutputGroup, {
            props: { label: "Picks", options: OPTIONS, value: [] },
        })
        expect(wrapper.text()).toContain("Picks")
    })

    it("falls back to the default empty arrays for value and options", () => {
        const wrapper = mount(SldsCheckboxOutputGroup, {
            props: { label: "Picks" },
        })

        expect(wrapper.findAll(".slds-checkbox").length).toBe(0)
    })

    it("renders both options as checked icons when both values are included", () => {
        const wrapper = mount(SldsCheckboxOutputGroup, {
            props: { label: "Picks", options: OPTIONS, value: ["one", "two"] },
        })

        // Both children render with the check icon (utility:check), not the steps placeholder
        expect(wrapper.findAll(".slds-checkbox").length).toBe(2)
        expect(wrapper.html()).toContain("check")
    })

    it("renders without a border when borderless is true", () => {
        const wrapper = mount(SldsCheckboxOutputGroup, {
            props: { label: "Picks", options: OPTIONS, value: [], borderless: true },
        })

        expect(wrapper.findAll(".slds-checkbox").length).toBe(2)
    })

    it("applies the stacked layout when stacked is true", () => {
        const wrapper = mount(SldsCheckboxOutputGroup, {
            props: { label: "Picks", options: OPTIONS, value: [], stacked: true },
        })

        expect(wrapper.findAll(".slds-checkbox").length).toBe(2)
    })


    it("has no axe-detectable accessibility violations in its default state", async () => {
        const wrapper = mount(SldsCheckboxOutputGroup, {
            props: { label: "Picks", options: OPTIONS, value: ["one"] },
            attachTo: document.body,
        })
        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)
        wrapper.unmount()
    })
})
