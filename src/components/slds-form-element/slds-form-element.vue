<template>
    <div :class="formElementClassNames">

        <!-- Label -->
        <slds-form-element-label v-if="label" :input-id="inputId" :required="required">
            {{ label }}
        </slds-form-element-label>

        <!-- Icon -->
        <div v-if="hasTooltip" class="slds-form-element__icon">
            <slds-tooltip>

                <template #trigger>
                    <slds-icon icon-name="utility:info" xx-small/>
                </template>

                <template #default>
                    <slot name="tooltip">
                        {{ tooltip }}
                    </slot>
                </template>

            </slds-tooltip>
        </div>

        <!-- Control -->
        <div class="slds-form-element__control">
            <slot :input-id="inputId"/>
        </div>

        <!-- Inline help -->
        <div v-if="hasInlineHelp" class="slds-form-element__help">
            <slot name="help">
                {{ help }}
            </slot>
        </div>

        <!-- Error messages -->
        <div v-if="hasErrorMessages" class="slds-form-element__help">
            <slot name="error">
                <p v-for="error of errors" :key="error.$uid">
                    {{ error.$message }}
                </p>
            </slot>
        </div>

    </div>
</template>

<script lang="ts">
import SldsFormElementLabel from "./slds-form-element-label.vue"
import SldsIcon from "../slds-icon/slds-icon.vue"
import SldsTooltip from "../slds-tooltip/slds-tooltip.vue"
import { v4 as newId } from "uuid"
import { defineComponent, VueElement, type PropType } from "vue"
import type { ValidationError } from "./validation-error"

export default defineComponent({
    name: "SldsFormElement",

    components: {
        SldsFormElementLabel,
        SldsIcon,
        SldsTooltip,
    },

    props: {
        /**
         * Indicates whether the form element is bordered.
         */
        bordered: Boolean,

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
         * Indicates whether this label's input is required.
         */
        required: Boolean,

        /**
         * Indicates whether the input is stacked among other inputs.
         */
        stacked: Boolean,

        /**
         * Indicates whether to suppress error messages.
         */
        suppressErrors: Boolean,

        /**
         * Tooltip text.
         * When using the tooltip slot this prop is ignored.
         */
        tooltip: String,
    },

    data() {
        return {
            /**
             * Input ID.
             */
            inputId: `input-${newId()}`,
        }
    },

    computed: {
        /**
         * The CSS class names for the form element.
         */
        formElementClassNames(): string {
            let classNames = "slds-form-element"

            // Error
            if (this.hasErrorMessages) classNames += " slds-has-error"

            // Stacked
            if (this.stacked) classNames += " slds-form-element_stacked"

            // Bordered
            if (this.bordered) classNames += " slds-form-element_readonly"

            return classNames
        },

        /**
         * Indicates whether this form element has error messages.
         */
        hasErrorMessages(): boolean {
            if (this.suppressErrors || (!this.$slots.error && this.errors.length === 0)) return false

            const getErrorNodes = this.$slots.error as Function
            const errorElements = getErrorNodes() as VueElement[]

            return this.errors.length > 0 ? true : Boolean(errorElements[0].children.length > 0)
        },

        /**
         * Indicates whether this form element has inline help.
         */
        hasInlineHelp(): boolean {
            if (!this.$slots.error) return false

            const hasInlineHelp = Boolean(this.help || this.$slots.help)
            return Boolean(!this.hasErrorMessages && hasInlineHelp)
        },

        /**
         * Indicates whether this form element has a tooltip.
         */
        hasTooltip(): boolean {
            return Boolean(this.tooltip || this.$slots.tooltip)
        },
    },
})
</script>

<style scoped lang="scss">

.slds-form-element__icon {
    position: static;
    padding-top: .375rem;
}

</style>
