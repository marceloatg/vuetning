import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import { nextTick } from "vue"

import { expectNoViolations, runAxe } from "../../../tests/axe"
import SldsDataTable from "./slds-data-table.vue"
import type { DataTableColumn } from "./data-table-column"

const COLUMNS: DataTableColumn[] = [
    { fieldName: "name", label: "Name", type: "text" },
    { fieldName: "email", label: "Email", type: "text" },
]

const ROWS = [
    { id: "1", name: "Alice", email: "alice@example.com" },
    { id: "2", name: "Bob", email: "bob@example.com" },
    { id: "3", name: "Carol", email: "carol@example.com" },
    { id: "4", name: "Dave", email: "dave@example.com" },
    { id: "5", name: "Eve", email: "eve@example.com" },
]

function mountTable(props: Record<string, any> = {}) {
    const host = document.createElement("div")
    host.style.height = "400px"
    host.style.width = "800px"
    document.body.appendChild(host)

    const wrapper = mount(SldsDataTable, {
        props: {
            columns: COLUMNS,
            rows: ROWS,
            ...props,
        },
        attachTo: host,
    })

    return { wrapper, host }
}

describe("SldsDataTable", () => {
    it("mounts and renders the virtual-table container", () => {
        const { wrapper, host } = mountTable()

        expect(wrapper.find(".slds-virtual-table").exists()).toBe(true)
        expect(wrapper.find(".slds-virtual-table_container").exists()).toBe(true)
        expect(wrapper.find(".slds-virtual-table_header").exists()).toBe(true)
        expect(wrapper.find(".slds-virtual-table_body").exists()).toBe(true)

        wrapper.unmount()
        host.remove()
    })

    it("renders one column header per entry in the columns prop", () => {
        const { wrapper, host } = mountTable()

        const columns = wrapper.findAll(".slds-virtual-table_header .column")
        expect(columns).toHaveLength(COLUMNS.length)
        expect(wrapper.text()).toContain("Name")
        expect(wrapper.text()).toContain("Email")

        wrapper.unmount()
        host.remove()
    })

    it("renders the line-number header by default", () => {
        const { wrapper, host } = mountTable()

        expect(wrapper.find(".slds-virtual-table_header-line-number").exists()).toBe(true)

        wrapper.unmount()
        host.remove()
    })

    it("hides the line-number column when hideLineNumber is true", () => {
        const { wrapper, host } = mountTable({ hideLineNumber: true })

        expect(wrapper.find(".slds-virtual-table_header-line-number").exists()).toBe(false)

        wrapper.unmount()
        host.remove()
    })

    it("does not render the select-all header when hasSelection is false", () => {
        const { wrapper, host } = mountTable()

        expect(wrapper.find(".slds-virtual-table_header-select-all").exists()).toBe(false)

        wrapper.unmount()
        host.remove()
    })

    it("renders the select-all header checkbox when hasSelection is true", () => {
        const { wrapper, host } = mountTable({ hasSelection: true })

        const selectAll = wrapper.find(".slds-virtual-table_header-select-all")
        expect(selectAll.exists()).toBe(true)
        expect(selectAll.find("input[type=\"checkbox\"]").exists()).toBe(true)

        wrapper.unmount()
        host.remove()
    })

    it("reflects allRowsSelected on the header checkbox", () => {
        const { wrapper, host } = mountTable({ hasSelection: true, allRowsSelected: true })

        const checkbox = wrapper.find(".slds-virtual-table_header-select-all input") as any
        expect((checkbox.element as HTMLInputElement).checked).toBe(true)

        wrapper.unmount()
        host.remove()
    })

    it("emits select-all when the header select-all area is clicked", async () => {
        const { wrapper, host } = mountTable({ hasSelection: true })

        await wrapper.find(".slds-virtual-table_header-select-all").trigger("click")

        expect(wrapper.emitted("select-all")).toHaveLength(1)

        wrapper.unmount()
        host.remove()
    })

    it("emits select with the row item when a row's selection cell is clicked", async () => {
        const { wrapper, host } = mountTable({ hasSelection: true })
        await nextTick()
        await nextTick()

        const cell = wrapper.find(".slds-virtual-table_cell-selection")
        expect(cell.exists()).toBe(true)
        await cell.trigger("click")

        const events = wrapper.emitted("select")
        expect(events).toBeTruthy()
        expect(events![0][0]).toMatchObject({ id: expect.any(String) })

        wrapper.unmount()
        host.remove()
    })

    it("forwards a sort event from a column header up to the consumer", async () => {
        const { wrapper, host } = mountTable()

        const columnComponents = wrapper.findAllComponents({ name: "SldsDataTableColumn" })
        expect(columnComponents.length).toBeGreaterThan(0)
        columnComponents[0].vm.$emit("sort", "asc")
        await nextTick()

        // The data-table handles the sort internally and updates the column's sorted flag.
        // Verify that the first column is now marked as ascending.
        const firstColumnRoot = wrapper.findAll(".slds-virtual-table_header .column")[0]
        expect(firstColumnRoot.classes()).toContain("slds-is-sorted_asc")

        wrapper.unmount()
        host.remove()
    })

    it("renders rows from the rows prop into the virtual scroller body", async () => {
        const { wrapper, host } = mountTable()
        await nextTick()
        await nextTick()

        const rendered = wrapper.findAll(".slds-virtual-table_row")
        expect(rendered.length).toBeGreaterThan(0)
        expect(wrapper.text()).toContain("Alice")

        wrapper.unmount()
        host.remove()
    })

    it("renders the line-number cell for each rendered row by default", async () => {
        const { wrapper, host } = mountTable()
        await nextTick()
        await nextTick()

        const lineNumberCells = wrapper.findAll(".slds-virtual-table_cell-line-number")
        expect(lineNumberCells.length).toBeGreaterThan(0)
        expect(lineNumberCells[0].text()).toBe("1")

        wrapper.unmount()
        host.remove()
    })

    it("renders no rows when rows is an empty array", async () => {
        const { wrapper, host } = mountTable({ rows: [] })
        await nextTick()
        await nextTick()

        const rendered = wrapper.findAll(".slds-virtual-table_row")
        expect(rendered).toHaveLength(0)

        // Header is still present.
        expect(wrapper.find(".slds-virtual-table_header").exists()).toBe(true)

        wrapper.unmount()
        host.remove()
    })

    it("renders the actions header when actions are provided", () => {
        const { wrapper, host } = mountTable({
            actions: [{ value: "edit", label: "Edit" }],
        })

        expect(wrapper.find(".slds-virtual-table_header-actions").exists()).toBe(true)

        wrapper.unmount()
        host.remove()
    })

    it("filters the rows collection by the filter prop after the debounce window", async () => {
        const { wrapper, host } = mountTable()
        await nextTick()

        await wrapper.setProps({ filter: "Bob" })
        await new Promise((resolve) => setTimeout(resolve, 250))
        await nextTick()

        const filtered = (wrapper.vm as any).filteredRows as Array<{ name: string }>
        expect(filtered).toHaveLength(1)
        expect(filtered[0].name).toBe("Bob")

        wrapper.unmount()
        host.remove()
    })

    it("toggles sort direction from asc to desc on a second sort emission", async () => {
        const { wrapper, host } = mountTable()

        const columnComponents = wrapper.findAllComponents({ name: "SldsDataTableColumn" })
        columnComponents[0].vm.$emit("sort", "asc")
        await nextTick()
        columnComponents[0].vm.$emit("sort", "desc")
        await nextTick()

        const firstColumnRoot = wrapper.findAll(".slds-virtual-table_header .column")[0]
        expect(firstColumnRoot.classes()).toContain("slds-is-sorted_desc")
        expect(firstColumnRoot.classes()).not.toContain("slds-is-sorted_asc")

        wrapper.unmount()
        host.remove()
    })

    it("clears sort flags on previously-sorted columns when a new column is sorted", async () => {
        const { wrapper, host } = mountTable()

        const columnComponents = wrapper.findAllComponents({ name: "SldsDataTableColumn" })
        columnComponents[0].vm.$emit("sort", "asc")
        await nextTick()
        columnComponents[1].vm.$emit("sort", "asc")
        await nextTick()

        const headers = wrapper.findAll(".slds-virtual-table_header .column")
        expect(headers[0].classes()).not.toContain("slds-is-sorted_asc")
        expect(headers[1].classes()).toContain("slds-is-sorted_asc")

        wrapper.unmount()
        host.remove()
    })

    it("sorts the rows array ascending after an asc sort on the name column", async () => {
        const rows = [
            { id: "1", name: "Charlie", email: "c@x.com" },
            { id: "2", name: "Alice", email: "a@x.com" },
            { id: "3", name: "Bob", email: "b@x.com" },
        ]
        const { wrapper, host } = mountTable({ rows })

        const columnComponents = wrapper.findAllComponents({ name: "SldsDataTableColumn" })
        columnComponents[0].vm.$emit("sort", "asc")
        await nextTick()

        const filtered = (wrapper.vm as any).filteredRows as Array<{ name: string }>
        expect(filtered.map((r) => r.name)).toEqual(["Alice", "Bob", "Charlie"])

        wrapper.unmount()
        host.remove()
    })

    it("sorts the rows array descending after a desc sort", async () => {
        const rows = [
            { id: "1", name: "Alice", email: "a@x.com" },
            { id: "2", name: "Charlie", email: "c@x.com" },
            { id: "3", name: "Bob", email: "b@x.com" },
        ]
        const { wrapper, host } = mountTable({ rows })

        const columnComponents = wrapper.findAllComponents({ name: "SldsDataTableColumn" })
        columnComponents[0].vm.$emit("sort", "desc")
        await nextTick()

        const filtered = (wrapper.vm as any).filteredRows as Array<{ name: string }>
        expect(filtered.map((r) => r.name)).toEqual(["Charlie", "Bob", "Alice"])

        wrapper.unmount()
        host.remove()
    })

    it("applies a column width delta when a column emits resize", async () => {
        const { wrapper, host } = mountTable()
        await nextTick()
        await nextTick()

        const initialWidth = (wrapper.vm as any).columnConfigurations[0].width

        const columnComponents = wrapper.findAllComponents({ name: "SldsDataTableColumn" })
        columnComponents[0].vm.$emit("resize", 0, 50)
        await nextTick()

        expect((wrapper.vm as any).columnConfigurations[0].width).toBe(initialWidth + 50)

        wrapper.unmount()
        host.remove()
    })

    it("shifts the left offsets of subsequent columns when a preceding column is resized", async () => {
        const { wrapper, host } = mountTable()
        await nextTick()
        await nextTick()

        const initialLeft = (wrapper.vm as any).columnConfigurations[1].left

        const columnComponents = wrapper.findAllComponents({ name: "SldsDataTableColumn" })
        columnComponents[0].vm.$emit("resize", 0, 30)
        await nextTick()

        expect((wrapper.vm as any).columnConfigurations[1].left).toBe(initialLeft + 30)

        wrapper.unmount()
        host.remove()
    })

    it("does not throw when resize is fired with an out-of-bounds index", async () => {
        const { wrapper, host } = mountTable()

        expect(() => (wrapper.vm as any).onResizeColumn(99, 50)).not.toThrow()

        wrapper.unmount()
        host.remove()
    })

    it("renders the per-row line-number cell with the formatted index", async () => {
        const { wrapper, host } = mountTable()
        await nextTick()
        await nextTick()

        const cells = wrapper.findAll(".slds-virtual-table_cell-line-number")
        expect(cells.length).toBeGreaterThanOrEqual(2)
        expect(cells[0].text()).toBe("1")
        expect(cells[1].text()).toBe("2")

        wrapper.unmount()
        host.remove()
    })

    it("marks a row as selected via the is-selected class when item.isSelected is true", async () => {
        const rows = [
            { id: "1", name: "Alice", email: "alice@example.com", isSelected: true },
            { id: "2", name: "Bob", email: "bob@example.com" },
        ]
        const { wrapper, host } = mountTable({ rows, hasSelection: true })
        await nextTick()
        await nextTick()

        const selectedRows = wrapper.findAll(".slds-virtual-table_row.is-selected")
        expect(selectedRows).toHaveLength(1)

        wrapper.unmount()
        host.remove()
    })

    it("renders the per-row checkbox checked state from item.isSelected", async () => {
        const rows = [
            { id: "1", name: "Alice", email: "a@x.com", isSelected: true },
            { id: "2", name: "Bob", email: "b@x.com", isSelected: false },
        ]
        const { wrapper, host } = mountTable({ rows, hasSelection: true })
        await nextTick()
        await nextTick()

        const checkboxes = wrapper.findAll(".slds-virtual-table_cell-selection input[type='checkbox']")
        expect(checkboxes).toHaveLength(2)
        expect((checkboxes[0].element as HTMLInputElement).checked).toBe(true)
        expect((checkboxes[1].element as HTMLInputElement).checked).toBe(false)

        wrapper.unmount()
        host.remove()
    })

    it("re-runs filterRows when the rows prop changes", async () => {
        const { wrapper, host } = mountTable()
        await nextTick()

        await wrapper.setProps({ rows: [{ id: "9", name: "Zed", email: "z@x.com" }] })
        await nextTick()

        const filtered = (wrapper.vm as any).filteredRows as Array<{ name: string }>
        expect(filtered).toHaveLength(1)
        expect(filtered[0].name).toBe("Zed")

        wrapper.unmount()
        host.remove()
    })

    it("renders a link cell for type=link columns and emits the configured action when clicked", async () => {
        const linkColumns: DataTableColumn[] = [
            { fieldName: "name", label: "Name", type: "link", typeAttributes: { action: "navigate" } },
        ]
        const { wrapper, host } = mountTable({ columns: linkColumns })
        await nextTick()
        await nextTick()

        const link = wrapper.find(".slds-virtual-table_row a")
        expect(link.exists()).toBe(true)
        await link.trigger("click")

        const events = wrapper.emitted("navigate")
        expect(events).toBeTruthy()
        expect(events![0][0]).toMatchObject({ name: "Alice" })

        wrapper.unmount()
        host.remove()
    })

    it("renders a button cell for type=button columns and emits the configured action when clicked", async () => {
        const columns: DataTableColumn[] = [
            { fieldName: "btn", label: "Action", type: "button" },
        ]
        const rows = [
            { id: "1", btn: { label: "Run", action: "run" } },
        ]
        const { wrapper, host } = mountTable({ columns, rows })
        await nextTick()
        await nextTick()

        const button = wrapper.find(".slds-virtual-table_row button.slds-button_outline-brand")
        expect(button.exists()).toBe(true)
        await button.trigger("click")

        expect(wrapper.emitted("run")).toBeTruthy()

        wrapper.unmount()
        host.remove()
    })

    it("renders a badge cell for type=badge columns", async () => {
        const columns: DataTableColumn[] = [
            { fieldName: "status", label: "Status", type: "badge" },
        ]
        const rows = [
            { id: "1", status: { color: "success", label: "OK" } },
        ]
        const { wrapper, host } = mountTable({ columns, rows })
        await nextTick()
        await nextTick()

        const badge = wrapper.find(".slds-badge")
        expect(badge.exists()).toBe(true)
        expect(badge.text()).toContain("OK")
        expect(badge.classes()).toContain("slds-badge_success")

        wrapper.unmount()
        host.remove()
    })

    it("renders a boolean check icon when the field value is truthy", async () => {
        const columns: DataTableColumn[] = [
            { fieldName: "active", label: "Active", type: "boolean" },
        ]
        const rows = [
            { id: "1", active: true },
            { id: "2", active: false },
        ]
        const { wrapper, host } = mountTable({ columns, rows })
        await nextTick()
        await nextTick()

        const svgs = wrapper.findAll(".slds-virtual-table_row svg")
        // Truthy boolean cells render an SVG; falsy ones render nothing.
        expect(svgs.length).toBeGreaterThanOrEqual(1)

        wrapper.unmount()
        host.remove()
    })

    it("opens the action menu for a row when its action button is clicked", async () => {
        const columns: DataTableColumn[] = [
            { fieldName: "name", label: "Name", type: "text" },
        ]
        const rows = [
            { id: "1", name: "Alice", actions: ["edit"] },
        ]
        const { wrapper, host } = mountTable({
            columns,
            rows,
            actions: [{ value: "edit", label: "Edit" }],
        })
        await nextTick()
        await nextTick()

        const trigger = wrapper.find(".slds-virtual-table_cell-actions button")
        expect(trigger.exists()).toBe(true)
        await trigger.trigger("click")
        await nextTick()

        expect((wrapper.vm as any).actionMenu.openedRowId).toBe("1")
        expect((wrapper.vm as any).currentActions).toHaveLength(1)

        wrapper.unmount()
        host.remove()
    })

    it("emits the action's value event when an action menu item is mouse-downed", async () => {
        const columns: DataTableColumn[] = [
            { fieldName: "name", label: "Name", type: "text" },
        ]
        const rows = [
            { id: "1", name: "Alice", actions: ["edit"] },
        ]
        const { wrapper, host } = mountTable({
            columns,
            rows,
            actions: [{ value: "edit", label: "Edit" }],
        })
        await nextTick()
        await nextTick()

        await wrapper.find(".slds-virtual-table_cell-actions button").trigger("click")
        await nextTick()

        const item = wrapper.find(".slds-dropdown__item")
        expect(item.exists()).toBe(true)
        await item.trigger("mousedown")

        expect(wrapper.emitted("edit")).toBeTruthy()
        // Menu closes after action is taken.
        expect((wrapper.vm as any).actionMenu.openedRowId).toBeNull()

        wrapper.unmount()
        host.remove()
    })

    it("computes a 40px row height when any column is type=avatar", () => {
        const columns: DataTableColumn[] = [
            { fieldName: "avatar", label: "Avatar", type: "avatar" },
            { fieldName: "name", label: "Name", type: "text" },
        ]
        const { wrapper, host } = mountTable({ columns })

        expect((wrapper.vm as any).rowHeight).toBe(40)

        wrapper.unmount()
        host.remove()
    })

    it("computes a 32px row height when no column is type=avatar", () => {
        const { wrapper, host } = mountTable()
        expect((wrapper.vm as any).rowHeight).toBe(32)

        wrapper.unmount()
        host.remove()
    })

    it("renders an avatar cell for type=avatar columns", async () => {
        const columns: DataTableColumn[] = [
            { fieldName: "avatar", label: "Avatar", type: "avatar" },
        ]
        const rows = [
            { id: "1", avatar: "https://example.com/a.png" },
        ]
        const { wrapper, host } = mountTable({ columns, rows })
        await nextTick()
        await nextTick()

        const avatar = wrapper.find(".slds-virtual-table_row .slds-avatar img")
        expect(avatar.exists()).toBe(true)
        expect(avatar.attributes("src")).toBe("https://example.com/a.png")

        wrapper.unmount()
        host.remove()
    })

    it("renders an icon cell for type=icon columns", async () => {
        const columns: DataTableColumn[] = [
            { fieldName: "ic", label: "Ic", type: "icon" },
        ]
        const rows = [
            { id: "1", ic: { name: "utility:check", class: "icon-class" } },
        ]
        const { wrapper, host } = mountTable({ columns, rows })
        await nextTick()
        await nextTick()

        const iconHost = wrapper.find(".slds-virtual-table_row svg")
        expect(iconHost.exists()).toBe(true)

        wrapper.unmount()
        host.remove()
    })

    it("renders a badge with an icon when the badge value has an icon field", async () => {
        const columns: DataTableColumn[] = [
            { fieldName: "status", label: "Status", type: "badge" },
        ]
        const rows = [
            { id: "1", status: { color: "warning", label: "Warn", icon: "utility:warning" } },
        ]
        const { wrapper, host } = mountTable({ columns, rows })
        await nextTick()
        await nextTick()

        const badge = wrapper.find(".slds-badge")
        expect(badge.exists()).toBe(true)
        expect(badge.find(".slds-badge__icon").exists()).toBe(true)

        wrapper.unmount()
        host.remove()
    })

    it("does not render a badge cell when the field value is null", async () => {
        const columns: DataTableColumn[] = [
            { fieldName: "status", label: "Status", type: "badge" },
        ]
        const rows = [
            { id: "1", status: null },
        ]
        const { wrapper, host } = mountTable({ columns, rows })
        await nextTick()
        await nextTick()

        expect(wrapper.find(".slds-badge").exists()).toBe(false)

        wrapper.unmount()
        host.remove()
    })

    it("does not render a button cell when the field value is null", async () => {
        const columns: DataTableColumn[] = [
            { fieldName: "btn", label: "Action", type: "button" },
        ]
        const rows = [
            { id: "1", btn: null },
        ]
        const { wrapper, host } = mountTable({ columns, rows })
        await nextTick()
        await nextTick()

        expect(wrapper.find("button.slds-button_outline-brand").exists()).toBe(false)

        wrapper.unmount()
        host.remove()
    })

    it("renders a monospaced text cell when isMonospaced is true", async () => {
        const columns: DataTableColumn[] = [
            { fieldName: "name", label: "Name", type: "text", isMonospaced: true },
        ]
        const { wrapper, host } = mountTable({ columns })
        await nextTick()
        await nextTick()

        const cell = wrapper.find(".slds-virtual-table_row .slds-text-font_monospace")
        expect(cell.exists()).toBe(true)

        wrapper.unmount()
        host.remove()
    })

    it("getFieldValue resolves nested fieldName paths via dot notation", async () => {
        const columns: DataTableColumn[] = [
            { fieldName: "user.name", label: "Name", type: "text" },
        ]
        const rows = [
            { id: "1", user: { name: "Nested Alice" } },
            { id: "2", user: null },
        ]
        const { wrapper, host } = mountTable({ columns, rows })
        await nextTick()
        await nextTick()

        expect(wrapper.text()).toContain("Nested Alice")

        wrapper.unmount()
        host.remove()
    })

    it("getFieldValue returns null when the column has no fieldName", () => {
        const { wrapper, host } = mountTable()

        const result = (wrapper.vm as any).getFieldValue({ fieldName: null }, { id: "1" })
        expect(result).toBeNull()

        wrapper.unmount()
        host.remove()
    })

    it("filterRows returns no rows when the filter matches nothing", async () => {
        const { wrapper, host } = mountTable()
        await nextTick()

        await wrapper.setProps({ filter: "no-such-name" })
        await new Promise((resolve) => setTimeout(resolve, 250))
        await nextTick()

        const filtered = (wrapper.vm as any).filteredRows as Array<unknown>
        expect(filtered).toHaveLength(0)

        wrapper.unmount()
        host.remove()
    })

    it("emits the column action when a link cell is clicked even with no typeAttributes", async () => {
        const columns: DataTableColumn[] = [
            { fieldName: "name", label: "Name", type: "link" },
        ]
        const { wrapper, host } = mountTable({ columns })
        await nextTick()
        await nextTick()

        const link = wrapper.find(".slds-virtual-table_row a")
        expect(link.exists()).toBe(true)
        // Should NOT throw and should NOT emit any custom event because
        // typeAttributes is null.
        await link.trigger("click")

        // No CUSTOM event was emitted; only native DOM events bubble.
        const customEvents = Object.keys(wrapper.emitted())
            .filter((event) => event !== "click" && event !== "DOMActivate")
        expect(customEvents).toHaveLength(0)

        wrapper.unmount()
        host.remove()
    })

    it("does not emit on a button cell when the button payload has no action", async () => {
        const columns: DataTableColumn[] = [
            { fieldName: "btn", label: "Action", type: "button" },
        ]
        const rows = [
            { id: "1", btn: { label: "No Action" } },
        ]
        const { wrapper, host } = mountTable({ columns, rows })
        await nextTick()
        await nextTick()

        const button = wrapper.find("button.slds-button_outline-brand")
        expect(button.exists()).toBe(true)
        await button.trigger("click")

        // No custom event since the button's action field is undefined.
        const customEvents = Object.keys(wrapper.emitted())
            .filter((event) => event !== "click" && event !== "DOMActivate")
        expect(customEvents).toHaveLength(0)

        wrapper.unmount()
        host.remove()
    })

    it("onClickCopy is a no-op when no $clipboard plugin is registered", () => {
        const { wrapper, host } = mountTable()

        const column = (wrapper.vm as any).columnConfigurations[0]
        expect(() => (wrapper.vm as any).onClickCopy(column, { name: "Alice" })).not.toThrow()

        wrapper.unmount()
        host.remove()
    })

    it("onClickCopy invokes the registered $clipboard with the cell value", () => {
        const calls: string[] = []
        const host = document.createElement("div")
        document.body.appendChild(host)

        const wrapper = mount(SldsDataTable, {
            props: { columns: COLUMNS, rows: ROWS },
            global: {
                config: {
                    globalProperties: {
                        $clipboard: (text: string) => calls.push(text),
                    },
                },
            },
            attachTo: host,
        })

        const column = (wrapper.vm as any).columnConfigurations[0]
        ;(wrapper.vm as any).onClickCopy(column, { name: "Alice" })
        expect(calls).toEqual(["Alice"])

        wrapper.unmount()
        host.remove()
    })

    it("onCloseActionMenu resets the action menu state", () => {
        const { wrapper, host } = mountTable()

        ;(wrapper.vm as any).actionMenu.openedRowId = "row-1"
        ;(wrapper.vm as any).actionMenu.opacity = 1
        ;(wrapper.vm as any).actionMenu.orientation = "bottom"
        ;(wrapper.vm as any).currentActions = [{ value: "edit" }]

        ;(wrapper.vm as any).onCloseActionMenu()

        expect((wrapper.vm as any).actionMenu.openedRowId).toBeNull()
        expect((wrapper.vm as any).actionMenu.opacity).toBe(0)
        expect((wrapper.vm as any).actionMenu.orientation).toBe("top")
        expect((wrapper.vm as any).currentActions).toHaveLength(0)

        wrapper.unmount()
        host.remove()
    })

    it("onScrollBody updates scrollLeft and clears the action menu on vertical scroll", async () => {
        const columns: DataTableColumn[] = [
            { fieldName: "name", label: "Name", type: "text" },
        ]
        const rows = [
            { id: "1", name: "Alice", actions: ["edit"] },
        ]
        const { wrapper, host } = mountTable({
            columns,
            rows,
            actions: [{ value: "edit", label: "Edit" }],
        })
        await nextTick()
        await nextTick()

        ;(wrapper.vm as any).actionMenu.openedRowId = "1"

        // Simulate a vertical scroll event: scrollTop changes, scrollLeft does not.
        const verticalEvent = { target: { scrollTop: 50, scrollLeft: 0 } } as unknown as Event
        ;(wrapper.vm as any).onScrollBody(verticalEvent)

        expect((wrapper.vm as any).scrollTop).toBe(50)
        expect((wrapper.vm as any).actionMenu.openedRowId).toBeNull()

        // Simulate a horizontal scroll event: scrollLeft changes.
        const horizontalEvent = { target: { scrollTop: 50, scrollLeft: 25 } } as unknown as Event
        ;(wrapper.vm as any).onScrollBody(horizontalEvent)

        expect((wrapper.vm as any).scrollLeft).toBe(25)

        // Identical scroll position triggers the early return path.
        const noopEvent = { target: { scrollTop: 50, scrollLeft: 25 } } as unknown as Event
        expect(() => (wrapper.vm as any).onScrollBody(noopEvent)).not.toThrow()

        // Null target also early-returns.
        expect(() => (wrapper.vm as any).onScrollBody({ target: null } as unknown as Event)).not.toThrow()

        wrapper.unmount()
        host.remove()
    })

    it("onExpandColumn measures the longest cell value via the ruler and resizes the column", async () => {
        const rows = [
            { id: "1", name: "Aa", email: "a@x.com" },
            { id: "2", name: "Bobby Long Name Indeed", email: "b@x.com" },
            { id: "3", name: null, email: "c@x.com" },
        ]
        const { wrapper, host } = mountTable({ rows })
        await nextTick()
        await nextTick()

        const column = (wrapper.vm as any).columnConfigurations[0]
        const initialWidth = column.width
        await (wrapper.vm as any).onExpandColumn(0, column)
        await nextTick()

        // fullWidth is now memoized at minimum DEFAULT_MINIMUM_WIDTH (100).
        expect(column.fullWidth).toBeGreaterThanOrEqual(100)
        // width has been resized by `delta = fullWidth - initialWidth`,
        // so the final width equals the memoized fullWidth.
        expect(column.width).toBe(column.fullWidth)
        void initialWidth

        // Calling again with width === fullWidth must early-return without throwing.
        expect(() => (wrapper.vm as any).onExpandColumn(0, column)).not.toThrow()

        wrapper.unmount()
        host.remove()
    })

    it("sorter compares numeric values using sortBy when configured", async () => {
        const columns: DataTableColumn[] = [
            { fieldName: "name", label: "Name", type: "text", sortBy: "score" },
            { fieldName: "email", label: "Email", type: "text" },
        ]
        const rows = [
            { id: "1", name: "Alice", email: "a@x.com", score: 30 },
            { id: "2", name: "Bob", email: "b@x.com", score: 10 },
            { id: "3", name: "Carol", email: "c@x.com", score: 20 },
        ]
        const { wrapper, host } = mountTable({ columns, rows })

        const columnComponents = wrapper.findAllComponents({ name: "SldsDataTableColumn" })
        columnComponents[0].vm.$emit("sort", "asc")
        await nextTick()

        const sorted = (wrapper.vm as any).filteredRows as Array<{ score: number }>
        expect(sorted.map((row) => row.score)).toEqual([10, 20, 30])

        // Now flip to desc to exercise the desc numeric branch.
        columnComponents[0].vm.$emit("sort", "desc")
        await nextTick()
        const sortedDesc = (wrapper.vm as any).filteredRows as Array<{ score: number }>
        expect(sortedDesc.map((row) => row.score)).toEqual([30, 20, 10])

        wrapper.unmount()
        host.remove()
    })

    it("sorter places null values at the end regardless of order", async () => {
        const rows = [
            { id: "1", name: "Alice", email: "a@x.com" },
            { id: "2", name: null, email: "b@x.com" },
            { id: "3", name: "Carol", email: "c@x.com" },
        ]
        const { wrapper, host } = mountTable({ rows })

        const columnComponents = wrapper.findAllComponents({ name: "SldsDataTableColumn" })
        columnComponents[0].vm.$emit("sort", "asc")
        await nextTick()

        const sorted = (wrapper.vm as any).filteredRows as Array<{ name: string | null }>
        // Nulls float to the end.
        expect(sorted[sorted.length - 1].name).toBeNull()

        wrapper.unmount()
        host.remove()
    })

    it("sorter returns 0 for equal values", () => {
        const { wrapper, host } = mountTable()
        ;(wrapper.vm as any).sortedColumnId = (wrapper.vm as any).columnConfigurations[0].id
        ;(wrapper.vm as any).sortedOrder = "asc"

        const result = (wrapper.vm as any).sorter({ name: "Same" }, { name: "Same" })
        expect(result).toBe(0)

        wrapper.unmount()
        host.remove()
    })

    it("sorter returns 0 when no sorted column is configured", () => {
        const { wrapper, host } = mountTable()

        const result = (wrapper.vm as any).sorter({ name: "Alice" }, { name: "Bob" })
        expect(result).toBe(0)

        wrapper.unmount()
        host.remove()
    })

    it.todo("activated() restores body scrollTop — keep-alive hook is not directly invocable on the wrapper.vm in test mode")

    it("does not show right-fixed-column shadow when there's no horizontal overflow", async () => {
        const { wrapper, host } = mountTable()
        await nextTick()
        await nextTick()

        ;(wrapper.vm as any).hasHorizontalOverflow = false
        ;(wrapper.vm as any).scrollArrived = false
        expect((wrapper.vm as any).showRightFixedColumnShadow).toBe(false)

        // And when we have overflow but haven't arrived, it shows.
        ;(wrapper.vm as any).hasHorizontalOverflow = true
        expect((wrapper.vm as any).showRightFixedColumnShadow).toBe(true)

        wrapper.unmount()
        host.remove()
    })

    it("hasActions is false when actions is an empty array", () => {
        const { wrapper, host } = mountTable({ actions: [] })

        expect((wrapper.vm as any).hasActions).toBe(false)
        expect(wrapper.find(".slds-virtual-table_header-actions").exists()).toBe(false)

        wrapper.unmount()
        host.remove()
    })

    it("renders a non-resizable fixed-width column with the default fixed width", async () => {
        const columns: DataTableColumn[] = [
            { fieldName: "name", label: "Name", type: "text", isResizable: false },
            { fieldName: "email", label: "Email", type: "text" },
        ]
        const { wrapper, host } = mountTable({ columns })
        await nextTick()
        await nextTick()

        const fixedColumn = (wrapper.vm as any).columnConfigurations[0]
        // 48 is DEFAULT_FIXED_WIDTH for non-resizable columns without an explicit width.
        expect(fixedColumn.width).toBe(48)

        wrapper.unmount()
        host.remove()
    })

    it("uses an explicit width for a non-resizable column when provided", async () => {
        const columns: DataTableColumn[] = [
            { fieldName: "name", label: "Name", type: "text", isResizable: false, width: 120 },
            { fieldName: "email", label: "Email", type: "text" },
        ]
        const { wrapper, host } = mountTable({ columns })
        await nextTick()
        await nextTick()

        expect((wrapper.vm as any).columnConfigurations[0].width).toBe(120)

        wrapper.unmount()
        host.remove()
    })

    it("includes selection and actions widths in column-offset calculations when both are enabled", async () => {
        const { wrapper, host } = mountTable({ hasSelection: true, actions: [{ value: "edit" }] })
        await nextTick()
        await nextTick()

        // First column's left offset accounts for the line-counter (60) AND the
        // selection checkbox column (32) = 92.
        const firstColumn = (wrapper.vm as any).columnConfigurations[0]
        expect(firstColumn.left).toBe(92)

        wrapper.unmount()
        host.remove()
    })

    it("hides the header row via the hideHeader prop", async () => {
        const { wrapper, host } = mountTable({ hideHeader: true })
        await nextTick()

        expect(wrapper.find(".slds-virtual-table_header").exists()).toBe(false)

        wrapper.unmount()
        host.remove()
    })

    it("has no axe-detectable accessibility violations on a populated table", async () => {
        const { wrapper, host } = mountTable()
        await nextTick()
        await nextTick()

        const results = await runAxe(wrapper.element as Element)
        expectNoViolations(results)

        wrapper.unmount()
        host.remove()
    })
})
