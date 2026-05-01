import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import SldsPageHeaderDetail from "./slds-page-header-detail.vue"

describe("SldsPageHeaderDetail", () => {
    it("renders the detail block with label and value", () => {
        const wrapper = mount(SldsPageHeaderDetail, {
            props: { label: "Owner", value: "Marcelo" },
        })

        expect(wrapper.find("li.slds-page-header__detail-block").exists()).toBe(true)
        expect(wrapper.text()).toContain("Owner")
        expect(wrapper.text()).toContain("Marcelo")
    })

    it("renders the value as an anchor when isLink is true", () => {
        const wrapper = mount(SldsPageHeaderDetail, {
            props: { label: "Owner", value: "Marcelo", isLink: true },
        })
        expect(wrapper.find("a").exists()).toBe(true)
    })

    it("emits click when the link is clicked", async () => {
        const wrapper = mount(SldsPageHeaderDetail, {
            props: { label: "Owner", value: "Marcelo", isLink: true },
        })

        await wrapper.find("a").trigger("click")
        expect(wrapper.emitted("click")).toBeTruthy()
    })

    it.todo("axe a11y check — link anchor has no href; needs triage")
})
