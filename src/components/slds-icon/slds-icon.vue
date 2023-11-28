<template>
    <span :class="iconContainerClassNames" :title="title">

        <!-- Icon -->
        <slds-svg
            :class="iconClassNames"
            :icon="iconName"
            :standard-format="standardFormat"
            aria-hidden="true"
        />

        <!-- Assistive text -->
        <span v-if="assistiveText" class="slds-assistive-text">
            {{ assistiveText }}
        </span>

    </span>
</template>

<script lang="ts">
import SldsSvg from "../slds-svg/slds-svg.vue"
import { IconUtils } from "../../utils"
import { defineComponent } from "vue"

export default defineComponent({
    name: "SldsIcon",

    components: {
        SldsSvg,
    },

    props: {
        /**
         * The alternative text used to describe the icon.
         * This text should describe what happens when you click the button, for example 'Upload File', not what the
         * icon looks like, 'Paperclip'.
         */
        alternativeText: String,

        /**
         * The alternative text used to describe the icon.
         * This text should describe what happens when you click the button,
         * for example 'Upload File', not what the icon looks like, 'Paperclip'.
         */
        assistiveText: String,

        /**
         * Indicates whether the icon has the brand variant.
         */
        brand: Boolean,

        /**
         * Indicates whether to change the fill of an icon to match the current color of its parent
         */
        currentColor: Boolean,

        /**
         * Indicates whether the icon has the error theme.
         */
        error: Boolean,

        /**
         * The class names to be passed to the icon.
         */
        iconClass: [String, Array],

        /**
         * The Lightning Design System name of the icon.
         * Names are written in the format 'utility:down' where 'utility' is the category, and 'down' is the specific icon to be displayed.
         */
        iconName: { type: String, required: true },

        /**
         * Indicates whether the icon has the inverse theme.
         */
        inverse: Boolean,

        /**
         * Indicates whether the icon uses the large size.
         */
        large: Boolean,

        /**
         * Indicates whether the icon has the light theme.
         */
        light: Boolean,

        /**
         * Indicates whether the icon uses the medium size.
         * If no other size is set, this one will be used by default.
         */
        medium: Boolean,

        /**
         * Indicates whether the icon uses the small size.
         */
        small: Boolean,

        /**
         * Indicates whether the icon uses the standard icon format.
         */
        standardFormat: Boolean,

        /**
         * Indicates whether the icon has the success theme.
         */
        success: Boolean,

        /**
         * Indicates whether the icon uses the xSmall size.
         */
        xSmall: Boolean,

        /**
         * Indicates whether the icon uses the xxSmall size.
         */
        xxSmall: Boolean,

        /**
         * The icon title.
         */
        title: String,

        /**
         * Indicates whether the icon has the warning theme.
         */
        warning: Boolean,
    },

    data() {
        return {
            /**
             * Parsed background class.
             */
            backgroundClass: null as string | null,

            /**
             * Icon category.
             */
            category: null as string | null,

            /**
             * Icon name.
             */
            name: null as string | null,
        }
    },

    computed: {
        /**
         * The CSS class names for the icon container element.
         */
        iconContainerClassNames(): string {
            let classNames = `slds-icon_container ${this.backgroundClass}`

            if (this.currentColor) classNames += " slds-current-color"

            return classNames
        },

        /**
         * The CSS class names for the icon element.
         */
        iconClassNames(): string {
            let classNames = `slds-icon ${this.iconClass || ""}`

            // Size
            if (this.xxSmall) classNames += " slds-icon_xx-small"
            else if (this.xSmall) classNames += " slds-icon_x-small"
            else if (this.small) classNames += " slds-icon_small"
            else if (this.medium) classNames += " slds-icon_medium"
            else if (this.large) classNames += " slds-icon_large"
            classNames += " slds-icon_medium"

            // Variant
            if (IconUtils.isValidName(this.iconName) && IconUtils.getCategory(this.iconName) === "utility") {
                if (this.brand) classNames += " slds-icon-text-brand"
                else if (this.error) classNames += " slds-icon-text-error"
                else if (this.inverse || this.standardFormat) classNames += " slds-icon-text-inverse"
                else if (this.light) classNames += " slds-icon-text-light"
                else if (this.success) classNames += " slds-icon-text-success"
                else if (this.warning) classNames += " slds-icon-text-warning"
                else if (this.currentColor) classNames += " "
                else classNames += " slds-icon-text-default"
            }

            return classNames
        },
    },

    watch: {
        iconName(newIconName): void {
            this.parseBackground(newIconName)
        },
    },

    mounted() {
        this.parseBackground(this.iconName)
    },

    methods: {
        /**
         * Parses the background class from the icon name.
         * @param iconName The icon name.
         */
        parseBackground(iconName: string): void {
            let classNames = this.$el.classList
            if (classNames == null) classNames = []

            // Remove old background class if it exists
            if (this.backgroundClass) classNames.remove(this.backgroundClass)

            // If some custom background class was defined use it
            for (const className of classNames) {
                if (className.startsWith("slds-icon-")) return
            }

            // Otherwise compute the default background class for the icon
            if (this.iconName == null) return
            this.backgroundClass = IconUtils.computeBackgroundClass(iconName)
        },
    },
})
</script>

<style scoped lang="scss">
.slds-icon-text-brand {
    fill: #1589EE;
}
</style>
