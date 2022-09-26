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
            <span v-if="hasRightPositionedIcon" :class="{'slds-hidden': loading}">
                {{ label }}
            </span>

            <!-- Icon -->
            <slds-svg
                v-if="icon"
                class="slds-button__icon"
                :class="iconClass"
                :icon="icon"
            />

            <template v-else>
                {{ label }}
            </template>

            <!-- Label for left icon -->
            <span v-if="hasLeftPositionedIcon" :class="labelClass">
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

<!--suppress JSValidateTypes -->
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
        /**
         * Indicates whether this button has the brand theme.
         * @type {boolean}
         */
        brand: Boolean,

        /**
         * Indicates whether this button has the destructive theme.
         * @type {boolean}
         */
        destructive: Boolean,

        /**
         * Indicates whether this button is disabled.
         * @type {boolean}
         */
        disabled: Boolean,

        /**
         * Indicates whether this button has the inverse theme.
         * @type {boolean}
         */
        inverse: Boolean,

        /**
         * Button label.
         * @type {string}
         */
        label: String,

        /**
         * Indicates whether this button is loading.
         * @type {boolean}
         */
        loading: Boolean,

        /**
         * Indicates whether this button has the neutral theme.
         * @type {boolean}
         */
        neutral: Boolean,

        /**
         * Indicates whether this button has the outline brand theme.
         * @type {boolean}
         */
        outlineBrand: Boolean,

        /**
         * Indicates whether this button has the success theme.
         * @type {boolean}
         */
        success: Boolean,

        /**
         * Indicates whether this button should stretch.
         * @type {boolean}
         */
        stretch: Boolean,

        /**
         * Indicates whether this button has the text destructive theme.
         * @type {boolean}
         */
        textDestructive: Boolean,

        /**
         * Button title.
         * @type {string}
         */
        title: String,

        /**
         * Button type.
         * @type {string}
         */
        type: {type: String, default: 'button'},
    },

    computed: {
        /**
         * Returns the CSS class names for the button.
         * @returns {string} The CSS class names.
         */
        buttonClass() {
            let classNames = ''

            // Button theme
            if (this.neutral) classNames += ' slds-button_neutral'
            else if (this.brand) classNames += ' slds-button_brand'
            else if (this.outlineBrand) classNames += ' slds-button_outline-brand'
            else if (this.destructive) classNames += ' slds-button_destructive'
            else if (this.textDestructive) classNames += ' slds-button_text-destructive'
            else if (this.success) classNames += ' slds-button_success'
            else if (this.inverse) classNames += ' slds-button_inverse'

            // Stretch
            if (this.stretch) classNames += ' slds-button_stretch'

            // Loading
            if (this.loading) classNames += ' slds-not-clickable'

            return classNames
        },

        /**
         * Returns the CSS class names for the button icon.
         * @returns {string} The CSS class names.
         */
        iconClass() {
            let classNames = ''

            // Icon position
            if (this.hasLeftPositionedIcon) classNames += ' slds-button__icon_left'
            else if (this.hasRightPositionedIcon) classNames += ' slds-button__icon_right'

            // Loading
            if (this.loading) classNames += ' slds-hidden'

            return classNames
        },

        /**
         * Returns the CSS class names for the label.
         * @returns {string} The CSS class names.
         */
        labelClass() {
            let classNames = ''

            // Loading
            if (this.loading) classNames += ' slds-hidden'

            return classNames
        },

        /**
         * Button listeners.
         * @returns {object}
         */
        listeners() {
            const listeners = {...this.$listeners}
            delete listeners.click
            return listeners
        },

        /**
         * Returns the CSS class names for the spinner.
         * @returns {string} The CSS class names.
         */
        spinnerClass() {
            let classNames = ''

            // Spinner theme
            if (this.loading && (this.brand || this.destructive || this.success)) classNames += ' slds-spinner-white'
            else if (this.loading && this.outlineBrand) classNames += ' slds-spinner-brand'

            return classNames
        },
    },

    methods: {
        /**
         * Handles the click event on the button.
         */
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
