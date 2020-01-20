<template>
    <div class="slds-form-element" :class="{ 'slds-has-error': error }">

        <!-- Label -->
        <label v-if="label != null" class="slds-form-element__label">
            <abbr v-if="required" class="slds-required" title="Required">*</abbr> {{ label }}
        </label>

        <!-- Read only -->
        <div v-if="readonly" class="slds-form-element__control slds-border_bottom">
            <div class="slds-form-element__static">
                <p> {{ value }} </p>
            </div>
        </div>

        <!-- Input -->
        <div v-else class="slds-form-element__control">
            <textarea
                ref="input"
                :value="value"
                v-bind="$attrs"
                class="slds-textarea"
                @input="$emit('input', $event.target.value)"
                v-on="listeners"/>
        </div>

        <!-- Error messages -->
        <div v-if="error" class="slds-form-element__help">
            <slot name="error"/>
        </div>

    </div>
</template>

<script>
    export default {
        name: "SldsTextArea",
        inheritAttrs: false,
        props: {
            error: {
                type: Boolean,
            },
            label: {
                type: String,
            },
            readonly: {
                type: Boolean,
            },
            required: {
                type: Boolean,
            },
            value: {}
        },
        computed: {
            listeners() {
                const listeners = {...this.$listeners};
                delete listeners.input;
                return listeners
            },
        },
    }
</script>
