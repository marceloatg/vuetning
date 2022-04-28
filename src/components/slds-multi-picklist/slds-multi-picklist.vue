<template>
    <slds-form-element
        :label="label"
        :error="error && !$data.$_isOpen"
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

                <!-- Pill container -->
                <div class="slds-pill_container">
                    <slds-pill
                        v-for="value in $data.$_value"
                        :key="value"
                        :label="getOption(value).label"
                        :non-removable="getOption(value).nonRemovable"
                        :title="getOption(value).label"
                        @remove="onRemove(value)"
                    />
                </div>

                <!-- Dropdown -->
                <transition v-bind="dropdownTransitionProperties">
                    <slds-multi-picklist-dropdown
                        v-if="$data.$_isOpen"
                        :value="$data.$_value"
                        class="pill-container-offset"
                        :class="dropdownClass"
                        :options="filteredOptions"
                        :focused-option="$data.$_focusedOption"
                        :is-empty="isEmpty"
                        :loading="loading"
                        @click="onClickOption"
                        @mouseover="onMouseOverOption"
                    >
                        <template v-if="$slots.options">
                            <slot name="options"/>
                        </template>
                    </slds-multi-picklist-dropdown>
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
import SldsFormElement from '@/components/slds-form-element/slds-form-element'
import SldsIcon from '@/components/slds-icon/slds-icon'
import HasDropdownMixin from '@/mixins/has-dropdown-mixin'
import ClickOutside from '@/directives/click-outside/index'
import DropdownOption from '@/components/slds-options/dropdown-option-class'
import SldsMultiPicklistDropdown from '@/components/slds-multi-picklist/slds-multi-picklist-dropdown'
import SldsPill from '@/components/slds-pill/slds-pill'

export default {
    name: 'SldsMultiPicklist',

    components: {
        SldsFormElement,
        SldsIcon,
        SldsMultiPicklistDropdown,
        SldsPill,
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
        value: {type: Array, default: () => []},
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
            return this.$data.$_value && this.$data.$_value.length === 1
                ? `${this.$data.$_value.length} Option Selected`
                : `${this.$data.$_value.length} Options Selected`
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
        getOption(value) {
            return this.$data.$_options.find(option => option.value === value)
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

        onRemove(value) {
            const index = this.$data.$_value.indexOf(value)
            this.$data.$_value.splice(index, 1)
            this.$emit('input', this.$data.$_value)
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
                    dropdownOption.nonRemovable = option.nonRemovable

                    this.$data.$_options.push(dropdownOption)
                }
                else {
                    throw'[slds-multi-picklist] options must be of type string or a valid picklist option object.'
                }
            }
        },

        selectOption(value) {
            this.hideDropdown()
            const index = this.$data.$_value.indexOf(value)

            if (index === -1) {
                this.$data.$_value.push(value)
                this.$emit('input', this.$data.$_value)
            }
            else {
                const selectedOption = this.$data.$_options.find(option => option.value === value)

                if (!selectedOption.nonRemovable) {
                    this.$data.$_value.splice(index, 1)
                    this.$emit('input', this.$data.$_value)
                }
            }

            this.clearFocusedOption()
        },

        setFocusedItem(value = null) {
            if (value) this.$data.$_focusedOption = value
            else if (this.$data.$_value) this.$data.$_focusedOption = this.$data.$_value[0]
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
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
}

.slds-pill_container {
    border-top: none;
    border-color: #c9c9c9;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}

.pill-container-offset {
    margin-top: -1.875rem;
}
</style>
