<template>
    <slds-form-element
        :errors="errors"
        :help="help"
        :label="label"
        :required="required"
        :stacked="stacked"
        :suppress-errors="isOpen"
        :tooltip="tooltip"
        v-bind="formElementAttributes"
    >

        <!-- Tooltip -->
        <template v-if="$slots.tooltip" #tooltip>
            <slot name="tooltip"/>
        </template>

        <!-- Default slot -->
        <template #default="slotProps">
            <div v-click-outside="handleClickOutside" :class="containerClassNames">
                <div
                    class="slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-is-open"
                    @keydown.down.prevent
                    @keydown.up.prevent
                    @keyup.down="handleKeyDown"
                    @keyup.enter.stop="handleKeyEnter"
                    @keyup.up="handleKeyUp"
                >

                    <!-- Form element -->
                    <div class="slds-combobox__form-element slds-input-has-icon slds-input-has-icon_right" role="none">

                        <!-- Input -->
                        <div
                            :id="slotProps['inputId']"
                            :class="inputClassNames"
                            role="combobox"
                            tabindex="0"
                            @blur="handleBlurInput"
                            @click="handleClickInput"
                            @focus="handleFocusInput"
                            @keyup.esc="handleEscInput"
                        >
                            <span class="slds-truncate">
                                {{ readableValue }}
                            </span>
                        </div>

                        <!-- Down icon -->
                        <slds-icon class="slds-input__icon slds-input__icon_right" icon-name="utility:down" x-small/>

                    </div>

                    <!-- Dropdown -->
                    <slds-dropdown
                        :focused-option="focusedOption"
                        :is-open="isOpen"
                        :length="length"
                        :options="options"
                        :selected-option="selectedOption"
                        :show-spinner="showSpinner"
                        @click-option="handleClickOption"
                        @mouse-over-option="setFocusedOption"
                    />

                </div>
            </div>
        </template>

        <!-- Inline help -->
        <template #help>
            <slot name="help"/>
        </template>

        <!-- Error messages -->
        <template #error>
            <slot name="error"/>
        </template>

    </slds-form-element>
</template>

<script lang="ts">
import HasDropdownMixin from "../../mixins/has-dropdown-mixin"
import SldsDropdown from "../slds-dropdown/slds-dropdown.vue"
import SldsFormElement from "../slds-form-element/slds-form-element.vue"
import SldsIcon from "../slds-icon/slds-icon.vue"
import { vOnClickOutside } from "@vueuse/components"
import { defineComponent, type PropType } from "vue"
import type { ValidationError } from "../slds-form-element/validation-error"
import type { DropdownOption } from "../slds-dropdown/dropdown-option"
import { EVENTS } from "../../constants"

