<template>
    <button
        :class="buttonClassNames"
        :disabled="disabled"
        :title="title"
        :type="type"
        @click="onClick"
    >

        <!-- Button icon -->
        <slds-svg :class="iconClassNames" :icon="iconName"/>

        <!-- Dropdown icon -->
        <slds-svg
            v-if="hasDropdown && !bare"
            class="slds-button__icon slds-button__icon_x-small"
            icon="utility:down"
        />

        <!-- Assistive text -->
        <span v-if="assistiveText" class="slds-assistive-text">
            {{ assistiveText }}
        </span>

    </button>
</template>

<script lang="ts">
import SldsSvg from "../slds-svg/slds-svg.vue"
import { defineComponent } from "vue"

export default defineComponent({
    name: "SldsButtonIcon",

    components: {
        SldsSvg,
    },

    props: {
        /**
         * Icon assistive text.
         */
        assistiveText: String,

        bare: Boolean,

        bordered: Boolean,

        borderedFilled: Boolean,

        borderedInverse: Boolean,

        /**
         * Indicates whether the button has the brand theme.
         */
        brand: Boolean,

        /**
         * Indicates whether the button is disabled.
         */
        disabled: Boolean,

        error: Boolean,

        hasDropdown: Boolean,

        iconClass: String,

        /**
         * The Lightning Design System name of the icon.
         * Names are written in the format 'utility:down' where 'utility' is the category, and 'down' is the specific icon to be displayed.
         */
        iconName: { type: String, required: true },

        inverse: Boolean,

        large: Boolean,

        small: Boolean,

        title: String,

        /**
         * Button type.
         */
        type: { type: String, default: "button" },

        xSmall: Boolean,

        xxSmall: Boolean,
    },

    computed: {
        /**
         * The CSS class names for the button.
         */
        buttonClassNames(): string {
            let classNames = "slds-button slds-button_icon"

            // Disabled
            if (!this.disabled) classNames += " slds-has-animation"

            // Button theme
            if (this.brand) classNames += " slds-button_icon-brand"
            else if (this.inverse) classNames += " slds-button_icon-inverse"
            else if (this.error) classNames += " slds-button_icon-error"

            // Container type
            if (this.bordered) classNames += " slds-button_icon-border"
            else if (this.borderedFilled) classNames += " slds-button_icon-border-filled"
            else if (this.borderedInverse) classNames += " slds-button_icon-border-inverse"
            else if (!this.bare) classNames += " slds-button_icon-container"

            // Size
            if (!this.bare) {
                if (this.xxSmall) classNames += " slds-button_icon-xx-small"
                else if (this.xSmall) classNames += " slds-button_icon-x-small"
                else if (this.small) classNames += " slds-button_icon-small"
                else if (this.large) classNames += " slds-button_icon-large"
            }

            // Overflow
            if (this.hasDropdown && !this.bare) classNames += " slds-button_icon-container-more"

            return classNames
        },

        /**
         * The CSS class names for the icon element.
         */
        iconClassNames(): string {
            let classNames = `slds-button__icon ${this.iconClass || ""}`

            // Size
            if (this.bare) {
                if (this.xSmall) classNames += " slds-button__icon_x-small"
                if (this.small) classNames += " slds-button__icon_small"
                if (this.large) classNames += " slds-button__icon_large"
            }

            return classNames
        },
    },

    methods: {
        /**
         * Handles the click event on the button.
         * @param event The fired event.
         */
        onClick(event: Event): void {
            if (this.disabled) {
                event.preventDefault()
            }
        },
    },
})
</script>
