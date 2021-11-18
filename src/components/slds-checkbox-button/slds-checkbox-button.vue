<template>
    <slds-form-element
        :label="inline ? null : label"
        :required="required"
        :read-only="readonly"
        :error="error"
    >

        <!-- Input -->
        <label class="slds-checkbox-button" :class="checkboxButtonClass">

            <input
                type="checkbox"
                class="slds-assistive-text"
                v-bind="$attrs"
                :value="$data.$_value"
                v-on="listeners"
                @input="onClick"
            >

            <slds-icon
                v-if="value"
                :icon="iconChecked"
                x-small
                inverse
            />

            <slds-icon
                v-else
                :icon="iconUnchecked"
                x-small
                current-color
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

<script>
import SldsFormElement from '@/components/slds-form-element/slds-form-element'
import SldsIcon from '../slds-icon/slds-icon'

export default {
    name: 'SldsCheckboxButton',

    components: {
        SldsFormElement,
        SldsIcon
    },

    inheritAttrs: false,

    props: {
        assistiveText: String,
        disabled: Boolean,
        error: Boolean,
        iconChecked: {type: String, default: 'utility:check'},
        iconUnchecked: {type: String, default: 'utility:add'},
        inline: Boolean,
        label: String,
        readonly: Boolean,
        required: Boolean,
        value: Boolean
    },

    data() {
        return {
            $_value: this.value
        }
    },

    computed: {
        checkboxButtonClass() {
            return [
                {'slds-checkbox-button_is-checked': this.value},
                {'slds-checkbox-button_is-disabled': this.disabled}
            ]
        },

        listeners() {
            const listeners = {...this.$listeners}
            delete listeners.input
            return listeners
        },
    },

    watch: {
        value(value) {
            this.$data.$_value = value
        }
    },

    methods: {
        onClick() {
            if (this.disabled) return
            this.$data.$_value = !this.$data.$_value
            this.$emit('input', this.$data.$_value)
        }
    }
}
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
