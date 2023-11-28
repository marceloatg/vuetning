import { defineComponent, type PropType } from "vue"
import type { DropdownOption } from "../components/slds-dropdown/dropdown-option"

function isUnselectableOption(option: DropdownOption) {
    return option.disabled || option.isHeading || option.isDivider
}

export default defineComponent({
    props: {
        bottomAlignment: Boolean,

        centerAlignment: Boolean,

        length: {
            type: Number,
            validator(value: number): boolean {
                return [5, 7, 10].indexOf(value) !== -1
            },
        },

        /**
         * Picklist options.
         */
        options: { type: Array as PropType<DropdownOption[]>, default: () => [] as DropdownOption[] },

        rightAlignment: Boolean,

        /**
         * Indicates whether this dropdown is showing a spinner.
         */
        showSpinner: Boolean,
    },

    data() {
        return {
            /**
             * Input filter.
             */
            filter: "",

            /**
             * Focused option value.
             */
            focusedOption: null as unknown as DropdownOption | undefined,

            /**
             * Indicates whether the input is focused.
             */
            isFocused: false,

            /**
             * Indicates whether the dropdown is open.
             */
            isOpen: false,
        }
    },

    computed: {
        /**
         * Filtered options.
         */
        filteredOptions(): DropdownOption[] {
            if (this.filter.length === 0) return this.options

            return this.options.filter((option: DropdownOption): boolean => {
                if (option.isHeading) return true
                return String(option.label).toLowerCase().indexOf(this.filter.toLowerCase()) !== -1
            })
        },

        /**
         * Indicates whether there are no options on this dropdown.
         */
        isEmpty(): boolean {
            return Boolean(!this.options || this.options.length === 0)
        },
    },

    methods: {
        /**
         * Clears the current options filter.
         */
        clearFilter(): void {
            this.filter = ""
        },

        /**
         * Clears the currently focused option.
         */
        clearFocusedOption(): void {
            this.focusedOption = undefined
        },

        /**
         * Hides the dropdown.
         */
        hideDropdown(): void {
            this.isOpen = false
        },

        /**
         * Sets the focused option as the one bellow the current one.
         */
        setFocusedOptionDown(): void {
            let index = this.focusedOption ? this.options.indexOf(this.focusedOption) : -1

            do {
                index++
                if (index === this.options.length) index = 0
            } while (isUnselectableOption(this.options[index]))

            this.focusedOption = this.options[index]
        },

        /**
         * Sets the focused option as the one above the current one.
         */
        setFocusedOptionUp(): void {
            let index = this.focusedOption ? this.options.indexOf(this.focusedOption) : -1

            do {
                index--
                if (index === -1) index = this.options.length - 1
            } while (isUnselectableOption(this.options[index]))

            this.focusedOption = this.options[index]
        },

        /**
         * Shows the dropdown.
         */
        showDropdown(): void {
            this.isOpen = true
        },
    },
})
