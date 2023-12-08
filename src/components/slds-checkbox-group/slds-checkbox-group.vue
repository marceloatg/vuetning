<template>
    <slds-form-element
        :errors="errors"
        :help="help"
        :label="label"
        :required="required"
        :stacked="stacked"
        :tooltip="tooltip"
    >

        <!-- Tooltip -->
        <template v-if="$slots.tooltip" #tooltip>
            <slot name="tooltip"/>
        </template>

        <!-- Default slot -->
        <template #default>
            <slot>
                <slds-checkbox-group-option
                    v-for="option in options"
                    :key="option.value"
                    :checked="modelValue.includes(option.value)"
                    :label="option.label"
                    :disabled="option.disabled"
                    @click="handleClick($event, option)"
                />
            </slot>
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
import SldsFormElement from "../slds-form-element/slds-form-element.vue"
import { defineComponent, type PropType } from "vue"
import { type CheckboxGroupOption } from "./checkbox-group-option"
import { EVENTS } from "../../constants"
import SldsCheckboxGroupOption from "../slds-checkbox-group/slds-checkbox-group-option.vue"
import type { ValidationError } from "../slds-form-element/validation-error"

export default defineComponent ({
    name: "SldsCheckboxGroup",

    components: { SldsCheckboxGroupOption, SldsFormElement },

    props: {
        disabled: Boolean,

        /**
         * Array of error objects from vuelidate.
         */
        errors: { type: Array as PropType<ValidationError[]>, default: () => [] as ValidationError[] },

        /**
         * Inline help text.
         * When using the help slot this prop is ignored.
         */
        help: String,

        label: String,

        modelValue: { type: Array as PropType<string[]>, default: () => [] },

        options: { type: Array as PropType<CheckboxGroupOption[]>, default: () => [] },

        required: Boolean,

        /**
         * Indicates whether the input is stacked among other inputs.
         */
        stacked: Boolean,

        tooltip: String,
    },

    methods: {
        /**
         * Handles the click event on the checkbox group.
         * @param event The fired event.
         * @param option The clicked option.
         */
        handleClick(event: Event, option: CheckboxGroupOption): void {
            if (!event || this.disabled || option.disabled) {
                event.preventDefault()
                return
            }

            const value = [...this.modelValue]
            const index = value.indexOf(option.value)

            if (index === -1) value.push(option.value)
            else value.splice(index, 1)

            this.$emit(EVENTS.UPDATE_MODEL_VALUE, value)
        },
    },
})
</script>

