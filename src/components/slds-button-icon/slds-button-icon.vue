<template>
    <button
        v-animated
        class="slds-button slds-button_icon"
        :class="[variantClass, containerClass]"
        :title="title"
        :type="type"
        @click="onClick"
        @blur="onBlur"
        @keyup="onKeyUp"
        v-on="listeners"
    >

        <!-- Button icon -->
        <slds-svg
            :icon="icon"
            class="slds-button__icon"
            :class="[iconClass, iconSizeClass]"
        />

        <!-- Dropdown icon -->
        <slds-svg
            v-if="hasDropdown"
            icon="utility:down"
            class="slds-button__icon slds-button__icon_x-small"
        />

        <!-- Assistive text -->
        <span v-if="assistiveText" class="slds-assistive-text">
            {{ assistiveText }}
        </span>

    </button>
</template>

<script>
import SldsSvg from '../slds-svg/slds-svg.vue'
import AnimatedDirective from '../../directives/animated/index'

export default {
    name: 'SldsButtonIcon',

    components: {
        SldsSvg
    },

    directives: {
        animated: AnimatedDirective
    },

    props: {
        assistiveText: String,
        bare: Boolean,
        bordered: Boolean,
        borderedFilled: Boolean,
        borderedInverse: Boolean,
        brand: Boolean,
        error: Boolean,
        hasDropdown: Boolean,
        icon: {type: String, required: true},
        iconClass: String,
        inverse: Boolean,
        large: Boolean,
        small: Boolean,
        title: String,
        type: {type: String, default: 'button'},
        xSmall: Boolean,
        xxSmall: Boolean
    },

    computed: {
        containerClass() {
            let classNames = ''

            // Container type
            if (this.bare) classNames += ' slds-button_icon-container'
            else if (this.bordered) classNames += ' slds-button_icon-border'
            else if (this.borderedFilled) classNames += ' slds-button_icon-border-filled'
            else if (this.borderedInverse) classNames += ' slds-button_icon-border-inverse'

            // Container size
            if (this.xxSmall) classNames += ' slds-button_icon-xx-small'
            else if (this.xSmall) classNames += ' slds-button_icon-x-small'
            else if (this.small) classNames += ' slds-button_icon-small'

            // Container overflow
            if (this.hasDropdown) classNames += ' slds-button_icon-container-more'

            return classNames
        },

        iconSizeClass() {
            if (this.hasDropdown) return ''
            if (this.bare || this.bordered || this.borderedFilled || this.borderedInverse) return ''
            if (this.xSmall) return 'slds-button__icon_x-small'
            if (this.small) return 'slds-button__icon_small'
            if (this.large) return 'slds-button__icon_large'
            return ''
        },

        listeners() {
            const listeners = {...this.$listeners}
            delete listeners.click
            return listeners
        },

        variantClass() {
            if (this.brand) return 'slds-button_icon-brand'
            if (this.inverse) return 'slds-button_icon-inverse'
            if (this.error) return 'slds-button_icon-error'
            return ''
        },
    },

    methods: {
        onClick(event) {
            this.$emit('click', event)
        },

        onBlur(event) {
            this.$emit('blur', event)
        },

        onKeyUp(event) {
            this.$emit('keyup', event)
        },
    },
}
</script>

<style scoped lang="scss">
@import '../../directives/animated/animations';
</style>
