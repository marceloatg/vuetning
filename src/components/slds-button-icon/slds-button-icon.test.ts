import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsButtonIcon from "./slds-button-icon.vue"

describe("SldsButtonIcon", () => {
    it("renders a button with the icon class", () => {
        const wrapper = mount(SldsButtonIcon, {
            props: { iconName: "utility:close", assistiveText: "Close" },
        })

        expect(wrapper.find("button.slds-button_icon").exists()).toBe(true)
    })

    it("forwards the disabled attribute when disabled is true", () => {
        const wrapper = mount(SldsButtonIcon, {
            props: { iconName: "utility:close", assistiveText: "Close", disabled: true },
        })
        expect(wrapper.find("button").attributes("disabled")).toBeDefined()
    })

    it("emits a native click event when clicked", async () => {
        const wrapper = mount(SldsButtonIcon, {
            props: { iconName: "utility:close", assistiveText: "Close" },
        })

        await wrapper.find("button").trigger("click")
        expect(wrapper.emitted("click")).toHaveLength(1)
    })

    it("has no axe-detectable accessibility violations when an assistive text is provided", async () => {
        const wrapper = mount(SldsButtonIcon, {
            props: { iconName: "utility:close", assistiveText: "Close" },
            attachTo: document.body,
        })
        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)
        wrapper.unmount()
    })
})
