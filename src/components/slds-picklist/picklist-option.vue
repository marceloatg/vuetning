<template>
    <slds-dropdown-option
        :label="label"
        :meta="meta"
        :disabled="disabled"
        is-selectable
        :is-selected="isSelected"
        :has-focus="hasFocus"
        @click="onClick"
        @mouseover="onMouseOver"
    />
</template>

<script>
import SldsDropdownOption from '@/components/slds-options/dropdown-option'

export default {
    name: 'SldsPicklistOption',

    components: {
        SldsDropdownOption
    },

    props: {
        disabled: Boolean,
        hasFocus: Boolean,
        isSelected: Boolean,
        label: {type: String, required: true},
        meta: String
    },

    methods: {
        onClick() {
            this.$emit('click')
        },

        onMouseOver() {
            this.$emit('mouseover')
        },
    }
}
</script>
