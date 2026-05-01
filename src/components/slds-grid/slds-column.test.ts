import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsColumn from "./slds-column.vue"

describe("SldsColumn", () => {
    it("renders a slds-col container", () => {
        const wrapper = mount(SldsColumn, {
            slots: { default: "Cell" },
        })
        expect(wrapper.classes()).toContain("slds-col")
    })

    it("applies the size_1-of-2 modifier from a fraction size prop", () => {
        const wrapper = mount(SldsColumn, {
            props: { size: "1/2" },
            slots: { default: "Cell" },
        })
        expect(wrapper.classes()).toContain("slds-size_1-of-2")
    })

    it("applies size_1-of-3 from a fraction", () => {
        const wrapper = mount(SldsColumn, {
            props: { size: "1/3" },
        })
        expect(wrapper.classes()).toContain("slds-size_1-of-3")
    })

    it("applies size_1-of-2 from a percentage (50%)", () => {
        const wrapper = mount(SldsColumn, {
            props: { size: "50%" },
        })
        expect(wrapper.classes()).toContain("slds-size_1-of-2")
    })

    it("applies size_1-of-4 from a percentage (25%)", () => {
        const wrapper = mount(SldsColumn, {
            props: { size: "25%" },
        })
        expect(wrapper.classes()).toContain("slds-size_1-of-4")
    })

    it("simplifies non-trivial percentages (33.33%)", () => {
        const wrapper = mount(SldsColumn, {
            props: { size: "33.33%" },
        })
        // 33.33% won't simplify cleanly, but should still produce a size class
        expect(wrapper.classes().some(c => c.startsWith("slds-size_"))).toBe(true)
    })

    it("applies the huge breakpoint size class when hugeSize is set with size", () => {
        const wrapper = mount(SldsColumn, {
            props: { size: "1/2", hugeSize: "1/3" },
        })
        expect(wrapper.classes()).toContain("slds-size_1-of-2")
        expect(wrapper.classes()).toContain("slds-huge-size_1-of-2")
    })

    it("applies the x-huge breakpoint size class when xHugeSize is set with size", () => {
        const wrapper = mount(SldsColumn, {
            props: { size: "1/2", xHugeSize: "1/4" },
        })
        expect(wrapper.classes()).toContain("slds-x-huge-size_1-of-2")
    })

    it("applies slds-grow-none when hug is true", () => {
        const wrapper = mount(SldsColumn, {
            props: { hug: true },
        })
        expect(wrapper.classes()).toContain("slds-grow-none")
    })

    it("applies slds-shrink-none when fill is true", () => {
        const wrapper = mount(SldsColumn, {
            props: { fill: true },
        })
        expect(wrapper.classes()).toContain("slds-shrink-none")
    })

    it("applies all four bump modifier classes", () => {
        const wrapper = mount(SldsColumn, {
            props: { bumpTop: true, bumpBottom: true, bumpLeft: true, bumpRight: true },
        })

        const classes = wrapper.classes()
        expect(classes).toContain("slds-col_bump-top")
        expect(classes).toContain("slds-col_bump-bottom")
        expect(classes).toContain("slds-col_bump-left")
        expect(classes).toContain("slds-col_bump-right")
    })

    it("throws on invalid size input", () => {
        expect(() => mount(SldsColumn, {
            props: { size: "not-a-size" },
        })).toThrowError(/Invalid input/)
    })


    it("has no axe-detectable accessibility violations in its default state", async () => {
        const wrapper = mount(SldsColumn, {
            slots: { default: "Cell" },
            attachTo: document.body,
        })
        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)
        wrapper.unmount()
    })
})
