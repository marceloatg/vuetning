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

        <!-- Label -->
        <template v-if="$slots.label" #label>
            <slot name="label"/>
        </template>

        <!-- Tooltip -->
        <template v-if="$slots.tooltip" #tooltip>
            <slot name="tooltip"/>
        </template>

        <!-- Default slot -->
        <template #default="slotProps">

            <!-- Input -->
            <input
                :id="slotProps['inputId']"
                ref="input"
                class="slds-input"
                :disabled="disabled"
                :maxlength="maxlength"
                :placeholder="placeholder"
                type="text"
                :value="modelValue"
                v-bind="inputAttributes"
                @input="handleInput"
                @keyup="handleKeyUp"
            >

            <!-- Right group -->
            <div class="slds-input__icon-group slds-input__icon-group_right" :style="rightGroupStyle">

                <!-- Spinner -->
                <transition name="fade">
                    <slds-spinner
                        v-if="showSpinner"
                        class="slds-input__spinner"
                        brand
                        x-small
                        :style="spinnerStyle"
                    />
                </transition>

                <!-- Clear button -->
                <transition name="fade">
                    <slds-button-icon
                        v-if="showClearButton"
                        bare
                        class="slds-input__icon slds-input__icon_right"
                        icon-name="utility:clear"
                        tabindex="-1"
                        title="Clear"
                        @click.prevent="handleClickClear"
                    />
                </transition>

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
import SldsButtonIcon from "../slds-button-icon/slds-button-icon.vue"
import SldsFormElement from "../slds-form-element/slds-form-element.vue"
import SldsSpinner from "../slds-spinner/slds-spinner.vue"
import { EVENTS, KEYS } from "../../constants"
import { defineComponent, type PropType } from "vue"
import type { ValidationError } from "../slds-form-element/validation-error"

export default defineComponent({
    name: "SldsInput",

    components: {
        SldsButtonIcon,
        SldsSpinner,
        SldsFormElement,
    },

    inheritAttrs: false,

    props: {
        /**
         * Indicates whether the input is disabled.
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
         * Input label.
         */
        label: String,

        /**
         * Input max length.
         */
        maxlength: [Number, String],

        /**
         * Input value.
         */
        modelValue: null,

        /**
         * Input placeholder.
         */
        placeholder: String,

        /**
         * Indicates whether this label's input is required.
         */
        required: Boolean,

        /**
         * Indicates whether the input is showing its spinner.
         */
        showSpinner: Boolean,

        /**
         * Indicates whether the input is stacked among other inputs.
         */
        stacked: Boolean,

        /**
         * Tooltip text.
         * When using the tooltip slot this prop is ignored.
         */
        tooltip: String,
    },

    data() {
        return {
            rightGroupStyle: { right: "0px" },
        }
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

        /**
         * Indicates whether the input is showing its clear button.
         */
        showClearButton(): boolean {
            return Boolean(this.modelValue && this.modelValue.length > 0 && !this.disabled)
        },

        /**
         * Spinner style.
         */
        spinnerStyle(): { right: string } {
            const style = { right: ".2rem" }

            if (this.modelValue && this.modelValue.length > 0) style.right = "1.5rem"

            return style
        },
    },

    methods: {
        /**
         * Handles the click event from the clear button.
         */
        handleClickClear(): void {
            this.$emit(EVENTS.UPDATE_MODEL_VALUE, null)

            const input = this.$refs.input as HTMLInputElement
            input.focus()
        },

        /**
         * Handles the input event on the input.
         * @param event The fired event.
         */
        handleInput(event: Event): void {
            const target = event.target as HTMLInputElement
            this.$emit(EVENTS.UPDATE_MODEL_VALUE, target.value)
        },

        /**
         * Handles the keyup event on the input.
         * @param event The fired event.
         */
        handleKeyUp(event: Event): void {
            if (!(event instanceof KeyboardEvent) || event.key !== KEYS.ESCAPE) return

            event.stopPropagation()
            if (event.key === KEYS.ESCAPE) this.$emit(EVENTS.UPDATE_MODEL_VALUE, null)
        },
    },
})
</script>

<style scoped lang="scss">

.slds-input {
    transition: all 300ms;
}

.slds-button_icon {
    vertical-align: baseline;
}

</style>
