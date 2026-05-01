import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import { defineComponent, h } from "vue"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsGlobalAction from "./slds-global-action.vue"

describe("SldsGlobalAction", () => {
    it("renders the action item with a button", () => {
        const wrapper = mount(SldsGlobalAction, {
            props: { iconName: "utility:setup", assistiveText: "Setup" },
        })

        expect(wrapper.find("li.slds-global-actions__item").exists()).toBe(true)
        expect(wrapper.find("button").exists()).toBe(true)
    })

    it("renders the assistive text", () => {
        const wrapper = mount(SldsGlobalAction, {
            props: { iconName: "utility:setup", assistiveText: "Setup" },
        })
        expect(wrapper.find(".slds-assistive-text").text()).toBe("Setup")
    })


    it("has no axe-detectable accessibility violations in its default state", async () => {
        // Wrap in a <ul> so axe's listitem rule (li must have ul/ol parent) is satisfied.
        const Host = defineComponent({
            render: () => h("ul", [h(SldsGlobalAction, { iconName: "utility:setup", assistiveText: "Setup" })]),
        })
        const wrapper = mount(Host, { attachTo: document.body })
        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)
        wrapper.unmount()
    })
})
