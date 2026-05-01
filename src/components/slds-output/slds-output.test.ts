import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsOutput from "./slds-output.vue"

describe("SldsOutput", () => {
    it("renders the static value inside a form element", () => {
        const wrapper = mount(SldsOutput, {
            props: { label: "Name", value: "Acme Corp" },
        })

        expect(wrapper.find(".slds-form-element").exists()).toBe(true)
        expect(wrapper.text()).toContain("Acme Corp")
    })

    it("renders the label when provided", () => {
        const wrapper = mount(SldsOutput, {
            props: { label: "Name", value: "Acme" },
        })
        expect(wrapper.text()).toContain("Name")
    })


    it("has no axe-detectable accessibility violations in its default state", async () => {
        const wrapper = mount(SldsOutput, {
            props: { label: "Name", value: "Acme" },
            attachTo: document.body,
        })
        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)
        wrapper.unmount()
    })
})
