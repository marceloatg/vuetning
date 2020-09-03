<template>
    <button
        :type="type"
        class="slds-button"
        :class="buttonClass"
        @click="onClick"
        v-on="listeners">

        <!-- Label for right icon -->
        <span v-if="icon && right" :class="{'slds-hidden': spinner}">
            {{ label }}
        </span>

        <!-- Icon -->
        <slds-svg
            v-if="icon"
            :icon="icon"
            class="slds-button__icon"
            :class="iconClass"/>

        <!-- Label for left icon -->
        <span v-if="left && !right" :class="{'slds-hidden': spinner}">
            {{ label }}
        </span>

        <!-- Spinner -->
        <div v-if="spinner">
            <div class="slds-spinner slds-spinner_x-small" :class="spinnerClass">
                <div class="slds-spinner__dot-a"/>
                <div class="slds-spinner__dot-b"/>
            </div>
        </div>

    </button>
</template>

<script>
import SldsSvg from '../slds-svg/index.vue'

export default {
    name: 'SldsButton',
    components: {
        SldsSvg,
    },
    props: {
        brand: {
            type: Boolean,
        },
        destructive: {
            type: Boolean,
        },
        icon: {
            type: String,
        },
        inverse: {
            type: Boolean,
        },
        label: {
            type: String,
        },
        left: {
            type: Boolean,
            default: true,
        },
        neutral: {
            type: Boolean,
        },
        outlineBrand: {
            type: Boolean,
        },
        right: {
            type: Boolean,
        },
        spinner: {
            type: Boolean,
        },
        success: {
            type: Boolean,
        },
        stretch: {
            type: Boolean,
        },
        textDestructive: {
            type: Boolean,
        },
        type: {
            type: String,
            default: 'button',
        },
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
                'slds-not-clickable': this.spinner,
            }
        },
        iconClass() {
            return {
                'slds-hidden': this.spinner,
                'slds-button__icon_right': this.icon && this.right,
                'slds-button__icon_left': this.icon && this.left && !this.right,
            }
        },
        spinnerClass() {
            return {
                'slds-spinner-white': this.spinner && (this.brand || this.destructive || this.success),
                'slds-spinner-brand': this.spinner && this.outlineBrand,
            }
        },
        listeners() {
            const listeners = {...this.$listeners};
            delete listeners.click;
            return listeners
        },
    },
    methods: {
        onClick() {
            if (this.spinner) return;
            this.$emit('click');
        }
    },
}
</script>

<style scoped lang="scss">

.slds-button {
    transition: all 200ms linear;

    &:active {
        animation: click-effect 120ms cubic-bezier(1, 1.9, 0.95, 0.98);
    }

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

    &_in-table {
        padding: 0 6px;
        line-height: 1.125rem;

        .slds-spinner_x-small {
            width: 0.5rem;

            &.slds-spinner_inline {
                height: 0.5rem;
            }
        }

        .slds-spinner_x-small.slds-spinner:before,
        .slds-spinner_x-small.slds-spinner:after,
        .slds-spinner_x-small .slds-spinner__dot-a:before,
        .slds-spinner_x-small .slds-spinner__dot-b:before,
        .slds-spinner_x-small .slds-spinner__dot-a:after,
        .slds-spinner_x-small .slds-spinner__dot-b:after {
            width: 0.125rem;
            height: 0.125rem;
        }

        .slds-spinner_x-small.slds-spinner:before,
        .slds-spinner_x-small .slds-spinner__dot-a:before,
        .slds-spinner_x-small .slds-spinner__dot-b:before {
            top: -0.0625rem;
            left: -0.0625rem;
            animation-name: dotsBounceBefore-extraExtraSmall;
        }

        .slds-spinner_x-small.slds-spinner:after,
        .slds-spinner_x-small .slds-spinner__dot-a:after,
        .slds-spinner_x-small .slds-spinner__dot-b:after {
            top: -0.0625rem;
            right: -0.0625rem;
            animation-name: dotsBounceAfter-extraExtraSmall;
        }

        .slds-button__icon_left {
            margin-right: 0;
        }
    }
}

@keyframes click-effect {

    25% {
        transform: scale(0.97, 0.95);
    }

    100% {
        transform: scale(0.99, 0.98);
    }
}

</style>
