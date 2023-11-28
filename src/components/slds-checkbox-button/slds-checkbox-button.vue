<template>
    <slds-form-element
        :errors="errors"
        :help="help"
        :label="inline ? undefined : label"
        :required="required"
        :stacked="stacked"
    >

        <!-- Input -->
        <label :class="checkboxButtonClassNames">

            <input
                class="slds-assistive-text"
                :disabled="disabled"
                type="checkbox"
                :value="modelValue"
                v-bind="inputAttributes"
                @input="handleInput"
            >

            <slds-icon
                v-if="modelValue"
                :icon-name="iconChecked"
                inverse
                x-small
            />

            <slds-icon
                v-else
                current-color
                :icon-name="iconUnchecked"
                x-small
            />

            <span class="slds-assistive-text">
                {{ assistiveText }}
            </span>

        </label>

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
import { defineComponent, type PropType } from "vue"
import SldsFormElement from "../slds-form-element/slds-form-element.vue"
import SldsIcon from "../slds-icon/slds-icon.vue"
import { EVENTS } from "../../constants"
import { type ValidationError } from "../slds-form-element/validation-error"

export default defineComponent({
    name: "SldsCheckboxButton",

    components: { SldsIcon, SldsFormElement },

    props: {
        assistiveText: String,

        disabled: Boolean,

        /**
         * Array of error objects from vuelidate.
         */
        errors: { type: Array as PropType<ValidationError[]>, default: () => [] as ValidationError[] },

        help: String,

        iconChecked: { type: String, default: "utility:check" },

        iconUnchecked: { type: String, default: "utility:add" },

        inline: Boolean,

        label: String,

        modelValue: Boolean,

        readonly: Boolean,

        required: Boolean,

        stacked: Boolean,
    },

    computed: {
        checkboxButtonClassNames(): string {
            let classNames = "slds-checkbox-button"

            if (this.modelValue) classNames += " slds-checkbox-button_is-checked"
            if (this.disabled) classNames += " slds-checkbox-button_is-disabled"

            return classNames
        },

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
        handleInput(): void {
            if (this.disabled) return

            this.$emit(EVENTS.UPDATE_MODEL_VALUE, !this.modelValue)
        },
    },
})
</script>

<style scoped lang="scss">

.slds-checkbox-button {
    user-select: none;
    transition: all 140ms ease-in-out;

    &:after {
        transition: all 140ms ease-in-out;
    }
}

</style>
