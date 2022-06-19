<template>
    <slds-form-element
        :label="label"
        :required="required"
        :read-only="readonly"
        :error="error"
        :borderless="borderless"
        :control-class="controlClass"
        :tooltip="tooltip"
        v-bind="dataAttributes"
    >
        <!-- Tooltip -->
        <template v-if="$slots.tooltip" #tooltip>
            <slot name="tooltip"/>
        </template>

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
            v-bind="attributes"
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
import SldsFormElement from '@/components/slds-form-element/slds-form-element'
import SldsButtonIcon from '@/components/slds-button-icon/slds-button-icon'
import SldsSpinner from '@/components/slds-spinner/slds-spinner'
import SldsSvg from '@/components/slds-svg/slds-svg'

export default {
    name: 'SldsInput',

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
        maxlength: [Number, String],
        placeholder: String,
        readonly: Boolean,
        required: Boolean,
        tooltip: String,
        type: {type: String, default: 'text'},
        value: {}
    },

    data() {
        return {
            $_rightGroupStyle: {right: '0px'},
            $_value: this.value
        }
    },

    computed: {
        attributes() {
            const attributes = {
                ...this.$attrs,
                maxlength: this.maxlength,
                placeholder: this.placeholder,
                type: this.type,
            }

            for (const attributesKey in attributes) {
                if (attributesKey.startsWith('data-')) {
                    delete attributes[attributesKey]
                }
            }

            return attributes
        },

        controlClass() {
            const classNames = ['slds-input-has-icon']

            if (this.icon) classNames.push('slds-input-has-icon_left-right')
            else classNames.push('slds-input-has-icon_right')

            if (this.addonPre || this.addonPost) classNames.push('slds-input-has-fixed-addon')

            return classNames
        },

        dataAttributes() {
            const attributes = {...this.$attrs}

            for (const attributesKey in attributes) {
                if (!attributesKey.startsWith('data-')) {
                    delete attributes[attributesKey]
                }
            }

            return attributes
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
            if (this.$data.$_value) return '1.5rem'
            return '.2rem'
        },

        transitionName() {
            const isAnimated = (this.$vuetning && this.$vuetning.hasAnimations)
            return isAnimated ? 'fade' : ''
        },
    },

    watch: {
        async addonPost() {
            await this.$nextTick()

            const addonPost = this.$refs.addonPost

            if (this.addonPost == null || addonPost == null) {
                this.$data.$_rightGroupStyle.right = '0px'
                return
            }

            this.$data.$_rightGroupStyle.right = `${addonPost.offsetWidth + 16}px`
        },

        value(value) {
            this.$data.$_value = value
        }
    },

    mounted() {
        if (this.addonPost == null) return
        const addonPost = this.$refs.addonPost
        this.$data.$_rightGroupStyle.style = `${addonPost.offsetWidth + 16}px`
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
            this.$emit('input', null)
        },

        onKeyUp(event) {
            if (this.readonly || !(event.key === 'Enter' || event.key === 'Escape')) return

            event.stopPropagation()
            if (event.key === 'Escape') this.onClear()
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
