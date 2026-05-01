import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import SldsFormElementLabel from "./slds-form-element-label.vue"

describe("SldsFormElementLabel", () => {
    it("renders a label with the slot content", () => {
        const wrapper = mount(SldsFormElementLabel, {
            props: { inputId: "input-1" },
            slots: { default: "Name" },
        })

        expect(wrapper.find("label.slds-form-element__label").exists()).toBe(true)
        expect(wrapper.attributes("for")).toBe("input-1")
        expect(wrapper.text()).toContain("Name")
    })

    it("does not render the required indicator by default", () => {
        const wrapper = mount(SldsFormElementLabel, {
            props: { inputId: "input-1" },
            slots: { default: "Name" },
        })

        expect(wrapper.find("abbr.slds-required").exists()).toBe(false)
    })

    it("renders the required indicator when required is true", () => {
        const wrapper = mount(SldsFormElementLabel, {
            props: { inputId: "input-1", required: true },
            slots: { default: "Name" },
        })

        const abbr = wrapper.find("abbr.slds-required")
        expect(abbr.exists()).toBe(true)
        expect(abbr.attributes("title")).toBe("required")
    })
})
