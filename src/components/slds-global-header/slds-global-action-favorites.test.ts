import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import { defineComponent, h } from "vue"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsGlobalActionFavorites from "./slds-global-action-favorites.vue"

describe("SldsGlobalActionFavorites", () => {
    it("renders the favorites action with toggle and view buttons", () => {
        const wrapper = mount(SldsGlobalActionFavorites)

        expect(wrapper.find("li.slds-global-actions__item").exists()).toBe(true)
        expect(wrapper.findAll("button").length).toBe(2)
    })

    it("renders assistive text for both buttons", () => {
        const wrapper = mount(SldsGlobalActionFavorites)
        const labels = wrapper.findAll(".slds-assistive-text")
        expect(labels.length).toBeGreaterThanOrEqual(2)
    })


    it("has no axe-detectable accessibility violations in its default state", async () => {
        // Wrap in a <ul> so axe's listitem rule (li must have ul/ol parent) is satisfied.
        const Host = defineComponent({
            render: () => h("ul", [h(SldsGlobalActionFavorites)]),
        })
        const wrapper = mount(Host, { attachTo: document.body })
        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)
        wrapper.unmount()
    })
})
