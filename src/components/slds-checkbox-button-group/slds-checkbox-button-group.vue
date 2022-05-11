<template>
    <slds-form-element
        :label="label"
        :required="required"
        :error="error"
    >

        <!-- Input -->
        <div class="slds-checkbox_button-group">
            <slot v-if="$slots.default"/>
            <template v-else>
                <slds-checkbox-button-option
                    v-for="option in $data.$_options"
                    :key="option.key"
                    :value="$data.$_value.includes(option.value)"
                    :label="option.label"
                    :disabled="option.disabled"
                    @click="onClick(option.value)"
                />
            </template>
        </div>

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
import SldsCheckboxButtonOption from './slds-checkbox-button-option'
import SldsFormElement from '@/components/slds-form-element/slds-form-element'
import Option from './option'

export default {
    name: 'SldsCheckboxButtonGroup',

    components: {
        SldsCheckboxButtonOption,
        SldsFormElement,
    },

    props: {
        disabled: Boolean,
        error: Boolean,
        label: String,
        options: Array,
        required: Boolean,
        value: {type: Array, default: () => []}
    },

    data() {
        return {
            $_options: [],
            $_value: this.value
        }
    },

    watch: {
        options: {
            deep: true,
            handler() {
                this.parseOptions()
            }
        },

        value(value) {
            if (value) this.$data.$_value = value
            else this.$data.$_value = []
        }
    },

    created() {
        this.parseOptions()
    },

    methods: {
        parseOptions() {
            this.$data.$_options = this.$data.$_options.splice(0, this.$data.$_options.length)
            if (this.options == null) return

            for (const option of this.options) {
                if (typeof option === 'string') {
                    this.$data.$_options.push(new Option(option, this.disabled))
                }
                else if (typeof option === 'object') {
                    this.$data.$_options.push(new Option(
                        option.label,
                        option.disabled || this.disabled,
                        option.value
                    ))
                }
                else {
                    throw'[slds-checkbox-button-group] options must be of type string or a valid checkbox button option object.'
                }
            }
        },

        onClick(value) {
            if (this.disabled) return

            const index = this.$data.$_value.indexOf(value)
            if (index === -1) this.$data.$_value.push(value)
            else this.$data.$_value.splice(index, 1)

            this.$emit('input', this.$data.$_value)
        }
    }
}
</script>
