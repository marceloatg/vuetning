<template>
    <div class="slds-checkbox" @click="handleClick">

        <input
            type="checkbox"
            :checked="checked"
            :disabled="disabled"
            :class="inputClassNames"
        >

        <label class="slds-checkbox__label">

            <span class="slds-checkbox_faux"/>

            <span class="slds-form-element__label">
                {{ label }}
            </span>

        </label>

    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent ({
    name: "SldsCheckboxGroupOption",

    props: {
        checked: Boolean,

        disabled: Boolean,

        label: { type: String, required: true },
    },
    computed: {
        /**
         * The CSS class names for the input.
         */
        inputClassNames(): string {
            let classNames = ""

            if (this.disabled) classNames += " disabled"

            return classNames
        },
    },

    methods: {
        /**
         * Handles the click event on the checkbox button.
         * @param event The fired event.
         */
        handleClick(event: Event): void {
            if (this.disabled) event.preventDefault()
        },
    },
})
</script>

