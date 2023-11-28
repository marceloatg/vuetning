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
            <div class="slds-checkbox_button-group">
                <slot>
                    <slds-checkbox-button-option
                        v-for="option in options"
                        :key="option.value"
                        :checked="modelValue.includes(option.value)"
                        :label="option.label"
                        :disabled="option.disabled"
                        @click="handleClick($event, option)"
                    />
                </slot>
            </div>
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
import SldsCheckboxButtonOption from "./slds-checkbox-button-option.vue"
import SldsFormElement from "../slds-form-element/slds-form-element.vue"
import { EVENTS } from "../../constants"
import { type CheckboxButtonGroupOption } from "./checkbox-button-group-option"
import { defineComponent, type PropType } from "vue"

export default defineComponent({
    name: "SldsCheckboxButtonGroup",

    components: {
        SldsCheckboxButtonOption,
        SldsFormElement,
    },

    props: {
        disabled: Boolean,

        /**
         * Array of error objects from vuelidate.
         */
        errors: Array,

        /**
         * Inline help text.
         * When using the help slot this prop is ignored.
         */
        help: String,

        label: String,

        modelValue: { type: Array as PropType<string[]>, default: () => [] },

        options: { type: Array as PropType<CheckboxButtonGroupOption[]>, default: () => [] },

        required: Boolean,

        tooltip: String,

        /**
         * Indicates whether the input is stacked among other inputs.
         */
        stacked: Boolean,
    },

    methods: {
        /**
         * Handles the click event on the checkbox button.
         * @param event The fired event.
         * @param option The clicked option.
         */
        handleClick(event: Event, option: CheckboxButtonGroupOption): void {
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
