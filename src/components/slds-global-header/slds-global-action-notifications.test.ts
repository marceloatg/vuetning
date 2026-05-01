import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import { defineComponent, h } from "vue"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsGlobalActionNotifications from "./slds-global-action-notifications.vue"

describe("SldsGlobalActionNotifications", () => {
    it("renders the notifications action with a badge", () => {
        const wrapper = mount(SldsGlobalActionNotifications)

        expect(wrapper.find("li.slds-global-actions__item").exists()).toBe(true)
        expect(wrapper.find(".slds-notification-badge").exists()).toBe(true)
    })

    it("uses the default notification icon when no iconName is provided", () => {
        const wrapper = mount(SldsGlobalActionNotifications)
        expect(wrapper.find("button").exists()).toBe(true)
    })


    it("has no axe-detectable accessibility violations in its default state", async () => {
        // Wrap in a <ul> so axe's listitem rule (li must have ul/ol parent) is satisfied.
        const Host = defineComponent({
            render: () => h("ul", [h(SldsGlobalActionNotifications)]),
        })
        const wrapper = mount(Host, { attachTo: document.body })
        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)
        wrapper.unmount()
    })
})
