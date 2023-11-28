<template>
    <label class="slds-form-element__label" :for="inputId">
        <abbr v-if="required" class="slds-required" title="required">* </abbr>
        <slot/>
    </label>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
    name: "SldsFormElementLabel",

    props: {
        /**
         * Input ID.
         */
        inputId: { type: String, required: true },

        /**
         * Indicates whether this label's input is required.
         */
        required: Boolean,
    },
})
</script>
