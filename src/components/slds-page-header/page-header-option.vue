<template>
    <slds-dropdown-option
        :label="label"
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
    name: 'SldsPageHeaderOption',

    components: {
        SldsDropdownOption
    },

    props: {
        hasFocus: Boolean,
        isSelected: Boolean,
        label: {type: String, required: true},
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
