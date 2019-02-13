<!--
    @Description: An avatar component represents an object or entity.
    @Documentation: https://www.lightningdesignsystem.com/components/avatar/
-->

<template>
    <span class="slds-avatar"
          :class="[{'slds-avatar_circle': circle}, 'slds-avatar_' + size]">

        <!-- Initials -->
        <abbr v-if="initials !== null"
              class="slds-avatar__initials slds-icon-standard-account"
              :class="{'slds-avatar__initials_inverse': inverse}"
              :title="title">
            {{ initials }}
        </abbr>

        <!-- Image -->
        <img v-else alt="Avatar" :src="image" :title="title"/>

    </span>
</template>

<script>
    export default {
        name: 'Avatar',
        props: {
            image: {
                type: String,
                default: null,
                note: 'Avatar image source path.'
            },
            initials: {
                type: String,
                default: null,
                note: 'Used for initials inside an avatar.'
            },
            title: {
                type: String,
                default: '',
                note: 'Image title.'
            },
            inverse: {
                type: Boolean,
                default: false,
                note: 'Used for initials inside an avatar.'
            },
            circle: {
                type: Boolean,
                default: false,
                note: 'Make avatar a circle.'
            },
            size: {
                type: String,
                default: 'medium',
                note: 'Size modifier for avatar. Check the validator for available options.',
                validator(value) {
                    return [
                        'x-small',
                        'small',
                        'medium',
                        'large'
                    ].indexOf(value) !== -1
                }
            }
        }
    }
</script>

<style scoped lang="scss">

</style>