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
                               :value="selected.label"
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

                                    <!-- Heading -->
                                    <li :key="option.value"
                                        v-if="option.group != null"
                                        role="presentation"
                                        class="slds-listbox__item">

                                        <div role="presentation" class="slds-media slds-listbox__option slds-listbox__option_plain">
                                            <h3 role="presentation" class="slds-listbox__option-header">
                                                {{ option.group }}
                                            </h3>
                                        </div>

                                    </li>

                                    <!-- Option -->
                                    <li :key="option.value"
                                        v-else
                                        role="presentation"
                                        class="slds-listbox__item"
                                        @mousedown="select(option)">

                                        <div role="option"
                                             class="slds-media slds-listbox__option slds-listbox__option_plain slds-media_small slds-media_center"
                                             :class="[{'slds-is-selected': selected.value === option.value}]">

                                            <!-- Figure -->
                                            <span class="slds-media__figure">
                                                <slds-svg icon-name="utility:check" class="slds-icon slds-icon_x-small slds-listbox__icon-selected"/>
                                            </span>

                                            <!-- Body -->
                                            <span class="slds-media__body">
                                                <span class="slds-truncate" :title="option.label">
                                                    {{ option.label }}
                                                </span>
                                            </span>

                                        </div>

                                    </li>

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
    export default {
        props: {
            label: {
                type: String,
            },
            placeholder: {
                type: String,
                default: 'Select an option',
            },
            options: {
                type: Array,
                required: true,
            },
            option: {
                type: Object,
                default: () => null,
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
            required: {
                type: Boolean,
                default: false,
            },
            disabled: {
                type: Boolean,
                default: false,
            },
            spinnerActive: {
                type: Boolean,
                default: false,
            },
        },
        data() {
            return {
                selected: {},
                isOpen: false,
                hasError: false,
                helpMessage: 'Help message',
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
            select(option) {
                this.selected = option;
                this.$emit('input', this.selected.value);
            },
        },
        created() {
            if (this.option !== null) this.selected = this.option;
            this.$emit('input', this.selected.value);
        },
    }
</script>

<style scoped lang="scss">
    input {
        cursor: pointer;
    }
</style>