<template>
    <div class="slds-form-element" :class="{ 'slds-has-error': error }">

        <!-- Label -->
        <label v-if="label != null" class="slds-form-element__label">
            <abbr v-if="required" class="slds-required" title="required">*</abbr> {{ label }}
        </label>

        <!-- Control -->
        <div v-if="value != null" class="slds-form-element__control">
            <div class="slds-combobox_container slds-has-selection" :class="size">
                <div role="combobox" class="slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click">

                    <!-- Input -->
                    <div role="none" class="slds-combobox__form-element slds-input-has-icon slds-input-has-icon_left-right">

                        <slds-icon :icon="selectedOption.icon" small class="slds-combobox__input-entity-icon"/>

                        <input
                            ref="input"
                            :value="selectedOption.label"
                            v-bind="attributes"
                            class="slds-input slds-combobox__input slds-combobox__input-value"
                            readonly
                            @blur="onBlur"
                            @click="onClick"
                            @focus="onFocus"
                            v-on="listeners">

                        <slds-button-icon
                            icon="utility:close"
                            small
                            class="slds-input__icon slds-input__icon_right"
                            tabindex="-1"
                            @click="onSelect(null)"/>

                    </div>

                    <!-- Options -->
                    <div class="slds-dropdown slds-dropdown_left slds-dropdown_top slds-dropdown_length-with-icon-7 slds-dropdown_fluid" role="listbox">
                        <ul class="slds-listbox slds-listbox_vertical" role="presentation">
                            <li role="presentation" class="slds-listbox__item">
                                <div id="option1" class="slds-media slds-listbox__option slds-listbox__option_entity slds-listbox__option_has-meta" role="option">
                                    <span class="slds-media__figure slds-listbox__option-icon">
                                        <span class="slds-icon_container slds-icon-standard-account">
                                            <svg class="slds-icon slds-icon_small" aria-hidden="true">
                                                <use xlink:href="/assets/icons/standard-sprite/svg/symbols.svg#account"/>
                                            </svg>
                                        </span>
                                    </span>
                                    <span class="slds-media__body">
                                        <span class="slds-listbox__option-text slds-listbox__option-text_entity">Burlington
                                            Textiles Corp of America</span>
                                        <span class="slds-listbox__option-meta slds-listbox__option-meta_entity">Account
                                            • Burlington, NC</span>
                                    </span>
                                </div>
                            </li>
                            <li role="presentation" class="slds-listbox__item">
                                <div id="option2" class="slds-media slds-listbox__option slds-listbox__option_entity slds-listbox__option_has-meta" role="option">
                                    <span class="slds-media__figure slds-listbox__option-icon">
                                        <span class="slds-icon_container slds-icon-standard-account">
                                            <svg class="slds-icon slds-icon_small" aria-hidden="true">
                                                <use xlink:href="/assets/icons/standard-sprite/svg/symbols.svg#account"/>
                                            </svg>
                                        </span>
                                    </span>
                                    <span class="slds-media__body">
                                        <span class="slds-listbox__option-text slds-listbox__option-text_entity">Dickenson
                                            plc</span>
                                        <span class="slds-listbox__option-meta slds-listbox__option-meta_entity">Account
                                            • Lawrence, KS</span>
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>

        <div v-else class="slds-form-element__control">
            <div class="slds-combobox_container" :class="size">
                <div role="combobox" class="slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-is-open">

                    <!-- Input -->
                    <div role="none" class="slds-combobox__form-element slds-input-has-icon slds-input-has-icon_right">

                        <template v-if="isDropdownActive">

                            <input
                                ref="input"
                                :value="filter"
                                v-bind="attributes"
                                role="textbox"
                                autoComplete="off"
                                class="slds-input slds-combobox__input"
                                @blur="onBlur"
                                @click="onClick"
                                @focus="onFocus"
                                @input="onInput"
                                v-on="listeners">

                            <div class="slds-input__icon-group slds-input__icon-group_right">

                                <slds-spinner
                                    v-if="spinner"
                                    variant="brand"
                                    size="x-small"
                                    class="slds-input__spinner"
                                    :style="{right: spinnerRight}"/>

                                <transition name="fade">
                                    <slds-button-icon
                                        v-if="filter != null"
                                        icon="utility:clear"
                                        class="slds-input__icon slds-input__icon_right"
                                        title="Clear"
                                        tabindex="-1"
                                        @click.stop="onClear"/>
                                </transition>

                            </div>

                        </template>

                        <template v-else>

                            <input
                                ref="input"
                                :value="(selectedOption != null) ? selectedOption.label : null"
                                v-bind="attributes"
                                class="slds-input slds-combobox__input slds-combobox__input-value"
                                @blur="onBlur"
                                @click="onClick"
                                @focus="onFocus"
                                v-on="listeners">

                            <slds-icon icon="utility:search" x-small class="slds-input__icon slds-input__icon_right"/>

                        </template>

                    </div>

                    <!-- Options -->
                    <transition name="dropdown">
                        <div
                            v-if="isDropdownActive"
                            role="listbox"
                            class="slds-dropdown slds-dropdown_left slds-dropdown_top slds-dropdown_length-with-icon-7 slds-dropdown_fluid"
                            :class="[`slds-dropdown_length-${length}`]">
                            <ul role="presentation" class="slds-listbox slds-listbox_vertical">

                                <li
                                    v-if="filter != null && filter.length > 0"
                                    role="presentation"
                                    class="slds-listbox__item slds-theme_shade"
                                    @mousedown.prevent.stop="">
                                    <div role="option" class="slds-media slds-listbox__option slds-listbox__option_plain slds-media_small">

                                        <!-- Figure -->
                                        <span class="slds-media__figure slds-listbox__option-icon">
                                            <slds-icon icon="utility:search" x-small/>
                                        </span>

                                        <!-- Body -->
                                        <span class="slds-media__body">
                                            <span class="slds-truncate" :title="searchOptionLabel">
                                                {{ searchOptionLabel }}
                                            </span>
                                        </span>

                                    </div>
                                </li>

                                <slds-option
                                    v-for="option in filteredOptions"
                                    :key="option.value"
                                    :disabled="option.disabled"
                                    :filter="filter"
                                    :icon="option.icon"
                                    :label="option.label"
                                    :meta="option.meta"
                                    :value="option.value"
                                    @select="onSelect"/>

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
    import ClearableInputMixin from "../../mixins/clearable-input";
    import SldsOption from "./option";

    export default {
        name: 'SldsLookup',
        components: {
            SldsOption
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
            required: {
                type: Boolean,
            },
            searchSource: {
                type: String,
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
                    return String(option.label).toLowerCase().indexOf(this.filter.toLowerCase()) !== -1;
                })
            },
            listeners() {
                const listeners = {...this.$listeners};
                delete listeners.input;
                return listeners
            },
            searchOptionLabel() {
                let label = `"${this.filter}"`;
                if (this.searchSource != null) label += ` in ${this.searchSource}`;
                return label;
            },
            selectedOption() {
                if (this.value == null) return null;
                return this.options.find(option => option.value === this.value);
            },
            spinnerRight() {
                if (this.filter) return '1.5rem';
                return '.2rem';
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
                this.filter = event.target.value;
                this.$emit('search', event.target.value);
            },
            onSelect(value) {
                this.$emit('input', value);
                this.keepFocus = true;
            },
        },
    }
</script>

<style scoped lang="scss">
    .fade-enter-active, .fade-leave-active {
        transition: opacity 150ms;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }

    .dropdown-enter,
    .dropdown-leave-to {
        opacity: 0 !important;
        transform: translateY(5%) !important;
    }

    .dropdown-enter-active,
    .dropdown-leave-active {
        transition: transform .3s, opacity .15s !important;
    }

    input {
        cursor: pointer;
    }
</style>
