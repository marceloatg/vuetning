<template>
    <button
        :type="type"
        class="slds-button slds-button_icon"
        :class="[variant, container, containerSize, {'slds-button_icon-container-more': hasDropdown}]"
        @click="onClick"
        @blur="onBlur"
        @keyup="onKeyUp"
        v-on="listeners">

        <!-- Button icon -->
        <slds-svg :icon="icon" class="slds-button__icon" :class="[iconSize, iconClass]"/>

        <!-- Dropdown icon -->
        <slds-svg v-if="hasDropdown" icon="utility:down" class="slds-button__icon slds-button__icon_x-small"/>

    </button>
</template>

<script>
    import SldsSvg from '../slds-svg/index.vue'

    export default {
        name: 'SldsButtonIcon',
        components: {
            SldsSvg,
        },
        props: {
            bordered: {
                type: Boolean,
            },
            borderedFilled: {
                type: Boolean,
            },
            borderedInverse: {
                type: Boolean,
            },
            bare: {
                type: Boolean,
            },
            brand: {
                type: Boolean,
            },
            error: {
                type: Boolean,
            },
            hasDropdown: {
                type: Boolean,
            },
            icon: {
                type: String,
                required: true,
            },
            iconClass: {
                type: String,
                required: false,
            },
            inverse: {
                type: Boolean,
            },
            large: {
                type: Boolean,
            },
            small: {
                type: Boolean,
            },
            type: {
                type: String,
                default: 'button',
            },
            xSmall: {
                type: Boolean,
            },
            xxSmall: {
                type: Boolean,
            },
        },
        computed: {
            container() {
                if (this.bare) return 'slds-button_icon-container';
                if (this.bordered) return 'slds-button_icon-border';
                if (this.borderedFilled) return 'slds-button_icon-border-filled';
                if (this.borderedInverse) return 'slds-button_icon-border-inverse';
                return '';
            },
            containerSize() {
                if (this.hasDropdown) return '';
                if (!this.bare && !this.bordered && !this.borderedFilled && !this.borderedInverse) return '';
                if (this.xxSmall) return 'slds-button_icon-xx-small';
                if (this.xSmall) return 'slds-button_icon-x-small';
                if (this.small) return 'slds-button_icon-small';
                return '';
            },
            iconSize() {
                if (this.hasDropdown) return '';
                if (this.bare || this.bordered || this.borderedFilled || this.borderedInverse) return '';
                if (this.xSmall) return 'slds-button__icon_x-small';
                if (this.small) return 'slds-button__icon_small';
                if (this.large) return 'slds-button__icon_large';
                return '';
            },
            listeners() {
                const listeners = {...this.$listeners};
                delete listeners.click;
                return listeners
            },
            variant() {
                if (this.brand) return 'slds-button_icon-brand';
                if (this.inverse) return 'slds-button_icon-inverse';
                if (this.error) return 'slds-button_icon-error';
                return '';
            },
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
