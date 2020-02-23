<template>
    <div class="slds-form-element" :class="{ 'slds-has-error': error, 'slds-text-align_center': centered }">

        <!-- Label -->
        <label v-if="label" class="slds-form-element__label">
            <abbr v-if="required" class="slds-required" title="Required">*</abbr> {{ label }}
        </label>

        <div class="slds-form-element__control">

            <!-- Decrement button -->
            <button v-if="!readonly" class="slds-button slds-button_icon slds-button_icon-small slds-input__button_decrement" @click="onClickMinus">
                <slds-svg icon="utility:ban" class="slds-button__icon"/>
            </button>

            <!-- Input -->
            <input
                ref="input"
                type="number"
                :value="value"
                v-bind="attributes"
                class="slds-input"
                :class="{'slds-input_counter': !readonly}"
                :readonly="readonly"
                @input="$emit('input', Number($event.target.value))"
                v-on="listeners">

            <!-- Increment button -->
            <button v-if="!readonly" class="slds-button slds-button_icon slds-button_icon-small slds-input__button_increment" @click="onClickPlus">
                <slds-svg icon="utility:new" class="slds-button__icon"/>
            </button>

        </div>

        <!-- Inline help -->
        <div v-if="!error && $slots.help" class="slds-form-element__help">
            <slot name="help"/>
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
            max: {
                type: [Number, String]
            },
            min: {
                type: [Number, String]
            },
            readonly: {
                type: Boolean,
            },
            required: {
                type: Boolean,
            },
            step: {
                type: [Number, String],
                default: 1,
            },
            value: {
                type: [Number, String]
            },
            centered: {
                type: Boolean,
            }
        },
        computed: {
            attributes() {
                const attributes = {...this.$attrs};
                delete attributes.type;
                return attributes
            },
            listeners() {
                const listeners = {...this.$listeners};
                delete listeners.input;
                return listeners
            },
        },
        watch: {
            value() {
                this.formatNumber();
            }
        },
        created() {
            this.formatNumber();
        },
        methods: {
            formatNumber() {
                const minIsNull = (typeof this.min !== "number" && this.min == null);
                const maxIsNull = (typeof this.max !== "number" && this.max == null);

                if (!minIsNull && (this.value == null || (Number(this.value) <= Number(this.min)))) {
                    this.$emit('input', Number(this.min));
                    return;
                }

                if (!maxIsNull && (Number(this.value) >= Number(this.max))) {
                    this.$emit('input', Number(this.max));
                    return;
                }

                this.$emit('input', Number(this.value));
            },
            onClickMinus() {
                const minIsNull = (typeof this.min !== "number" && this.min == null);

                if (!minIsNull && (Number(this.value) < Number(this.min))) return;
                this.$emit('input', Number(this.value) - Number(this.step));
            },
            onClickPlus() {
                const maxIsNull = (typeof this.max !== "number" && this.max == null);

                if (!maxIsNull && (Number(this.value) > Number(this.max))) return;
                this.$emit('input', Number(this.value) + Number(this.step));
            },
        }
    }
</script>
