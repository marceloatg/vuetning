import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsCard from "./slds-card.vue"

describe("SldsCard", () => {
    it("renders the card article", () => {
        const wrapper = mount(SldsCard, {
            props: { title: "My Card" },
            slots: { default: "<p>Body</p>" },
        })

        expect(wrapper.find("article.slds-card").exists()).toBe(true)
        expect(wrapper.find("[data-testid=\"cardBody\"]").text()).toContain("Body")
    })

    it("renders the title in the header when title prop is provided", () => {
        const wrapper = mount(SldsCard, {
            props: { title: "My Card" },
        })

        expect(wrapper.find("[data-testid=\"cardTitle\"]").text()).toBe("My Card")
    })

    it("does not render the header when neither title nor icon nor title/actions slots exist", () => {
        const wrapper = mount(SldsCard, {
            slots: { default: "<p>Body</p>" },
        })

        expect(wrapper.find(".slds-card__header").exists()).toBe(false)
    })

    it("renders the header when iconName is provided even without a title", () => {
        const wrapper = mount(SldsCard, {
            props: { iconName: "standard:account" },
            slots: { default: "<p>Body</p>" },
        })

        expect(wrapper.find(".slds-card__header").exists()).toBe(true)
        expect(wrapper.find("[data-testid=\"cardIcon\"]").exists()).toBe(true)
    })

    it("renders the header when only the title slot is supplied", () => {
        const wrapper = mount(SldsCard, {
            slots: { title: "<span class='custom-title'>Slot title</span>" },
        })

        expect(wrapper.find(".slds-card__header").exists()).toBe(true)
        expect(wrapper.find(".custom-title").exists()).toBe(true)
    })

    it("renders the header when only the actions slot is supplied", () => {
        const wrapper = mount(SldsCard, {
            slots: { actions: "<button class='action-btn'>Go</button>" },
        })

        expect(wrapper.find(".slds-card__header").exists()).toBe(true)
        expect(wrapper.find("[data-testid=\"cardActions\"]").exists()).toBe(true)
        expect(wrapper.find(".action-btn").exists()).toBe(true)
    })

    it("does not render the actions slot wrapper when there is no actions slot", () => {
        const wrapper = mount(SldsCard, {
            props: { title: "My Card" },
        })

        expect(wrapper.find("[data-testid=\"cardActions\"]").exists()).toBe(false)
    })

    it("applies the inner padding class on body by default", () => {
        const wrapper = mount(SldsCard, { props: { title: "T" } })

        expect(wrapper.find("[data-testid=\"cardBody\"]").classes()).toContain("slds-card__body_inner")
    })

    it("removes the inner padding class when noInnerPadding is true", () => {
        const wrapper = mount(SldsCard, {
            props: { title: "T", noInnerPadding: true },
        })

        expect(wrapper.find("[data-testid=\"cardBody\"]").classes()).not.toContain("slds-card__body_inner")
    })

    it("applies inner-no-margin classes on body, header, footer when noInnerMargin is true", () => {
        const wrapper = mount(SldsCard, {
            props: { title: "T", noInnerMargin: true },
            slots: { footer: "<p class='ftr'>F</p>" },
        })

        expect(wrapper.find("[data-testid=\"cardBody\"]").classes()).toContain("slds-card__body_inner-no-margin")
        expect(wrapper.find(".slds-card__header").classes()).toContain("slds-card__header_inner-no-margin")
        expect(wrapper.find("[data-testid=\"cardFooter\"]").classes()).toContain("slds-card__footer_inner-no-margin")
    })

    it("renders the footer slot when provided", () => {
        const wrapper = mount(SldsCard, {
            props: { title: "T" },
            slots: { footer: "<p class='footer-content'>Footer</p>" },
        })

        expect(wrapper.find("[data-testid=\"cardFooter\"]").exists()).toBe(true)
        expect(wrapper.find(".footer-content").exists()).toBe(true)
    })

    it("does not render a footer when no footer slot is supplied", () => {
        const wrapper = mount(SldsCard, { props: { title: "T" } })

        expect(wrapper.find("[data-testid=\"cardFooter\"]").exists()).toBe(false)
    })

    it("forwards iconClass to the icon's inner svg", () => {
        const wrapper = mount(SldsCard, {
            props: { iconName: "standard:account", iconClass: "custom-icon-class" },
        })

        const cardIcon = wrapper.find("[data-testid=\"cardIcon\"]")
        expect(cardIcon.find(".custom-icon-class").exists()).toBe(true)
    })


    it("has no axe-detectable accessibility violations in its default state", async () => {
        const wrapper = mount(SldsCard, {
            props: { title: "My Card" },
            slots: { default: "<p>Body</p>" },
            attachTo: document.body,
        })

        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)

        wrapper.unmount()
    })
})
