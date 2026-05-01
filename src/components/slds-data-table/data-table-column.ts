export interface DataTableColumn {
    /**
     * Field name.
     */
    fieldName?: string

    /**
     * Column label.
     */
    label?: string

    /**
     * Column type.
     * Text by default.
     */
    type?: string

    /**
     * Initial column width in pixels.
     */
    width?: number

    /**
     * Whether the column displays a copy-to-clipboard button.
     */
    hasCopyButton?: boolean

    /**
     * Whether the column can be resized by the user.
     */
    isResizable?: boolean

    /**
     * Whether the column is sortable.
     */
    sortable?: boolean

    /**
     * Optional alternative field name to use when sorting the column.
     */
    sortBy?: string

    /**
     * Whether the column displays its menu button.
     */
    hasMenu?: boolean

    /**
     * Type-specific configuration attributes.
     */
    typeAttributes?: any

    /**
     * Whether the column content should be rendered with a monospaced font.
     */
    isMonospaced?: boolean

    /**
     * Minimum column width in pixels.
     */
    minimumWidth?: number
}
