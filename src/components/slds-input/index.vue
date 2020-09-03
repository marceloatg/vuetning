<template>
    <div
        class="slds-form-element"
        :class="{
            'slds-has-error': error,
            'slds-form-element_readonly slds-form-element_stacked': readonly,
        }">

        <!-- Label -->
        <label v-if="label" class="slds-form-element__label">
            <abbr v-if="required" class="slds-required" title="Required">*</abbr> {{ label }}
        </label>

        <!-- Read only -->
        <div v-if="readonly" class="slds-form-element__control slds-border_bottom">
            <div class="slds-form-element__static">
                <p> {{ valueInput }} </p>
            </div>
        </div>

        <!-- Control -->
        <div v-else class="slds-form-element__control slds-input-has-icon" :class="[iconClass, {'slds-input-has-fixed-addon': hasFixedText}]">

            <!-- Pre fixed text -->
            <span v-if="addonPre" class="slds-form-element__addon">
                {{ addonPre }}
            </span>

            <!-- Icon -->
            <slds-svg
                v-if="icon != null"
                :icon="icon"
                class="slds-icon slds-input__icon slds-input__icon_left"
                :class="iconClassVariant"/>

            <!-- Input -->
            <input
                ref="input"
                :value="valueInput"
                v-bind="$attrs"
                class="slds-input"
                v-on="listeners"
                @input="onInput($event.target.value)"
                @keyup="onKeyUp">

            <!-- Right group -->
            <div class="slds-input__icon-group slds-input__icon-group_right" :style="{right: rightGroupOffset}">

                <transition name="fade">
                    <slds-spinner
                        v-if="spinner"
                        variant="brand"
                        size="x-small"
                        class="slds-input__spinner"
                        :style="{right: spinnerRight}"/>
                </transition>

                <transition name="fade">
                    <slds-button-icon
                        v-if="valueInput && $attrs.readonly == null"
                        icon="utility:clear"
                        class="slds-input__icon slds-input__icon_right"
                        title="Clear"
                        tabindex="-1"
                        @click.prevent="onClickClear"/>
                </transition>

            </div>

            <!-- Post fixed text -->
            <span v-if="addonPost" ref="addonPost" class="slds-form-element__addon">
                {{ addonPost }}
            </span>

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
import SldsButtonIcon from '../slds-button-icon/index.vue'
import SldsSpinner from '../slds-spinner/index.vue'
import SldsSvg from '../slds-svg/index.vue'

export default {
    name: 'SldsInput',

    components: {
        SldsButtonIcon,
        SldsSpinner,
        SldsSvg,
    },

    inheritAttrs: false,

    props: {
        addonPost: String,
        addonPre: String,
        error: Boolean,
        icon: String,
        iconError: Boolean,
        iconLight: Boolean,
        iconSuccess: Boolean,
        iconWarning: Boolean,
        label: String,
        readonly: Boolean,
        required: Boolean,
        spinner: Boolean,
        value: {}
    },

    data() {
        return {
            rightGroupOffset: '0px',
            valueInput: this.value
        }
    },

    computed: {
        hasFixedText() {
            return (this.addonPre != null || this.addonPost != null);
        },

        iconClass() {
            return (this.icon == null)
                ? 'slds-input-has-icon_right'
                : 'slds-input-has-icon_left-right';
        },

        iconClassVariant() {
            if (this.error || this.iconError) {
                return {'slds-icon-text-error': true};
            }
            else if (this.iconLight) {
                return {'slds-icon-text-light': true};
            }
            else if (this.iconSuccess) {
                return {'slds-icon-text-success': true};
            }
            else if (this.iconWarning) {
                return {'slds-icon-text-warning': true};
            }
            else {
                return {'slds-icon-text-default': true};
            }
        },

        listeners() {
            const listeners = {...this.$listeners};
            delete listeners.input;
            return listeners
        },

        spinnerRight() {
            if (this.value) return '1.5rem';
            return '.2rem';
        },
    },

    watch: {
        async addonPost() {
            await this.$nextTick();

            const addonPost = this.$refs.addonPost;

            if (this.addonPost == null || addonPost == null) {
                this.rightGroupOffset = '0px';
                return;
            }

            this.rightGroupOffset = `${addonPost.offsetWidth + 16}px`;
        },

        value(newValue) {
            this.valueInput = newValue
        }
    },

    mounted() {
        if (this.addonPost == null) return;
        const addonPost = this.$refs.addonPost;
        this.rightGroupOffset = `${addonPost.offsetWidth + 16}px`;
    },

    methods: {
        onInput(value) {
            this.valueInput = value;
            this.$emit('input', this.valueInput);
        },

        onClear() {
            this.$refs.input.value = null;
            this.$emit('input', null);
        },

        onClickClear() {
            this.valueInput = null;
            this.$emit('input', this.valueInput);
        },

        onKeyUp(event) {
            if (event.key === 'Escape') this.onClear();
        },
    }
}
</script>

<style scoped lang="scss">
.fade-enter-active, .fade-leave-active {
    transition: opacity 150ms;
}

.fade-enter, .fade-leave-to {
    opacity: 0;
}

.slds-icon-text-error {
    fill: #c23934 !important;
}

.slds-icon-text-light {
    fill: #b0adab !important;
}

.slds-icon-text-success {
    fill: #027e46 !important;
}

.slds-icon-text-warning {
    fill: #ffb75d !important;
}
</style>
