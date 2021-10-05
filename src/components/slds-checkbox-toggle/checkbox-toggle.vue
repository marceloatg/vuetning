<template>
    <slds-form-element
        :label="inline ? null : label"
        :required="required"
        :error="error"
        :dir="rightToLeft ? 'rtl' : 'ltr'"
    >

        <!-- Input -->
        <label class="slds-checkbox_toggle slds-grid">

            <!-- Label -->
            <span v-if="inline" class="slds-form-element__label slds-m-bottom_none">
                <abbr v-if="required" class="slds-required" title="required">* </abbr>
                {{ label }}
            </span>

            <!-- Input -->
            <input
                type="checkbox"
                v-bind="$attrs"
                :checked="$data.$_value"
                :disabled="disabled"
                v-on="listeners"
                @input="onInput"
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
import SldsFormElement from '@/components/slds-form-element/form-element'

export default {
    name: 'SldsCheckboxToggle',

    components: {
        SldsFormElement,
    },

    inheritAttrs: false,

    props: {
        error: Boolean,
        disabled: Boolean,
        inline: Boolean,
        label: String,
        messageActive: {type: String, default: 'Enabled'},
        messageInactive: {type: String, default: 'Disabled'},
        noMessage: Boolean,
        required: Boolean,
        rightToLeft: Boolean,
        value: Boolean
    },

    data() {
        return {
            $_value: this.value
        }
    },

    computed: {
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
        onInput() {
            if (this.disabled) return
            this.$data.$_value = !this.$data.$_value
            this.$emit('input', this.$data.$_value)
        }
    }
}
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
