<template>
    <div class="slds-form-element" :class="formElementClass" :dir="dir">

        <!-- Label -->
        <slds-label v-if="label" :required="required">
            {{ label }}
        </slds-label>

        <!-- Icon -->
        <div v-if="tooltip || $slots.tooltip" class="slds-form-element__icon">
            <slds-tooltip>

                <template #trigger>
                    <slds-icon icon="utility:info" x-small/>
                </template>

                <template #default>
                    <slot name="tooltip">
                        {{ tooltip }}
                    </slot>
                </template>

            </slds-tooltip>
        </div>

        <!-- Control -->
        <div class="slds-form-element__control" :class="controlClass">
            <slot/>
        </div>

        <!-- Inline help -->
        <div v-if="!error && $slots.help" class="slds-form-element__help">
            <slot name="help"/>
        </div>

        <!-- Error messages -->
        <div v-if="error" class="slds-form-element__help">
            <slot name="error"/>
        </div>

    </div>
</template>

<script>
import SldsIcon from '@/components/slds-icon/slds-icon'
import SldsLabel from '@/components/slds-label/slds-label'
import SldsTooltip from '@/components/slds-tooltip/slds-tooltip'

export default {
    name: 'SldsFormElement',

    components: {
        SldsIcon,
        SldsLabel,
        SldsTooltip,
    },

    props: {
        borderless: Boolean,
        compound: Boolean,
        dir: String,
        controlClass: {},
        error: Boolean,
        label: String,
        readOnly: Boolean,
        required: Boolean,
        tooltip: String,
    },

    computed: {
        formElementClass() {
            return {
                'slds-has-error': this.error,
                'slds-form-element_stacked': this.readOnly,
                'slds-form-element_readonly': this.readOnly && !this.borderless,
                'slds-form-element_compound': this.compound,
            }
        }
    }
}
</script>

<style>
.slds-form-element__icon {
    position: static;
}
</style>
