<template>
    <slds-form-element
        :dir="rightToLeft ? 'rtl' : 'ltr'"
        :errors="errors"
        :help="help"
        :label="inline ? undefined : label"
        :required="required"
        :stacked="stacked"
    >

        <!-- Tooltip -->
        <template v-if="$slots.tooltip" #tooltip>
            <slot name="tooltip"/>
        </template>

        <!-- Default slot -->
        <template #default="slotProps">
            <label class="slds-checkbox_toggle slds-grid">

                <!-- Label -->
                <span v-if="inline" class="slds-form-element__label slds-m-bottom_none">
                    <abbr v-if="required" class="slds-required" title="required">* </abbr>
                    {{ label }}
                </span>

                <!-- Input -->
                <input
                    :id="slotProps['inputId']"
                    type="checkbox"
                    v-bind="$attrs"
                    :checked="modelValue"
                    :disabled="disabled"
                    @input="handleInput"
                >

                <!-- Faux -->
                <span class="slds-checkbox_faux_container" aria-live="assertive">

                    <span class="slds-checkbox_faux slds-m-right_x-small"/>

                    <span v-if="!noMessage" class="slds-checkbox_on slds-m-right_x-small">
                        {{ messageActive }}
                    </span>

                    <span v-if="!noMessage" class="slds-checkbox_off slds-m-right_x-small">
                        {{ messageInactive }}
                    </span>

                </span>

            </label>
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
import { EVENTS } from "../../constants"
import { defineComponent, type PropType } from "vue"
import type { ValidationError } from "../slds-form-element/validation-error"

export default defineComponent({
    name: "SldsCheckboxToggle",

    components: {
        SldsFormElement,
    },

    inheritAttrs: false,

    props: {

        /**
         * Array of error objects from vuelidate.
         */
        errors: { type: Array as PropType<ValidationError[]>, default: () => [] as ValidationError[] },

        disabled: Boolean,

        /**
         * Inline help text.
         * When using the help slot this prop is ignored.
         */
        help: String,

        inline: Boolean,

        label: String,

        messageActive: { type: String, default: "Enabled" },

        messageInactive: { type: String, default: "Disabled" },

        /**
         * Input value.
         */
        modelValue: Boolean,

        noMessage: Boolean,

        required: Boolean,

        rightToLeft: Boolean,

        /**
         * Indicates whether the input is stacked among other inputs.
         */
        stacked: Boolean,
    },

    methods: {
        handleInput() {
            if (this.disabled) return
            this.$emit(EVENTS.UPDATE_MODEL_VALUE, !this.modelValue)
        },
    },
})
</script>

<style scoped lang="scss">

.slds-checkbox_faux {
    transition: all 300ms ease-out;
}

.slds-checkbox_on,
.slds-checkbox_off {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

</style>
