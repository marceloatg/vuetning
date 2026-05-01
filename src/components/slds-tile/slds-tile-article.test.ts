import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsTileArticle from "./slds-tile-article.vue"

describe("SldsTileArticle", () => {
    it("renders the article with author and items", () => {
        const wrapper = mount(SldsTileArticle, {
            props: { author: "Jane", items: ["one", "two"] },
        })

        expect(wrapper.text()).toContain("Jane")
        expect(wrapper.findAll("li.slds-item").length).toBe(2)
    })

    it("renders nothing in the list when items are empty", () => {
        const wrapper = mount(SldsTileArticle, {
            props: { author: "Jane", items: [] },
        })
        expect(wrapper.findAll("li.slds-item").length).toBe(0)
    })


    it("has no axe-detectable accessibility violations in its default state", async () => {
        const wrapper = mount(SldsTileArticle, {
            props: { author: "Jane", items: ["one", "two"] },
            attachTo: document.body,
        })
        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)
        wrapper.unmount()
    })
})
