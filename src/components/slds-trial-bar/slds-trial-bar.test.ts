import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsTrialBar from "./slds-trial-bar.vue"

describe("SldsTrialBar", () => {
    it("renders the trial bar with the days left counter", () => {
        const wrapper = mount(SldsTrialBar, {
            props: { daysLeft: 7 },
        })

        expect(wrapper.find(".slds-trial-header").exists()).toBe(true)
        expect(wrapper.text()).toContain("7")
        expect(wrapper.text()).toContain("Days left in trial")
    })

    it("renders the subscribe button", () => {
        const wrapper = mount(SldsTrialBar, {
            props: { daysLeft: 7 },
        })
        expect(wrapper.find("button").exists()).toBe(true)
    })

    it("emits subscribe when the subscribe button is clicked", async () => {
        const wrapper = mount(SldsTrialBar, {
            props: { daysLeft: 7 },
        })

        await wrapper.find("button").trigger("click")
        expect(wrapper.emitted("subscribe")).toHaveLength(1)
    })

    it("has no axe-detectable accessibility violations in its default state", async () => {
        const wrapper = mount(SldsTrialBar, {
            props: { daysLeft: 7 },
            attachTo: document.body,
        })
        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)
        wrapper.unmount()
    })
})
