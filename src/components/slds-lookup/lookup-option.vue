<template>
    <slds-dropdown-option
        :label="label"
        :meta="meta"
        :icon="icon"
        :disabled="disabled"
        :has-focus="hasFocus"
        :filter="filter"
        @click="onClick"
        @mouseover="onMouseOver"
    />
</template>

<script>
import SldsDropdownOption from '@/components/slds-options/dropdown-option'

export default {
    name: 'SldsLookupOption',

    components: {
        SldsDropdownOption
    },

    props: {
        disabled: Boolean,
        filter: String,
        hasFocus: Boolean,
        icon: {type: String, default: 'standard:default'},
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
