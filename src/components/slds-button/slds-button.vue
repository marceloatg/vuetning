<template>
    <button
        v-animated
        class="slds-button"
        :class="buttonClass"
        :disabled="disabled"
        :title="title"
        :type="type"
        v-on="listeners"
        @click="onClick"
    >

        <!-- Content -->
        <slot>

            <!-- Label for right icon -->
            <span v-if="$data.$_right" :class="{'slds-hidden': loading}">
                {{ label || '&nbsp;' }}
            </span>

            <!-- Icon -->
            <slds-svg
                v-if="icon"
                :icon="icon"
                class="slds-button__icon"
                :class="iconClass"
            />

            <!-- Label for left icon -->
            <span v-if="$data.$_left" :class="labelClass">
                {{ label }}
            </span>

        </slot>

        <!-- Spinner -->
        <div v-if="loading">
            <div class="slds-spinner slds-spinner_x-small" :class="spinnerClass">
                <div class="slds-spinner__dot-a"/>
                <div class="slds-spinner__dot-b"/>
            </div>
        </div>

    </button>
</template>

<script>
import SldsSvg from '../slds-svg/slds-svg.vue'
import AnimatedDirective from '@/directives/animated/index'
import IconPositionMixin from '@/mixins/icon-position-mixin'

export default {
    name: 'SldsButton',

    components: {
        SldsSvg,
    },

    directives: {
        animated: AnimatedDirective
    },

    mixins: [
        IconPositionMixin
    ],

    props: {
        brand: Boolean,
        destructive: Boolean,
        disabled: Boolean,
        icon: String,
        inverse: Boolean,
        label: String,
        loading: Boolean,
        neutral: Boolean,
        outlineBrand: Boolean,
        success: Boolean,
        stretch: Boolean,
        textDestructive: Boolean,
        title: String,
        type: {type: String, default: 'button'},
    },

    computed: {
        buttonClass() {
            return {
                'slds-button_neutral': this.neutral,
                'slds-button_brand': this.brand,
                'slds-button_outline-brand': this.outlineBrand,
                'slds-button_destructive': this.destructive,
                'slds-button_text-destructive': this.textDestructive,
                'slds-button_success': this.success,
                'slds-button_inverse': this.inverse,
                'slds-button_stretch': this.stretch,
                'slds-not-clickable': this.loading,
            }
        },

        iconClass() {
            return {
                'slds-hidden': this.loading,
                'slds-button__icon_right': this.icon && this.$data.$_right,
                'slds-button__icon_left': this.icon && this.$data.$_left,
            }
        },

        labelClass() {
            return {
                'slds-hidden': this.loading
            }
        },

        listeners() {
            const listeners = {...this.$listeners}
            delete listeners.click
            return listeners
        },

        spinnerClass() {
            return {
                'slds-spinner-white': this.loading && (this.brand || this.destructive || this.success),
                'slds-spinner-brand': this.loading && this.outlineBrand,
            }
        },
    },

    methods: {
        onClick() {
            if (this.loading) return
            this.$emit('click')
        }
    }
}
</script>

<style scoped lang="scss">
@import '../../directives/animated/animations';

.slds-button {
    &.slds-not-clickable {
        pointer-events: none;
    }

    .slds-spinner-white {
        &.slds-spinner:before,
        &.slds-spinner:after,
        & .slds-spinner__dot-a:before,
        & .slds-spinner__dot-b:before,
        & .slds-spinner__dot-a:after,
        & .slds-spinner__dot-b:after {
            background-color: #fff;
        }
    }

    .slds-spinner-brand {
        &.slds-spinner:before,
        &.slds-spinner:after,
        & .slds-spinner__dot-a:before,
        & .slds-spinner__dot-b:before,
        & .slds-spinner__dot-a:after,
        & .slds-spinner__dot-b:after {
            background-color: #1589ee;
        }
    }
}

</style>
