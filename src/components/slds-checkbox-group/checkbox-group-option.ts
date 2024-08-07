import type { Option } from "../commons/option"

export interface CheckboxGroupOption extends Option {
    /**
     * Checkbox option label.
     */
    label: string

    /**
     * Checkbox option value.
     * This property is used as the v-for key.
     */
    value: string

    /**
     * Indicates whether this option is disabled.
     */
    disabled: boolean
}
