import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import { defineComponent, h } from "vue"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsGlobalActionAvatar from "./slds-global-action-avatar.vue"

describe("SldsGlobalActionAvatar", () => {
    it("renders the action item with an avatar button", () => {
        const wrapper = mount(SldsGlobalActionAvatar, {
            props: { src: "https://example.com/me.png", alt: "Me", title: "Me" },
        })

        expect(wrapper.find("li.slds-global-actions__item").exists()).toBe(true)
        expect(wrapper.find(".slds-avatar").exists()).toBe(true)
    })

    it("renders the title attribute on the button", () => {
        const wrapper = mount(SldsGlobalActionAvatar, {
            props: { src: "https://example.com/me.png", title: "Profile" },
        })
        expect(wrapper.find("button").attributes("title")).toBe("Profile")
    })

    it("toggles the popover open/closed when the slot is provided and the button is clicked", async () => {
        const wrapper = mount(SldsGlobalActionAvatar, {
            props: { src: "https://example.com/me.png", title: "Profile" },
            slots: { default: "<p data-testid='content'>Menu</p>" },
            attachTo: document.body,
        })

        const popover = wrapper.find(".slds-popover").element as HTMLElement
        expect(popover.style.display).toBe("none")

        await wrapper.find("button").trigger("click")
        expect((wrapper.find(".slds-popover").element as HTMLElement).style.display).not.toBe("none")

        await wrapper.find("button").trigger("click")
        expect((wrapper.find(".slds-popover").element as HTMLElement).style.display).toBe("none")

        wrapper.unmount()
    })

    it("does not toggle the popover when no slot content is provided", async () => {
        const wrapper = mount(SldsGlobalActionAvatar, {
            props: { src: "https://example.com/me.png", title: "Profile" },
            attachTo: document.body,
        })

        const popover = wrapper.find(".slds-popover").element as HTMLElement
        expect(popover.style.display).toBe("none")

        await wrapper.find("button").trigger("click")
        expect((wrapper.find(".slds-popover").element as HTMLElement).style.display).toBe("none")

        wrapper.unmount()
    })

    it("forwards alt and src to the avatar image", () => {
        const wrapper = mount(SldsGlobalActionAvatar, {
            props: { src: "https://example.com/me.png", alt: "Me" },
        })

        const img = wrapper.find("img")
        expect(img.attributes("src")).toBe("https://example.com/me.png")
        expect(img.attributes("alt")).toBe("Me")
    })

    it("has no axe-detectable accessibility violations when alt is omitted", async () => {
        const Host = defineComponent({
            components: { SldsGlobalActionAvatar },
            render() {
                return h("ul", { class: "slds-global-actions", "aria-label": "Global actions" }, [
                    h(SldsGlobalActionAvatar, { src: "https://example.com/me.png", title: "Profile" }),
                ])
            },
        })

        const wrapper = mount(Host, { attachTo: document.body })
        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)
        wrapper.unmount()
    })
})
