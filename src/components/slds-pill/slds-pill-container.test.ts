import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsPillContainer from "./slds-pill-container.vue"

describe("SldsPillContainer", () => {
    it("renders the pill container", () => {
        const wrapper = mount(SldsPillContainer, {
            slots: { default: "<span class='slds-pill'>One</span>" },
        })

        expect(wrapper.find(".slds-pill_container").exists()).toBe(true)
    })

    it("renders slotted content", () => {
        const wrapper = mount(SldsPillContainer, {
            slots: { default: "<span class='child'>Child</span>" },
        })
        expect(wrapper.find(".child").exists()).toBe(true)
    })


    it("has no axe-detectable accessibility violations in its default state", async () => {
        const wrapper = mount(SldsPillContainer, {
            slots: { default: "<span>Content</span>" },
            attachTo: document.body,
        })
        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)
        wrapper.unmount()
    })
})
