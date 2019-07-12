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
                    <div class="slds-combobox__form-element slds-input-has-icon slds-input-has-icon_right" role="none">

                        <template v-if="!readonly && isDropdownActive">

                            <input
                                ref="input"
                                :value="filter"
                                v-bind="attributes"
                                class="slds-input slds-combobox__input slds-combobox__input-value"
                                @click="toggleDropdown"
                                @input="onInput"
                                v-on="listeners">

                            <transition name="fade">
                                <slds-button-icon
                                    v-if="filter != null"
                                    icon-name="utility:clear"
                                    class="slds-input__icon slds-input__icon_right"
                                    title="Clear"
                                    @click.stop="onClear"/>
                            </transition>

                        </template>

                        <template v-else>

                            <input
                                ref="input"
                                :value="selectedOption"
                                :readonly="readonly"
                                v-bind="attributes"
                                class="slds-input slds-combobox__input slds-combobox__input-value"
                                @click="toggleDropdown"
                                v-on="listeners">

                            <slds-icon
                                icon-name="utility:down"
                                class="slds-input__icon slds-input__icon_right"
                                size="x-small"
                                variant="default"/>

                        </template>

                    </div>

                    <!-- Options -->
                    <div
                        v-if="isDropdownActive"
                        v-on-clickaway="away"
                        role="listbox"
                        class="slds-dropdown slds-dropdown_fluid">
                        <ul role="presentation" class="slds-listbox slds-listbox_vertical">
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
                        </ul>
                    </div>

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
    import SldsPicklistOption from "./Option";
    import SldsPicklistHeading from "./Heading";
    import {mixin as clickaway} from 'vue-clickaway'

    export default {
        components: {
            SldsPicklistHeading,
            SldsPicklistOption
        },
        mixins: [
            clickaway
        ],
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
            medium: {
                type: Boolean,
            },
            options: {
                type: Array,
                default: () => [],
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
                isDropdownActive: false,
            }
        },
        computed: {
            attributes() {
                const attributes = {...this.$attrs};
                return attributes
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
            away() {
                this.isDropdownActive = false;
            },
            async onClear() {
                this.filter = null;
                await this.$nextTick();
                this.$refs.input.focus();
            },
            onInput(event) {
                this.filter = event.target.value
            },
            onSelect(value) {
                this.$emit('input', value);
                this.isDropdownActive = false;
            },
            async toggleDropdown() {
                this.isDropdownActive = !this.isDropdownActive;
                if (!this.isDropdownActive || this.readonly) return;

                await this.onClear();
            },
        },
    }
</script>

<style scoped lang="scss">
    input {
        cursor: pointer;
    }
</style>
