<template>
    <div class="slds-checkbox">

        <input
            :id="resolvedInputId"
            type="checkbox"
            :checked="value"
            :disabled="disabled"
            :class="inputClassNames"
            :aria-label="option || undefined"
        >

        <label class="slds-checkbox__label" :for="resolvedInputId">
            <span class="slds-checkbox_faux"/>
            <span v-if="inline" class="slds-form-element__label">
                {{ option }}
            </span>
            <span v-else-if="option" class="slds-assistive-text">
                {{ option }}
            </span>
        </label>

    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

let inputUid = 0

export default defineComponent({
    name: "CheckboxOption",

    props: {
        disabled: Boolean,

        /**
         * Optional explicit id for the underlying input element so a parent
         * `<label for>` can target it.
         */
        inputId: { type: String, default: "" },

        inline: Boolean,

        option: { type: String, required: true },

        /**
         * Input value.
         */
        value: Boolean,
    },

    data() {
        return {
            generatedInputId: `slds-checkbox-option-${++inputUid}`,
        }
    },

    computed: {
        /**
         * Final id used on the input and referenced by the label.
         */
        resolvedInputId(): string {
            return this.inputId || this.generatedInputId
        },

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
