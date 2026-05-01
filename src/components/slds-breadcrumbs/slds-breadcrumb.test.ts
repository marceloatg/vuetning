import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import SldsBreadcrumb from "./slds-breadcrumb.vue"

describe("SldsBreadcrumb", () => {
    it("renders the breadcrumb item with its label", () => {
        const wrapper = mount(SldsBreadcrumb, {
            props: { label: "Home", name: "home" },
        })

        expect(wrapper.find("li.slds-breadcrumb__item").exists()).toBe(true)
        expect(wrapper.text()).toContain("Home")
    })

    it("applies the neutral text color when neutral is true", () => {
        const wrapper = mount(SldsBreadcrumb, {
            props: { label: "Home", name: "home", neutral: true },
        })
        expect(wrapper.find("a").classes()).toContain("slds-text-color_weak")
    })

    it("emits click with the breadcrumb name when no href is provided", async () => {
        const wrapper = mount(SldsBreadcrumb, {
            props: { label: "Home", name: "home" },
        })

        await wrapper.find("a").trigger("click")
        expect(wrapper.emitted("click")).toBeTruthy()
        expect(wrapper.emitted("click")![0]).toEqual(["home"])
    })

    it.todo("axe a11y check — anchor tag without href; needs triage")
})
