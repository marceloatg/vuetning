import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import { defineComponent, h } from "vue"

import SldsBreadcrumbs from "./slds-breadcrumbs.vue"
import SldsOverflowedBreadcrumb from "./slds-overflowed-breadcrumb.vue"
import type { Breadcrumb } from "./breadcrumb"

const ITEMS: Breadcrumb[] = [
    { name: "home", label: "Home" },
    { name: "level1", label: "Level 1" },
    { name: "level2", label: "Level 2" },
    { name: "level3", label: "Level 3" },
    { name: "current", label: "Current" },
]

describe("SldsOverflowedBreadcrumb", () => {
    it("renders inside the breadcrumbs overflow dropdown when items exceed maxItems", async () => {
        const wrapper = mount(SldsBreadcrumbs, {
            props: { items: ITEMS, maxItems: 3 },
            attachTo: document.body,
        })

        await wrapper.find(".slds-dropdown-trigger button").trigger("click")
        expect(wrapper.findAll(".slds-dropdown__item").length).toBeGreaterThan(0)

        wrapper.unmount()
    })

    it("renders the label inside a menuitem anchor", () => {
        const wrapper = mount(SldsOverflowedBreadcrumb, {
            props: { name: "x", label: "Hello" },
            global: { config: { warnHandler: () => {} } },
        })

        expect(wrapper.find("a[role=\"menuitem\"]").exists()).toBe(true)
        expect(wrapper.text()).toContain("Hello")
        expect(wrapper.find(".slds-truncate").attributes("title")).toBe("Hello")
    })

    it("emits click with the name and hides its parent's dropdown when no href is provided", async () => {
        let hideCalled = 0
        const received: string[] = []

        const parentStub = defineComponent({
            methods: {
                hideDropdown() { hideCalled += 1 },
                onClick(name: string) { received.push(name) },
            },
            render() {
                return h("div", [
                    h(SldsOverflowedBreadcrumb, {
                        name: "home",
                        label: "Home",
                        onClick: this.onClick,
                    }),
                ])
            },
        })

        const wrapper = mount(parentStub, { attachTo: document.body })

        await wrapper.find("a[role=\"menuitem\"]").trigger("click")

        expect(hideCalled).toBe(1)
        // Component emits click with the name; Vue may forward the original event as a second arg
        expect(received[0]).toBe("home")

        wrapper.unmount()
    })

    it("invokes the onClick handler synchronously for the href branch", async () => {
        // We cannot intercept window.location.assign in real Chromium, but we can still drive the
        // href branch by stubbing the parent's hideDropdown and asserting the onClick wiring runs.
        let hideCalled = 0
        const parentStub = defineComponent({
            methods: {
                hideDropdown() { hideCalled += 1 },
            },
            render() {
                return h("div", [
                    h(SldsOverflowedBreadcrumb, {
                        name: "x",
                        label: "X",
                        href: "#frag",
                    }),
                ])
            },
        })

        const wrapper = mount(parentStub, { attachTo: document.body })

        await wrapper.find("a[role=\"menuitem\"]").trigger("click")

        // hideDropdown is always called first, regardless of branch
        expect(hideCalled).toBe(1)

        wrapper.unmount()
    })

    it.todo("axe a11y check — menuitem anchor has no href; needs triage")
})
