<template>
    <div
        class="slds-form-element pointer"
        :class="{ 'slds-has-error': error , 'slds-form-element_readonly': readonly}">

        <label v-if="readonly || isStacked" class="slds-form-element__label">
            <abbr v-if="required" class="slds-required" title="required">* </abbr>{{ label }}
        </label>

        <div class="slds-form-element__control" @click.stop="onClick">

            <!-- Inline faux -->
            <div v-if="!readonly && isInline" class="slds-checkbox">

                <abbr v-if="required" class="slds-required" title="required">* </abbr>
                <input
                    type="checkbox"
                    :disabled="disabled"
                    :class="{ 'disabled': disabled }"
                    :checked="inputChecked">

                <label class="slds-checkbox__label">
                    <span class="slds-checkbox_faux"/>
                    <span class="slds-form-element__label">
                        {{ label }}
                    </span>
                </label>

            </div>

            <!-- Stacked faux -->
            <span v-else-if="!readonly && isStacked" class="slds-checkbox slds-checkbox_standalone">

                <input
                    type="checkbox"
                    :disabled="disabled"
                    :class="{ 'disabled': disabled }"
                    :checked="inputChecked">

                <span class="slds-checkbox_faux"/>

            </span>

            <!-- View mode faux checked-->
            <span v-else-if="readonly && checked" class="slds-icon_container slds-icon-utility-check slds-current-color" title="True">
                <slds-svg icon="utility:check" class="slds-icon slds-icon_x-small"/>
            </span>

            <!-- View mode faux unchecked-->
            <span v-else-if="readonly && !checked" class="slds-icon_container slds-icon-utility-steps slds-current-color" title="False">
                <slds-svg icon="utility:steps" class="slds-icon slds-icon_x-small"/>
            </span>

        </div>

        <div v-if="error" class="slds-form-element__help">
            <slot name="error"/>
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
    model: {
        prop: 'checked',
        event: 'input'
    },
    props: {
        checked: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        error: {
            type: Boolean,
            default: false,
        },
        inline: {
            type: Boolean,
            default: false
        },
        label: {
            type: String,
            default: undefined,
        },
        readonly: {
            type: Boolean,
            default: false,
        },
        required: {
            type: Boolean,
            default: false,
        },
        stacked: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            inputChecked: this.checked
        }
    },
    computed: {
        isStacked() {
            return this.variant === 'stacked'
        },
        isInline() {
            return this.variant === 'inline'
        },
        variant(){
            if(this.inline) return 'inline';
            else if(this.stacked) return 'stacked';
            else return 'inline';
        }
    },
    watch: {
        checked(newValue) {
            this.inputChecked = newValue;
        }
    },
    methods: {
        onClick() {
            if (this.disabled || this.readonly) return;
            this.inputChecked = !this.inputChecked;
            this.$emit('input', this.inputChecked);
        }
    },
}
</script>

<style>
.pointer{
    cursor: pointer;
}

.pointer .slds-form-element__label{
    cursor: pointer;
}

.pointer .slds-form-element__control{
    cursor: pointer;
}
</style>
