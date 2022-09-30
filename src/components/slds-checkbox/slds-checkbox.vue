<template>
    <slds-form-element
        :borderless="borderless"
        :error="error"
        :label="inline ? null : label"
        :read-only="readonly"
        :required="required"
        :tooltip="tooltip"
    >

        <!-- Tooltip -->
        <template v-if="$slots.tooltip" #tooltip>
            <slot name="tooltip"/>
        </template>

        <!-- View mode -->
        <template v-if="readonly">

            <slds-icon
                :icon="value ? 'utility:check' : 'utility:steps'"
                x-small
            />

            <span v-if="inline" class="slds-p-left_xx-small">
                {{ label }}
            </span>

        </template>

        <!-- Input -->
        <slds-checkbox-option
            v-else
            v-model="$data.$_value"
            :option="label"
            :disabled="disabled"
            :inline="inline"
            @click="onClick"
        />

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

<script>
import SldsCheckboxOption from '@/components/slds-options/slds-checkbox-option'
import SldsFormElement from '@/components/slds-form-element/slds-form-element'
import SldsIcon from '@/components/slds-icon/slds-icon'

export default {
    name: 'SldsCheckbox',

    components: {
        SldsCheckboxOption,
        SldsFormElement,
        SldsIcon
    },

    props: {
        borderless: Boolean,
        disabled: Boolean,
        error: Boolean,
        inline: Boolean,
        label: String,
        readonly: Boolean,
        required: Boolean,
        tooltip: String,
        value: Boolean
    },

    data() {
        return {
            $_value: this.value
        }
    },

    watch: {
        value(value) {
            this.$data.$_value = value
        }
    },

    methods: {
        onClick() {
            if (this.disabled || this.readonly) return
            this.$data.$_value = !this.$data.$_value
            this.$emit('input', this.$data.$_value)
        }
    }
}
</script>
