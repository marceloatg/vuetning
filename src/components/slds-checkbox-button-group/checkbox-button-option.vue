<template>
    <span class="slds-button slds-checkbox_button" @click="onClick">

        <!-- Input -->
        <input v-model="$data.$_value" type="checkbox">

        <!-- Faux -->
        <label class="slds-checkbox_button__label" :class="labelClass">
            <span class="slds-checkbox_faux">
                {{ label }}
            </span>
        </label>

    </span>
</template>

<script>
export default {
    name: 'SldsCheckboxButtonOption',

    props: {
        disabled: Boolean,
        label: {type: String, required: true},
        value: Boolean
    },

    data() {
        return {
            $_value: false
        }
    },

    computed: {
        labelClass() {
            return {
                'slds-checkbox-button_is-disabled': this.disabled
            }
        }
    },

    watch: {
        value(value) {
            this.$data.$_value = value
        }
    },

    methods: {
        onClick() {
            if (this.disabled) return
            this.$emit('click')
        }
    }
}
</script>

<style scoped lang="scss">
.slds-checkbox-button_is-disabled {
    cursor: default;

    .slds-checkbox_faux {
        cursor: default;
    }
}
</style>
