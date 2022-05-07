<template>
    <fieldset class="slds-form-element" :class="[{ 'slds-has-error': error }]">

        <!-- Label -->
        <div class="legend-wrapper">
            <legend>
                <abbr v-if="required" class="slds-required" title="required">* </abbr>{{ label }}
            </legend>
        </div>

        <!-- Control -->
        <div class="slds-form-element__control">

            <!-- Option -->
            <span
                v-for="option in options"
                :key="option.value"
                class="slds-radio"
                @input="onInput(option.value)">

                <!-- Input -->
                <input
                    :id="`radio-${id}-${option.value}`"
                    name="options"
                    type="radio"
                    :disabled="disabled"
                    :value="option.value"
                    :checked="value === option.value">

                <!-- Input label -->
                <label class="slds-radio__label" :for="`radio-${id}-${option.value}`">
                    <div class="slds-grid slds-grid_vertical">

                        <div class="slds-col">

                            <span class="slds-radio_faux"/>

                            <span class="slds-form-element__label">
                                {{ option.label }}
                            </span>

                        </div>

                        <div class="slds-col">
                            <div v-if="option.meta != null" class="slds-radio_meta">
                                {{ option.meta }}
                            </div>
                        </div>

                    </div>
                </label>

            </span>

            <!-- Error messages -->
            <div v-if="error" class="slds-form-element__help">
                <slot name="error"/>
            </div>

        </div>

    </fieldset>
</template>

<script>
import {v4 as newId} from 'uuid'

export default {
    name: 'SldsWideRadioGroup',

    props: {
        disabled: {
            type: Boolean,
            default: false,
        },

        error: {
            type: Boolean,
            default: false,
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

        value: {}
    },
    data() {
        return {
            id: newId(),
        }
    },
    created() {
        for (let option of this.options) {
            if (option == null || option.value == null)
                throw 'Missing value for option.'
        }
    },
    methods: {
        onInput(value) {
            this.$emit('input', value)
        }
    },
}
</script>

<style scoped lang="scss">
.legend-wrapper {
    text-align: right;
    padding-right: 1.5rem;
    width: 35%;

    legend {
        overflow-wrap: break-word;
        word-wrap: break-word;
        display: inline-block;
        padding: .25rem .5rem 0 0;
        margin-bottom: .125rem;
        margin-left: auto;
        text-align: right;
        color: #3e3e3c;
    }
}

.slds-form-element__control {
    float: right;
    width: 65%;

    .slds-radio_faux {
        transition: all ease-in-out 300ms;
    }

    .slds-form-element__label {
        padding-left: 1rem;
    }

    .slds-radio_meta {
        color: #3e3e3c;
        padding-bottom: .75rem;
        padding-left: 4.25rem;
        word-wrap: break-word;
    }
}
</style>
