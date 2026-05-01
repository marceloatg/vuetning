import { describe, it, expect } from "vitest"
import { mount, flushPromises } from "@vue/test-utils"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsExpandableSection from "./slds-expandable-section.vue"

describe("SldsExpandableSection", () => {
    it("renders the section with its title", () => {
        const wrapper = mount(SldsExpandableSection, {
            props: { title: "Details" },
            slots: { default: "Body" },
        })

        expect(wrapper.find(".slds-section").exists()).toBe(true)
        expect(wrapper.text()).toContain("Details")
    })

    it("renders a span title (no toggle button) when nonCollapsible is true", () => {
        const wrapper = mount(SldsExpandableSection, {
            props: { title: "Details", nonCollapsible: true },
        })
        expect(wrapper.find("button").exists()).toBe(false)
        expect(wrapper.find(".slds-section").classes()).toContain("slds-is-open")
    })

    it("opens by default and renders the slot content", async () => {
        const wrapper = mount(SldsExpandableSection, {
            props: { title: "Details" },
            slots: { default: "<p data-testid='body'>Body</p>" },
        })

        await flushPromises()
        expect(wrapper.find(".slds-section").classes()).toContain("slds-is-open")
        expect(wrapper.find("[data-testid='body']").exists()).toBe(true)
    })

    it("starts closed when closedOnStart is true", async () => {
        const wrapper = mount(SldsExpandableSection, {
            props: { title: "Details", closedOnStart: true },
            slots: { default: "<p data-testid='body'>Body</p>" },
        })

        await flushPromises()
        expect(wrapper.find(".slds-section").classes()).not.toContain("slds-is-open")
    })

    it("toggles isOpen when the title button is clicked", async () => {
        const wrapper = mount(SldsExpandableSection, {
            props: { title: "Details", closedOnStart: true },
            slots: { default: "Body" },
        })

        await flushPromises()
        await wrapper.find("button").trigger("click")
        expect(wrapper.find(".slds-section").classes()).toContain("slds-is-open")

        await wrapper.find("button").trigger("click")
        expect(wrapper.find(".slds-section").classes()).not.toContain("slds-is-open")
    })

    it("disables the toggle button and hides the content when disabled", async () => {
        const wrapper = mount(SldsExpandableSection, {
            props: { title: "Details", disabled: true },
            slots: { default: "<p data-testid='body'>Body</p>" },
        })

        await flushPromises()
        expect(wrapper.find("button").attributes("disabled")).toBeDefined()
        expect(wrapper.find(".slds-section").classes()).not.toContain("slds-is-open")
        expect(wrapper.find("[data-testid='body']").exists()).toBe(false)
    })

    it("animates collapse/expand without throwing during transition hooks", async () => {
        const wrapper = mount(SldsExpandableSection, {
            props: { title: "Details", closedOnStart: true },
            slots: { default: "<p>Body</p>" },
            attachTo: document.body,
        })

        await flushPromises()
        await wrapper.find("button").trigger("click")
        await flushPromises()
        await wrapper.find("button").trigger("click")
        await flushPromises()

        wrapper.unmount()
    })

    it("expand sets explicit height and opacity on the element", async () => {
        const wrapper = mount(SldsExpandableSection, {
            props: { title: "Details" },
            slots: { default: "Body" },
            attachTo: document.body,
        })
        await flushPromises()

        const fakeElement = document.createElement("div")
        Object.defineProperty(fakeElement, "scrollHeight", { value: 123, configurable: true })
        ;(wrapper.vm as unknown as { expand: (_el: Element) => void }).expand(fakeElement)

        expect(fakeElement.style.height).toBe("123px")
        expect(fakeElement.style.opacity).toBe("1")
        wrapper.unmount()
    })

    it("collapse zeroes the height and opacity once initialized", async () => {
        const wrapper = mount(SldsExpandableSection, {
            props: { title: "Details" },
            slots: { default: "Body" },
            attachTo: document.body,
        })
        await flushPromises()

        const fakeElement = document.createElement("div")
        ;(wrapper.vm as unknown as { collapse: (_el: Element) => void }).collapse(fakeElement)

        expect(fakeElement.style.height).toBe("0px")
        expect(fakeElement.style.opacity).toBe("0")
        wrapper.unmount()
    })

    it("collapse is a no-op before initialization", () => {
        const wrapper = mount(SldsExpandableSection, {
            props: { title: "Details" },
            slots: { default: "Body" },
        })

        const fakeElement = document.createElement("div")
        fakeElement.style.height = "100px"
        // Force initialized=false to test the early return branch
        ;(wrapper.vm as unknown as { initialized: boolean }).initialized = false
        ;(wrapper.vm as unknown as { collapse: (_el: Element) => void }).collapse(fakeElement)

        // Height untouched because of early return
        expect(fakeElement.style.height).toBe("100px")
    })

    it("resetHeight clears explicit height and sets initial overflow", () => {
        const wrapper = mount(SldsExpandableSection, {
            props: { title: "Details" },
            slots: { default: "Body" },
        })

        const fakeElement = document.createElement("div")
        fakeElement.style.height = "200px"
        ;(wrapper.vm as unknown as { resetHeight: (_el: Element) => void }).resetHeight(fakeElement)

        expect(fakeElement.style.height).toBe("")
        expect(fakeElement.style.overflow).toBe("initial")
    })

    it("has no axe-detectable accessibility violations in its default state", async () => {
        const wrapper = mount(SldsExpandableSection, {
            props: { title: "Details" },
            slots: { default: "Body" },
            attachTo: document.body,
        })
        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)
        wrapper.unmount()
    })
})
