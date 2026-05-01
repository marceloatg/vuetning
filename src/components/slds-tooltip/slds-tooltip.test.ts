import { describe, it, expect, vi } from "vitest"
import { mount } from "@vue/test-utils"
import { nextTick } from "vue"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsTooltip from "./slds-tooltip.vue"

const TRIGGER_SLOT = "<button>Help</button>"
const BODY_SLOT = "Tooltip body"

const mountTooltip = (props: Record<string, any> = {}, attach = false) => {
    return mount(SldsTooltip, {
        props,
        slots: {
            trigger: TRIGGER_SLOT,
            default: BODY_SLOT,
        },
        ...(attach ? { attachTo: document.body } : {}),
    })
}

describe("SldsTooltip", () => {
    it("renders the trigger wrapper and the trigger slot content", () => {
        const wrapper = mountTooltip()

        expect(wrapper.find(".trigger-wrapper").exists()).toBe(true)
        expect(wrapper.text()).toContain("Help")
    })

    it("hides the tooltip popover by default", () => {
        const wrapper = mountTooltip()

        expect(wrapper.find("[role=\"tooltip\"]").exists()).toBe(false)
    })

    it("renders the popover with the default body slot when visible prop is true on mount", async () => {
        const wrapper = mountTooltip({ visible: true }, true)
        await nextTick()

        const popover = wrapper.find("[role=\"tooltip\"]")
        expect(popover.exists()).toBe(true)
        expect(popover.text()).toContain(BODY_SLOT)
        wrapper.unmount()
    })

    it("toggles isVisible when the visible prop changes via watcher", async () => {
        const wrapper = mountTooltip({ visible: false }, true)
        expect(wrapper.find("[role=\"tooltip\"]").exists()).toBe(false)

        await wrapper.setProps({ visible: true })
        await nextTick()
        expect(wrapper.find("[role=\"tooltip\"]").exists()).toBe(true)

        await wrapper.setProps({ visible: false })
        await nextTick()
        expect(wrapper.find("[role=\"tooltip\"]").exists()).toBe(false)

        wrapper.unmount()
    })

    it("opens the tooltip after the mouseenter delay", async () => {
        vi.useFakeTimers()
        const wrapper = mountTooltip({}, true)

        await wrapper.find(".trigger-wrapper").trigger("mouseenter")
        expect(wrapper.find("[role=\"tooltip\"]").exists()).toBe(false)

        vi.advanceTimersByTime(100)
        await nextTick()
        expect(wrapper.find("[role=\"tooltip\"]").exists()).toBe(true)

        vi.useRealTimers()
        wrapper.unmount()
    })

    it("closes the tooltip after the mouseleave delay", async () => {
        vi.useFakeTimers()
        const wrapper = mountTooltip({ visible: true }, true)
        await nextTick()
        expect(wrapper.find("[role=\"tooltip\"]").exists()).toBe(true)

        await wrapper.find(".trigger-wrapper").trigger("mouseleave")
        vi.advanceTimersByTime(100)
        await nextTick()
        expect(wrapper.find("[role=\"tooltip\"]").exists()).toBe(false)

        vi.useRealTimers()
        wrapper.unmount()
    })

    it("does not open or close when disabled", async () => {
        vi.useFakeTimers()
        const wrapper = mountTooltip({ disabled: true }, true)

        await wrapper.find(".trigger-wrapper").trigger("mouseenter")
        vi.advanceTimersByTime(200)
        await nextTick()
        expect(wrapper.find("[role=\"tooltip\"]").exists()).toBe(false)

        await wrapper.setProps({ disabled: true, visible: true })
        await nextTick()
        await wrapper.find(".trigger-wrapper").trigger("mouseleave")
        vi.advanceTimersByTime(200)
        await nextTick()
        // mouseleave was ignored (disabled), so tooltip stays open from prop
        expect(wrapper.find("[role=\"tooltip\"]").exists()).toBe(true)

        vi.useRealTimers()
        wrapper.unmount()
    })

    it("clears pending mouseleave timeout when re-entering quickly", async () => {
        vi.useFakeTimers()
        const wrapper = mountTooltip({ visible: true }, true)
        await nextTick()

        await wrapper.find(".trigger-wrapper").trigger("mouseleave")
        // before delay completes, re-enter
        vi.advanceTimersByTime(50)
        await wrapper.find(".trigger-wrapper").trigger("mouseenter")
        vi.advanceTimersByTime(200)
        await nextTick()

        // mouseenter scheduled show (which it already was), tooltip remains visible
        expect(wrapper.find("[role=\"tooltip\"]").exists()).toBe(true)

        vi.useRealTimers()
        wrapper.unmount()
    })

    it("clears pending mouseenter timeout when leaving quickly", async () => {
        vi.useFakeTimers()
        const wrapper = mountTooltip({}, true)

        await wrapper.find(".trigger-wrapper").trigger("mouseenter")
        vi.advanceTimersByTime(50)
        await wrapper.find(".trigger-wrapper").trigger("mouseleave")
        vi.advanceTimersByTime(200)
        await nextTick()

        expect(wrapper.find("[role=\"tooltip\"]").exists()).toBe(false)

        vi.useRealTimers()
        wrapper.unmount()
    })

    describe("popoverClassNames", () => {
        const cases: Array<[string, string]> = [
            ["bottom", "slds-nubbin_top"],
            ["bottomLeft", "slds-nubbin_top-right"],
            ["bottomRight", "slds-nubbin_top-left"],
            ["left", "slds-nubbin_right"],
            ["leftBottom", "slds-nubbin_right-top"],
            ["leftTop", "slds-nubbin_right-bottom"],
            ["right", "slds-nubbin_left"],
            ["rightBottom", "slds-nubbin_left-top"],
            ["rightTop", "slds-nubbin_left-bottom"],
            ["top", "slds-nubbin_bottom"],
            ["topLeft", "slds-nubbin_bottom-right"],
            ["topRight", "slds-nubbin_bottom-left"],
        ]

        for (const [prop, expectedClass] of cases) {
            it(`applies ${expectedClass} when ${prop} is true`, async () => {
                const wrapper = mountTooltip({ visible: true, [prop]: true }, true)
                await nextTick()
                const popover = wrapper.find("[role=\"tooltip\"]")
                expect(popover.exists()).toBe(true)
                expect(popover.classes()).toContain(expectedClass)
                expect(popover.classes()).toContain("slds-popover")
                expect(popover.classes()).toContain("slds-popover_tooltip")
                expect(popover.classes()).toContain("slds-input-has-icon")
                wrapper.unmount()
            })
        }

        it("defaults to slds-nubbin_bottom when no position prop is set", async () => {
            const wrapper = mountTooltip({ visible: true }, true)
            await nextTick()
            const popover = wrapper.find("[role=\"tooltip\"]")
            expect(popover.classes()).toContain("slds-nubbin_bottom")
            wrapper.unmount()
        })
    })

    it("renders the default slot content inside the popover body", async () => {
        const wrapper = mount(SldsTooltip, {
            props: { visible: true },
            slots: {
                trigger: TRIGGER_SLOT,
                default: "<span class='custom-content'>Custom</span>",
            },
            attachTo: document.body,
        })
        await nextTick()

        expect(wrapper.find(".slds-popover__body .custom-content").exists()).toBe(true)
        expect(wrapper.find(".slds-popover__body").text()).toContain("Custom")
        wrapper.unmount()
    })

    it("repositions the tooltip on window scroll while visible", async () => {
        const wrapper = mountTooltip({ visible: true }, true)
        await nextTick()
        await new Promise((r) => requestAnimationFrame(() => r(null)))

        const popoverWrapper = wrapper.find(".popover-wrapper").element as HTMLElement
        // simulate a scroll event
        const scrollEvent = new Event("scroll")
        Object.defineProperty(scrollEvent, "target", {
            value: { scrollingElement: { scrollTop: 50 } },
        })
        window.dispatchEvent(scrollEvent)
        await nextTick()

        // --top should still be a px value (set by handleScroll path)
        const topValue = popoverWrapper.style.getPropertyValue("--top")
        expect(topValue).toMatch(/px$/)
        wrapper.unmount()
    })

    it("ignores scroll events when not visible", async () => {
        const wrapper = mountTooltip({}, true)
        const scrollEvent = new Event("scroll")
        Object.defineProperty(scrollEvent, "target", {
            value: { scrollingElement: { scrollTop: 50 } },
        })

        // should not throw
        expect(() => window.dispatchEvent(scrollEvent)).not.toThrow()
        wrapper.unmount()
    })

    it("removes the scroll listener on unmount", async () => {
        const removeSpy = vi.spyOn(window, "removeEventListener")
        const wrapper = mountTooltip()
        wrapper.unmount()
        expect(removeSpy).toHaveBeenCalledWith("scroll", expect.any(Function))
        removeSpy.mockRestore()
    })

    it("computes a left offset when nested inside a slds-modal__container", async () => {
        const modal = document.createElement("div")
        modal.className = "slds-modal__container"
        modal.style.marginLeft = "100px"
        document.body.appendChild(modal)

        const wrapper = mount(SldsTooltip, {
            props: { visible: true },
            slots: { trigger: TRIGGER_SLOT, default: BODY_SLOT },
            attachTo: modal,
        })
        await nextTick()
        await new Promise((r) => requestAnimationFrame(() => r(null)))

        // popover should be present and positioned
        const popover = wrapper.find(".popover-wrapper").element as HTMLElement
        expect(popover.style.getPropertyValue("--left")).toMatch(/px$/)

        wrapper.unmount()
        document.body.removeChild(modal)
    })

    it("calls positionTooltip on update when isVisible is true", async () => {
        const wrapper = mountTooltip({ visible: true }, true)
        await nextTick()

        const vm = wrapper.vm as any
        const spy = vi.spyOn(vm, "positionTooltip")

        // trigger an update by changing a prop
        await wrapper.setProps({ visible: true, top: true })
        await nextTick()
        expect(spy).toHaveBeenCalled()

        wrapper.unmount()
    })

    describe("hideTooltip transform direction", () => {
        const directions: Array<[string, RegExp]> = [
            ["bottom", /^translateY\(-0?\.5rem\)$/],
            ["bottomLeft", /^translateY\(-0?\.5rem\)$/],
            ["bottomRight", /^translateY\(-0?\.5rem\)$/],
            ["top", /^translateY\(0?\.5rem\)$/],
            ["topLeft", /^translateY\(0?\.5rem\)$/],
            ["topRight", /^translateY\(0?\.5rem\)$/],
            ["left", /^translateX\(-0?\.5rem\)$/],
            ["leftBottom", /^translateX\(-0?\.5rem\)$/],
            ["leftTop", /^translateX\(-0?\.5rem\)$/],
            ["right", /^translateX\(0?\.5rem\)$/],
            ["rightBottom", /^translateX\(0?\.5rem\)$/],
            ["rightTop", /^translateX\(0?\.5rem\)$/],
        ]

        for (const [prop, expectedTransform] of directions) {
            it(`applies a translate transform when ${prop} is true`, () => {
                const wrapper = mountTooltip({ [prop]: true })
                const vm = wrapper.vm as any
                const fakeEl = document.createElement("div")
                vm.hideTooltip(fakeEl)
                expect(fakeEl.style.opacity).toBe("0")
                expect(fakeEl.style.transform).toMatch(expectedTransform)
                expect(fakeEl.style.transition).toContain("opacity")
                wrapper.unmount()
            })
        }

        it("defaults to translateY(.5rem) when no position is set", () => {
            const wrapper = mountTooltip()
            const vm = wrapper.vm as any
            const fakeEl = document.createElement("div")
            vm.hideTooltip(fakeEl)
            expect(fakeEl.style.transform).toMatch(/^translateY\(0?\.5rem\)$/)
            wrapper.unmount()
        })
    })

    it("showTooltip resets opacity and transform", () => {
        const wrapper = mountTooltip()
        const vm = wrapper.vm as any
        const fakeEl = document.createElement("div")
        fakeEl.style.opacity = "0"
        fakeEl.style.transform = "translateY(.5rem)"
        vm.showTooltip(fakeEl)
        expect(fakeEl.style.opacity).toBe("1")
        expect(fakeEl.style.transform).toMatch(/^translate\(0(px)?, 0(px)?\)$/)
        expect(fakeEl.style.transition).toContain("opacity")
        wrapper.unmount()
    })

    describe("getPopoverLeft", () => {
        const trigger = { x: 100, y: 200, width: 50, height: 20 } as DOMRect
        const popover = { x: 0, y: 0, width: 200, height: 60 } as DOMRect
        const nubbin = { width: 24, height: 24, paddingX: 12, paddingY: 8 }

        it("calculates left for bottomLeft / topLeft", () => {
            const wrapper = mountTooltip({ bottomLeft: true })
            const vm = wrapper.vm as any
            // 100 + 25 + 24 - 200 = -51
            expect(vm.getPopoverLeft(trigger, popover, nubbin)).toBe(-51)
            wrapper.unmount()
        })

        it("calculates left for bottomRight / topRight", () => {
            const wrapper = mountTooltip({ bottomRight: true })
            const vm = wrapper.vm as any
            // 100 + ((50-24)/2) - 12 = 101
            expect(vm.getPopoverLeft(trigger, popover, nubbin)).toBe(101)
            wrapper.unmount()
        })

        it("calculates left for left variants", () => {
            const wrapper = mountTooltip({ left: true })
            const vm = wrapper.vm as any
            // 100 - 200 - 12 = -112
            expect(vm.getPopoverLeft(trigger, popover, nubbin)).toBe(-112)
            wrapper.unmount()
        })

        it("calculates left for right variants", () => {
            const wrapper = mountTooltip({ right: true })
            const vm = wrapper.vm as any
            // 100 + 50 + 12 = 162
            expect(vm.getPopoverLeft(trigger, popover, nubbin)).toBe(162)
            wrapper.unmount()
        })

        it("calculates centered left when no position prop is set", () => {
            const wrapper = mountTooltip()
            const vm = wrapper.vm as any
            // 100 - ((200-50)/2) = 25
            expect(vm.getPopoverLeft(trigger, popover, nubbin)).toBe(25)
            wrapper.unmount()
        })
    })

    describe("getPopoverTop", () => {
        const trigger = { x: 100, y: 200, width: 50, height: 20 } as DOMRect
        const popover = { x: 0, y: 0, width: 200, height: 60 } as DOMRect
        const nubbin = { width: 24, height: 24, paddingX: 12, paddingY: 8 }

        it("calculates top for leftTop / rightTop", () => {
            const wrapper = mountTooltip({ leftTop: true })
            const vm = wrapper.vm as any
            // 200 + 10 - 60 + 24 = 174
            expect(vm.getPopoverTop(trigger, popover, nubbin)).toBe(174)
            wrapper.unmount()
        })

        it("calculates top for left / right", () => {
            const wrapper = mountTooltip({ right: true })
            const vm = wrapper.vm as any
            // 200 - ((60 - 20)/2) = 180
            expect(vm.getPopoverTop(trigger, popover, nubbin)).toBe(180)
            wrapper.unmount()
        })

        it("calculates top for bottom variants", () => {
            const wrapper = mountTooltip({ bottom: true })
            const vm = wrapper.vm as any
            // 200 + 20 + 12 = 232
            expect(vm.getPopoverTop(trigger, popover, nubbin)).toBe(232)
            wrapper.unmount()
        })

        it("calculates top for leftBottom / rightBottom", () => {
            const wrapper = mountTooltip({ leftBottom: true })
            const vm = wrapper.vm as any
            // 200 - 10 + 8 = 198
            expect(vm.getPopoverTop(trigger, popover, nubbin)).toBe(198)
            wrapper.unmount()
        })

        it("calculates default top (above the trigger)", () => {
            const wrapper = mountTooltip()
            const vm = wrapper.vm as any
            // 200 - 60 - 12 = 128
            expect(vm.getPopoverTop(trigger, popover, nubbin)).toBe(128)
            wrapper.unmount()
        })
    })

    it("getModalContainerLeftOffset returns '0' when not inside a modal", async () => {
        const wrapper = mountTooltip({ visible: true }, true)
        await nextTick()
        const vm = wrapper.vm as any
        expect(vm.getModalContainerLeftOffset()).toBe("0")
        wrapper.unmount()
    })

    it("has no axe-detectable accessibility violations in its default state", async () => {
        const wrapper = mountTooltip({}, true)
        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)
        wrapper.unmount()
    })

    it("has no axe-detectable accessibility violations when the tooltip is open", async () => {
        const wrapper = mountTooltip({ visible: true }, true)
        await nextTick()
        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)
        wrapper.unmount()
    })

    it("closes the tooltip on Escape key press", async () => {
        const wrapper = mountTooltip({ visible: true }, true)
        await nextTick()
        expect(wrapper.find("[role=\"tooltip\"]").exists()).toBe(true)

        await wrapper.find(".trigger-wrapper").trigger("keydown", { key: "Escape" })
        await nextTick()

        expect(wrapper.find("[role=\"tooltip\"]").exists()).toBe(false)

        wrapper.unmount()
    })

    it("opens the tooltip on focus and closes on blur", async () => {
        vi.useFakeTimers()
        const wrapper = mountTooltip({}, true)

        await wrapper.find(".trigger-wrapper").trigger("focusin")
        vi.advanceTimersByTime(100)
        await nextTick()
        expect(wrapper.find("[role=\"tooltip\"]").exists()).toBe(true)

        await wrapper.find(".trigger-wrapper").trigger("focusout")
        vi.advanceTimersByTime(100)
        await nextTick()
        expect(wrapper.find("[role=\"tooltip\"]").exists()).toBe(false)

        vi.useRealTimers()
        wrapper.unmount()
    })

    it("emits open/close events when visibility changes", async () => {
        vi.useFakeTimers()
        const wrapper = mountTooltip({}, true)

        await wrapper.find(".trigger-wrapper").trigger("mouseenter")
        vi.advanceTimersByTime(100)
        await nextTick()
        expect(wrapper.emitted("open")).toBeTruthy()
        expect(wrapper.emitted("open")!.length).toBe(1)

        await wrapper.find(".trigger-wrapper").trigger("mouseleave")
        vi.advanceTimersByTime(100)
        await nextTick()
        expect(wrapper.emitted("close")).toBeTruthy()
        expect(wrapper.emitted("close")!.length).toBe(1)

        vi.useRealTimers()
        wrapper.unmount()
    })
})
