<!--
    @Description: Buttons are clickable items used to perform an action.
    @Documentation: https://www.lightningdesignsystem.com/components/buttons/
-->

<template>
    <button class="slds-button"
            :class="['slds-button_' + variant, {'slds-not-clickable': showSpinner}]"
            v-bind="disabledAttribute"
            @click="$emit('click')">

        <!-- Text for right icon -->
        <span v-if="iconPosition === 'right'" :class="{'slds-hidden': showSpinner}">
            {{ text }}
        </span>

        <!-- Icon -->
        <slds-svg v-if="hasIcon"
                  :icon-name="`${iconCategory}:${iconName}`"
                  class="slds-button__icon"
                  :class="['slds-button__icon_' + iconPosition, {'slds-hidden': showSpinner}]"/>

        <!-- Text for left icon -->
        <span v-if="iconPosition === 'left'" :class="{'slds-hidden': showSpinner}">
            {{ text }}
        </span>

        <!-- Spinner -->
        <div v-if="showSpinner">
            <div class="slds-spinner slds-spinner_x-small" :class="['slds-spinner-variant_' + variant]">
                <div class="slds-spinner__dot-a"></div>
                <div class="slds-spinner__dot-b"></div>
            </div>
        </div>

    </button>
</template>

<script>
    export default {
        name: 'Button',
        props: {
            text: {
                type: String,
                default: '',
                note: 'Button text'
            },
            variant: {
                type: String,
                default: 'neutral',
                note: 'Button variant. Check the validator for available options.',
                validator(value) {
                    return [
                        'bare',
                        'neutral',
                        'brand',
                        'outline-brand',
                        'destructive',
                        'text-destructive',
                        'success',
                    ].indexOf(value) !== -1
                }
            },
            disabled: {
                type: Boolean,
                default: false,
                note: 'Use a disabled attribute when a button can’t be clicked.'
            },
            showSpinner: {
                type: Boolean,
                default: false,
                note: 'Set the spinner as visible and hide the button text and icon.'
            },
            iconCategory: {
                type: String,
                default: null,
                note: 'Button icon category.'
            },
            iconName: {
                type: String,
                default: null,
                note: 'Button icon name.'
            },
            iconPosition: {
                type: String,
                default: 'left',
                note: 'Button icon position. Check the validator for available options.',
                validator(value) {
                    return [
                        'left',
                        'right',
                    ].indexOf(value) !== -1
                }
            }
        },
        computed: {
            disabledAttribute() {
                return this.disabled ? {['disabled']: 'disabled'} : {};
            },
            hasIcon() {
                return (this.iconCategory != null && this.iconName != null)
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