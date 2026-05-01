import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsTileItem from "./slds-tile-item.vue"

describe("SldsTileItem", () => {
    it("renders the tile item with label and detail", () => {
        const wrapper = mount(SldsTileItem, {
            props: { label: "Industry", detail: "Retail" },
        })

        expect(wrapper.find("dl").exists()).toBe(true)
        expect(wrapper.text()).toContain("Industry")
        expect(wrapper.text()).toContain("Retail")
    })

    it("uses the label as the dt title attribute", () => {
        const wrapper = mount(SldsTileItem, {
            props: { label: "Industry", detail: "Retail" },
        })
        expect(wrapper.find("dt").attributes("title")).toBe("Industry")
    })


    it("has no axe-detectable accessibility violations in its default state", async () => {
        const wrapper = mount(SldsTileItem, {
            props: { label: "Industry", detail: "Retail" },
            attachTo: document.body,
        })
        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)
        wrapper.unmount()
    })
})
