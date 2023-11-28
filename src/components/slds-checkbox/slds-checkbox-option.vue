<template>
    <div class="slds-checkbox">

        <input
            type="checkbox"
            :checked="value"
            :disabled="disabled"
            :class="inputClassNames"
        >

        <label class="slds-checkbox__label">
            <span class="slds-checkbox_faux"/>
            <span v-if="inline" class="slds-form-element__label">
                {{ option }}
            </span>
        </label>

    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
    name: "CheckboxOption",

    props: {
        disabled: Boolean,

        inline: Boolean,

        option: { type: String, required: true },

        /**
         * Input value.
         */
        value: Boolean,
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
})
</script>