export default defineComponent({
    name: "SldsPicklist",

    components: {
        SldsDropdown,
        SldsFormElement,
        SldsIcon,
    },

    directives: {
        ClickOutside: vOnClickOutside,
    },

    mixins: [HasDropdownMixin],

    props: {
        /**
         * Indicates whether the picklist is disabled.
         */
        disabled: Boolean,

        /**
         * Array of error objects from vuelidate.
         */
        errors: { type: Array as PropType<ValidationError[]>, default: () => [] as ValidationError[] },

        /**
         * Inline help text.
         * When using the help slot this prop is ignored.
         */
        help: String,

        /**
         * Picklist label.
         */
        label: String,

        large: Boolean,

        medium: Boolean,

        /**
         * Picklist value.
         */
        modelValue: String,

        /**
         * Picklist placeholder.
         */
        placeholder: String,

        /**
         * Indicates whether this label's picklist is required.
         */
        required: Boolean,

        small: Boolean,

        /**
         * Indicates whether the picklist is stacked among other inputs.
         */
        stacked: Boolean,

        /**
         * Tooltip text.
         * When using the tooltip slot this prop is ignored.
         */
        tooltip: String,

        xLarge: Boolean,

        xSmall: Boolean,

        xxLarge: Boolean,

        xxSmall: Boolean,
    },

    computed: {
        /**
         * The CSS class names for the container.
         */
        containerClassNames(): string {
            let classNames = "slds-combobox_container"

            // Size
            if (this.xxSmall) classNames += " slds-size_xx-small"
            else if (this.xSmall) classNames += " slds-size_x-small"
            else if (this.small) classNames += " slds-size_small"
            else if (this.medium) classNames += " slds-size_medium"
            else if (this.large) classNames += " slds-size_large"
            else if (this.xLarge) classNames += " slds-size_x-large"
            else if (this.xxLarge) classNames += " slds-size_xx-large"

            return classNames
        },

        /**
         * Bindable form element attributes.
         */
        formElementAttributes(): Record<string, unknown> {
            const attributes: Record<string, unknown> = {}

            for (const attribute in this.$attrs) {
                if (attribute.startsWith("data-") || attribute === "class") {
                    attributes[attribute] = this.$attrs[attribute]
                }
            }

            return attributes
        },

        /**
         * Bindable input attributes.
         */
        inputAttributes(): Record<string, unknown> {
            const attributes: Record<string, unknown> = {}

            for (const attribute in this.$attrs) {
                if (!attribute.startsWith("data-") && attribute !== "class") {
                    attributes[attribute] = this.$attrs[attribute]
                }
            }

            return attributes
        },

        /**
         * The CSS class names for the input.
         */
        inputClassNames(): string {
            let classNames = "slds-input_faux slds-combobox__input slds-cursor_pointer"

            // Showing disabled state
            if (this.disabled) classNames += " slds-is-disabled"

            // Showing input value
            if (this.modelValue) classNames += " slds-combobox__input-value"

            // Showing spinner
            if (this.isFocused) classNames += " slds-has-focus"

            return classNames
        },

        /**
         * The readable value displayed inside the input.
         */
        readableValue(): string {
            return this.modelValue
                ? this.options.find(option => option.value === this.modelValue)?.label || this.placeholder || ""
                : this.placeholder || ""
        },

        /**
         * The currently selected option, if any.
         */
        selectedOption(): DropdownOption | undefined {
            return this.modelValue && this.modelValue.length > 0
                ? this.options?.find(option => option?.value === this.modelValue)
                : undefined
        },
    },

    methods: {
        /**
         * Handles the blur event on the input.
         */
        handleBlurInput(): void {
            if (!this.disabled) this.isFocused = false
            if (this.isOpen) this.hideDropdown()
        },

        /**
         * Handles the click event on the input.
         */
        handleClickInput(): void {
            if (this.disabled) return

            if (this.isOpen) {
                this.hideDropdown()
            }
            else {
                this.setFocusedOption()
                this.showDropdown()
            }
        },

        /**
         * Handles the click event on an option.
         * @param option The clicked option.
         */
        handleClickOption(option: DropdownOption): void {
            if (this.disabled || option.disabled) return
            this.selectOption(option)
        },

        /**
         * Handles the focus event on the input.
         */
        handleFocusInput(): void {
            if (!this.disabled) this.isFocused = true
        },

        /**
         * Handles the click event outside this component.
         */
        handleClickOutside(): void {
            this.hideDropdown()
        },

        /**
         * Handles the key up esc event on the input.
         * @param event The fired event.
         */
        handleEscInput(event: Event): void {
            if (!this.isOpen) return

            this.hideDropdown()
            event.stopPropagation()
        },

        /**
         * Handles the key down event on the combobox.
         */
        handleKeyDown(): void {
            if (!this.isOpen) {
                this.setFocusedOption()
                this.showDropdown()
            }
            else if (!this.isEmpty) {
                this.setFocusedOptionDown()
            }
        },

        /**
         * Handles the key enter event on the combobox.
         */
        handleKeyEnter(): void {
            if (!this.isOpen) {
                this.setFocusedOption()
                this.showDropdown()
            }
            else if (!this.isEmpty) {
                this.selectOption(this.focusedOption!)
            }
        },

        /**
         * Handles the key up event on the combobox.
         */
        handleKeyUp(): void {
            if (!this.isOpen) {
                this.setFocusedOption()
                this.showDropdown()
            }
            else if (!this.isEmpty) {
                this.setFocusedOptionUp()
            }
        },

        /**
         * Selects an option.
         * @param selectedOption Selected option.
         */
        selectOption(selectedOption: DropdownOption): void {
            this.hideDropdown()
            this.$emit(EVENTS.UPDATE_MODEL_VALUE, selectedOption.value)
            if (selectedOption.value !== this.modelValue) this.$emit(EVENTS.CHANGE, selectedOption.value)

            this.clearFocusedOption()
        },

        /**
         * Set the focused item.
         * @param focusedOption Hovered option, if any.
         */
        setFocusedOption(focusedOption?: DropdownOption): void {
            if (this.isEmpty) return

            if (focusedOption) this.focusedOption = focusedOption
            else if (this.modelValue) this.focusedOption = this.selectedOption
            else this.focusedOption = this.options.find(option => !option.disabled && !option.isHeading && !option.isDivider)
        },
    },
})
</script>

<style scoped lang="scss">

// Fixes chromium bug which makes all focus rings black regardless of color defined
.slds-input_faux:focus-visible {
    outline: none !important;
}

.slds-is-disabled:focus,
.slds-is-disabled:active {
    border-color: #c9c9c9;
}

</style>
