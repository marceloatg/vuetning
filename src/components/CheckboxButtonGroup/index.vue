<template>
    <fieldset class="slds-form-element" :class="{ 'slds-has-error': error }">

        <!-- Legend -->
        <legend v-if="label != null" class="slds-form-element__legend slds-form-element__label">
            <abbr v-if="required" class="slds-required" title="required">* </abbr>{{ label }}
        </legend>

        <!-- Control -->
        <div class="slds-form-element__control">
            <div class="slds-checkbox_button-group">

                <span
                    v-for="option in options"
                    :key="option.value"
                    class="slds-button slds-checkbox_button"
                    @click.stop="onClick(option.value)">

                    <input
                        type="checkbox"
                        :checked="value.includes(option.value)"
                        :value="option.value"
                        :disabled="disabled">

                    <label class="slds-checkbox_button__label">
                        <span class="slds-checkbox_faux">{{ option.label }}</span>
                    </label>

                </span>

            </div>
        </div>

        <!-- Error messages -->
        <div v-if="error" class="slds-form-element__help">
            <slot name="error"/>
        </div>

    </fieldset>
</template>

<script>
    export default {
        props: {
            disabled: {
                type: Boolean,
            },
            error: {
                type: Boolean,
            },
            label: {
                type: String,
            },
            options: {
                type: Array,
                required: true,
            },
            required: {
                type: Boolean,
                default: false,
            },
            value: {
                type: Array,
                default: () => [],
            },
        },
        methods: {
            onClick(value) {
                if (this.disabled) return;

                let index = this.value.indexOf(value);
                if (index === -1) this.value.push(value);
                else this.value.splice(index, 1);

                this.$emit('input', this.value);
            },
        },
    }
</script>
