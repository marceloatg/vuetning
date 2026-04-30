import { v4 as newId } from "uuid"

import type { DataTableColumn } from "./data-table-column"

export class DataTableColumnConfiguration {
    id: string
    type: string
    label?: string
    fieldName?: string
    width?: number
    hasCopyButton: boolean
    isResizable: boolean
    sortable: boolean
    sortBy?: string
    hasMenu: boolean
    typeAttributes?: any
    sortedAscending: boolean
    sortedDescending: boolean
    fullWidth?: number
    offsetLeft?: number
    left?: number
    minimumWidth?: number
    isMonospaced?: boolean

    constructor(column: DataTableColumn) {
        this.id = newId()
        this.type = (column.type != null) ? column.type : "text"
        this.label = (column.label != null) ? column.label : undefined
        this.fieldName = (column.fieldName != null) ? column.fieldName : undefined
        this.width = (column.width != null) ? column.width : undefined
        this.hasCopyButton = (column.hasCopyButton != null) ? column.hasCopyButton : true
        this.isResizable = (column.isResizable != null) ? column.isResizable : true
        this.sortable = (column.sortable != null) ? column.sortable : true
        this.sortBy = (column.sortBy != null) ? column.sortBy : undefined
        this.hasMenu = (column.hasMenu != null) ? column.hasMenu : false
        this.typeAttributes = (column.typeAttributes != null) ? column.typeAttributes : null
        this.sortedAscending = false
        this.sortedDescending = false
        this.fullWidth = undefined

        if (["avatar", "badge", "boolean", "button", "icon"].includes(this.type)) {
            this.hasCopyButton = false
        }

        if (["avatar", "button", "icon"].includes(this.type)) {
            this.sortable = false
        }

        if (this.type === "avatar") {
            this.isResizable = false
            this.width = 48
        }

        this.offsetLeft = undefined
        this.left = undefined
        this.minimumWidth = column.minimumWidth
        this.isMonospaced = column.isMonospaced
    }
}
