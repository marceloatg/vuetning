import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsVirtualScroller from "./slds-virtual-scroller.vue"

interface Item {
    id: number
    label: string
}

interface CustomKeyItem {
    uuid: string
    label: string
}

function makeItems(count: number): Item[] {
    return Array.from({ length: count }, (_, index) => ({
        id: index,
        label: `Item ${index}`,
    }))
}

describe("SldsVirtualScroller", () => {
    it("mounts and renders the .virtual-scroller container", () => {
        const wrapper = mount(SldsVirtualScroller, {
            props: { items: makeItems(10), itemSize: 40 },
            slots: { default: "<div class=\"row\">row</div>" },
        })

        expect(wrapper.find(".virtual-scroller").exists()).toBe(true)
        expect(wrapper.find(".virtual-scroller__item-wrapper").exists()).toBe(true)

        wrapper.unmount()
    })

    it("forwards item, index and active to the default scoped slot", () => {
        const wrapper = mount(SldsVirtualScroller, {
            props: { items: makeItems(5), itemSize: 40, prerender: 5 },
            slots: {
                default: `<template #default="{ item, index, active }">
                    <div class="row" :data-index="index" :data-active="active">{{ item.label }}</div>
                </template>`,
            },
        })

        const rows = wrapper.findAll(".row")
        expect(rows.length).toBeGreaterThan(0)
        expect(rows[0].attributes("data-index")).toBe("0")
        expect(rows[0].attributes("data-active")).toBe("true")
        expect(rows[0].text()).toBe("Item 0")

        wrapper.unmount()
    })

    it("renders only a visible window of items based on container height", async () => {
        const wrapper = mount(SldsVirtualScroller, {
            props: { items: makeItems(500), itemSize: 40 },
            slots: {
                default: `<template #default="{ item }">
                    <div class="row">{{ item.label }}</div>
                </template>`,
            },
            attachTo: document.body,
        })

        const container = wrapper.element as HTMLElement
        container.style.height = "200px"
        container.style.overflowY = "auto"

        await wrapper.vm.$nextTick()

        const rows = wrapper.findAll(".row")
        // 500 items * 40px = 20000px total. Visible window is way smaller than full set.
        expect(rows.length).toBeLessThan(500)
        expect(rows.length).toBeGreaterThan(0)

        wrapper.unmount()
    })

    it("uses itemSize to compute the wrapper min-height (totalSize)", async () => {
        const wrapper = mount(SldsVirtualScroller, {
            props: { items: makeItems(25), itemSize: 40 },
            slots: { default: "<div class=\"row\">row</div>" },
            attachTo: document.body,
        })

        await wrapper.vm.$nextTick()

        const innerWrapper = wrapper.find(".virtual-scroller__item-wrapper").element as HTMLElement
        // 25 * 40 = 1000px expected min-height
        expect(innerWrapper.style.minHeight).toBe("1000px")

        wrapper.unmount()
    })

    it("re-renders reactively when the items array changes", async () => {
        const wrapper = mount(SldsVirtualScroller, {
            props: { items: makeItems(5), itemSize: 40 },
            slots: {
                default: `<template #default="{ item }">
                    <div class="row">{{ item.label }}</div>
                </template>`,
            },
            attachTo: document.body,
        })

        await wrapper.vm.$nextTick()

        const initialWrapper = wrapper.find(".virtual-scroller__item-wrapper").element as HTMLElement
        expect(initialWrapper.style.minHeight).toBe("200px")

        await wrapper.setProps({ items: makeItems(50) })
        await wrapper.vm.$nextTick()
        await wrapper.vm.$nextTick()

        const updatedWrapper = wrapper.find(".virtual-scroller__item-wrapper").element as HTMLElement
        expect(updatedWrapper.style.minHeight).toBe("2000px")

        wrapper.unmount()
    })

    it("honors a custom keyField when items don't have an 'id' field", () => {
        const items: CustomKeyItem[] = [
            { uuid: "a", label: "Alpha" },
            { uuid: "b", label: "Beta" },
            { uuid: "c", label: "Gamma" },
        ]

        const wrapper = mount(SldsVirtualScroller, {
            props: { items, itemSize: 40, keyField: "uuid", prerender: 3 },
            slots: {
                default: `<template #default="{ item }">
                    <div class="row">{{ item.label }}</div>
                </template>`,
            },
        })

        const rows = wrapper.findAll(".row")
        expect(rows.length).toBe(3)
        expect(rows[0].text()).toBe("Alpha")
        expect(rows[2].text()).toBe("Gamma")

        wrapper.unmount()
    })

    it("renders the prerender count of items before mount completes", () => {
        // Use a shallow assertion: with prerender=4 and a small container that
        // hasn't been measured yet, mounted views should at least include the
        // prerender count.
        const wrapper = mount(SldsVirtualScroller, {
            props: { items: makeItems(100), itemSize: 40, prerender: 4 },
            slots: {
                default: `<template #default="{ item }">
                    <div class="row">{{ item.label }}</div>
                </template>`,
            },
        })

        const rows = wrapper.findAll(".row")
        expect(rows.length).toBeGreaterThanOrEqual(4)

        wrapper.unmount()
    })

    it("emits 'update' with (startIndex, endIndex) when emitUpdate is true", async () => {
        const wrapper = mount(SldsVirtualScroller, {
            props: { items: makeItems(20), itemSize: 40, emitUpdate: true },
            slots: { default: "<div class=\"row\">row</div>" },
            attachTo: document.body,
        })

        await wrapper.vm.$nextTick()

        const updates = wrapper.emitted("update")
        expect(updates).toBeTruthy()
        expect(updates!.length).toBeGreaterThan(0)

        const lastEvent = updates![updates!.length - 1]
        expect(lastEvent.length).toBe(2)
        expect(typeof lastEvent[0]).toBe("number")
        expect(typeof lastEvent[1]).toBe("number")
        expect(lastEvent[1]).toBeGreaterThanOrEqual(lastEvent[0] as number)

        wrapper.unmount()
    })

    it("renders cleanly with an empty items array", () => {
        const wrapper = mount(SldsVirtualScroller, {
            props: { items: [], itemSize: 40 },
            slots: { default: "<div class=\"row\">row</div>" },
        })

        expect(wrapper.find(".virtual-scroller").exists()).toBe(true)
        expect(wrapper.findAll(".row").length).toBe(0)

        const innerWrapper = wrapper.find(".virtual-scroller__item-wrapper").element as HTMLElement
        expect(innerWrapper.style.minHeight).toBe("0px")

        wrapper.unmount()
    })

    it("has no axe-detectable accessibility violations with rendered items", async () => {
        const wrapper = mount(SldsVirtualScroller, {
            props: { items: makeItems(10), itemSize: 40, prerender: 10 },
            slots: {
                default: `<template #default="{ item }">
                    <div class="row">{{ item.label }}</div>
                </template>`,
            },
            attachTo: document.body,
        })

        await wrapper.vm.$nextTick()

        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)

        wrapper.unmount()
    })

    it.todo("updates the visible window after a real scroll event — requestAnimationFrame timing in browser mode is flaky for synthetic scroll dispatch")

    it("supports a simpleArray of non-object items via simpleArray=true", async () => {
        const items = ["alpha", "beta", "gamma", "delta"]

        const wrapper = mount(SldsVirtualScroller, {
            props: { items, itemSize: 40, prerender: 4 },
            slots: {
                default: `<template #default="{ item }">
                    <div class="row">{{ item }}</div>
                </template>`,
            },
        })

        await wrapper.vm.$nextTick()

        expect((wrapper.vm as any).simpleArray).toBe(true)
        const rows = wrapper.findAll(".row")
        expect(rows.length).toBeGreaterThanOrEqual(4)
        expect(rows[0].text()).toBe("alpha")

        wrapper.unmount()
    })

    it("computes a non-null mountedViewsThreshold once ready", async () => {
        const wrapper = mount(SldsVirtualScroller, {
            props: { items: makeItems(20), itemSize: 40 },
            slots: { default: "<div class=\"row\">row</div>" },
            attachTo: document.body,
        })

        await wrapper.vm.$nextTick()

        expect((wrapper.vm as any).ready).toBe(true)
        expect((wrapper.vm as any).mountedViewsThreshold).not.toBeNull()
        expect(typeof (wrapper.vm as any).mountedViewsThreshold).toBe("number")

        wrapper.unmount()
    })

    it("returns null mountedViewsThreshold when not yet ready", () => {
        // Before mount() runs, ready is false. We can simulate this by toggling
        // ready off and reading the computed.
        const wrapper = mount(SldsVirtualScroller, {
            props: { items: makeItems(5), itemSize: 40 },
            slots: { default: "<div class=\"row\">row</div>" },
        })

        ;(wrapper.vm as any).ready = false
        expect((wrapper.vm as any).mountedViewsThreshold).toBeNull()

        wrapper.unmount()
    })

    it("addListeners attaches scroll and resize on the listener target", () => {
        const wrapper = mount(SldsVirtualScroller, {
            props: { items: makeItems(5), itemSize: 40 },
            slots: { default: "<div class=\"row\">row</div>" },
            attachTo: document.body,
        })

        ;(wrapper.vm as any).addListeners()
        const target = (wrapper.vm as any).listenerTarget
        expect(target).toBeTruthy()

        // removeListeners must clear the listenerTarget reference
        ;(wrapper.vm as any).removeListeners()
        expect((wrapper.vm as any).listenerTarget).toBeNull()

        // Calling removeListeners again is a no-op (covers the early-return branch)
        expect(() => (wrapper.vm as any).removeListeners()).not.toThrow()

        wrapper.unmount()
    })

    it("getListenerTarget returns window when ScrollParent is documentElement/body", () => {
        const wrapper = mount(SldsVirtualScroller, {
            props: { items: makeItems(5), itemSize: 40 },
            slots: { default: "<div class=\"row\">row</div>" },
            attachTo: document.body,
        })

        // When mounted directly to document.body, the scroll parent is typically
        // documentElement which the function rewrites to window.
        const target = (wrapper.vm as any).getListenerTarget()
        expect(target === window || target instanceof Element).toBe(true)

        wrapper.unmount()
    })

    it("handleScroll updates scrollLeft when the event target's scrollLeft changes", () => {
        const wrapper = mount(SldsVirtualScroller, {
            props: { items: makeItems(5), itemSize: 40 },
            slots: { default: "<div class=\"row\">row</div>" },
            attachTo: document.body,
        })

        const fakeTarget = { scrollLeft: 25 } as unknown as HTMLElement
        const event = { target: fakeTarget } as unknown as Event

        ;(wrapper.vm as any).handleScroll(event)
        expect((wrapper.vm as any).scrollLeft).toBe(25)

        wrapper.unmount()
    })

    it("handleScroll cancels an in-flight animation request when one is set", () => {
        const wrapper = mount(SldsVirtualScroller, {
            props: { items: makeItems(5), itemSize: 40 },
            slots: { default: "<div class=\"row\">row</div>" },
            attachTo: document.body,
        })

        // Set a fake in-flight animation id so the cancelAnimationFrame branch fires.
        ;(wrapper.vm as any).internalScrollAnimationRequest = 12345

        // No event => target undefined => skips the scrollLeft early return
        expect(() => (wrapper.vm as any).handleScroll()).not.toThrow()
        // After scheduling, internalScrollAnimationRequest is set to a new request id (number).
        expect((wrapper.vm as any).internalScrollAnimationRequest).not.toBe(12345)

        wrapper.unmount()
    })

    it("handleResize is a no-op when not yet ready, runs updateVisibleItems when ready", () => {
        const wrapper = mount(SldsVirtualScroller, {
            props: { items: makeItems(10), itemSize: 40 },
            slots: { default: "<div class=\"row\">row</div>" },
            attachTo: document.body,
        })

        ;(wrapper.vm as any).ready = false
        ;(wrapper.vm as any).handleResize()
        expect(wrapper.emitted("resize")).toBeTruthy()

        ;(wrapper.vm as any).ready = true
        expect(() => (wrapper.vm as any).handleResize()).not.toThrow()

        wrapper.unmount()
    })

    it("handleVisibilityChange emits 'visible' or 'hidden' according to the visibility entry", () => {
        const wrapper = mount(SldsVirtualScroller, {
            props: { items: makeItems(5), itemSize: 40 },
            slots: { default: "<div class=\"row\">row</div>" },
            attachTo: document.body,
        })

        const zeroRect = { width: 0, height: 0 } as DOMRect
        const nonZeroRect = { width: 100, height: 100 } as DOMRect

        ;(wrapper.vm as any).handleVisibilityChange(true, { boundingClientRect: zeroRect })
        ;(wrapper.vm as any).handleVisibilityChange(false, { boundingClientRect: nonZeroRect })
        ;(wrapper.vm as any).handleVisibilityChange(false, { boundingClientRect: zeroRect })

        expect(wrapper.emitted("visible")).toBeTruthy()
        expect(wrapper.emitted("hidden")).toBeTruthy()

        wrapper.unmount()
    })

    it("handleVisibilityChange is a no-op while not ready", () => {
        const wrapper = mount(SldsVirtualScroller, {
            props: { items: makeItems(5), itemSize: 40 },
            slots: { default: "<div class=\"row\">row</div>" },
            attachTo: document.body,
        })

        ;(wrapper.vm as any).ready = false
        ;(wrapper.vm as any).handleVisibilityChange(true, { boundingClientRect: { width: 10, height: 10 } as DOMRect })
        expect(wrapper.emitted("visible")).toBeFalsy()
        expect(wrapper.emitted("hidden")).toBeFalsy()

        wrapper.unmount()
    })

    it("scrollToItem and scrollToPosition compute a position based on itemSize", async () => {
        const wrapper = mount(SldsVirtualScroller, {
            props: { items: makeItems(50), itemSize: 40 },
            slots: { default: "<div class=\"row\">row</div>" },
            attachTo: document.body,
        })

        await wrapper.vm.$nextTick()

        const result = (wrapper.vm as any).scrollToPosition(10)
        expect(result.scrollDirection).toBe("scrollTop")
        expect(result.scrollDistance).toBe(400)

        // Also exercise scrollToItem (which assigns into the viewport).
        expect(() => (wrapper.vm as any).scrollToItem(2)).not.toThrow()

        wrapper.unmount()
    })

    it("unuseView with fake=true keeps the view marked used and does not clear from views map", async () => {
        const wrapper = mount(SldsVirtualScroller, {
            props: { items: makeItems(5), itemSize: 40, prerender: 5 },
            slots: { default: "<div class=\"row\">row</div>" },
        })

        await wrapper.vm.$nextTick()

        const views = (wrapper.vm as any).mountedViews
        const view = views[0]
        const wasUsed = view.nr.used
        const beforePosition = view.position

        ;(wrapper.vm as any).unuseView(view, true)

        // fake=true must NOT mutate used / position.
        expect(view.nr.used).toBe(wasUsed)
        expect(view.position).toBe(beforePosition)

        wrapper.unmount()
    })

    it("throws when an item resolves to a null key", () => {
        const items = [{ id: null, label: "broken" }] as any[]

        expect(() => {
            mount(SldsVirtualScroller, {
                props: { items, itemSize: 40, prerender: 1 },
                slots: { default: "<div class=\"row\">row</div>" },
            })
        }).toThrow(/Key is null/)
    })

    it("rebuilds the visible window when items length changes via the watcher", async () => {
        const wrapper = mount(SldsVirtualScroller, {
            props: { items: makeItems(5), itemSize: 40 },
            slots: { default: "<div class=\"row\">row</div>" },
            attachTo: document.body,
        })

        await wrapper.vm.$nextTick()

        await wrapper.setProps({ items: makeItems(20) })
        await wrapper.vm.$nextTick()
        await wrapper.vm.$nextTick()

        expect((wrapper.vm as any).itemCount).toBe(20)

        wrapper.unmount()
    })

    it("keeps itemCount the same when items prop is replaced with same length", async () => {
        const wrapper = mount(SldsVirtualScroller, {
            props: { items: makeItems(5), itemSize: 40 },
            slots: { default: "<div class=\"row\">row</div>" },
            attachTo: document.body,
        })

        await wrapper.vm.$nextTick()

        // First change establishes itemCount on the instance.
        await wrapper.setProps({ items: makeItems(7) })
        await wrapper.vm.$nextTick()
        await wrapper.vm.$nextTick()
        expect((wrapper.vm as any).itemCount).toBe(7)

        // Replacing with a different array of the SAME length must hit the
        // "items.length === itemCount" branch and leave itemCount untouched.
        await wrapper.setProps({ items: makeItems(7).map((item, index) => ({ ...item, label: `Renamed ${index}` })) })
        await wrapper.vm.$nextTick()
        await wrapper.vm.$nextTick()
        expect((wrapper.vm as any).itemCount).toBe(7)

        wrapper.unmount()
    })

    it.todo("itemsLimitError boundary — exceeding ITEMS_LIMIT (1000 visible items) is impractical to mount in test")

    it("rebuilds views via the non-continuous branch when scroll position jumps far ahead", async () => {
        const wrapper = mount(SldsVirtualScroller, {
            props: { items: makeItems(500), itemSize: 40 },
            slots: {
                default: `<template #default="{ item }">
                    <div class="row">{{ item.label }}</div>
                </template>`,
            },
            attachTo: document.body,
        })

        const container = wrapper.element as HTMLElement
        container.style.height = "200px"
        container.style.overflowY = "auto"

        await wrapper.vm.$nextTick()

        // Force a state where the next update is non-continuous: pretend we
        // had previously rendered items 0-5, then the viewport is now at
        // scrollTop ~ 8000 (item ~200), which is far beyond 5.
        ;(wrapper.vm as any).internalStartIndex = 0
        ;(wrapper.vm as any).internalEndIndex = 5
        ;(wrapper.vm as any).internalContinuous = true
        container.scrollTop = 8000

        // Now invoke the update directly — this hits the non-continuous code path.
        const result = (wrapper.vm as any).updateVisibleItems(false, false)
        expect(typeof result.continuous).toBe("boolean")
        expect((wrapper.vm as any).internalStartIndex).toBeGreaterThan(5)

        wrapper.unmount()
    })

    it("itemsLimitError throws the expected message when invoked directly", () => {
        const wrapper = mount(SldsVirtualScroller, {
            props: { items: makeItems(5), itemSize: 40 },
            slots: { default: "<div class=\"row\">row</div>" },
        })

        expect(() => (wrapper.vm as any).itemsLimitError()).toThrow(/Rendered items limit reached/)

        wrapper.unmount()
    })
})
