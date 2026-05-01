import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsPrompt from "./slds-prompt.vue"

describe("SldsPrompt", () => {
    it("renders the prompt section and backdrop", () => {
        const wrapper = mount(SldsPrompt, {
            slots: { content: "<p>Are you sure?</p>" },
        })

        expect(wrapper.find("section.slds-modal_prompt").exists()).toBe(true)
        expect(wrapper.find(".slds-backdrop").exists()).toBe(true)
    })

    it("renders the header and content slots", () => {
        const wrapper = mount(SldsPrompt, {
            slots: {
                header: "<h2 data-testid='hdr'>Heads up</h2>",
                content: "<p data-testid='body'>Body</p>",
            },
        })

        expect(wrapper.find("[data-testid='hdr']").exists()).toBe(true)
        expect(wrapper.find("[data-testid='body']").exists()).toBe(true)
    })

    it("uses default 'Okay' button label and respects override", () => {
        const wrapper = mount(SldsPrompt)
        expect(wrapper.find(".slds-modal__footer button").text()).toContain("Okay")

        const wrapper2 = mount(SldsPrompt, { props: { buttonLabel: "Got it" } })
        expect(wrapper2.find(".slds-modal__footer button").text()).toContain("Got it")
    })

    const themes: Array<[string, string]> = [
        ["alternativeInverseTheme", "slds-theme_alt-inverse"],
        ["errorTheme", "slds-theme_error"],
        ["infoTheme", "slds-theme_info"],
        ["inverseTheme", "slds-theme_inverse"],
        ["offlineTheme", "slds-theme_offline"],
        ["shadeTheme", "slds-theme_shade"],
        ["successTheme", "slds-theme_success"],
        ["warningTheme", "slds-theme_warning"],
    ]

    for (const [prop, expected] of themes) {
        it(`applies ${expected} when ${prop} is true`, () => {
            const wrapper = mount(SldsPrompt, {
                props: { [prop]: true },
            })
            expect(wrapper.find(".slds-modal__header").classes()).toContain(expected)
        })
    }

    it("applies the default theme when no theme prop is set", () => {
        const wrapper = mount(SldsPrompt)
        expect(wrapper.find(".slds-modal__header").classes()).toContain("slds-theme_default")
    })

    it("applies the alert texture class when hasTexture is true", () => {
        const wrapper = mount(SldsPrompt, {
            props: { hasTexture: true },
        })
        expect(wrapper.find(".slds-modal__header").classes()).toContain("slds-theme_alert-texture")
    })

    it("emits submit when the footer button is clicked", async () => {
        const wrapper = mount(SldsPrompt, {
            slots: { content: "<p>Body</p>" },
        })

        await wrapper.find(".slds-modal__footer button").trigger("click")
        expect(wrapper.emitted("submit")).toHaveLength(1)
    })

    it("emits submit on Enter keyup", async () => {
        const wrapper = mount(SldsPrompt, {
            attachTo: document.body,
        })

        await wrapper.find("div[tabindex=\"0\"]").trigger("keyup.enter")
        expect(wrapper.emitted("submit")).toHaveLength(1)
        wrapper.unmount()
    })

    it("emits close on Escape keyup", async () => {
        const wrapper = mount(SldsPrompt, {
            attachTo: document.body,
        })

        await wrapper.find("div[tabindex=\"0\"]").trigger("keyup.esc")
        expect(wrapper.emitted("close")).toHaveLength(1)
        wrapper.unmount()
    })

    it("has no axe-detectable accessibility violations in its default state", async () => {
        const wrapper = mount(SldsPrompt, {
            slots: {
                header: "<h2>Heads up</h2>",
                content: "<p>Are you sure?</p>",
            },
            attachTo: document.body,
        })

        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)

        wrapper.unmount()
    })
})
