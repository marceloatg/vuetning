export interface ScopedTab {
    /**
     * Indicates whether this scoped tab has an error icon.
     */
    hasError: boolean

    /**
     * Scoped Tab ID
     */
    id: string

    /**
     * Scoped tab label.
     */
    label: string

    /**
     * Scoped tab Name, used to identify the scoped tab when emitting events.
     */
    name: string
}
