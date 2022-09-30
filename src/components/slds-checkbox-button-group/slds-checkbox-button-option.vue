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
                'slds-checkbox-button_is-selected': this.value,
                'slds-checkbox-button_is-disabled': this.disabled,
            }
        }
    },

    watch: {
        value() {
            this.parseValue()
        }
    },

    created() {
        this.parseValue()
    },

    methods: {
        onClick() {
            if (this.disabled) return
            this.$emit('click')
        },

        parseValue() {
            this.$data.$_value = this.value
        },
    }
}
</script>

<style scoped lang="scss">
.slds-checkbox-button_is-disabled {
    cursor: default;

    .slds-checkbox_faux {
        cursor: default;
    }

    &.slds-checkbox-button_is-selected {
        background-color: #c9c7c5 !important;
        border-color: #c9c7c5 !important;
        color: #fff !important;
    }
}
</style>
