<template>
    <div class="slds-form-element" :class="{ 'slds-has-error': error }">

        <!-- Label -->
        <label v-if="label != null" class="slds-form-element__label">
            <abbr v-if="required" class="slds-required" title="Required">*</abbr> {{ label }}
        </label>

        <!-- Control -->
        <div class="slds-form-element__control slds-input-has-icon" :class="[iconClass, {'slds-input-has-fixed-addon': hasFixedText}]">

            <!-- Pre fixed text -->
            <span v-if="addonPre" class="slds-form-element__addon">
                {{ addonPre }}
            </span>

            <!-- Icon -->
            <slds-svg v-if="icon != null" :icon-name="icon" class="slds-icon slds-input__icon slds-input__icon_left slds-icon-text-default"/>

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
                        icon-name="utility:clear"
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
        <div v-if="!error && inlineHelp != null" class="slds-form-element__help">
            <slot name="inline-help"/>
        </div>

        <!-- Error messages -->
        <div v-if="error" class="slds-form-element__help">
            <slot name="error"/>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'Input',
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
            inlineHelp: {
                type: String,
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
        methods: {
            onClear() {
                this.$refs.input.value = null;
                this.$emit('input', null);
            },
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
</style>
