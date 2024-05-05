<template>
    <button
        :class="buttonClassNames"
        :disabled="disabled"
        :title="title"
        :type="type"
        @click="handleClick"
    >

        <!-- Content -->
        <slot>

            <!-- Label for right icon -->
            <span v-if="hasRightPositionedIcon" :class="labelClassNames">
                <slot>{{ label }}</slot>
            </span>

            <!-- Icon -->
            <slds-svg v-if="iconName" :class="iconClassNames" :icon="iconName"/>

            <!-- Label without icon -->
            <span v-else :class="labelClassNames">
                <slot>{{ label }}</slot>
            </span>

            <!-- Label for left icon -->
            <span v-if="hasLeftPositionedIcon" :class="labelClassNames">
                <slot>{{ label }}</slot>
            </span>

        </slot>

        <!-- Spinner -->
        <span v-if="showSpinner">
            <span :class="spinnerClassNames" data-testid="spinner">
                <span class="slds-spinner__dot-a"/>
                <span class="slds-spinner__dot-b"/>
            </span>
        </span>

    </button>
</template>

<script lang="ts">
import PositionableIconMixin from "../../mixins/positionable-icon-mixin"
import SldsSvg from "../slds-svg/slds-svg.vue"
import { defineComponent } from "vue"

export default defineComponent({
    name: "SldsButton",

    components: {
        SldsSvg,
    },

    mixins: [
        PositionableIconMixin,
    ],

    props: {
        /**
         * Indicates whether the button has the brand theme.
         */
        brand: Boolean,

        /**
         * Indicates whether the button has the destructive theme.
         */
        destructive: Boolean,

        /**
         * Indicates whether the button is disabled.
         */
        disabled: Boolean,

        /**
         * Indicates whether the button has the inverse theme.
         */
        inverse: Boolean,

        /**
         * Button label.
         * When using the default slot this prop is ignored.
         */
        label: String,

        /**
         * Indicates whether the button has the neutral theme.
         */
        neutral: Boolean,

        /**
         * Indicates whether the button has the outline brand theme.
         */
        outlineBrand: Boolean,

        /**
         * Indicates whether the button is showing its spinner.
         */
        showSpinner: Boolean,

        /**
         * Indicates whether the button should stretch.
         */
        stretch: Boolean,

        /**
         * Indicates whether the button has the success theme.
         */
        success: Boolean,

        /**
         * Indicates whether the button has the text destructive theme.
         */
        textDestructive: Boolean,

        /**
         * Button title.
         */
        title: String,

        /**
         * Button type.
         */
        type: { type: String, default: "button" },
    },

    computed: {
        /**
         * The CSS class names for the button.
         */
        buttonClassNames(): string {
            let classNames = "slds-button"

            // Button theme
            if (this.neutral) classNames += " slds-button_neutral"
            else if (this.brand) classNames += " slds-button_brand"
            else if (this.outlineBrand) classNames += " slds-button_outline-brand"
            else if (this.destructive) classNames += " slds-button_destructive"
            else if (this.textDestructive) classNames += " slds-button_text-destructive"
            else if (this.success) classNames += " slds-button_success"
            else if (this.inverse) classNames += " slds-button_inverse"

            // Disabled
            if (!this.disabled) classNames += " slds-has-animation"

            // Stretch
            if (this.stretch) classNames += " slds-button_stretch"

            // Showing spinner
            if (this.showSpinner) classNames += " slds-unclickable"

            return classNames
        },

        /**
         * The CSS class names for the button icon.
         */
        iconClassNames(): string {
            let classNames = "slds-button__icon"

            // Icon position
            if (this.hasLeftPositionedIcon) classNames += " slds-button__icon_left"
            else if (this.hasRightPositionedIcon) classNames += " slds-button__icon_right"

            // Showing spinner
            if (this.showSpinner) classNames += " slds-hidden"

            return classNames
        },

        /**
         * The CSS class names for the label.
         */
        labelClassNames(): string {
            let classNames = ""

            // Showing spinner
            if (this.showSpinner) classNames += " slds-hidden"

            return classNames
        },

        /**
         * The CSS class names for the spinner.
         */
        spinnerClassNames(): string {
            let classNames = "slds-spinner slds-spinner_x-small"

            // Spinner theme
            if (this.showSpinner && (this.brand || this.destructive || this.success)) classNames += " slds-spinner-white"
            else if (this.showSpinner && this.outlineBrand) classNames += " slds-spinner-brand"

            return classNames
        },
    },

    methods: {
        /**
         * Handles the click event on the button.
         * @param event The fired event.
         */
        handleClick(event: Event): void {
            if (this.showSpinner || this.disabled) {
                event.preventDefault()
            }
        },
    },
})
</script>

<style scoped lang="scss">

.slds-button {
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
