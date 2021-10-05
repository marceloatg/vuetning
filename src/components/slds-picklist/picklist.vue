<template>
    <slds-form-element
        :label="label"
        :error="error"
        :required="required"
        :read-only="readonly"
    >

        <!-- View mode -->
        <div v-if="readonly" class="slds-form-element__static">
            {{ this.$data.$_value }}
        </div>

        <!-- Container -->
        <div
            v-else
            v-click-outside="hideDropdown"
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

                    <!-- Input -->
                    <input
                        ref="input"
                        type="text"
                        role="textbox"
                        class="slds-input slds-combobox__input slds-combobox__input-value"
                        autocomplete="off"
                        v-bind="$attrs"
                        :value="selectedLabel"
                        :disabled="disabled"
                        :placeholder="placeholder"
                        readonly
                        v-on="listeners"
                        @click="onClick"
                    >

                    <!-- Down icon -->
                    <slds-icon
                        icon="utility:down"
                        x-small
                        class="slds-input__icon slds-input__icon_right"
                    />

                </div>

                <!-- Dropdown -->
                <transition v-bind="dropdownTransitionProperties">
                    <slds-picklist-dropdown
                        v-if="$data.$_isOpen"
                        :value="$data.$_value"
                        :class="dropdownClass"
                        :options="filteredOptions"
                        :focused-option="$data.$_focusedOption"
                        :is-empty="isEmpty"
                        :is-loading="loading"
                        @click="onClickOption"
                        @mouseover="onMouseOverOption"
                    >
                        <template v-if="$slots.options">
                            <slot name="options"/>
                        </template>
                    </slds-picklist-dropdown>
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
import SldsFormElement from '@/components/slds-form-element/form-element'
import SldsIcon from '@/components/slds-icon/icon'
import HasDropdownMixin from '@/mixins/has-dropdown-mixin'
import ClickOutside from '@/directives/click-outside/index'
import DropdownOption from '@/components/slds-options/dropdown-option-class'
import SldsPicklistDropdown from '@/components/slds-picklist/picklist-dropdown'

export default {
    name: 'SldsPicklist',

    components: {
        SldsFormElement,
        SldsIcon,
        SldsPicklistDropdown
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
        medium: Boolean,
        options: Array,
        placeholder: String,
        readonly: Boolean,
        required: Boolean,
        small: Boolean,
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
        buttonTransitionName() {
            const isAnimated = (this.$vuetning && this.$vuetning.animations)
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

        dropdownClass() {
            return `slds-dropdown_length-${this.length}`
        },

        listeners() {
            const listeners = {...this.$listeners}
            delete listeners.input
            return listeners
        },

        selectedLabel() {
            return this.$data.$_value && this.$data.$_value.length
                ? this.$data.$_options.find(option => option.value === this.$data.$_value).label
                : null
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
            this.$data.$_options = this.$data.$_options.splice(0, this.$data.$_options.length)
            if (this.options == null) return

            for (const option of this.options) {
                if (typeof option === 'string') {
                    this.$data.$_options.push(new DropdownOption(null, option))
                }
                else if (typeof option === 'object') {
                    const dropdownOption = new DropdownOption(option.heading, option.label, option.value)
                    dropdownOption.meta = option.meta
                    dropdownOption.disabled = option.disabled

                    this.$data.$_options.push(dropdownOption)
                }
                else {
                    throw'[slds-picklist] options must be of type string or a valid picklist option object.'
                }
            }
        },

        selectOption(value) {
            this.hideDropdown()
            this.$emit('input', value)
            this.clearFocusedOption()
        },

        setFocusedItem(value = null) {
            if (value) this.$data.$_focusedOption = value
            else if (this.$data.$_value) this.$data.$_focusedOption = this.$data.$_value
            else this.$data.$_focusedOption = this.filteredOptions
                    .find(option => !option.disabled && !option.heading)
                    .value
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
