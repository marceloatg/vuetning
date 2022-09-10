<template>
    <span class="slds-avatar" :class="avatarClass">

        <!-- Image -->
        <img
            v-if="src"
            :src="src"
            :alt="alternativeText"
            @error="onImageError"
        >

        <!-- Initials -->
        <abbr
            v-else-if="initials"
            class="slds-avatar__initials"
            :class="initialsClass">
            {{ initials }}
        </abbr>

        <!-- Fallback icon -->
        <slds-icon
            v-else
            :icon="fallbackIcon"
            :alternative-text="alternativeText"
        />

    </span>
</template>

<!--suppress JSValidateTypes -->
<script>
import SldsIcon from '../slds-icon/slds-icon.vue'

export default {
    name: 'SldsAvatar',

    components: {
        SldsIcon
    },

    props: {
        /**
         * Alternative text to describe the avatar.
         * @type {string}
         */
        alternativeText: String,

        /**
         * Indicates whether the avatar uses the circle variant.
         * @type {boolean}
         */
        circle: Boolean,

        /**
         * The Lightning Design System name of the icon used as a fallback when the image fails to load.
         * The initials fallback relies on this for its background color. Names are written in the format 'standard:account' where 'standard' is the category, and 'account' is the specific icon to be displayed.
         * Faults to standard:user
         * @type {string}
         */
        fallbackIcon: {
            type: String,
            default: 'standard:user',
        },

        /**
         * If the record name contains two words, like first and last name, use the first capitalized letter of each.
         * For records that only have a single word name, use the first two letters of that word using one capital and one lower case letter.
         * @type {string}
         */
        initials: String,

        /**
         * Indicates whether the avatar uses the inverse variant.
         * @type {boolean}
         */
        inverse: Boolean,

        /**
         * Indicates whether the avatar uses the large size.
         * @type {boolean}
         */
        large: Boolean,

        /**
         * Indicates whether the avatar uses the medium size.
         * If no other size is set, this one will be used by default.
         * @type {boolean}
         */
        medium: Boolean,

        /**
         * Indicates whether the avatar uses the small size.
         * @type {boolean}
         */
        small: Boolean,

        /**
         * Indicates whether the avatar uses the x-small size.
         * @type {boolean}
         */
        xSmall: Boolean,

        /**
         * The URL for the image.
         * @type {string}
         */
        src: String,
    },

    computed: {
        /**
         * Returns the CSS class names for the avatar.
         * @returns {string} The CSS class names.
         */
        avatarClass() {
            let classNames = ''

            // Avatar size
            if (this.large) classNames += ' slds-avatar_large'
            else if (this.medium) classNames += ' slds-avatar_medium'
            else if (this.small) classNames += ' slds-avatar_small'
            else if (this.xSmall) classNames += ' slds-avatar_x-small'
            else classNames += 'slds-avatar_medium'

            // Avatar variant
            if (this.circle) classNames += ' slds-avatar_circle'

            return classNames
        },

        /**
         * Returns the CSS class names for the initials element.
         * @returns {string} The CSS class names.
         */
        initialsClass() {
            let classNames = ''

            // Initials background color
            if (this.fallbackIcon) {
                const category = this.fallbackIcon.split(':')[0]
                const name = this.fallbackIcon.split(':')[1]
                classNames += `slds-icon-${category}-${name}`
            }

            // Initials inverse
            if (this.inverse) classNames += ' slds-avatar__initials_inverse'

            return classNames
        },
    },

    methods: {
        /**
         * Handles the image error event.
         * @param {Event} event The event.
         */
        onImageError(event) {
            const message = `<slds-avatar> Image with src="${event.target.src}" failed to load.`
            console.warn(message)
        },
    },
}
</script>
