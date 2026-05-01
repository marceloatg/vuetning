import { describe, it, expect } from "vitest"
import { mount, flushPromises } from "@vue/test-utils"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsIcon from "./slds-icon.vue"

describe("SldsIcon", () => {
    it("renders the icon container with the SVG", async () => {
        const wrapper = mount(SldsIcon, {
            props: { iconName: "utility:close" },
        })

        await flushPromises()
        expect(wrapper.find("span").exists()).toBe(true)
        expect(wrapper.find("svg").exists()).toBe(true)
    })

    it("renders assistive text when provided", async () => {
        const wrapper = mount(SldsIcon, {
            props: { iconName: "utility:close", assistiveText: "Close" },
        })
        await flushPromises()
        expect(wrapper.find(".slds-assistive-text").text()).toBe("Close")
    })


    it("has no axe-detectable accessibility violations when assistiveText is provided", async () => {
        const wrapper = mount(SldsIcon, {
            props: { iconName: "utility:close", assistiveText: "Save" },
            attachTo: document.body,
        })

        await flushPromises()
        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)

        wrapper.unmount()
    })
})
