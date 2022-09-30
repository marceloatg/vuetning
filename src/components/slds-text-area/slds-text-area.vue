<template>
    <slds-form-element
        :label="label"
        :required="required"
        :read-only="readonly"
        :error="error"
        :borderless="borderless"
    >

        <!-- View mode -->
        <div v-if="readonly" class="slds-form-element__static">
            <p>{{ $data.$_value }}</p>
        </div>

        <!-- Text area -->
        <textarea
            v-else
            v-bind="$attrs"
            :value="$data.$_value"
            :readonly="readonly"
            :disabled="disabled"
            class="slds-textarea"
            v-on="listeners"
            @input="onInput"
            @keyup="onKeyUp"
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
import SldsFormElement from '@/components/slds-form-element/slds-form-element'

export default {
    name: 'SldsTextArea',

    components: {
        SldsFormElement
    },

    inheritAttrs: false,

    props: {
        borderless: Boolean,
        disabled: Boolean,
        error: Boolean,
        label: String,
        readonly: Boolean,
        required: Boolean,
        value: {}
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
        onInput(event) {
            this.$emit('input', event.target.value)
        },

        onKeyUp(event) {
            if (this.readonly || !(event.key === 'Enter' || event.key === 'Escape')) return

            event.stopPropagation()
        },
    }
}
</script>
