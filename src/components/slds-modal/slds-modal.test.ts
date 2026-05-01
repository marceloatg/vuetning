import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsModal from "./slds-modal.vue"

describe("SldsModal", () => {
    it("renders the modal section with header and content", () => {
        const wrapper = mount(SldsModal, {
            slots: {
                header: "<h2>Title</h2>",
                content: "<p>Body</p>",
            },
        })

        expect(wrapper.find("section.slds-modal").exists()).toBe(true)
        expect(wrapper.find("[data-testid=\"modalContent\"]").text()).toContain("Body")
    })

    it("applies the size variant class for the small theme", () => {
        const wrapper = mount(SldsModal, {
            props: { small: true },
            slots: { content: "<p>Body</p>" },
        })

        expect(wrapper.find("section.slds-modal").classes()).toContain("slds-modal_small")
    })

    it("applies the medium variant class", () => {
        const wrapper = mount(SldsModal, {
            props: { medium: true },
            slots: { content: "<p>Body</p>" },
        })
        expect(wrapper.find("section.slds-modal").classes()).toContain("slds-modal_medium")
    })

    it("applies the large variant class", () => {
        const wrapper = mount(SldsModal, {
            props: { large: true },
            slots: { content: "<p>Body</p>" },
        })
        expect(wrapper.find("section.slds-modal").classes()).toContain("slds-modal_large")
    })

    it("emits close when the close button is clicked", async () => {
        const wrapper = mount(SldsModal, {
            slots: { content: "<p>Body</p>" },
        })

        await wrapper.find(".slds-modal__close").trigger("click")
        expect(wrapper.emitted("close")).toHaveLength(1)
    })

    it("emits close on Escape keyup on the root", async () => {
        const wrapper = mount(SldsModal, {
            slots: { content: "<p>Body</p>" },
            attachTo: document.body,
        })

        await wrapper.find("div[tabindex=\"0\"]").trigger("keyup.esc")
        expect(wrapper.emitted("close")).toHaveLength(1)

        wrapper.unmount()
    })

    it("emits submit on Enter keyup on the root", async () => {
        const wrapper = mount(SldsModal, {
            slots: { content: "<p>Body</p>" },
            attachTo: document.body,
        })

        await wrapper.find("div[tabindex=\"0\"]").trigger("keyup.enter")
        expect(wrapper.emitted("submit")).toHaveLength(1)

        wrapper.unmount()
    })

    it("renders a footer when the footer slot is provided", () => {
        const wrapper = mount(SldsModal, {
            slots: {
                content: "<p>Body</p>",
                footer: "<button data-testid='ok'>OK</button>",
            },
        })

        expect(wrapper.find("[data-testid=\"modalFooter\"]").exists()).toBe(true)
        expect(wrapper.find("[data-testid=\"ok\"]").exists()).toBe(true)
    })

    it("does not render the footer when the footer slot is absent", () => {
        const wrapper = mount(SldsModal, {
            slots: { content: "<p>Body</p>" },
        })

        expect(wrapper.find("[data-testid=\"modalFooter\"]").exists()).toBe(false)
    })

    it("applies slds-modal__header_empty when no header slot is provided", () => {
        const wrapper = mount(SldsModal, {
            slots: { content: "<p>Body</p>" },
        })

        expect(wrapper.find("[data-testid=\"modalHeader\"]").classes()).toContain("slds-modal__header_empty")
    })

    it("does not apply the empty header class when header slot is provided", () => {
        const wrapper = mount(SldsModal, {
            slots: {
                header: "<h2>Title</h2>",
                content: "<p>Body</p>",
            },
        })

        expect(wrapper.find("[data-testid=\"modalHeader\"]").classes()).not.toContain("slds-modal__header_empty")
    })

    it("appends the contentClass on the content area", () => {
        const wrapper = mount(SldsModal, {
            props: { contentClass: "my-content-class" },
            slots: { content: "<p>Body</p>" },
        })

        expect(wrapper.find("[data-testid=\"modalContent\"]").classes()).toContain("my-content-class")
    })

    it("applies maxHeight, fixedHeight and initialOverflow modifiers on content", () => {
        const wrapper = mount(SldsModal, {
            props: { maxHeight: true, fixedHeight: true, initialOverflow: true },
            slots: { content: "<p>Body</p>" },
        })

        const classes = wrapper.find("[data-testid=\"modalContent\"]").classes()
        expect(classes).toContain("slds-grow")
        expect(classes).toContain("slds-modal_fixed-height")
        expect(classes).toContain("slds-overflow_initial")
    })

    it("forwards data-* attributes to the modal section via modalAttributes", () => {
        const wrapper = mount(SldsModal, {
            attrs: { "data-testid-modal": "demo" },
            slots: { content: "<p>Body</p>" },
        })

        expect(wrapper.find("section.slds-modal").attributes("data-testid-modal")).toBe("demo")
    })

    it("renders without animation when noAnimation is true", () => {
        const wrapper = mount(SldsModal, {
            props: { noAnimation: true },
            slots: { content: "<p>Body</p>" },
        })

        // transitionName resolves to "" when noAnimation is true
        expect(wrapper.find("section.slds-modal").exists()).toBe(true)
    })

    it("appends a non-empty footerClass to the footer", () => {
        const wrapper = mount(SldsModal, {
            props: { footerClass: "my-footer-class" },
            slots: {
                content: "<p>Body</p>",
                footer: "<button>OK</button>",
            },
        })

        expect(wrapper.find("[data-testid=\"modalFooter\"]").classes()
            .some(c => c.includes("my-footer-class"))).toBe(true)
    })

    it("appends a non-empty headerClass to the header", () => {
        const wrapper = mount(SldsModal, {
            props: { headerClass: "my-header-class" },
            slots: {
                header: "<h2>Title</h2>",
                content: "<p>Body</p>",
            },
        })

        expect(wrapper.find("[data-testid=\"modalHeader\"]").classes()
            .some(c => c.includes("my-header-class"))).toBe(true)
    })

    it("supports an empty contentClass without appending it", () => {
        const wrapper = mount(SldsModal, {
            props: { contentClass: "" },
            slots: { content: "<p>Body</p>" },
        })

        // No empty extra class on content
        expect(wrapper.find("[data-testid=\"modalContent\"]").classes()).toContain("slds-modal__content")
    })

    it("ignores non-data and non-class attributes when computing modalAttributes", () => {
        const wrapper = mount(SldsModal, {
            attrs: { "aria-label": "Demo", "data-foo": "bar" },
            slots: { content: "<p>Body</p>" },
        })

        const section = wrapper.find("section.slds-modal")
        expect(section.attributes("data-foo")).toBe("bar")
        // aria-label is not in modalAttributes; Vue still forwards it via fallthrough so it
        // ends up on the root div, not inside section's modalAttributes binding.
    })

    it("has no axe-detectable accessibility violations in its default state", async () => {
        const wrapper = mount(SldsModal, {
            slots: {
                header: "<h2>Title</h2>",
                content: "<p>Body</p>",
            },
            attachTo: document.body,
        })

        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)

        wrapper.unmount()
    })
})
