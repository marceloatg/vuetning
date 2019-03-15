<template>
    <button
        type="button"
        class="slds-button"
        :class="['slds-button_' + variant, {'slds-not-clickable': spinnerActive}]"
        v-bind="disabledAttribute"
        @click.stop="onClick">

        <!-- Text for right icon -->
        <span v-if="iconPosition === 'right'" :class="{'slds-hidden': spinnerActive}">
            {{ label }}
        </span>

        <!-- Icon -->
        <slds-svg
            v-if="hasIcon"
            :icon-name="iconName"
            class="slds-button__icon"
            :class="['slds-button__icon_' + iconPosition, {'slds-hidden': spinnerActive}]"/>

        <!-- Text for left icon -->
        <span v-if="iconPosition === 'left'" :class="{'slds-hidden': spinnerActive}">
            {{ label }}
        </span>

        <!-- Spinner -->
        <div v-if="spinnerActive">
            <div class="slds-spinner slds-spinner_x-small" :class="['slds-spinner-variant_' + variant]">
                <div class="slds-spinner__dot-a"/>
                <div class="slds-spinner__dot-b"/>
            </div>
        </div>

    </button>
</template>

<script>
    export default {
        props: {
            disabled: {
                type: Boolean,
                default: false,
            },
            iconName: {
                type: String,
            },
            iconPosition: {
                type: String,
                default: 'left',
                validator(value) {
                    return [
                        'left',
                        'right',
                    ].indexOf(value) !== -1
                },
            },
            label: {
                type: String,
            },
            spinnerActive: {
                type: Boolean,
                default: false,
            },
            variant: {
                type: String,
                default: 'neutral',
                validator(value) {
                    return [
                        'bare',
                        'neutral',
                        'brand',
                        'outline-brand',
                        'destructive',
                        'label-destructive',
                        'inverse',
                        'success',
                    ].indexOf(value) !== -1
                },
            },
        },
        computed: {
            disabledAttribute() {
                return this.disabled ? {['disabled']: 'disabled'} : {};
            },
            hasIcon() {
                return (this.iconName != null)
            },
        },
        methods: {
            onClick() {
                if (this.spinnerActive || this.disabled) return;
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

        .slds-spinner-variant_brand,
        .slds-spinner-variant_destructive,
        .slds-spinner-variant_success {
            &.slds-spinner:before,
            &.slds-spinner:after,
            & .slds-spinner__dot-a:before,
            & .slds-spinner__dot-b:before,
            & .slds-spinner__dot-a:after,
            & .slds-spinner__dot-b:after {
                background-color: #fff;
            }
        }

        .slds-spinner-variant_outline-brand {
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
