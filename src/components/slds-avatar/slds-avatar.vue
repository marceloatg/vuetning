<template>
    <span :class="avatarClass">

        <!-- Fallback icon -->
        <slds-icon v-if="showFallbackIcon" :alternative-text="alternativeText" :icon-name="fallbackIcon"/>

        <!-- Image -->
        <img
            v-else-if="src"
            :alt="alternativeText"
            :src="src"
            @error="onImageError"
        >

        <!-- Initials -->
        <abbr v-else-if="initials" :class="initialsClass">
            {{ initials }}
        </abbr>

        <!-- Fallback icon -->
        <slds-icon v-else :alternative-text="alternativeText" :icon-name="fallbackIcon"/>

    </span>
</template>

<script lang="ts">
import SldsIcon from "../slds-icon/slds-icon.vue"
import { defineComponent } from "vue"

export default defineComponent({
    name: "SldsAvatar",

    components: {
        SldsIcon,
    },

    props: {
        /**
         * The alternative text used to describe the avatar, which is displayed as hover text on the image.
         */
        alternativeText: String,

        /**
         * Indicates whether the avatar uses the circle variant.
         */
        circle: Boolean,

        /**
         * The Lightning Design System name of the icon used as a fallback when the image fails to load.
         * The initials fallback relies on this for its background color. Names are written in the format 'standard:account' where 'standard' is the category, and 'account' is the specific icon to be displayed.
         * Defaults to standard:user
         */
        fallbackIcon: { type: String, default: "standard:user" },

        /**
         * If the record name contains two words, like first and last name, use the first capitalized letter of each.
         * For records that only have a single word name, use the first two letters of that word using one capital and one lower case letter.
         */
        initials: String,

        /**
         * Indicates whether the avatar uses the inverse variant when showing initials.
         */
        inverse: Boolean,

        /**
         * Indicates whether the avatar uses the large size.
         */
        large: Boolean,

        /**
         * Indicates whether the avatar uses the medium size.
         * If no other size is set, this one will be used by default.
         */
        medium: Boolean,

        /**
         * Indicates whether the avatar uses the small size.
         */
        small: Boolean,

        /**
         * The URL for the image to display.
         */
        src: String,

        /**
         * Indicates whether the avatar uses the x-small size.
         */
        xSmall: Boolean,
    },

    data() {
        return {
            /**
             * Indicates whether the fallback icon should be displayed.
             */
            showFallbackIcon: false,
        }
    },

    computed: {
        /**
         * The CSS class names for the avatar.
         */
        avatarClass(): string {
            let classNames = "slds-avatar"

            // Avatar size
            if (this.large) classNames += " slds-avatar_large"
            else if (this.medium) classNames += " slds-avatar_medium"
            else if (this.small) classNames += " slds-avatar_small"
            else if (this.xSmall) classNames += " slds-avatar_x-small"
            else classNames += "slds-avatar_medium"

            // Avatar variant
            if (this.circle) classNames += " slds-avatar_circle"

            return classNames
        },

        /**
         * The CSS class names for the initials element.
         */
        initialsClass(): string {
            let classNames = "slds-avatar__initials"

            // Initials background color
            if (this.fallbackIcon) {
                const category = this.fallbackIcon.split(":")[0]
                const name = this.fallbackIcon.split(":")[1]
                classNames += ` slds-icon-${category}-${name}`
            }

            // Initials inverse
            if (this.inverse) classNames += " slds-avatar__initials_inverse"

            return classNames
        },
    },

    methods: {
        /**
         * Handles the image error event.
         * @param event The event.
         */
        onImageError(event: Event): void {
            this.showFallbackIcon = true
            const imageElement = event.target as HTMLImageElement
            console.warn(`<slds-avatar> Image with src="${imageElement.src}" failed to load.`)
        },
    },
})
</script>
