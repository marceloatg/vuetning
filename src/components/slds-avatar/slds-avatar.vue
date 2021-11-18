<template>
    <span class="slds-avatar" :class="[sizeClass, variantClass]">

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
            :class="[backgroundColorClass, inverseClass]">
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

<script>
import SldsIcon from '../slds-icon/slds-icon.vue'

export default {
    name: 'SldsAvatar',

    components: {
        SldsIcon
    },

    props: {
        alternativeText: String,
        circle: Boolean,
        fallbackIcon: {
            type: String,
            default: 'standard:user',
        },
        initials: String,
        inverse:  Boolean,
        large: Boolean,
        medium:  Boolean,
        small: Boolean,
        xSmall:  Boolean,
        src: String,
    },

    computed: {
        backgroundColorClass() {
            if (this.fallbackIcon == null) return

            const category = this.fallbackIcon.split(':')[0]
            const name = this.fallbackIcon.split(':')[1]
            return `slds-icon-${category}-${name}`
        },

        inverseClass() {
            if (this.inverse) return 'slds-avatar__initials_inverse'
            return null
        },

        sizeClass() {
            if (this.xSmall) return 'slds-avatar_x-small'
            if (this.small) return 'slds-avatar_small'
            if (this.medium) return 'slds-avatar_medium'
            if (this.large) return 'slds-avatar_large'
            return 'slds-avatar_medium'
        },

        variantClass() {
            if (this.circle) return 'slds-avatar_circle'
            return null
        },
    },

    methods: {
        onImageError(event) {
            const message = `<slds-avatar> Image with src="${event.target.src}" failed to load.`
            console.warn(message)
        },
    },
}
</script>
