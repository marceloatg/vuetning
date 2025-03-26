<template>
    <span class="slds-radio" @click="handleClick">

        <!-- Input -->
        <input
            :checked="modelValue === value"
            :disabled="disabled"
            name="radio-group"
            type="radio"
            :value="value"
        >

        <!-- Faux -->
        <label class="slds-radio__label">

            <span class="slds-radio_faux"/>

            <span class="slds-form-element__label">
                {{ label }}
            </span>

        </label>

    </span>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { EVENTS } from "../../constants"

export default defineComponent({
    name: "slds-radio-group-option",

    props: {
        /**
         * Indicates whether this radio option is checked.
         */
        checked: Boolean,

        /**
         * Indicates whether radio is disabled.
         */
        disabled: Boolean,

        /**
         * Radio label.
         */
        label: String,

        /**
         * Selected option value.
         */
        modelValue: null,

        /**
         * Radio option value.
         */
        value: String,
    },

    methods: {
        /**
         * Handles the click event on the radio group button.
         * @param event The fired event.
         */
        handleClick(event: Event): void {
            if (this.disabled) {
                event.preventDefault()

                return
            }

            this.$emit(EVENTS.UPDATE_MODEL_VALUE, this.value)
        },
    },
})
</script>
