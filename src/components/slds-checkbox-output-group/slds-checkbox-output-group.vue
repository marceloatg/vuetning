<template>
    <slds-form-element :label="label" :stacked="stacked" :bordered="!borderless">
        <template #default>
            <slds-checkbox-output-group-option
                v-for="option in options"
                :key="option.value"
                :borderless="borderless"
                :label="option.label"
                stacked
                :value="value.includes(option.value)"
            />
        </template>
    </slds-form-element>
</template>

<script lang="ts">
import SldsFormElement from "../slds-form-element/slds-form-element.vue"
import { defineComponent, type PropType } from "vue"
import type { CheckboxGroupOption } from "../slds-checkbox-group/checkbox-group-option"
import SldsCheckboxOutputGroupOption from "../slds-checkbox-output-group/slds-checkbox-output-group-option.vue"

export default defineComponent({
    name: "SldsCheckboxOutputGroup",

    components: { SldsCheckboxOutputGroupOption, SldsFormElement },

    props: {
        borderless: Boolean,

        /**
         * Input label.
         */
        label: String,

        value: { type: Array as PropType<string[]>, default: () => [] },

        options: { type: Array as PropType<CheckboxGroupOption[]>, default: () => [] },

        /**
         * Indicates whether the input is stacked among other inputs.
         */
        stacked: Boolean,
    },
})
</script>

