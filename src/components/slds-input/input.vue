<template>
    <slds-form-element
        :label="label"
        :required="required"
        :read-only="readonly"
        :error="error"
        :borderless="borderless"
        :control-class="controlClass"
    >
        <!-- Pre fixed text -->
        <span v-if="addonPre" class="slds-form-element__addon">
            {{ addonPre }}
        </span>

        <!-- Icon -->
        <slds-svg
            v-if="icon"
            :icon="icon"
            class="slds-icon slds-input__icon slds-input__icon_left"
            :class="iconClass"
        />

        <!-- View mode -->
        <div v-if="readonly" class="slds-form-element__static">
            {{ this.$data.$_value }}
        </div>

        <!-- Input -->
        <input
            v-else
            ref="input"
            v-bind="$attrs"
            :value="$data.$_value"
            :readonly="readonly"
            :disabled="disabled"
            class="slds-input"
            v-on="listeners"
            @input="onInput"
            @keyup="onKeyUp"
        >

        <!-- Right group -->
        <div class="slds-input__icon-group slds-input__icon-group_right" :style="$data.$_rightGroupStyle">

            <!-- Spinner -->
            <transition :name="transitionName">
                <slds-spinner
                    v-if="loading"
                    variant="brand"
                    size="x-small"
                    class="slds-input__spinner"
                    :style="{right: spinnerRight}"
                />
            </transition>

            <!-- Clear button -->
            <transition :name="transitionName">
                <slds-button-icon
                    v-if="$data.$_value && !readonly && !disabled"
                    icon="utility:clear"
                    class="slds-input__icon slds-input__icon_right"
                    title="Clear"
                    tabindex="-1"
                    @click.prevent="onClickClear"
                />
            </transition>

        </div>

        <!-- Post fixed text -->
        <span v-if="addonPost" ref="addonPost" class="slds-form-element__addon">
            {{ addonPost }}
        </span>

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
import SldsFormElement from '@/components/slds-form-element/form-element'
import SldsButtonIcon from '@/components/slds-button-icon/button-icon'
import SldsSpinner from '@/components/slds-spinner/spinner'
import SldsSvg from "@/components/slds-svg/svg"

export default {
    name: "SldsInput",

    components: {
        SldsButtonIcon,
        SldsFormElement,
        SldsSpinner,
        SldsSvg
    },

    inheritAttrs: false,

    props: {
        addonPost: String,
        addonPre: String,
        borderless: Boolean,
        disabled: Boolean,
        error: Boolean,
        icon: String,
        iconError: Boolean,
        iconLight: Boolean,
        iconSuccess: Boolean,
        iconWarning: Boolean,
        label: String,
        loading: Boolean,
        readonly: Boolean,
        required: Boolean,
        value: {}
    },

    data() {
        return {
            $_rightGroupStyle: {right: '0px'},
            $_value: this.value
        }
    },

    computed: {
        controlClass() {
            const classNames = ['slds-input-has-icon']

            if (this.icon) classNames.push('slds-input-has-icon_left-right')
            else classNames.push('slds-input-has-icon_right')

            if (this.addonPre || this.addonPost) classNames.push('slds-input-has-fixed-addon')

            return classNames
        },

        iconClass() {
            const classNames = []

            if (this.error || this.iconError) classNames.push('slds-icon-text-error')
            else if (this.iconLight) classNames.push('slds-icon-text-light')
            else if (this.iconSuccess) classNames.push('slds-icon-text-success')
            else if (this.iconWarning) classNames.push('slds-icon-text-warning')
            else classNames.push('slds-icon-text-default')

            return classNames
        },

        listeners() {
            const listeners = {...this.$listeners}
            delete listeners.input
            return listeners
        },

        spinnerRight() {
            if (this.$data.$_value) return '1.5rem';
            return '.2rem';
        },

        transitionName() {
            const isAnimated = (this.$vuetning && this.$vuetning.hasAnimations)
            return isAnimated ? 'fade' : ''
        },
    },

    watch: {
        async addonPost() {
            await this.$nextTick();

            const addonPost = this.$refs.addonPost;

            if (this.addonPost == null || addonPost == null) {
                this.$data.$_rightGroupStyle.right = '0px';
                return;
            }

            this.$data.$_rightGroupStyle.right = `${addonPost.offsetWidth + 16}px`;
        },

        value(value) {
            this.$data.$_value = value
        }
    },

    mounted() {
        if (this.addonPost == null) return;
        const addonPost = this.$refs.addonPost;
        this.$data.$_rightGroupStyle.style = `${addonPost.offsetWidth + 16}px`;
    },

    methods: {
        onInput(event) {
            this.$emit('input', event.target.value)
        },

        onClear() {
            this.$refs.input.value = null
            this.$emit('input', null)
        },

        onClickClear() {
            this.$data.$_value = null;
            this.$emit('input', this.$data.$_value)
        },

        onKeyUp(event) {
            if (this.readonly || event.key !== 'Escape') return

            event.stopPropagation()
            this.onClear()
        },
    }
}
</script>

<style scoped lang="scss">
@import '../../directives/animated/animations';

$colors: (
    'error': #c23934,
    'light': #b0adab,
    'success': #027e46,
    'warning': #ffb75d,
);

@each $name, $color in $colors {
    .slds-icon-text-#{$name} {
        fill: $color !important;
    }
}
</style>
