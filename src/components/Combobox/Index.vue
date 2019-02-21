<!--
    @Description: A widget that provides a user with an input field that is either an autocomplete or readonly,
                  accompanied by a listbox of options.
    @Documentation: https://www.lightningdesignsystem.com/components/combobox/
-->

<template>
    <div class="slds-form-element" :class="{ 'slds-has-error': hasError }">

        <!-- Label -->
        <label v-if="label != null" class="slds-form-element__label">
            <abbr class="slds-required" title="required" v-if="required">*</abbr> {{ label }}
        </label>

        <!-- Combobox -->
        <div class="slds-form-element__control">
            <div class="slds-combobox_container">
                <div role="combobox"
                     class="slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-is-open">

                    <!-- Input -->
                    <div class="slds-combobox__form-element slds-input-has-icon slds-input-has-icon_right" role="none">

                        <input type="text"
                               role="textbox"
                               :value="selected.value"
                               autoComplete="off"
                               :placeholder="placeholder"
                               readonly
                               class="slds-input slds-combobox__input"
                               @click="open"
                               @blur="close"
                               @keyup="keyUp"/>

                        <span class="slds-icon_container slds-icon-utility-down slds-input__icon slds-input__icon_right">
                            <slds-svg icon-name="utility:down" class="slds-icon slds-icon slds-icon_x-small slds-icon-text-default"/>
                        </span>

                    </div>

                    <!-- Options -->
                    <transition enter-active-class="animated fadeIn quicker"
                                leave-active-class="animated fadeOut quicker">
                        <div v-show="isOpen"
                             class="slds-dropdown slds-dropdown_length-5 slds-dropdown_fluid"
                             :class="[`slds-dropdown_${orientation}`]"
                             role="listbox">
                            <ul class="slds-listbox slds-listbox_vertical" role="presentation">

                                <!-- Option -->
                                <li v-for="option in options"
                                    :key="option.key"
                                    role="presentation"
                                    class="slds-listbox__item"
                                    @mousedown="select(option)">

                                    <div role="option" class="slds-media slds-listbox__option slds-listbox__option_plain slds-media_small">

                                        <!-- Icon -->
                                        <span class="slds-media__figure slds-listbox__option-icon"></span>

                                        <!-- Text -->
                                        <span class="slds-media__body">
                                            <span class="slds-truncate" :title="option.value">
                                                {{ option.value }}
                                            </span>
                                        </span>

                                    </div>

                                </li>

                            </ul>
                        </div>
                    </transition>

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
                note: 'Text label for the combobox.'
            },
            placeholder: {
                type: String,
                default: 'Select an option',
                note: 'Placeholder of combobox'
            },
            required: {
                type: Boolean,
                default: false,
                note: 'Indicates the combobox is required'
            },
            disabled: {
                type: Boolean,
                default: false,
                note: 'Disable the combobox'
            },
            options: {
                type: Array,
                required: true,
                note: 'Options of combobox. An array of options with "key" and "value"',
            },
            option: {
                type: Object,
                default: () => null,
            },
            orientation: {
                type: String,
                default: 'top',
                note: 'Dropdown orientation. Check the validator for available options.',
                validator(value) {
                    return [
                        'top',
                        'bottom',
                    ].indexOf(value) !== -1
                }
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
        created() {
            if (this.option !== null) this.selected = this.option;
            this.$emit('input', this.selected.key);
        },
        methods: {
            open() {
                this.isOpen = true;
            },
            close() {
                if (!this.selected.key) this.selected = {};
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
            onSelect(option) {
                this.selected = option;
                this.isOpen = false;
                this.$emit('input', this.selected.key);
            },
        }
    }
</script>

<style scoped lang="scss">
    input {
        cursor: pointer !important;
    }
</style>