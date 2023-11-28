<template>
    <slds-form-element :label="label" :stacked="stacked" :bordered="!borderless">
        <div class="slds-form-element__static">
            {{ value }}
        </div>
    </slds-form-element>
</template>

<script lang="ts">
import SldsFormElement from "../slds-form-element/slds-form-element.vue"
import { defineComponent } from "vue"

export default defineComponent({
    name: "SldsOutput",

    components: { SldsFormElement },

    props: {
        borderless: Boolean,

        /**
         * Input label.
         */
        label: String,

        /**
         * Indicates whether the input is stacked among other inputs.
         */
        stacked: Boolean,

        /**
         * Input value.
         */
        value: null,
    },
})
</script>
