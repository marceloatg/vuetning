<template>
    <slds-form-element :label="label" :stacked="stacked" :bordered="!borderless">
        <div class="slds-form-element__static">

            <!-- Checked icon -->
            <slds-icon v-if="value" x-small icon-name="utility:check"/>

            <!-- Unchecked icon -->
            <slds-icon v-else x-small icon-name="utility:steps"/>

        </div>
    </slds-form-element>
</template>

<script lang="ts">
import SldsFormElement from "../slds-form-element/slds-form-element.vue"
import SldsIcon from "../slds-icon/slds-icon.vue"
import { defineComponent } from "vue"

export default defineComponent({
    name: "SldsCheckboxOutput",

    components: {
        SldsIcon,
        SldsFormElement,
    },

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
