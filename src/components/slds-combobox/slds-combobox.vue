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
                    @keyup.down="handleKeyDownAsync"
                    @keyup.enter.stop="handleKeyEnterAsync"
                    @keyup.up="handleKeyUpAsync"
                >

                    <!-- Form element -->
                    <div class="slds-combobox__form-element slds-input-has-icon slds-input-has-icon_right" role="none">

                        <!-- Write input -->
                        <template v-if="isOpen">

                            <!-- Input -->
                            <input
                                :id="slotProps['inputId']"
                                ref="input"
                                type="text"
                                role="textbox"
                                class="slds-input slds-combobox__input slds-combobox__input-value"
                                tabindex="0"
                                :disabled="disabled"
                                :placeholder="placeholder"
                                :value="filter"
                                v-bind="inputAttributes"
                                @focus="handleFocusInput"
                                @input="handleInputFilter"
                                @keyup.esc.stop="handleEscInputAsync"
                            >

                            <!-- Clear button -->
                            <transition name="fade">
                                <slds-button-icon
                                    v-if="hasFilter"
                                    bare
                                    icon-name="utility:clear"
                                    class="slds-input__icon slds-input__icon_right"
                                    title="Clear"
                                    tabindex="-1"
                                    @click.stop="handleClickClearAsync"
                                />
                            </transition>

                        </template>

                        <!-- Read input -->
                        <template v-else>

                            <!-- Input -->
                            <input
                                :id="slotProps['inputId']"
                                ref="input"
                                type="text"
                                role="textbox"
                                class="slds-input slds-combobox__input"
                                tabindex="0"
                                :value="selectedOption?.label"
                                :disabled="disabled"
                                :placeholder="placeholder"
                                v-bind="inputAttributes"
                                @click="handleClickInput"
                            >

                            <!-- Down icon -->
                            <slds-icon
                                class="slds-input__icon slds-input__icon_right"
                                icon-name="utility:down"
                                x-small
                            />

                        </template>

                    </div>

                    <!-- Dropdown -->
                    <slds-dropdown
                        :filter="filter"
                        :focused-option="focusedOption"
                        :is-open="isOpen"
                        :options="filteredOptions"
                        :selected-option="selectedOption"
                        :show-spinner="showSpinner"
                        @click-option="handleClickOptionAsync"
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
import SldsFormElement from "../slds-form-element/slds-form-element.vue"
import SldsIcon from "../slds-icon/slds-icon.vue"
import { vOnClickOutside } from "@vueuse/components"
import { defineComponent, type PropType } from "vue"
import type { ValidationError } from "../slds-form-element/validation-error"
import type { DropdownOption } from "../slds-dropdown/dropdown-option"
import { EVENTS } from "../../constants"
import SldsDropdown from "../slds-dropdown/slds-dropdown.vue"
import SldsButtonIcon from "../slds-button-icon/slds-button-icon.vue"

export default defineComponent({
    name: "SldsCombobox",

    components: {
        SldsButtonIcon,
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
         * Indicates whether the options should be filtered.
         */
        hasFilter(): boolean {
            return Boolean(this.filter && this.filter.length > 0)
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
         * Focus on input element.
         */
        async focusOnInputAsync(): Promise<void> {
            await this.$nextTick()
            const focusableElement = this.$refs.input as HTMLElement
            focusableElement.focus()
        },

        /**
         * Handles the blur event on the input.
         */
        handleBlurInput(): void {
            if (this.isOpen) this.hideDropdown()
        },

        /**
         * Handles the input event on the write input.
         * @param event The fired event.
         */
        handleInputFilter(event: Event): void {
            const target = event.target as HTMLInputElement
            this.filter = target.value
            this.setFocusedOption()
        },

        /**
         * Handles the events that related to clearing the options filter.
         */
        async handleClickClearAsync(): Promise<void> {
            await this.focusOnInputAsync()
            this.clearFilter()
        },

        /**
         * Handles the click event on the input.
         */
        async handleClickInput(): Promise<void> {
            if (this.disabled) return

            if (this.isOpen) {
                this.hideDropdown()
            }
            else {
                this.setFocusedOption()
                this.showDropdown()

                await this.focusOnInputAsync()
            }
        },

        /**
         * Handles the click event on an option.
         * @param option The clicked option.
         */
        async handleClickOptionAsync(option: DropdownOption): Promise<void> {
            if (this.disabled || option.disabled) return
            this.selectOption(option)
            await this.focusOnInputAsync()
        },

        /**
         * Handles the click event outside this component.
         */
        handleClickOutside(): void {
            this.hideDropdown()
        },

        /**
         * Handles the key up esc event of the input.
         * @param event The fired event.
         */
        async handleEscInputAsync(event: Event): Promise<void> {
            if (!this.isOpen) return

            event.stopPropagation()

            if (this.filter === "") {
                this.hideDropdown()
                this.clearFocusedOption()
            }

            this.clearFilter()
            await this.focusOnInputAsync()
        },

        /**
         * Handles the focus event on the write input.
         */
        handleFocusInput(): void {
            this.clearFilter()
        },

        /**
         * Handles the key down event on the combobox.
         */
        async handleKeyDownAsync(): Promise<void> {
            if (!this.isOpen) {
                this.setFocusedOption()
                this.showDropdown()
            }
            else if (!this.isEmpty) {
                this.setFocusedOptionDown()
            }

            await this.focusOnInputAsync()
        },

        /**
         * Handles the key enter event on the combobox.
         */
        async handleKeyEnterAsync(): Promise<void> {
            if (!this.isOpen) {
                this.setFocusedOption()
                this.showDropdown()
            }
            else if (!this.isEmpty) {
                this.selectOption(this.focusedOption!)
            }

            await this.focusOnInputAsync()
        },

        /**
         * Handles the key up event on the combobox.
         */
        async handleKeyUpAsync(): Promise<void> {
            if (!this.isOpen) {
                this.setFocusedOption()
                this.showDropdown()
            }
            else if (!this.isEmpty) {
                this.setFocusedOptionUp()
            }

            await this.focusOnInputAsync()
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

</style>
