<template>
    <div class="slds-form-element" :class="formElementClass" :dir="dir">

        <!-- Label -->
        <slds-label v-if="label" :required="required">
            {{ label }}
        </slds-label>

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
import SldsLabel from '@/components/slds-label/label'

export default {
    name: 'SldsFormElement',

    components: {
        SldsLabel
    },

    props: {
        borderless: Boolean,
        dir: String,
        controlClass: {},
        error: Boolean,
        label: String,
        readOnly: Boolean,
        required: Boolean
    },

    computed: {
        formElementClass() {
            return {
                'slds-has-error': this.error,
                'slds-form-element_stacked': this.readOnly,
                'slds-form-element_readonly': this.readOnly && !this.borderless,
            }
        }
    }
}
</script>
