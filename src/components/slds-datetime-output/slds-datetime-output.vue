<template>
    <slds-form-element :label="label" :stacked="stacked" :bordered="!borderless">
        <div class="slds-form-element__static">
            {{ formattedValue }}
        </div>
    </slds-form-element>
</template>

<script lang="ts">
import moment from "moment"
import SldsFormElement from "../slds-form-element/slds-form-element.vue"
import { defineComponent } from "vue"

export default defineComponent({
    name: "SldsDatetimeOutput",

    components: { SldsFormElement },

    props: {
        borderless: Boolean,

        /**
         * The moment.js format to be used.
         * This value can be either a single format or an array of formats, which will be concatenated.
         */
        format: { type: [String, Array], default: () => ["L", "LT"] },

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
        value: [String, Date],
    },

    computed: {
        /**
         * Returns the formatted value.
         * By default, it uses the following format: 01/01/2000 0:00 AM.
         */
        formattedValue(): string {
            if (!this.value) return ""

            return Array.isArray(this.format)
                ? (this.format as string[]).map((format: string) => moment(this.value).format(format)).join(" ")
                : moment(this.value).format(this.format)
        },
    },
})
</script>
