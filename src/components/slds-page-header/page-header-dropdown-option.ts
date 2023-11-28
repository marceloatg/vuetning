export interface PageHeaderDropdownOption {
    /**
     * Indicates whether this page header dropdown options should be used as heading.
     */
    isHeading: boolean

    /**
     * Page header dropdown option label.
     */
    label: string

    /**
     * Page header dropdown option value.
     * This property is used as the v-for key.
     */
    value: string

    /**
     * Indicates whether this option is disabled.
     */
    disabled: boolean
}
