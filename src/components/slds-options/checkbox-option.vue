<template>
    <div class="slds-checkbox" @click="onClick">

        <input
            type="checkbox"
            :checked="value"
            :disabled="disabled"
            :class="inputClass"
        >

        <label class="slds-checkbox__label">
            <span class="slds-checkbox_faux"/>
            <span v-if="inline" class="slds-form-element__label">
                {{ option }}
            </span>
        </label>

    </div>
</template>

<script>
export default {
    name: 'CheckboxOption',

    props: {
        disabled: Boolean,
        inline: Boolean,
        option: {type: String, required: true},
        value: Boolean
    },

    computed: {
        inputClass() {
            return {
                'disabled': this.disabled
            }
        }
    },

    methods: {
        onClick() {
            this.$emit('click')
        }
    }
}
</script>
