import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsActivityTimeline from "./slds-activity-timeline.vue"

describe("SldsActivityTimeline", () => {
    it("renders the timeline list", () => {
        const wrapper = mount(SldsActivityTimeline, {
            slots: { default: "<li>Item</li>" },
        })

        expect(wrapper.find("ul.slds-timeline").exists()).toBe(true)
    })

    it("renders slotted content", () => {
        const wrapper = mount(SldsActivityTimeline, {
            slots: { default: "<li class='child'>Activity</li>" },
        })

        expect(wrapper.find(".child").exists()).toBe(true)
    })


    it("has no axe-detectable accessibility violations in its default state", async () => {
        const wrapper = mount(SldsActivityTimeline, {
            slots: { default: "<li>Activity</li>" },
            attachTo: document.body,
        })
        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)
        wrapper.unmount()
    })
})
