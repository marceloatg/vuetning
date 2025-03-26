<template>
    <slds-form-element
        :dir="direction"
        :errors="errors"
        :label="label"
        :required="required"
        :tooltip="tooltip"
        role="radiogroup"
        v-bind="formElementAttributes"
    >

        <!-- Label -->
        <template v-if="$slots.label" #label>
            <slot name="label"/>
        </template>

        <!-- Tooltip -->
        <template v-if="$slots.tooltip" #tooltip>
            <slot name="tooltip"/>
        </template>

        <!-- Default slot -->
        <template #default>
            <slot>
                <slds-radio-group-option
                    v-for="option in options"
                    :key="option.value"
                    :disabled="disabled"
                    :label="option.label"
                    :model-value="modelValue"
                    :value="option.value"
                    @update:modelValue="handleUpdateModelValue"
                />
            </slot>
        </template>

        <!-- Error messages -->
        <template #error>
            <slot name="error"/>
        </template>

    </slds-form-element>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue"
import SldsFormElement from "../slds-form-element/slds-form-element.vue"
import SldsRadioGroupOption from "./slds-radio-group-option.vue"
import { ValidationError } from "../slds-form-element/validation-error"
import { Option } from "../commons/option.ts"
import { EVENTS } from "../../constants"

export default defineComponent({
    name: "slds-radio-group",

    components: { SldsRadioGroupOption, SldsFormElement },

    props: {
        /**
         * Indicates whether the radio group is disabled.
         */
        disabled: Boolean,

        /**
         * Array of error objects from vuelidate.
         */
        errors: { type: Array as PropType<ValidationError[]>, default: () => [] as ValidationError[] },

        /**
         * Radio group label.
         */
        label: String,

        /**
         * Input value.
         */
        modelValue: null,

        /**
         * Radio group options.
         */
        options: { type: Array as PropType<Option[]>, default: () => [] as Option[] },

        /**
         * Indicates whether this label's radio group is required.
         */
        required: Boolean,

        /**
         * Indicates whether the component should be displayed from right to left.
         */
        rightToLeft: Boolean,

        /**
         * Indicates whether the radio group is stacked among other inputs.
         */
        stacked: Boolean,

        /**
         * Tooltip text.
         * When using the tooltip slot this prop is ignored.
         */
        tooltip: String,
    },

    computed: {
        /**
         * Sets the component direction according to the "right to left" prop.
         */
        direction(): string {
            return this.rightToLeft
                ? "rtl"
                : "ltr"
        },

        /**
         * Bindable form element attributes.
         */
        formElementAttributes(): Record<string, unknown> {
            const attributes: Record<string, unknown> = {}

            for (const attribute in this.$attrs) {
                if (attribute.startsWith("data-") || attribute === "class") {
                    attributes[attribute] = this.$attrs[attribute]
                }
            }

            return attributes
        },
    },

    methods: {
        /**
         * Handles the click event on the radio option.
         * @param value The fired event.
         */
        handleUpdateModelValue(value: string) {
            this.$emit(EVENTS.UPDATE_MODEL_VALUE, value)
        },
    },
})
</script>

