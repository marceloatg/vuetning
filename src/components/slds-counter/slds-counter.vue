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

            <!-- Decrement button -->
            <slds-button-icon
                assistive-text="Decrement counter"
                class="slds-input__button_decrement"
                :disabled="disabled"
                icon-name="utility:ban"
                small
                title="Decrement counter"
                @click="handleClickDecrement"
            />

            <!-- Input -->
            <input
                :id="slotProps['inputId']"
                ref="input"
                class="slds-input slds-input_counter"
                :disabled="disabled"
                type="number"
                :value="modelValue"
                v-bind="inputAttributes"
                @input="onInput"
                @click="handleClickInput"
            >

            <!-- Increment button -->
            <slds-button-icon
                icon-name="utility:new"
                small
                title="Increment counter"
                assistive-text="Increment counter"
                class="slds-input__button_increment"
                :disabled="disabled"
                @click="handleClickIncrement"
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
import SldsButtonIcon from "../slds-button-icon/slds-button-icon.vue"
import SldsFormElement from "../slds-form-element/slds-form-element.vue"
import { EVENTS } from "../../constants"
import { defineComponent, type PropType } from "vue"
import { type ValidationError } from "../slds-form-element/validation-error"

export default defineComponent({
    name: "SldsCounter",

    components: {
        SldsButtonIcon,
        SldsFormElement,
    },

    inheritAttrs: false,

    props: {
        disabled: Boolean,

        /**
         * Array of error objects from vuelidate.
         */
        errors: { type: Array as PropType<ValidationError[]>, default: () => [] as ValidationError[] },

        format: String,

        /**
         * Inline help text.
         * When using the help slot this prop is ignored.
         */
        help: String,

        label: String,

        locale: String,

        max: [Number, String],

        min: [Number, String],

        /**
         * Input value.
         */
        modelValue: { type: [Number, String], default: 0 },

        required: Boolean,

        /**
         * Indicates whether the input is stacked among other inputs.
         */
        stacked: Boolean,

        step: { type: [Number, String], default: 1 },

        tooltip: String,
    },

    computed: {
        /**
         * Bindable form element attributes.
         */
        formElementAttributes(): Record<string, unknown> {
            const attributes: Record<string, unknown> = {}

            for (const attribute in this.$attrs) {
                if (attribute.startsWith("data-") || attribute === "class" || attribute === "debounce-events") {
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
                if (!attribute.startsWith("data-") && attribute !== "class" && attribute !== "debounce-events") {
                    attributes[attribute] = this.$attrs[attribute]
                }
            }

            return attributes
        },
    },

    methods: {
        handleClickDecrement(): void {
            const min = (typeof this.min !== "number" && this.min == null) ? null : Number(this.min)
            const value = Number(this.modelValue) - Number(this.step)

            if ((min != null) && (value < min)) return
            this.$emit(EVENTS.UPDATE_MODEL_VALUE, value)
        },

        handleClickIncrement(): void {
            const max = (typeof this.max !== "number" && this.max == null) ? null : Number(this.max)
            const value = Number(this.modelValue) + Number(this.step)

            if ((max != null) && (value > max)) return
            this.$emit(EVENTS.UPDATE_MODEL_VALUE, value)
        },

        handleClickInput(): void {
            const inputElement = this.$refs.input as HTMLInputElement
            inputElement.select()
        },

        onInput(event: Event): void {
            const target = event.target as HTMLInputElement
            this.$emit(EVENTS.UPDATE_MODEL_VALUE, Number(target.value))
        },
    },
})
</script>

<style scoped>

.slds-input__button_decrement {
    top: 12.5%;
    transform: none;
}

.slds-input__button_increment {
    top: 12.5%;
    transform: none;
}

</style>
