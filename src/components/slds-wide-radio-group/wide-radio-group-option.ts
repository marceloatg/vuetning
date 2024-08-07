import type { Option } from "../commons/option"

export interface WideRadioGroupOption extends Option {
    /**
     * Wide radio group option optional description to be displayed bellow the label.
     */
    description?: string

    /**
     * Wide radio group option label.
     */
    label: string

    /**
     * Wide radio group  option value.
     * This property is used as the v-for key.
     */
    value: string
}
