import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsDataTableColumn from "./slds-data-table-column.vue"

describe("SldsDataTableColumn", () => {
    it("renders the column with its label", () => {
        const wrapper = mount(SldsDataTableColumn, {
            props: { label: "Name", index: 0 },
        })
        expect(wrapper.text()).toContain("Name")
    })

    it("uses the label as the title attribute on the truncated label span", () => {
        const wrapper = mount(SldsDataTableColumn, {
            props: { label: "A very long column name", index: 0 },
        })
        const truncate = wrapper.find(".slds-truncate")
        expect(truncate.attributes("title")).toBe("A very long column name")
    })

    it("renders the sort icon when sortable is true (default)", () => {
        const wrapper = mount(SldsDataTableColumn, {
            props: { label: "Name", index: 0 },
        })
        expect(wrapper.find(".slds-is-sortable__icon").exists()).toBe(true)
    })

    it("hides the sort icon when sortable is false", () => {
        const wrapper = mount(SldsDataTableColumn, {
            props: { label: "Name", index: 0, sortable: false },
        })
        expect(wrapper.find(".slds-is-sortable__icon").exists()).toBe(false)
    })

    it("applies the slds-is-sortable class when sortable", () => {
        const wrapper = mount(SldsDataTableColumn, {
            props: { label: "Name", index: 0 },
        })
        expect(wrapper.find(".column").classes()).toContain("slds-is-sortable")
    })

    it("omits the slds-is-sortable class when sortable is false", () => {
        const wrapper = mount(SldsDataTableColumn, {
            props: { label: "Name", index: 0, sortable: false },
        })
        expect(wrapper.find(".column").classes()).not.toContain("slds-is-sortable")
    })

    it("applies slds-is-sorted_asc when sortedAscending is true", () => {
        const wrapper = mount(SldsDataTableColumn, {
            props: { label: "Name", index: 0, sortedAscending: true },
        })
        const classes = wrapper.find(".column").classes()
        expect(classes).toContain("slds-is-sorted")
        expect(classes).toContain("slds-is-sorted_asc")
    })

    it("applies slds-is-sorted_desc when sortedDescending is true", () => {
        const wrapper = mount(SldsDataTableColumn, {
            props: { label: "Name", index: 0, sortedDescending: true },
        })
        const classes = wrapper.find(".column").classes()
        expect(classes).toContain("slds-is-sorted")
        expect(classes).toContain("slds-is-sorted_desc")
    })

    it("applies the width prop as an inline style on the column root", () => {
        const wrapper = mount(SldsDataTableColumn, {
            props: { label: "Name", index: 0, width: 240 },
        })
        const style = wrapper.find(".column").attributes("style") ?? ""
        expect(style).toContain("width: 240px")
    })

    it("applies the left prop as an inline style on the column root", () => {
        const wrapper = mount(SldsDataTableColumn, {
            props: { label: "Name", index: 0, left: 60 },
        })
        const style = wrapper.find(".column").attributes("style") ?? ""
        expect(style).toContain("left: 60px")
    })

    it("renders the resize handle by default (isResizable defaults to true)", () => {
        const wrapper = mount(SldsDataTableColumn, {
            props: { label: "Name", index: 0 },
        })
        expect(wrapper.find(".handle").exists()).toBe(true)
        expect(wrapper.find(".column").classes()).toContain("is-resizable")
    })

    it("hides the resize handle when isResizable is false", () => {
        const wrapper = mount(SldsDataTableColumn, {
            props: { label: "Name", index: 0, isResizable: false },
        })
        expect(wrapper.find(".handle").exists()).toBe(false)
        expect(wrapper.find(".column").classes()).not.toContain("is-resizable")
    })

    it("does not render the menu unless hasMenu is true", () => {
        const wrapper = mount(SldsDataTableColumn, {
            props: { label: "Name", index: 0 },
        })
        expect(wrapper.find(".slds-dropdown-trigger").exists()).toBe(false)
    })

    it("emits sort 'asc' when the menu's sort-asc event fires", async () => {
        const wrapper = mount(SldsDataTableColumn, {
            props: { label: "Name", index: 0, hasMenu: true },
        })

        const menu = wrapper.findComponent({ name: "SldsMenu" })
        expect(menu.exists()).toBe(true)
        menu.vm.$emit("sort-asc")

        const emitted = wrapper.emitted("sort")
        expect(emitted).toBeTruthy()
        expect(emitted![0]).toEqual(["asc"])
    })

    it("emits sort 'desc' when the menu's sort-desc event fires", async () => {
        const wrapper = mount(SldsDataTableColumn, {
            props: { label: "Name", index: 0, hasMenu: true },
        })

        const menu = wrapper.findComponent({ name: "SldsMenu" })
        menu.vm.$emit("sort-desc")

        expect(wrapper.emitted("sort")![0]).toEqual(["desc"])
    })

    it("populates two sort options at create time when sortable", () => {
        const wrapper = mount(SldsDataTableColumn, {
            props: { label: "Name", index: 0 },
        })
        const options = (wrapper.vm as any).options
        expect(options).toHaveLength(2)
        expect(options[0].value).toBe("sort-asc")
        expect(options[1].value).toBe("sort-desc")
    })

    it("does not populate sort options when sortable is false", () => {
        const wrapper = mount(SldsDataTableColumn, {
            props: { label: "Name", index: 0, sortable: false },
        })
        expect((wrapper.vm as any).options).toHaveLength(0)
    })

    it("emits 'sort' 'asc' when handleSingleClick is called and column is not yet sorted", () => {
        const wrapper = mount(SldsDataTableColumn, {
            props: { label: "Name", index: 0 },
        })

        ;(wrapper.vm as any).handleSingleClick()
        expect(wrapper.emitted("sort")![0]).toEqual(["asc"])
    })

    it("emits 'sort' 'desc' when handleSingleClick is called and the column is already sorted ascending", () => {
        const wrapper = mount(SldsDataTableColumn, {
            props: { label: "Name", index: 0, sortedAscending: true },
        })

        ;(wrapper.vm as any).handleSingleClick()
        expect(wrapper.emitted("sort")![0]).toEqual(["desc"])
    })

    it("ignores handleSingleClick when sortable is false", () => {
        const wrapper = mount(SldsDataTableColumn, {
            props: { label: "Name", index: 0, sortable: false },
        })

        ;(wrapper.vm as any).handleSingleClick()
        expect(wrapper.emitted("sort")).toBeFalsy()
    })

    it("emits 'expand' when handleDoubleClick is called for a text column", () => {
        const wrapper = mount(SldsDataTableColumn, {
            props: { label: "Name", index: 0, type: "text" },
        })

        ;(wrapper.vm as any).handleDoubleClick()
        expect(wrapper.emitted("expand")).toBeTruthy()
    })

    it("emits 'expand' when handleDoubleClick is called for a link column", () => {
        const wrapper = mount(SldsDataTableColumn, {
            props: { label: "Name", index: 0, type: "link" },
        })

        ;(wrapper.vm as any).handleDoubleClick()
        expect(wrapper.emitted("expand")).toBeTruthy()
    })

    it("does not emit 'expand' for non-text/link columns", () => {
        const wrapper = mount(SldsDataTableColumn, {
            props: { label: "Name", index: 0, type: "icon" },
        })

        ;(wrapper.vm as any).handleDoubleClick()
        expect(wrapper.emitted("expand")).toBeFalsy()
    })

    it("does not emit 'expand' when isResizable is false", () => {
        const wrapper = mount(SldsDataTableColumn, {
            props: { label: "Name", index: 0, type: "text", isResizable: false },
        })

        ;(wrapper.vm as any).handleDoubleClick()
        expect(wrapper.emitted("expand")).toBeFalsy()
    })

    it("emits 'resize' with the index and delta after a mousedown / move / mouseup sequence on the handle", async () => {
        const wrapper = mount(SldsDataTableColumn, {
            props: { label: "Name", index: 2, width: 200 },
            attachTo: document.body,
        })

        const handle = wrapper.find(".handle")
        expect(handle.exists()).toBe(true)

        // Initiate drag.
        const downEvent = new MouseEvent("mousedown", { bubbles: true, cancelable: true })
        Object.defineProperty(downEvent, "pageX", { value: 100 })
        handle.element.dispatchEvent(downEvent)

        // Drag past the minimum threshold.
        const moveEvent = new MouseEvent("mousemove", { bubbles: true })
        Object.defineProperty(moveEvent, "pageX", { value: 140 })
        document.body.dispatchEvent(moveEvent)

        const upEvent = new MouseEvent("mouseup", { bubbles: true })
        Object.defineProperty(upEvent, "pageX", { value: 140 })
        document.body.dispatchEvent(upEvent)

        const emitted = wrapper.emitted("resize")
        expect(emitted).toBeTruthy()
        expect(emitted![0][0]).toBe(2)
        expect(emitted![0][1]).toBe(40)

        wrapper.unmount()
    })

    it("clamps the resizing translation to the minimum width", () => {
        const wrapper = mount(SldsDataTableColumn, {
            props: { label: "Name", index: 0, width: 60, minimumWidth: 48 },
        })

        ;(wrapper.vm as any).resizing(-100)
        // delta is clamped to (minimumWidth - width) = -12.
        expect((wrapper.vm as any).resizerTranslation).toBe(-12)
    })

    it("does not emit 'resize' when the resulting delta is zero (already at minimum)", () => {
        const wrapper = mount(SldsDataTableColumn, {
            props: { label: "Name", index: 0, width: 48, minimumWidth: 48 },
        })

        ;(wrapper.vm as any).resize(-50)
        expect(wrapper.emitted("resize")).toBeFalsy()
    })

    it("emits 'resize' from the resize() method when width is set and delta is non-zero", () => {
        const wrapper = mount(SldsDataTableColumn, {
            props: { label: "Name", index: 4, width: 200 },
        })

        ;(wrapper.vm as any).resize(25)
        const emitted = wrapper.emitted("resize")
        expect(emitted).toBeTruthy()
        expect(emitted![0]).toEqual([4, 25])
    })

    it("does not emit 'resize' when width is undefined", () => {
        const wrapper = mount(SldsDataTableColumn, {
            props: { label: "Name", index: 0 },
        })

        ;(wrapper.vm as any).resize(50)
        expect(wrapper.emitted("resize")).toBeFalsy()
    })

    it("renders the menu when hasMenu is true", () => {
        const wrapper = mount(SldsDataTableColumn, {
            props: { label: "Name", index: 0, hasMenu: true },
        })
        expect(wrapper.findComponent({ name: "SldsMenu" }).exists()).toBe(true)
    })

    it("axe a11y check on the rendered column", async () => {
        // The column is a presentational div without a column header role; it is
        // designed to live inside a parent <slds-data-table> that owns the grid
        // semantics. We still run axe to lock in the current baseline. If a new
        // violation is introduced (e.g. low contrast, missing label), this test
        // will surface the rule id so we can decide whether to fix or expect it.
        const wrapper = mount(SldsDataTableColumn, {
            props: { label: "Name", index: 0, width: 200 },
            attachTo: document.body,
        })

        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)

        wrapper.unmount()
    })
})
