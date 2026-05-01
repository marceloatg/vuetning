export interface DataTableAction {
    /**
     * Action identifier emitted when the user activates the action.
     */
    value: string

    /**
     * Display label for the action.
     */
    label?: string

    /**
     * Optional icon name shown next to the label.
     */
    icon?: string

    /**
     * Whether the action is disabled.
     */
    disabled?: boolean
}
