<template>
    <slds-form-element
        :errors="errors"
        :help="help"
        :label="label"
        :required="required"
        :stacked="stacked"
        :tooltip="tooltip"
        v-bind="formElementAttributes"
    >

        <!-- Tooltip -->
        <template v-if="$slots.tooltip" #tooltip>
            <slot name="tooltip"/>
        </template>

        <!-- Default slot -->
        <template #default="slotProps">
            <textarea
                :id="slotProps['inputId']"
                class="slds-textarea"
                :disabled="disabled"
                :maxlength="maxlength"
                :placeholder="placeholder"
                :rows="rows"
                :value="modelValue"
                v-bind="inputAttributes"
                @input="handleInput"
                @keyup="onKeyUp"
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
import SldsFormElement from "../slds-form-element/slds-form-element.vue"
import { EVENTS, KEYS } from "../../constants"
import { defineComponent, type PropType } from "vue"
import type { ValidationError } from "../slds-form-element/validation-error"

export default defineComponent({
    name: "SldsTextArea",

    components: {
        SldsFormElement,
    },

    inheritAttrs: false,

    props: {
        /**
         * Indicates whether the textarea is disabled.
         */
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

        /**
         * Textarea label.
         */
        label: String,

        /**
         * Textarea max length.
         */
        maxlength: [Number, String],

        /**
         * Textarea value.
         */
        modelValue: null,

        /**
         * Textarea placeholder.
         */
        placeholder: String,

        /**
         * Indicates whether this label's textarea is required.
         */
        required: Boolean,

        /**
         * Number of rows.
         */
        rows: { type: Number, default: 3 },

        /**
         * Indicates whether the textarea is stacked among other inputs.
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

        /**
         * Bindable input attributes.
         */
        inputAttributes(): Record<string, unknown> {
            const attributes: Record<string, unknown> = {}

            for (const attribute in this.$attrs) {
                if (!attribute.startsWith("data-") && attribute !== "class") {
                    attributes[attribute] = this.$attrs[attribute]
                }
            }

            return attributes
        },
    },

    methods: {
        /**
         * Handles the input event on the textarea.
         * @param event The fired event.
         */
        handleInput(event: Event) {
            const target = event.target as HTMLTextAreaElement
            this.$emit(EVENTS.UPDATE_MODEL_VALUE, target.value)
        },

        /**
         * Handles the keyup event on the textarea.
         * @param event The fired event.
         */
        onKeyUp(event: KeyboardEvent) {
            if (!(event.key === KEYS.ENTER || event.key === KEYS.ESCAPE)) return

            event.stopPropagation()
        },
    },
})
</script>
