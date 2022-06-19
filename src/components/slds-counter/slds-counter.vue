<template>
    <slds-form-element
        :label="label"
        :error="error"
        :required="required"
        :read-only="readonly"
        :tooltip="tooltip"
    >

        <!-- Tooltip -->
        <template v-if="$slots.tooltip" #tooltip>
            <slot name="tooltip"/>
        </template>

        <!-- Decrement button -->
        <slds-button-icon
            v-if="!readonly"
            icon="utility:ban"
            small
            title="Decrement counter"
            assistive-text="Decrement counter"
            class="slds-input__button_decrement"
            :disabled="disabled"
            @click="onClickDecrement"
        />

        <!-- View mode -->
        <div v-if="readonly" class="slds-form-element__static">
            {{ this.$data.$_value }}
        </div>

        <!-- Input -->
        <input
            v-else
            :type="readonly ? 'text' : 'number'"
            class="slds-input"
            v-bind="attributes"
            :value="$data.$_value"
            :disabled="disabled"
            :readonly="readonly"
            :class="inputClass"
            v-on="listeners"
            @input="onInput"
        >

        <!-- Increment button -->
        <slds-button-icon
            v-if="!readonly"
            icon="utility:new"
            small
            title="Increment counter"
            assistive-text="Increment counter"
            class="slds-input__button_increment"
            :disabled="disabled"
            @click="onClickIncrement"
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
import SldsButtonIcon from '@/components/slds-button-icon/slds-button-icon'
import SldsFormElement from '@/components/slds-form-element/slds-form-element'
import numeral from 'numeral'
import 'numeral/locales/pt-br'
import 'numeral/locales/es-es'

export default {
    name: 'SldsCounter',

    components: {
        SldsButtonIcon,
        SldsFormElement
    },

    inheritAttrs: false,

    props: {
        disabled: Boolean,
        error: Boolean,
        format: String,
        label: String,
        locale: String,
        max: [Number, String],
        min: [Number, String],
        readonly: Boolean,
        required: Boolean,
        step: {type: [Number, String], default: 1},
        tooltip: String,
        value: [Number, String]
    },

    data() {
        return {
            $_value: this.value,
        }
    },

    computed: {
        attributes() {
            const attributes = {...this.$attrs}
            delete attributes.type
            return attributes
        },

        inputClass() {
            return {
                'slds-input_counter': !this.readonly
            }
        },

        listeners() {
            const listeners = {...this.$listeners}
            delete listeners.input
            return listeners
        },
    },

    watch: {
        min() {
            this.formatValue()
        },

        max() {
            this.formatValue()
        },

        value() {
            this.formatValue()
        }
    },

    created() {
        this.formatValue()
    },

    methods: {
        formatValue() {
            const min = (typeof this.min !== 'number' && this.min == null) ? null : Number(this.min)
            const max = (typeof this.max !== 'number' && this.max == null) ? null : Number(this.max)
            let value = Number(this.value)

            if ((min != null) && (this.value == null || (value <= min))) value = min
            else if ((max != null) && (value >= max)) value = max

            if (this.value !== value) this.$emit('input', value)

            if (this.readonly) {
                if (this.locale?.toLowerCase() === 'pt-br' || this.locale?.toLowerCase() === 'br') numeral.locale('pt-br')
                else if (this.locale?.toLowerCase() === 'es-es' || this.locale?.toLowerCase() === 'es') numeral.locale('es-es')

                this.$data.$_value = this.format ? numeral(value).format(this.format) : numeral(value).value()
            }
            else {
                this.$data.$_value = value
            }
        },

        onClickDecrement() {
            const min = (typeof this.min !== 'number' && this.min == null) ? null : Number(this.min)
            const value = Number(this.value) - Number(this.step)

            if ((min != null) && (value < min)) return
            this.$emit('input', value)
        },

        onClickIncrement() {
            const max = (typeof this.max !== 'number' && this.max == null) ? null : Number(this.max)
            const value = Number(this.value) + Number(this.step)

            if ((max != null) && (value > max)) return
            this.$emit('input', value)
        },

        onInput(event) {
            this.$emit('input', event.target.value)
        },
    },
}
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
