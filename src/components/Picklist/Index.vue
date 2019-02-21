<!--
    @Description: A Picklist provides a user with an read-only input field that is accompanied with a listbox of pre-defined options. A picklist has a single and multi-selection pattern.
    @Documentation: https://www.lightningdesignsystem.com/components/picklist/
-->

<template>
    <div class="slds-form-element" :class="{ 'slds-has-error': hasError }">

        <!-- Label -->
        <label v-if="label != null" class="slds-form-element__label">
            <abbr class="slds-required" title="required" v-if="required">*</abbr> {{ label }}
        </label>

        <!-- Control -->
        <div class="slds-form-element__control">
            <div class="slds-combobox_container" :class="[`slds-size_${size}`]">
                <div role="combobox"
                     class="slds-combobox slds-is-open">

                    <!-- Input -->
                    <div class="slds-combobox__form-element slds-input-has-icon slds-input-has-icon_right" role="none">

                        <input role="textbox"
                               type="text"
                               :placeholder="placeholder"
                               :value="selectedLabel"
                               autocomplete="off"
                               readonly
                               class="slds-input slds-combobox__input"
                               v-bind="disabledAttribute"
                               @click="open"
                               @blur="close"
                               @keyup="keyUp"/>

                        <slds-icon icon-name="utility:down"
                                   class="slds-input__icon slds-input__icon_right"
                                   size="x-small"
                                   variant="default"/>

                    </div>

                    <!-- Options -->
                    <div v-show="isOpen" role="listbox">
                        <ul role="presentation"
                            class="slds-listbox slds-listbox_vertical slds-dropdown"
                            :class="[`slds-dropdown_${length}`]">

                            <template v-for="option in options">

                                <slds-picklist-heading v-if="option.group != null"
                                                       :key="option.value"
                                                       :group="option.group"/>

                                <slds-picklist-option v-else
                                                      :key="option.value"
                                                      :label="option.label"
                                                      :value="option.value"
                                                      :is-selected="option.value === selectedValue"
                                                      @selected="onSelect"/>

                            </template>

                            <!-- Spinner -->
                            <li v-if="spinnerActive" role="presentation" class="slds-listbox__item">
                                <div class="slds-align_absolute-center slds-p-top_medium">
                                    <div role="status" class="slds-spinner slds-spinner_x-small slds-spinner_inline">
                                        <div class="slds-spinner__dot-a"></div>
                                        <div class="slds-spinner__dot-b"></div>
                                    </div>
                                </div>
                            </li>

                        </ul>
                    </div>


                </div>
            </div>
        </div>

        <!-- Help -->
        <div class="slds-form-element__help" v-if="hasError">
            {{ helpMessage }}
        </div>

    </div>
</template>

<script>
    import SldsPicklistOption from "./Option";
    import SldsPicklistHeading from "./Heading";

    export default {
        components: {
            SldsPicklistHeading,
            SldsPicklistOption
        },
        props: {
            disabled: {
                type: Boolean,
                default: false,
            },
            label: {
                type: String,
            },
            length: {
                type: [String, Number],
                default: 'fluid',
                validator(value) {
                    return [
                        'fluid',
                        5,
                        7,
                        10,
                    ].indexOf(value) !== -1
                },
            },
            option: {
                type: Object,
                default: () => null,
            },
            options: {
                type: Array,
                required: true,
            },
            placeholder: {
                type: String,
                default: 'Select an option',
            },
            required: {
                type: Boolean,
                default: false,
            },
            size: {
                type: String,
                default: 'full',
                validator(value) {
                    return [
                        'xx-small',
                        'x-small',
                        'small',
                        'medium',
                        'large',
                        'x-large',
                        'xx-large',
                        'full',
                    ].indexOf(value) !== -1
                },
            },
            spinnerActive: {
                type: Boolean,
                default: false,
            },
        },
        data() {
            return {
                hasError: false,
                helpMessage: 'Help message',
                isOpen: false,
                selectedValue: null,
                selectedLabel: null,
            }
        },
        computed: {
            disabledAttribute() {
                return this.disabled ? {['disabled']: 'disabled'} : {};
            },
        },
        methods: {
            open() {
                this.isOpen = true;
            },
            close() {
                this.isOpen = false;
            },
            keyUp(event) {
                switch (event.key) {

                    case 'Escape':
                        this.isOpen = false;
                        break;

                    case 'Enter':
                        if (!this.isOpen) this.isOpen = true;
                        break;
                }
            },
            onSelect(value, label) {
                this.selectedValue = value;
                this.selectedLabel = label;
                this.$emit('input', value);
            },
        },
        created() {
            if (this.option !== null) {
                this.selectedValue = this.option.value;
                this.selectedLabel = this.option.label;
            }

            this.$emit('input', this.selectedValue);
        },
    }
</script>

<style scoped lang="scss">
    input {
        cursor: pointer;
    }
</style>