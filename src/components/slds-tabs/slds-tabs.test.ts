import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsTabs from "./slds-tabs.vue"
import type { Tab } from "./tab"

const TABS: Tab[] = [
    { name: "details", label: "Details", hasError: false },
    { name: "history", label: "History", hasError: false },
]

describe("SldsTabs", () => {
    it("renders a tablist with one item per tab", () => {
        const wrapper = mount(SldsTabs, {
            props: { tabs: TABS, active: "details" },
        })

        expect(wrapper.find("[role=\"tablist\"]").exists()).toBe(true)
        expect(wrapper.text()).toContain("Details")
        expect(wrapper.text()).toContain("History")
    })

    it("does not apply size variant classes by default", () => {
        const wrapper = mount(SldsTabs, {
            props: { tabs: TABS, active: "details" },
        })

        const root = wrapper.find(".slds-tabs_default")
        expect(root.classes()).not.toContain("slds-tabs_large")
        expect(root.classes()).not.toContain("slds-tabs_medium")
    })

    it("applies the large variant class when the large prop is set", () => {
        const wrapper = mount(SldsTabs, {
            props: { tabs: TABS, active: "details", large: true },
        })

        expect(wrapper.find(".slds-tabs_default").classes()).toContain("slds-tabs_large")
    })

    it("applies the medium variant class when the medium prop is set without large", () => {
        const wrapper = mount(SldsTabs, {
            props: { tabs: TABS, active: "details", medium: true },
        })

        expect(wrapper.find(".slds-tabs_default").classes()).toContain("slds-tabs_medium")
    })

    it("prefers large over medium when both are set", () => {
        const wrapper = mount(SldsTabs, {
            props: { tabs: TABS, active: "details", large: true, medium: true },
        })

        const classes = wrapper.find(".slds-tabs_default").classes()
        expect(classes).toContain("slds-tabs_large")
        expect(classes).not.toContain("slds-tabs_medium")
    })

    it("renders tab content panels that mirror the active tab", () => {
        const wrapper = mount(SldsTabs, {
            props: { tabs: TABS, active: "history" },
        })

        const panels = wrapper.findAll("[role=\"tabpanel\"]")
        expect(panels.length).toBe(2)
        expect(panels[0].classes()).toContain("slds-hide")
        expect(panels[1].classes()).toContain("slds-show")
    })

    it("does not render tab panels when noContent is true", () => {
        const wrapper = mount(SldsTabs, {
            props: { tabs: TABS, active: "details", noContent: true },
        })

        expect(wrapper.findAll("[role=\"tabpanel\"]").length).toBe(0)
    })

    it("renders the named slot content for each tab", () => {
        const wrapper = mount(SldsTabs, {
            props: { tabs: TABS, active: "details" },
            slots: {
                details: "<p class='details-body'>D</p>",
                history: "<p class='history-body'>H</p>",
            },
        })

        expect(wrapper.find(".details-body").exists()).toBe(true)
        expect(wrapper.find(".history-body").exists()).toBe(true)
    })

    it("renders the tabs slot override instead of generated tabs", () => {
        const wrapper = mount(SldsTabs, {
            props: { tabs: TABS, active: "details" },
            slots: { tabs: "<li class='custom-tab'>Custom</li>" },
        })

        expect(wrapper.find(".custom-tab").exists()).toBe(true)
        expect(wrapper.text()).not.toContain("Details")
        expect(wrapper.text()).not.toContain("History")
    })

    it("renders the content slot override instead of generated panels", () => {
        const wrapper = mount(SldsTabs, {
            props: { tabs: TABS, active: "details" },
            slots: { content: "<div class='custom-content'>X</div>" },
        })

        expect(wrapper.find(".custom-content").exists()).toBe(true)
        expect(wrapper.findAll("[role=\"tabpanel\"]").length).toBe(0)
    })

    it("emits click-tab with the tab name when a tab is clicked", async () => {
        const wrapper = mount(SldsTabs, {
            props: { tabs: TABS, active: "details" },
            attachTo: document.body,
        })

        const items = wrapper.findAll("[role=\"tablist\"] li")
        expect(items.length).toBeGreaterThanOrEqual(2)
        await items[1].trigger("click")

        expect(wrapper.emitted("click-tab")).toBeTruthy()
        expect(wrapper.emitted("click-tab")![0]).toEqual(["history"])

        wrapper.unmount()
    })

    it("has no axe-detectable accessibility violations in its default state", async () => {
        const wrapper = mount(SldsTabs, {
            props: { tabs: TABS, active: "details" },
            attachTo: document.body,
        })

        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)

        wrapper.unmount()
    })
})
