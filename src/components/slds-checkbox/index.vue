<template>
    <div
        class="slds-form-element"
        :class="[{ 'slds-has-error': hasError }, {'slds-form-element_readonly': readOnly}]">

        <label v-if="readOnly || variant === 'stacked'" class="slds-form-element__label">
            <abbr v-if="required" class="slds-required" title="required">* </abbr>{{ label }}
        </label>

        <div class="slds-form-element__control" @click.stop="onClick">

            <!-- Inline faux -->
            <div v-if="!readOnly && variant === 'inline'" class="slds-checkbox">

                <input
                    type="checkbox"
                    :checked="checked"
                    :value="checked"
                    v-bind="[disabledAttribute]">

                <label class="slds-checkbox__label">
                    <span class="slds-checkbox_faux"/>
                    <span class="slds-form-element__label">
                        {{ label }}
                    </span>
                </label>

            </div>

            <!-- Stacked faux -->
            <span v-else-if="!readOnly && variant === 'stacked'" class="slds-checkbox slds-checkbox_standalone">

                <input
                    type="checkbox"
                    :checked="checked"
                    :value="checked"
                    v-bind="[disabledAttribute]">

                <span class="slds-checkbox_faux"/>

            </span>

            <!-- View mode faux checked-->
            <span v-else-if="readOnly && checked" class="slds-icon_container slds-icon-utility-check slds-current-color" title="True">
                <slds-svg icon="utility:check" class="slds-icon slds-icon_x-small"/>
            </span>

            <!-- View mode faux unchecked-->
            <span v-else-if="readOnly && !checked" class="slds-icon_container slds-icon-utility-steps slds-current-color" title="False">
                <slds-svg icon="utility:steps" class="slds-icon slds-icon_x-small"/>
            </span>

        </div>

        <div v-if="hasError" class="slds-form-element__help">
            {{ errorMessage }}
        </div>

    </div>
</template>

<script>
    import SldsSvg from '../slds-svg/index.vue'

    export default {
        name: 'SldsCheckbox',
        components: {
            SldsSvg
        },
        props: {
            value: {
                type: Boolean,
                default: false,
            },
            disabled: {
                type: Boolean,
                default: false,
            },
            errorMessage: {
                type: String,
            },
            hasError: {
                type: Boolean,
                default: false,
            },
            label: {
                type: String,
            },
            readOnly: {
                type: Boolean,
                default: false,
            },
            required: {
                type: Boolean,
                default: false,
            },
            variant: {
                type: String,
                default: 'stacked',
                validator(value) {
                    return [
                        'inline',
                        'stacked',
                    ].indexOf(value) !== -1
                },
            },
        },
        data(){
            return {
                checked: false,
            }
        },
        computed: {
            disabledAttribute() {
                return this.disabled ? {['disabled']: 'disabled'} : {};
            },
        },
        watch:{
            value(newValue){
                this.checked = newValue;
            }
        },
        mounted() {
            this.checked = this.value;
        },
        methods: {
            onClick() {
                if (this.disabled || this.readOnly) return;
                this.checked = !this.checked;
                this.$emit('input', this.checked);
            },
        },
    }
</script>
