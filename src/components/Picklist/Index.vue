<!--
    @Description: A Picklist provides a user with an read-only input field that is accompanied with a listbox of pre-defined options. A picklist has a single and multi-selection pattern.
    @Documentation: https://www.lightningdesignsystem.com/components/picklist/
-->

<template>
    <div class="slds-form-element" :class="{ 'slds-has-error': hasError }">

        <!-- Label -->
        <label v-if="label != null" class="slds-form-element__label">
            <abbr v-if="required" class="slds-required" title="required">*</abbr> {{ label }}
        </label>

        <!-- Control -->
        <div class="slds-form-element__control">
            <div class="slds-combobox_container" :class="[`slds-size_${size}`]">
                <div role="combobox" class="slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-is-open">

                    <!-- Input -->
                    <div class="slds-combobox__form-element slds-input-has-icon slds-input-has-icon_right" role="none">

                        <input
                            role="textbox"
                            type="text"
                            :placeholder="placeholder"
                            :value="selectedLabel"
                            autocomplete="off"
                            readonly
                            class="slds-input slds-combobox__input"
                            v-bind="disabledAttribute"
                            @click="onClick"
                            @blur="onBlur"
                            @keyup="onKeyUp">

                        <slds-icon
                            icon-name="utility:down"
                            class="slds-input__icon slds-input__icon_right"
                            size="x-small"
                            variant="default"/>

                    </div>

                    <!-- Options -->
                    <div
                        v-show="isOpen"
                        ref="dropdown"
                        class="slds-dropdown slds-dropdown_fluid"
                        :class="[`slds-dropdown_length-${length}`, `slds-dropdown_${orientation}`]"
                        :style="{opacity: dropdownOpacity}">

                        <ul role="presentation" class="slds-listbox slds-listbox_vertical">

                            <template v-for="option in options">

                                <slds-picklist-heading
                                    v-if="option.heading != null"
                                    :key="option.value"
                                    :heading="option.heading"/>

                                <slds-picklist-option
                                    v-else
                                    :key="option.value"
                                    :disabled="option.disabled"
                                    :label="option.label"
                                    :meta="option.meta"
                                    :value="option.value"
                                    :is-selected="option.value === selectedValue"
                                    @selected="onSelected"/>

                            </template>

                            <!-- Spinner -->
                            <li v-if="spinnerActive" role="presentation" class="slds-listbox__item">
                                <div class="slds-align_absolute-center slds-p-top_medium">
                                    <div role="status" class="slds-spinner slds-spinner_x-small slds-spinner_inline">
                                        <div class="slds-spinner__dot-a"/>
                                        <div class="slds-spinner__dot-b"/>
                                    </div>
                                </div>
                            </li>

                        </ul>

                    </div>

                </div>
            </div>
        </div>

        <!-- Inline help -->
        <div v-if="!hasError && inlineHelp != null" class="slds-form-element__help">
            {{ inlineHelp }}
        </div>

        <!-- Error messages -->
        <div v-if="hasError" class="slds-form-element__help">
            <slot name="errors"/>
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
            hasError: {
                type: Boolean,
                default: false,
            },
            inlineHelp: {
                type: String,
            },
            label: {
                type: String,
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
                dropdownOpacity: 0,
                isOpen: false,
                orientation: 'top',
                selectedValue: null,
                selectedLabel: null,
            }
        },
        computed: {
            disabledAttribute() {
                return this.disabled ? {['disabled']: 'disabled'} : {};
            },
        },
        watch: {
            async isOpen(opened) {
                if (!opened) return;
                await this.$nextTick();

                let dropdown = this.$refs["dropdown"];
                const positioning = this.getDropdownPositioning(dropdown);

                // Setting vertical orientation of dropdown
                if (positioning.element.y + positioning.element.height > positioning.parent.height) {
                    this.orientation = 'bottom';
                }

                this.dropdownOpacity = 1;
            },
        },
        created() {
            if (this.option === null) return;

            this.selectedValue = this.option.value;
            this.selectedLabel = this.option.label;
            this.$emit('input', this.selectedValue);
        },
        methods: {
            clear() {
                this.selectedValue = null;
                this.selectedLabel = null;
                this.$emit('input', null);
            },
            getDropdownPositioning(element) {
                const elementPositioning = {
                    y: 0,
                    height: element.offsetHeight,
                };

                const parentPositioning = {
                    y: 0,
                    height: 0,
                };

                while (element.offsetParent !== null) {
                    elementPositioning.y += element.offsetTop;
                    element = element.offsetParent;

                    if (element !== null) {
                        parentPositioning.y = element.offsetTop;
                        parentPositioning.height = element.offsetHeight;
                    }
                }

                return {
                    element: elementPositioning,
                    parent: parentPositioning
                };
            },
            onClick() {
                this.isOpen = true;
            },
            onBlur() {
                this.isOpen = false;
                this.$emit('blur');
            },
            onKeyUp(event) {
                switch (event.key) {

                    case 'Escape':
                        this.isOpen = false;
                        break;

                    case 'Enter':
                        if (!this.isOpen) this.isOpen = true;
                        break;
                }
            },
            onSelected(value, label) {
                this.selectedValue = value;
                this.selectedLabel = label;
                this.$emit('input', value);
            },
        },
    }
</script>

<style scoped lang="scss">
    input {
        cursor: pointer;
    }
</style>
