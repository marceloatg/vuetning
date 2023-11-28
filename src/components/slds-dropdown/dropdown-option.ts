/**
 * An option used by a dropdown component.
 */
export interface DropdownOption {
    /**
     * Dropdown option custom properties.
     */
    customProperties?: Map<string, any>

    /**
     * Optional lower text displayed bellow the label.
     */
    description?: string

    /**
     * Optional icon name.
     */
    iconName?: string

    /**
     * Indicates whether this option is disabled.
     */
    disabled?: boolean

    /**
     * Indicates whether this option is a divider.
     */
    isDivider?: boolean

    /**
     * Indicates whether this option is a heading.
     */
    isHeading?: boolean

    /**
     * Option label.
     */
    label?: string

    /**
     * Indicates whether this option is not removable, usually used with multi-selectable dropdowns.
     */
    nonRemovable?: boolean

    /**
     * Option value.
     */
    value?: string
}
