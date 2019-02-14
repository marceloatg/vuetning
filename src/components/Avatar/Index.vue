<template>
    <span class="slds-avatar" :class="[`slds-avatar_${variant}`, 'slds-avatar_' + size]">

        <!-- Initials -->
        <abbr v-if="initials !== null"
              class="slds-avatar__initials"
              :class="[backgroundColor, {'slds-avatar__initials_inverse': inverse}]">
            {{ initials }}
        </abbr>

        <!-- Image -->
        <img v-else alt="Avatar" :src="src"/>

    </span>
</template>

<script>
    export default {
        props: {
            fallbackIconName: {
                type: String,
                default: null,
            },
            initials: {
                type: String,
                default: null,
            },
            inverse: {
                type: Boolean,
                default: false,
            },
            size: {
                type: String,
                default: 'medium',
                validator(value) {
                    return [
                        'x-small',
                        'small',
                        'medium',
                        'large'
                    ].indexOf(value) !== -1
                }
            },
            src: {
                type: String,
                default: null,
            },
            variant: {
                type: String,
                default: 'square',
                validator(value) {
                    return [
                        'square',
                        'circle'
                    ].indexOf(value) !== -1
                }
            },
        },
        computed: {
            backgroundColor() {
                if (this.fallbackIconName == null) return;

                const category = this.fallbackIconName.split(':')[0];
                const name = this.fallbackIconName.split(':')[1];
                return `slds-icon-${category}-${name}`;
            },
        },
    }
</script>