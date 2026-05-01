import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsMediaObject from "./slds-media-object.vue"

describe("SldsMediaObject", () => {
    it("renders the media object container with body", () => {
        const wrapper = mount(SldsMediaObject, {
            slots: { default: "<p>Body</p>" },
        })

        expect(wrapper.find(".slds-media").exists()).toBe(true)
        expect(wrapper.find("[data-testid=\"mediaObjectBody\"]").text()).toContain("Body")
    })

    it("applies the center modifier when center prop is true", () => {
        const wrapper = mount(SldsMediaObject, {
            props: { center: true },
            slots: { default: "Body" },
        })
        expect(wrapper.find(".slds-media").classes()).toContain("slds-media_center")
    })


    it("has no axe-detectable accessibility violations in its default state", async () => {
        const wrapper = mount(SldsMediaObject, {
            slots: { default: "Body" },
            attachTo: document.body,
        })
        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)
        wrapper.unmount()
    })
})
