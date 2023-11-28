<template>
    <slds-form-element
        :help="help"
        :label="inline ? undefined : label"
        :required="required"
        :stacked="stacked"
        :tooltip="tooltip"
    >

        <!-- Tooltip -->
        <template v-if="$slots.tooltip" #tooltip>
            <slot name="tooltip"/>
        </template>

        <!-- Default slot -->
        <template #default="slotProps">
            <slds-checkbox-option
                :id="slotProps['input-id']"
                :value="modelValue"
                :option="label"
                :disabled="disabled"
                :inline="inline"
                @click="onClick"
            />
        </template>

        <!-- Inline help -->
        <template #help>
            <slot name="help"/>
        </template>

        <!-- Error messages -->
        <template #error>
            <slot name="error"/>
        </template>

    </slds-form-element>
</template>

<script lang="ts">
import SldsCheckboxOption from "./slds-checkbox-option.vue"
import SldsFormElement from "../slds-form-element/slds-form-element.vue"
import { EVENTS } from "../../constants"
import { defineComponent } from "vue"

export default defineComponent({
    name: "SldsCheckbox",

    components: {
        SldsCheckboxOption,
        SldsFormElement,
    },

    props: {
        disabled: Boolean,

        error: Boolean,

        /**
         * Inline help text.
         * When using the help slot this prop is ignored.
         */
        help: String,

        inline: Boolean,

        label: { type: String, required: true },

        /**
         * Input value.
         */
        modelValue: Boolean,

        required: Boolean,

        /**
         * Indicates whether the input is stacked among other inputs.
         */
        stacked: Boolean,

        tooltip: String,
    },

    methods: {
        onClick(): void {
            if (this.disabled) return
            this.$emit(EVENTS.UPDATE_MODEL_VALUE, !this.modelValue)
        },
    },
})
</script>
