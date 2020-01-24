<template>
    <div class="slds-form-element" :class="{ 'slds-has-error': error, 'slds-text-align_center': centered }">
        <!-- Label -->
        <label v-if="label != null" class="slds-form-element__label">
            <abbr v-if="required" class="slds-required" title="Required">*</abbr> {{ label }}
        </label>

        <div class="slds-form-element__control">

            <button class="slds-button slds-button_icon slds-button_icon-small slds-input__button_decrement" @click="onClickMinus">
                <slds-svg icon="utility:ban" class="slds-button__icon"/>
            </button>

            <!-- Input -->
            <input
                ref="input"
                type="number"
                :value="value"
                v-bind="$attrs"
                class="slds-input slds-input_counter"
                @input="$emit('input', $event.target.value)"
                v-on="listeners">

            <button class="slds-button slds-button_icon slds-button_icon-small slds-input__button_increment" @click="onClickPlus">
                <slds-svg icon="utility:new" class="slds-button__icon"/>
            </button>
        </div>

        <!-- Error messages -->
        <div v-if="error" class="slds-form-element__help">
            <slot name="error"/>
        </div>
    </div>
</template>

<script>
    import SldsSvg from '../slds-svg/index.vue'

    export default {
        name: 'SldsCounter',
        components: {
            SldsSvg
        },
        inheritAttrs: false,
        props: {
            error: {
                type: Boolean,
            },
            label: {
                type: String,
            },
            required: {
                type: Boolean,
            },
            value: {
                type: Number,
                default: 1
            },
            minValue: {
                type: Number,
                default: 0,
            },
            centered: {
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
            onClickPlus() {
                let newValue = this.value + 1;
                this.$emit('input', newValue)
            },
            onClickMinus() {
                if (this.value <= this.minValue) return;

                let newValue = this.value - 1;
                this.$emit('input', newValue)
            },
        }
    }
</script>
