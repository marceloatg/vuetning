<template>
    <slds-dropdown-option
        :label="label"
        :level="level"
        :left-icon="leftIcon"
        :right-icon="rightIcon"
        :disabled="disabled"
        :is-selected="isSelected"
        :has-focus="hasFocus"
        @click="onClick"
        @mouseover="onMouseOver"
    />
</template>

<script>
import SldsDropdownOption from '@/components/slds-options/dropdown-option'

export default {
    name: "SldsMenuItem",

    components: {
        SldsDropdownOption
    },

    props: {
        disabled: Boolean,
        hasFocus: Boolean,
        isSelected: Boolean,
        label: {type: String, required: true},
        leftIcon: String,
        level: String,
        rightIcon: String,
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
