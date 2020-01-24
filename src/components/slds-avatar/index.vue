<template>
    <span class="slds-avatar" :class="[size, variant]">

        <!-- Initials -->
        <abbr
            v-if="initials"
            class="slds-avatar__initials"
            :class="[backgroundColor, {'slds-avatar__initials_inverse': inverse}]">
            {{ initials }}
        </abbr>

        <!-- Image -->
        <img v-else-if="src" alt="Avatar" :src="src">

        <!-- Fallback icon -->
        <slds-icon v-else :icon="fallbackIcon"/>

    </span>
</template>

<script>
    import SldsIcon from '../slds-icon/index.vue'

    export default {
        name: 'SldsAvatar',
        components: {
            SldsIcon
        },
        props: {
            circle: {
                type: Boolean,
            },
            fallbackIcon: {
                type: String,
                default: 'standard:user',
            },
            initials: {
                type: String,
            },
            inverse: {
                type: Boolean,
                default: false,
            },
            large: {
                type: Boolean,
            },
            medium: {
                type: Boolean,
            },
            small: {
                type: Boolean,
            },
            xSmall: {
                type: Boolean,
            },
            src: {
                type: String,
            },
        },
        computed: {
            backgroundColor() {
                if (this.fallbackIcon == null) return;

                const category = this.fallbackIcon.split(':')[0];
                const name = this.fallbackIcon.split(':')[1];
                return `slds-icon-${category}-${name}`;
            },
            size() {
                if (this.xSmall) return 'slds-avatar_x-small';
                if (this.small) return 'slds-avatar_small';
                if (this.medium) return 'slds-avatar_medium';
                if (this.large) return 'slds-avatar_large';
                return 'slds-avatar_medium';
            },
            variant() {
                if (this.circle) return 'slds-avatar_circle';
                return null;
            },
        },
    }
</script>
