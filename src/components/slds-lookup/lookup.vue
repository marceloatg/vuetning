<template>
    <slds-form-element
        :label="label"
        :error="error"
        :required="required"
        :read-only="readonly"
    >

        <!-- View mode -->
        <div v-if="readonly" class="slds-form-element__static">
            {{ $data.$_value }}
        </div>

        <!-- Container -->
        <div
            v-else
            v-click-outside="hideDropdown"
            class="slds-combobox_container slds-has-selection"
            :class="containerClass"
        >
            <div
                class="slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-is-open"
                aria-expanded="false"
                aria-haspopup="listbox"
                role="combobox"
                @keyup.up="onKeyUp"
                @keyup.down="onKeyDown"
                @keyup.enter="onKeyEnter"
            >

                <!-- Form element -->
                <div
                    class="slds-combobox__form-element slds-input-has-icon slds-input-has-icon_right"
                    :class="comboboxElementClass"
                    role="none"
                >

                    <!-- Write input -->
                    <template v-if="$data.$_isOpen">

                        <!-- Input -->
                        <input
                            ref="input"
                            type="text"
                            role="textbox"
                            class="slds-input slds-combobox__input"
                            v-bind="$attrs"
                            :value="$data.$_filter"
                            :disabled="disabled"
                            :placeholder="placeholder"
                            v-on="listeners"
                            @click="onClick"
                            @input="onInput"
                            @keyup.esc="onClear"
                        >

                        <!-- Right group -->
                        <div
                            class="slds-input__icon-group slds-input__icon-group_right"
                            :style="$data.$_rightGroupStyle"
                        >

                            <!-- Spinner -->
                            <transition :name="buttonTransitionName">
                                <slds-spinner
                                    v-if="loading"
                                    brand
                                    x-small
                                    class="slds-input__spinner"
                                    :style="{right: spinnerRight}"
                                />
                            </transition>

                            <!-- Clear button -->
                            <transition :name="buttonTransitionName">
                                <slds-button-icon
                                    v-if="$data.$_filter != null"
                                    icon="utility:clear"
                                    class="slds-input__icon slds-input__icon_right"
                                    title="Clear"
                                    tabindex="-1"
                                    @click.prevent="onClear"
                                />
                            </transition>

                        </div>

                    </template>

                    <!-- Read input -->
                    <template v-else>

                        <!-- Icon -->
                        <slds-icon
                            v-if="selectedOptionIcon"
                            :icon="selectedOptionIcon"
                            small
                            class="slds-combobox__input-entity-icon"
                        />

                        <!-- Input -->
                        <input
                            ref="input"
                            type="text"
                            role="textbox"
                            class="slds-input slds-combobox__input"
                            :class="{'slds-combobox__input-value': $data.$_value}"
                            :autocomplete="$data.$_value ? 'on' : 'off'"
                            v-bind="$attrs"
                            :value="$data.$_value"
                            :disabled="disabled"
                            :placeholder="placeholder"
                            v-on="listeners"
                            @click="onClick"
                            @input="onClick();onInput($event)"
                        >

                        <!-- Clear button -->
                        <slds-button-icon
                            v-if="$data.$_value"
                            icon="utility:close"
                            class="slds-input__icon slds-input__icon_right"
                            title="Remove selected option"
                            assistive-text="Remove selected option"
                            @click="selectOption(null)"
                        />

                        <!-- Search icon -->
                        <slds-icon
                            v-else
                            icon="utility:search"
                            x-small
                            class="slds-input__icon slds-input__icon_right"
                        />

                    </template>

                </div>

                <!-- Dropdown -->
                <transition v-bind="dropdownTransitionProperties">
                    <div
                        v-if="$data.$_isOpen"
                        class="slds-dropdown slds-dropdown_left slds-dropdown_top slds-dropdown_fluid"
                        :class="dropdownClass"
                        role="listbox"
                    >
                        <ul class="slds-listbox slds-listbox_vertical" role="presentation">

                            <!-- filter -->
                            <li
                                v-if="$data.$_filter && $data.$_filter.length"
                                role="presentation"
                                class="slds-listbox__item slds-theme_shade"
                                @mousedown.prevent.stop=""
                            >
                                <div
                                    role="option"
                                    class="slds-media slds-listbox__option slds-listbox__option_plain slds-media_small"
                                >

                                    <!-- Figure -->
                                    <span class="slds-media__figure slds-listbox__option-icon">
                                        <slds-icon icon="utility:search" x-small/>
                                    </span>

                                    <!-- Body -->
                                    <span class="slds-media__body">
                                        <span class="slds-truncate" :title="$data.$_filter">
                                            {{ $data.$_filter }}
                                        </span>
                                    </span>

                                </div>
                            </li>

                            <!-- Slot options -->
                            <slot
                                v-if="$slots.options"
                                name="options"
                            />

                            <!-- Prop options -->
                            <template v-else>
                                <slds-lookup-option
                                    v-for="option in filteredOptions"
                                    :key="option.key"
                                    :label="option.label"
                                    :meta="option.meta"
                                    :icon="option.icon"
                                    :disabled="option.disabled"
                                    :has-focus="$data.$_focusedOption === option.value"
                                    :filter="$data.$_filter"
                                    @click="onClickOption(option.value)"
                                    @mouseover="onMouseOverOption(option.value)"
                                />
                            </template>

                            <!-- No options -->
                            <li v-if="isEmpty" role="presentation" class="slds-listbox__item">
                                <div class="slds-align_absolute-center slds-p-vertical_small">
                                    No options to display
                                </div>
                            </li>

                        </ul>
                    </div>
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
import SldsButtonIcon from '@/components/slds-button-icon/button-icon'
import SldsFormElement from '@/components/slds-form-element/form-element'
import SldsIcon from '@/components/slds-icon/icon'
import SldsLookupOption from './lookup-option'
import SldsSpinner from '@/components/slds-spinner/spinner'
import ClickOutside from '@/directives/click-outside/index'
import HasDropdownMixin from '@/mixins/has-dropdown-mixin'
import DropdownOption from "@/components/slds-options/dropdown-option-class"

