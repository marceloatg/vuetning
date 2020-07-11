<template>
    <div class="slds-form-element" :class="{ 'slds-has-error': error }">

        <!-- Label -->
        <label v-if="label != null" class="slds-form-element__label">
            <abbr v-if="required" class="slds-required" title="required">*</abbr> {{ label }}
        </label>

        <!-- Control -->
        <div class="slds-form-element__control">
            <div class="slds-combobox_container" :class="size">
                <div role="combobox" class="slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-is-open">

                    <!-- Input -->
                    <div role="none" class="slds-combobox__form-element slds-input-has-icon slds-input-has-icon_right">

                        <template v-if="!readonly && isDropdownActive">

                            <input
                                ref="input"
                                :value="filter"
                                v-bind="attributes"
                                :placeholder="placeholder"
                                class="slds-input slds-combobox__input slds-combobox__input-value"
                                @blur="onBlur"
                                @click="onClick"
                                @focus="onFocus"
                                @input="onInput"
                                v-on="listeners">

                            <transition name="fade">
                                <slds-button-icon
                                    v-if="filter != null"
                                    icon="utility:clear"
                                    class="slds-input__icon slds-input__icon_right"
                                    title="Clear"
                                    tabindex="-1"
                                    @click.stop="onClear"/>
                            </transition>

                        </template>

                        <template v-else>

                            <input
                                ref="input"
                                :value="selectedOption"
                                :readonly="readonly"
                                v-bind="attributes"
                                :placeholder="placeholder"
                                class="slds-input slds-combobox__input slds-combobox__input-value"
                                @blur="onBlur"
                                @click="onClick"
                                @focus="onFocus"
                                v-on="listeners">

                            <slds-icon icon="utility:down" x-small class="slds-input__icon slds-input__icon_right"/>

                        </template>

                    </div>

                    <!-- Options -->
                    <transition name="dropdown">
                        <div
                            v-if="isDropdownActive"
                            role="dropdown"
                            class="slds-dropdown slds-dropdown_left slds-dropdown_top slds-dropdown_fluid"
                            :class="[`slds-dropdown_length-${length}`]">
                            <ul role="presentation" class="slds-listbox slds-listbox_vertical">

                                <!-- Options -->
                                <template v-for="option in filteredOptions">

                                    <slds-picklist-heading
                                        v-if="option.heading != null"
                                        :key="option.value"
                                        :heading="option.heading"/>

                                    <slds-picklist-option
                                        v-else
                                        :key="option.value"
                                        :disabled="option.disabled"
                                        :filter="filter"
                                        :label="option.label"
                                        :meta="option.meta"
                                        :value="option.value"
                                        :is-selected="option.value === value"
                                        @select="onSelect"/>

                                </template>

                                <!-- Spinner -->
                                <li v-if="spinner" role="presentation" class="slds-listbox__item">
                                    <div class="slds-align_absolute-center slds-p-top_medium">
                                        <div role="status" class="slds-spinner slds-spinner_x-small slds-spinner_inline">
                                            <div class="slds-spinner__dot-a"/>
                                            <div class="slds-spinner__dot-b"/>
                                        </div>
                                    </div>
                                </li>

                            </ul>
                        </div>
                    </transition>

                </div>
            </div>
        </div>

        <!-- Inline help -->
        <div v-if="!error && inlineHelp != null" class="slds-form-element__help">
            <slot name="inline-help"/>
        </div>

        <!-- Error messages -->
        <div v-if="error" class="slds-form-element__help">
            <slot name="error"/>
        </div>

    </div>
</template>

<script>
    import SldsPicklistOption from "./option";
    import SldsPicklistHeading from "./heading";
    import ClearableInputMixin from "../../mixins/clearable-input";

    export default {
        name: 'SldsCombobox',
        components: {
            SldsPicklistHeading,
            SldsPicklistOption
        },
        mixins: [
            ClearableInputMixin,
        ],
        inheritAttrs: false,
        props: {
            error: {
                type: Boolean,
            },
            inlineHelp: {
                type: String,
            },
            label: {
                type: String,
            },
            large: {
                type: Boolean,
            },
            length: {
                type: [Number],
                validator(value) {
                    return [
                        5,
                        7,
                        10,
                    ].indexOf(value) !== -1
                },
            },
            medium: {
                type: Boolean,
            },
            options: {
                type: Array,
                default: () => [],
            },
            placeholder: {
                type: String,
            },
            readonly: {
                type: Boolean,
            },
            required: {
                type: Boolean,
            },
            small: {
                type: Boolean,
            },
            spinner: {
                type: Boolean,
            },
            value: {},
            xLarge: {
                type: Boolean,
            },
            xSmall: {
                type: Boolean,
            },
            xxLarge: {
                type: Boolean,
            },
            xxSmall: {
                type: Boolean,
            },
        },
        data() {
            return {
                filter: null,
                keepFocus: false,
                hasFocus: false,
                isDropdownActive: false,
            }
        },
        computed: {
            attributes() {
                return {...this.$attrs}
            },
            filteredOptions() {
                if (this.filter == null) return this.options;

                return this.options.filter((option) => {
                    if (option.heading != null) return true;
                    return String(option.label).toLowerCase().indexOf(this.filter.toLowerCase()) !== -1;
                })
            },
            listeners() {
                const listeners = {...this.$listeners};
                delete listeners.input;
                return listeners
            },
            selectedOption() {
                if (this.value == null) return null;
                return this.options.find(option => option.value === this.value).label;
            },
            size() {
                if (this.xxSmall) return 'slds-size_xx-small';
                if (this.xSmall) return 'slds-size_x-small';
                if (this.small) return 'slds-size_small';
                if (this.medium) return 'slds-size_medium';
                if (this.large) return 'slds-size_large';
                if (this.xLarge) return 'slds-size_x-large';
                if (this.xxLarge) return 'slds-size_xx-large';
                return null
            },
        },
        methods: {
            async onBlur() {
                this.filter = null;

                if (this.keepFocus) {
                    await this.$nextTick();
                    this.$refs.input.focus();
                    this.keepFocus = false;
                }
                else {
                    this.hasFocus = false;
                }

                this.isDropdownActive = false;
            },
            onClear() {
                this.filter = null;
                this.$refs.input.value = null;
            },
            onClick() {
                if (this.hasFocus && !this.isDropdownActive) this.isDropdownActive = true;
            },
            onFocus() {
                this.isDropdownActive = true;
                this.hasFocus = true;
            },
            onInput(event) {
                this.filter = event.target.value
            },
            onSelect(value) {
                this.$emit('input', value);
                this.keepFocus = true;
            },
        },
    }
</script>

<style scoped lang="scss">
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 150ms;
    }

    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }

    .dropdown-enter-active,
    .dropdown-leave-active {
        transition: transform .3s, opacity .15s !important;
    }

    .dropdown-enter,
    .dropdown-leave-to {
        opacity: 0 !important;
        transform: translateY(5%) !important;
    }

    input {
        cursor: pointer;
    }
</style>
