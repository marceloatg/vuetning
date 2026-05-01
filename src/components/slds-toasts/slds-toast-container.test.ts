import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsToastContainer from "./slds-toast-container.vue"

describe("SldsToastContainer", () => {
    it("renders the notify container", () => {
        const wrapper = mount(SldsToastContainer, {
            slots: { default: "<div class='child'>toast</div>" },
        })

        expect(wrapper.find(".slds-notify_container").exists()).toBe(true)
        expect(wrapper.find(".child").exists()).toBe(true)
    })

    it("renders only what is slotted", () => {
        const wrapper = mount(SldsToastContainer)
        expect(wrapper.find(".slds-notify_container").element.children.length).toBe(0)
    })


    it("has no axe-detectable accessibility violations in its default state", async () => {
        const wrapper = mount(SldsToastContainer, {
            slots: { default: "<div>toast</div>" },
            attachTo: document.body,
        })
        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)
        wrapper.unmount()
    })
})
