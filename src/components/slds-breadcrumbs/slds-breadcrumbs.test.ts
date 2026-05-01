import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsBreadcrumbs from "./slds-breadcrumbs.vue"
import type { Breadcrumb } from "./breadcrumb"

const ITEMS: Breadcrumb[] = [
    { name: "home", label: "Home" },
    { name: "accounts", label: "Accounts" },
    { name: "acme", label: "Acme" },
]

const OVERFLOW_ITEMS: Breadcrumb[] = [
    { name: "a", label: "A" },
    { name: "b", label: "B" },
    { name: "c", label: "C" },
    { name: "d", label: "D" },
    { name: "e", label: "E" },
]

describe("SldsBreadcrumbs", () => {
    it("renders the breadcrumbs nav", () => {
        const wrapper = mount(SldsBreadcrumbs, {
            props: { items: ITEMS },
        })

        expect(wrapper.find("nav[aria-label=\"Breadcrumbs\"]").exists()).toBe(true)
        expect(wrapper.findAll(".slds-breadcrumb__item").length).toBeGreaterThanOrEqual(3)
    })

    it("does not render the overflow trigger when items are within maxItems", () => {
        const wrapper = mount(SldsBreadcrumbs, {
            props: { items: ITEMS, maxItems: 3 },
        })
        expect(wrapper.find(".slds-dropdown-trigger").exists()).toBe(false)
    })

    it("renders the overflow trigger when items exceed maxItems", () => {
        const wrapper = mount(SldsBreadcrumbs, {
            props: { items: OVERFLOW_ITEMS, maxItems: 2 },
        })
        expect(wrapper.find(".slds-dropdown-trigger").exists()).toBe(true)
    })

    it("emits click with breadcrumb name when a breadcrumb is clicked", async () => {
        const wrapper = mount(SldsBreadcrumbs, {
            props: { items: ITEMS },
        })

        await wrapper.findAll("a")[0].trigger("click")
        expect(wrapper.emitted("click")).toBeTruthy()
        expect(wrapper.emitted("click")![0]).toEqual(["home"])
    })

    it("toggles the overflow dropdown open and closed on trigger click", async () => {
        const wrapper: any = mount(SldsBreadcrumbs, {
            props: { items: OVERFLOW_ITEMS, maxItems: 2 },
        })

        expect(wrapper.vm.isDropdownOpen).toBe(false)
        wrapper.vm.handleClickDropdown()
        expect(wrapper.vm.isDropdownOpen).toBe(true)
        wrapper.vm.handleClickDropdown()
        expect(wrapper.vm.isDropdownOpen).toBe(false)
    })

    it("hides the dropdown when hideDropdown is invoked", () => {
        const wrapper: any = mount(SldsBreadcrumbs, {
            props: { items: OVERFLOW_ITEMS, maxItems: 2 },
        })

        wrapper.vm.isDropdownOpen = true
        wrapper.vm.hideDropdown()
        expect(wrapper.vm.isDropdownOpen).toBe(false)
    })

    it("computes overflownItems as the last maxItems entries", () => {
        const wrapper: any = mount(SldsBreadcrumbs, {
            props: { items: OVERFLOW_ITEMS, maxItems: 2 },
        })

        expect(wrapper.vm.overflownItems.map((item: Breadcrumb) => item.name)).toEqual(["d", "e"])
    })

    it("computes visibleItems as everything except the overflowed tail", () => {
        const wrapper: any = mount(SldsBreadcrumbs, {
            props: { items: OVERFLOW_ITEMS, maxItems: 2 },
        })

        expect(wrapper.vm.visibleItems.map((item: Breadcrumb) => item.name)).toEqual(["a", "b", "c"])
    })

    it("returns all items as visible when there is no overflow", () => {
        const wrapper: any = mount(SldsBreadcrumbs, {
            props: { items: ITEMS, maxItems: 5 },
        })

        expect(wrapper.vm.visibleItems.length).toBe(ITEMS.length)
    })

    it("forwards the neutral prop to child breadcrumbs", () => {
        const wrapper = mount(SldsBreadcrumbs, {
            props: { items: ITEMS, neutral: true },
        })

        expect(wrapper.html()).toContain("slds-breadcrumb")
    })

    it("emits click when an overflowed breadcrumb is selected from the dropdown", async () => {
        const wrapper: any = mount(SldsBreadcrumbs, {
            props: { items: OVERFLOW_ITEMS, maxItems: 2 },
        })

        wrapper.vm.handleClickBreadcrumb("d")
        expect(wrapper.emitted("click")![0]).toEqual(["d"])
    })

    it("uses an empty default for items when not provided", () => {
        const wrapper: any = mount(SldsBreadcrumbs)
        expect(Array.isArray(wrapper.vm.items)).toBe(true)
        expect(wrapper.vm.items.length).toBe(0)
    })

    it("has no axe-detectable accessibility violations in its default state", async () => {
        const wrapper = mount(SldsBreadcrumbs, {
            props: { items: ITEMS },
            attachTo: document.body,
        })
        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)
        wrapper.unmount()
    })
})
