import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import PlaceholderCard from "./placeholder-card.vue"

describe("PlaceholderCard", () => {
    it("renders the slds-card article", () => {
        const wrapper = mount(PlaceholderCard)
        expect(wrapper.find("article.slds-card").exists()).toBe(true)
    })

    it("renders the title when provided", () => {
        const wrapper = mount(PlaceholderCard, {
            props: { title: "My Card" },
        })
        expect(wrapper.text()).toContain("My Card")
    })


    it("has no axe-detectable accessibility violations in its default state", async () => {
        const wrapper = mount(PlaceholderCard, {
            props: { title: "Some title" },
            attachTo: document.body,
        })
        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)
        wrapper.unmount()
    })
})
