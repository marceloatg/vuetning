<template>
    <div :class="textClassNames">
        <slot/>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
    name: "SldsText",

    props: {
        /**
         * Indicates whether the text is center aligned.
         */
        alignCenter: Boolean,

        /**
         * Indicates whether the text is left aligned.
         */
        alignLeft: Boolean,

        /**
         * Indicates whether the text is right aligned.
         */
        alignRight: Boolean,

        /**
         * Indicates whether the text has the default color.
         */
        default: Boolean,

        /**
         * Indicates whether the text has the destructive color.
         */
        destructive: Boolean,

        /**
         * Indicates whether the text has the error color.
         */
        error: Boolean,

        /**
         * Indicates whether the text has the heading large size.
         */
        headingLarge: Boolean,

        /**
         * Indicates whether the text has the heading medium size.
         */
        headingMedium: Boolean,

        /**
         * Indicates whether the text has the heading small size.
         */
        headingSmall: Boolean,

        /**
         * Indicates whether the text has the inverse color.
         */
        inverse: Boolean,

        /**
         * Indicates whether the text has the inverse weak color.
         */
        inverseWeak: Boolean,

        /**
         * Indicates whether the text has the longform format.
         */
        longForm: Boolean,

        /**
         * Indicates whether the text uses the monospaced font.
         */
        monospace: Boolean,

        /**
         * Indicates whether the text has the body regular size.
         */
        regular: Boolean,

        /**
         * Indicates whether the text has the body small size.
         */
        small: Boolean,

        /**
         * Indicates whether the text has the success color.
         */
        success: Boolean,

        /**
         * Indicates whether the text has the title size.
         */
        title: Boolean,

        /**
         * Indicates whether the text has the title uppercase size.
         */
        titleUppercase: Boolean,

        /**
         * Indicates whether the text has the weak color.
         */
        weak: Boolean,
    },

    computed: {
        /**
         * The CSS class names for the text.
         */
        textClassNames(): string {
            let classNames = ""

            // Text body
            if (this.small) classNames += " slds-text-body_small"
            else if (this.regular) classNames += " slds-text-body_regular"

            // Text heading
            if (this.headingLarge) classNames += " slds-text-heading_large"
            else if (this.headingMedium) classNames += " slds-text-heading_medium"
            else if (this.headingSmall) classNames += " slds-text-heading_small"

            // Text title
            if (this.title) classNames += " slds-text-title"
            else if (this.titleUppercase) classNames += " slds-text-title_caps"

            // Text long form
            if (this.longForm) classNames += " slds-text-longform"

            // Text alignment
            if (this.alignLeft) classNames += " slds-text-align_left"
            else if (this.alignRight) classNames += " slds-text-align_right"
            else if (this.alignCenter) classNames += " slds-text-align_center"

            // Text color
            if (this.default) classNames += " slds-text-color_default"
            else if (this.success) classNames += " slds-text-color_success"
            else if (this.weak) classNames += " slds-text-color_weak"
            else if (this.error) classNames += " slds-text-color_error"
            else if (this.destructive) classNames += " slds-text-color_destructive"
            else if (this.inverse) classNames += " slds-text-color_inverse"
            else if (this.inverseWeak) classNames += " slds-text-color_inverse-weak"

            // Text monospace
            if (this.monospace) classNames += " slds-text-font_monospace"

            return classNames
        },
    },
})
</script>