export default {
    name: "SldsLookup",

    components: {
        SldsButtonIcon,
        SldsFormElement,
        SldsIcon,
        SldsLookupOption,
        SldsSpinner
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
            const isAnimated = (this.$vuetning && this.$vuetning.hasAnimations)
            return isAnimated ? 'fade' : ''
        },

        comboboxElementClass() {
            return {
                'slds-input-has-icon slds-input-has-icon_left-right': this.selectedOptionIcon
            }
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

        selectedOptionIcon() {
            if (this.$data.$_value == null) return null

            const selectedOption = this.$data.$_options.find(option => option.value === this.$data.$_value)
            return selectedOption ? selectedOption.icon : null
        },

        spinnerRight() {
            if (this.$data.$_filter) return '1.5rem';
            return '.2rem';
        }
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
        },

        async onClick() {
            if (this.disabled || this.$data.$_isOpen) return
            this.setFocusedOption()
            this.showDropdown()

            await this.$nextTick()
            this.$refs.input.focus()
        },

        onClickOption(value) {
            this.selectOption(value)
        },

        onInput(event) {
            this.$data.$_filter = event.target.value
        },

        onKeyDown() {
            if (!this.$data.$_isOpen) {
                this.setFocusedOption()
                this.showDropdown()
            }
            else {
                this.setFocusedOptionDown()
            }
        },

        onKeyEnter() {
            if (!this.$data.$_isOpen) {
                this.setFocusedOption()
                this.showDropdown()
            }
            else {
                this.selectOption(this.$data.$_focusedOption)
            }
        },

        onKeyUp() {
            if (!this.$data.$_isOpen) {
                this.setFocusedOption()
                this.showDropdown()
            }
            else {
                this.setFocusedOptionUp()
            }
        },

        onMouseOverOption() {
        },

        parseOptions() {
            this.$data.$_options = this.$data.$_options.splice(0, this.$data.$_options.length)
            if (this.options == null) return

            for (const option of this.options) {
                if (typeof option === "string") {
                    this.$data.$_options.push(new DropdownOption(null, option))
                }
                else if (typeof option === "object") {
                    const dropdownOption = new DropdownOption(null, option.label, option.value)
                    dropdownOption.meta = option.meta
                    dropdownOption.icon = option.icon
                    dropdownOption.disabled = option.disabled

                    this.$data.$_options.push(dropdownOption)
                }
                else {
                    throw`[slds-lookup] options must be of type string or a valid lookup option object.`
                }
            }
        },

        selectOption(value) {
            this.hideDropdown()
            this.$emit('input', value)
            this.clearFocusedOption()
            this.clearFilter()
        },

        setFocusedOption(value = null) {
            if (value) this.$data.$_focusedOption = value
            else if (this.$data.$_value) this.$data.$_focusedOption = this.$data.$_value
            else this.$data.$_focusedOption = this.filteredOptions
                    .find(option => !option.disabled)
                    .value
        }
    }
}
</script>

<style scoped lang="scss">
.slds-combobox__input-entity-icon {
    margin-left: .125rem;
}

.slds-combobox__input-value {
    pointer-events: none;
}
</style>
