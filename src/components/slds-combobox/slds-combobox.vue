<template>
    <slds-form-element
        :label="label"
        :error="error && !$data.$_isOpen"
        :required="required"
        :read-only="readonly"
        :tooltip="tooltip"
        v-bind="dataAttributes"
    >

        <!-- Tooltip -->
        <template v-if="$slots.tooltip" #tooltip>
            <slot name="tooltip"/>
        </template>

        <!-- View mode -->
        <div v-if="readonly" class="slds-form-element__static">
            {{ this.$data.$_value }}
        </div>

        <!-- Container -->
        <div
            v-else
            v-click-outside="onClickOutside"
            class="slds-combobox_container"
            :class="containerClass"
        >
            <div
                class="slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-is-open"
                aria-expanded="false"
                aria-haspopup="listbox"
                role="combobox"
                @keyup.up="onKeyUp"
                @keyup.down="onKeyDown"
                @keyup.enter.stop="onKeyEnter"
            >

                <!-- Form element -->
                <div
                    class="slds-combobox__form-element slds-input-has-icon slds-input-has-icon_right"
                    role="none"
                >

                    <!-- Write input -->
                    <template v-if="$data.$_isOpen">

                        <!-- Input -->
                        <input
                            ref="input"
                            type="text"
                            role="textbox"
                            class="slds-input slds-combobox__input slds-combobox__input-value"
                            v-bind="attributes"
                            :disabled="disabled"
                            :placeholder="placeholder"
                            v-on="listeners"
                            @click="onClick"
                            @input="onInput"
                            @keyup.esc.stop="onClear"
                        >

                        <!-- Clear button -->
                        <transition :name="buttonTransitionName">
                            <slds-button-icon
                                v-if="$data.$_filter != null"
                                icon="utility:clear"
                                class="slds-input__icon slds-input__icon_right"
                                title="Clear"
                                tabindex="-1"
                                @click.stop="onClear"
                            />
                        </transition>

                    </template>

                    <!-- Read input -->
                    <template v-else>

                        <!-- Input -->
                        <input
                            ref="input"
                            type="text"
                            role="textbox"
                            class="slds-input slds-combobox__input"
                            v-bind="attributes"
                            :value="selectedOptionLabel"
                            :disabled="disabled"
                            :placeholder="placeholder"
                            v-on="listeners"
                            @click="onClick"
                            @input="onClick();onInput($event)"
                        >

                        <!-- Search icon -->
                        <slds-icon
                            icon="utility:down"
                            x-small
                            class="slds-input__icon slds-input__icon_right"
                        />

                    </template>

                </div>

                <!-- Dropdown -->
                <transition v-bind="dropdownTransitionProperties">
                    <slds-combobox-dropdown
                        v-if="$data.$_isOpen"
                        :value="$data.$_value"
                        :class="dropdownClass"
                        :options="filteredOptions"
                        :focused-option="$data.$_focusedOption"
                        :filter="$data.$_filter"
                        :is-empty="isEmpty"
                        :loading="loading"
                        @click="onClickOption"
                        @mouseover="onMouseOverOption"
                    >
                        <template v-if="$slots.options">
                            <slot name="options"/>
                        </template>
                    </slds-combobox-dropdown>
                </transition>

            </div>
        </div>

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

<script>
import SldsButtonIcon from '@/components/slds-button-icon/slds-button-icon'
import SldsFormElement from '@/components/slds-form-element/slds-form-element'
import SldsIcon from '@/components/slds-icon/slds-icon'
import HasDropdownMixin from '@/mixins/has-dropdown-mixin'
import ClickOutside from '@/directives/click-outside/index'
import DropdownOption from '@/components/slds-options/dropdown-option-class'
import SldsComboboxDropdown from '@/components/slds-combobox/slds-combobox-dropdown'

