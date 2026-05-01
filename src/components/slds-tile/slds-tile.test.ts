import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import SldsTile from "./slds-tile.vue"

describe("SldsTile", () => {
    it("renders the tile with its title", () => {
        const wrapper = mount(SldsTile, {
            props: { title: "Acme" },
        })

        expect(wrapper.find(".slds-tile").exists()).toBe(true)
        expect(wrapper.text()).toContain("Acme")
    })

    it("renders the title as a non-link when linkless is true", () => {
        const wrapper = mount(SldsTile, {
            props: { title: "Acme", linkless: true },
        })
        expect(wrapper.find("a").exists()).toBe(false)
    })

    it("emits click when the title anchor is clicked", async () => {
        const wrapper = mount(SldsTile, {
            props: { title: "Acme" },
        })

        await wrapper.find("a").trigger("click")
        expect(wrapper.emitted("click")).toBeTruthy()
    })

    it("renders an avatar when the avatar prop is provided", () => {
        const wrapper = mount(SldsTile, {
            props: { title: "Acme", avatar: "https://example.com/x.png" },
        })

        expect(wrapper.find(".slds-avatar").exists()).toBe(true)
    })

    it("renders an icon when iconName is provided and avatar is not", () => {
        const wrapper = mount(SldsTile, {
            props: { title: "Acme", iconName: "standard:account" },
        })

        expect(wrapper.find(".slds-icon").exists()).toBe(true)
    })

    it("renders no figure when neither avatar nor iconName is provided", () => {
        const wrapper = mount(SldsTile, {
            props: { title: "Acme" },
        })

        expect(wrapper.find(".slds-avatar").exists()).toBe(false)
        expect(wrapper.find(".slds-icon").exists()).toBe(false)
    })

    it("renders the actions slot when provided", () => {
        const wrapper = mount(SldsTile, {
            props: { title: "Acme" },
            slots: { actions: "<button data-testid='action'>X</button>" },
        })

        expect(wrapper.find("[data-testid='action']").exists()).toBe(true)
    })

    it("renders the default slot inside the tile detail area", () => {
        const wrapper = mount(SldsTile, {
            props: { title: "Acme" },
            slots: { default: "<span data-testid='detail'>Detail</span>" },
        })

        expect(wrapper.find(".slds-tile__detail [data-testid='detail']").exists()).toBe(true)
    })

    it("renders the title slot when provided, overriding the default markup", () => {
        const wrapper = mount(SldsTile, {
            props: { title: "Acme" },
            slots: { title: "<span data-testid='custom-title'>Custom</span>" },
        })

        expect(wrapper.find("[data-testid='custom-title']").exists()).toBe(true)
        expect(wrapper.find("a").exists()).toBe(false)
    })

    it("uses iconLarge / iconSmall / iconXSmall / iconXXSmall variants without error", () => {
        const wrapper = mount(SldsTile, {
            props: {
                title: "Acme",
                iconName: "standard:account",
                iconLarge: true,
                iconSmall: true,
                iconXSmall: true,
                iconXXSmall: true,
            },
        })

        expect(wrapper.find(".slds-icon").exists()).toBe(true)
    })

    it.todo("axe a11y check — title anchor has no href; needs triage")
})
