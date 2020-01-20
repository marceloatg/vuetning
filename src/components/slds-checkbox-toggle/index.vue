<template>
    <div class="slds-form-element">
        <label class="slds-checkbox_toggle slds-grid">

            <!-- Label -->
            <span v-if="label != null" class="slds-form-element__label slds-m-bottom_none">
                {{ label }}
            </span>

            <input
                type="checkbox"
                v-bind="$attrs"
                :checked="value"
                @input="onInput"
                v-on="listeners">

            <span class="slds-checkbox_faux_container">

                <span class="slds-checkbox_faux"/>

                <span v-if="messageActive != null" class="slds-checkbox_on">
                    {{ messageActive }}
                </span>

                <span v-if="messageInactive != null" class="slds-checkbox_off">
                    {{ messageInactive }}
                </span>

            </span>

        </label>
    </div>
</template>

<script>
    export default {
        name: 'SldsCheckboxToggle',
        inheritAttrs: false,
        props: {
            label: {
                type: String,
            },
            messageActive: {
                type: String,
                default: 'Enabled',
            },
            messageInactive: {
                type: String,
                default: 'Disabled',
            },
            value: {
                type: Boolean,
            }
        },
        computed: {
            listeners() {
                const listeners = {...this.$listeners};
                delete listeners.input;
                return listeners
            },
        },
        methods: {
            onInput() {
                this.$emit('input', !this.value);
            },
        },
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
