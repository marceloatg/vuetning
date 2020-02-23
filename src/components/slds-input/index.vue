<template>
    <div class="slds-form-element" :class="{ 'slds-has-error': error }">

        <!-- Label -->
        <label v-if="label" class="slds-form-element__label">
            <abbr v-if="required" class="slds-required" title="Required">*</abbr> {{ label }}
        </label>

        <!-- Control -->
        <div class="slds-form-element__control slds-input-has-icon" :class="[iconClass, {'slds-input-has-fixed-addon': hasFixedText}]">

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
                :value="value"
                v-bind="$attrs"
                class="slds-input"
                @input="$emit('input', $event.target.value)"
                v-on="listeners">

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
                        v-if="value && $attrs.readonly == null"
                        icon="utility:clear"
                        class="slds-input__icon slds-input__icon_right"
                        title="Clear"
                        tabindex="-1"
                        @click.prevent="onClear"/>
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
    import ClearableInputMixin from '../../mixins/clearable-input'

    export default {
        name: 'SldsInput',
        components: {
            SldsButtonIcon,
            SldsSpinner,
            SldsSvg,
        },
        mixins: [
            ClearableInputMixin,
        ],
        inheritAttrs: false,
        props: {
            addonPost: {
                type: String,
            },
            addonPre: {
                type: String,
            },
            error: {
                type: Boolean,
            },
            icon: {
                type: String,
            },
            iconError: {
                type: Boolean,
            },
            iconLight: {
                type: Boolean,
            },
            iconSuccess: {
                type: Boolean,
            },
            iconWarning: {
                type: Boolean,
            },
            label: {
                type: String,
            },
            required: {
                type: Boolean,
            },
            spinner: {
                type: Boolean,
            },
            value: {}
        },
        data() {
            return {
                rightGroupOffset: '0px',
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
        },
        mounted() {
            if (this.addonPost == null) return;
            const addonPost = this.$refs.addonPost;
            this.rightGroupOffset = `${addonPost.offsetWidth + 16}px`;
        },
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
