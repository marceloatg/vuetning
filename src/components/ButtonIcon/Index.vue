<!--
    @Description: Button icons provide the user with visual iconography that is typically used to invoke an event or action.
    @Documentation: https://www.lightningdesignsystem.com/components/button-icons/
-->

<template>
    <button
        type="button"
        class="slds-button slds-button_icon"
        :class="['slds-button_icon-' + variant, containerType, containerSize, {'slds-button_icon-container-more': hasDropdown}]"
        v-bind="disabledAttribute"
        @click="onClick"
        @blur="onBlur"
        @keyup="onKeyUp">

        <!-- Button icon -->
        <slds-svg :icon-name="iconName" class="slds-button__icon" :class="[iconSize, iconClass]"/>

        <!-- Dropdown icon -->
        <slds-svg v-if="hasDropdown" icon-name="utility:down" class="slds-button__icon slds-button__icon_x-small"/>

    </button>
</template>

<script>
    import SldsSvg from '../../shared/Svg'

    export default {
        components: {
            SldsSvg,
        },
        props: {
            iconName: {
                type: String,
                required: true,
                note:
                    'The Lightning Design System name of the icon. ' +
                    'Names are written in the format "utility:down" where "utility" is the category, and "down" is the specific icon to be displayed.'
            },
            iconClass: {
                type: String,
                required: false,
                note: 'The class to be applied to the contained icon element.'
            },
            size: {
                type: String,
                default: 'medium',
                note:
                    'The size of the buttonIcon. ' +
                    'For the bare variant, options include x-small, small, medium, and large. ' +
                    'For non-bare variants, options include xx-small, x-small, small, and medium. ' +
                    'This value defaults to medium.',
                validator(value) {
                    return [
                        'xx-small',
                        'x-small',
                        'small',
                        'medium',
                        'large',
                    ].indexOf(value) !== -1
                }
            },
            container: {
                type: String,
                default: 'bordered-filled',
                note:
                    'The container variant of the buttonIcon. ' +
                    'Icon containers create a button that looks like a plain icon. ' +
                    'Check the validator for available options.',
                validator(value) {
                    return [
                        'none',
                        'bare',
                        'bordered',
                        'bordered-filled',
                        'bordered-inverse',
                    ].indexOf(value) !== -1
                }
            },
            variant: {
                type: String,
                default: 'default',
                note:
                    'The variant changes the appearance of buttonIcon. ' +
                    'Accepted variants include bare, container, brand, border, border-filled, bare-inverse, and border-inverse. ' +
                    'This value defaults to border.',
                validator(value) {
                    return [
                        'default',
                        'brand',
                        'inverse',
                        'error',
                    ].indexOf(value) !== -1
                }
            },
            hasDropdown: {
                type: Boolean,
                default: false,
                note: 'Indicates if the button opens a menu. Cannot be used with size property.'
            },
            disabled: {
                type: Boolean,
                default: false,
                note: 'Use a disabled attribute when a button can’t be clicked.'
            },
        },
        computed: {
            containerType() {
                switch (this.container) {

                    case 'bare':
                        return 'slds-button_icon-container';

                    case 'bordered':
                        return 'slds-button_icon-border';

                    case 'bordered-filled':
                        return 'slds-button_icon-border-filled';

                    case 'bordered-inverse':
                        return 'slds-button_icon-border-inverse';

                    default:
                        return '';
                }
            },
            disabledAttribute() {
                return this.disabled ? {['disabled']: 'disabled'} : {};
            },
            iconSize() {
                return (this.container === 'none' && this.size !== 'xx-small' && !this.hasDropdown)
                    ? `slds-button__icon_${this.size}`
                    : '';
            },
            containerSize() {
                return (this.container !== 'none' && this.size !== 'medium' && !this.hasDropdown)
                    ? `slds-button_icon-${this.size}`
                    : '';
            }
        },
        methods: {
            onClick(event) {
                this.$emit('click', event);
            },
            onBlur(event) {
                this.$emit('blur', event);
            },
            onKeyUp(event) {
                this.$emit('keyup', event);
            },
        },
    }
</script>

<style scoped lang="scss">

    .slds-button_icon {

        &:active {
            animation: click-effect 120ms cubic-bezier(1, 1.9, 0.94, 0.98);
        }
    }

    @keyframes click-effect {

        25% {
            transform: scale(0.94, 0.94);
        }

        100% {
            transform: scale(0.98, 0.98);
        }
    }

</style>