export default {
    name: 'SldsCombobox',

    components: {
        SldsButtonIcon,
        SldsComboboxDropdown,
        SldsFormElement,
        SldsIcon
    },

    directives: {
        ClickOutside
    },

    mixins: [
        HasDropdownMixin
    ],

    inheritAttrs: false,

    props: {
        disabled: Boolean,
        error: Boolean,
        label: String,
        large: Boolean,
        length: {
            type: Number,
            validator(value) {
                return [5, 7, 10].indexOf(value) !== -1
            },
        },
        loading: Boolean,
        medium: Boolean,
        options: Array,
        placeholder: String,
        readonly: Boolean,
        required: Boolean,
        small: Boolean,
        tooltip: String,
        value: {},
        xLarge: Boolean,
        xSmall: Boolean,
        xxLarge: Boolean,
        xxSmall: Boolean,
    },

    data() {
        return {
            $_value: this.value
        }
    },

    computed: {
        attributes() {
            const attributes = {
                ...this.$attrs,
                maxlength: this.maxlength,
                placeholder: this.placeholder,
            }

            for (const attributesKey in attributes) {
                if (attributesKey.startsWith('data-')) {
                    delete attributes[attributesKey]
                }
            }

            return attributes
        },

        buttonTransitionName() {
            const isAnimated = (this.$vuetning && this.$vuetning.hasAnimations)
            return isAnimated ? 'fade' : ''
        },

        containerClass() {
            if (this.xxSmall) return 'slds-size_xx-small'
            if (this.xSmall) return 'slds-size_x-small'
            if (this.small) return 'slds-size_small'
            if (this.medium) return 'slds-size_medium'
            if (this.large) return 'slds-size_large'
            if (this.xLarge) return 'slds-size_x-large'
            if (this.xxLarge) return 'slds-size_xx-large'
            return null
        },

        dataAttributes() {
            const attributes = {...this.$attrs}

            for (const attributesKey in attributes) {
                if (!attributesKey.startsWith('data-')) {
                    delete attributes[attributesKey]
                }
            }

            return attributes
        },

        dropdownClass() {
            return `slds-dropdown_length-${this.length}`
        },

        listeners() {
            const listeners = {...this.$listeners}
            delete listeners.input
            return listeners
        },

        selectedOptionLabel() {
            if (this.$data.$_value == null) return null

            const selectedOption = this.$data.$_options.find(option => option.value === this.$data.$_value)
            return selectedOption ? selectedOption.label : null
        },
    },

    watch: {
        options: {
            deep: true,
            handler() {
                this.parseOptions()
            }
        },

        value(value) {
            this.$data.$_value = value
        }
    },

    created() {
        this.parseOptions()
    },

    methods: {
        onClear() {
            if (this.$data.$_filter == null) {
                this.hideDropdown()
                this.clearFocusedOption()
                this.clearFilter()
            }
            else {
                this.clearFilter()
                this.$refs.input.value = null
            }

            this.$refs.input.focus()
        },

        async onClick() {
            if (this.disabled || this.$data.$_isOpen) return
            this.setFocusedItem()
            this.showDropdown()

            await this.$nextTick()
            this.$refs.input.focus()
        },

        onClickOption(value) {
            this.selectOption(value)
        },

        onClickOutside() {
            this.clearFilter()
            this.hideDropdown()
        },

        onInput(event) {
            this.$data.$_filter = event.target.value
            this.$emit('search', event.target.value)
        },

        onKeyDown() {
            if (!this.$data.$_isOpen) {
                this.setFocusedItem()
                this.showDropdown()
            }
            else {
                this.setFocusedOptionDown()
            }
        },

        onKeyEnter() {
            if (!this.$data.$_isOpen) {
                this.setFocusedItem()
                this.showDropdown()
            }
            else {
                this.selectOption(this.$data.$_focusedOption)
            }
        },

        onKeyUp() {
            if (!this.$data.$_isOpen) {
                this.setFocusedItem()
                this.showDropdown()
            }
            else {
                this.setFocusedOptionUp()
            }
        },

        onMouseOverOption(value) {
            this.setFocusedItem(value)
        },

        parseOptions() {
            this.$data.$_options.splice(0, this.$data.$_options.length)
            if (this.options == null) return

            for (const option of this.options) {
                if (typeof option === 'string') {
                    this.$data.$_options.push(new DropdownOption(null, option))
                }
                else if (typeof option === 'object') {
                    const dropdownOption = new DropdownOption(option.heading, option.label, option.value)
                    dropdownOption.meta = option.meta
                    dropdownOption.icon = option.icon
                    dropdownOption.disabled = option.disabled

                    this.$data.$_options.push(dropdownOption)
                }
                else {
                    throw'[slds-combobox] options must be of type string or a valid combobox option object.'
                }
            }
        },

        selectOption(value) {
            this.hideDropdown()
            this.$emit('input', value)
            this.clearFocusedOption()
            this.clearFilter()
        },

        setFocusedItem(value = null) {
            if (value) this.$data.$_focusedOption = value
            else if (this.$data.$_value) this.$data.$_focusedOption = this.$data.$_value
            else this.$data.$_focusedOption = this.filteredOptions
                    .find(option => !option.disabled && !option.heading)?.value
        }
    }
}
</script>

<style scoped lang="scss">
@import '../../directives/animated/animations';

input {
    cursor: pointer;
}
</style>
