export interface Tab {
    /**
     * Indicates whether this tab has an error icon.
     */
    hasError: boolean

    /**
     * Tab icon.
     */
    iconName?: string

    /**
     * Tab label.
     */
    label: string

    /**
     * Tab Name, used to identify the tab when emitting events.
     */
    name: string
}
