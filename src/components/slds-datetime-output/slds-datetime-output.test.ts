import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsDatetimeOutput from "./slds-datetime-output.vue"

describe("SldsDatetimeOutput", () => {
    it("renders the form element with the formatted value", () => {
        const wrapper = mount(SldsDatetimeOutput, {
            props: { label: "Created", value: "2024-01-15T10:00:00Z" },
        })

        expect(wrapper.find(".slds-form-element").exists()).toBe(true)
        expect(wrapper.find(".slds-form-element__static").text().length).toBeGreaterThan(0)
    })

    it("renders an empty string when value is missing", () => {
        const wrapper = mount(SldsDatetimeOutput, {
            props: { label: "Created" },
        })
        expect(wrapper.find(".slds-form-element__static").text()).toBe("")
    })

    it("formats the value using a single string format", () => {
        const wrapper = mount(SldsDatetimeOutput, {
            props: { label: "Created", value: "2024-01-15T10:00:00Z", format: "YYYY" },
        })

        expect(wrapper.find(".slds-form-element__static").text()).toBe("2024")
    })

    it("formats the value using an array of formats joined by a space", () => {
        const wrapper = mount(SldsDatetimeOutput, {
            props: { label: "Created", value: "2024-01-15T10:00:00Z", format: ["YYYY", "MM"] },
        })

        const text = wrapper.find(".slds-form-element__static").text()
        expect(text).toContain("2024")
        expect(text).toContain(" ")
    })

    it("accepts a Date object as the value", () => {
        const wrapper = mount(SldsDatetimeOutput, {
            props: { label: "Created", value: new Date("2024-01-15T10:00:00Z"), format: "YYYY" },
        })

        expect(wrapper.find(".slds-form-element__static").text()).toBe("2024")
    })


    it("has no axe-detectable accessibility violations in its default state", async () => {
        const wrapper = mount(SldsDatetimeOutput, {
            props: { label: "Created", value: "2024-01-15T10:00:00Z" },
            attachTo: document.body,
        })
        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)
        wrapper.unmount()
    })
})
