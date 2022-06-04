<template>
    <div class="slds-tile slds-media">

        <!-- Avatar -->
        <div v-if="avatar" class="slds-media__figure">
            <slds-avatar
                circle
                medium
                :src="avatar"
            />
        </div>

        <!-- Icon -->
        <div v-else-if="icon" class="slds-media__figure">
            <slds-icon
                :icon="icon"
                :large="iconLarge"
                medium
                :small="iconSmall"
                :x-small="iconXSmall"
                :xx-small="iconXXSmall"
            />
        </div>

        <!-- Body -->
        <div class="slds-media__body">

            <div class="slds-grid slds-grid_align-spread slds-has-flexi-truncate slds-hint-parent">

                <!-- Title -->
                <h3 class="slds-tile__title slds-truncate" :title="title">
                    <a @click="onClickTitle">
                        {{ title }}
                    </a>
                </h3>

                <!-- Actions -->
                <div v-if="showActions" class="slds-shrink-none">
                    <slds-menu
                        right-alignment
                        bordered-filled
                        :items="actions"
                        x-small
                    />
                </div>

            </div>

            <!-- Content -->
            <div class="slds-tile__detail">

                <!-- Items -->
                <slot/>
            </div>

        </div>

    </div>
</template>

<script>
import SldsAvatar from '@/components/slds-avatar'
import SldsIcon from '@/components/slds-icon'
import SldsMenu from '@/components/slds-menu'

export default {
    name: 'SldsTile',

    components: {
        SldsAvatar,
        SldsIcon,
        SldsMenu,
    },

    props: {
        /**
         * @description The list of available stocks.
         * @type {array}
         */
        actions: Array,

        /**
         * @description The URL for the avatar.
         * @type {string}
         */
        avatar: String,

        /**
         * @description The Lightning Design System name of the icon. Names are written in the format
         * 'utility:down' where 'utility' is the category, and 'down' is the specific icon to be displayed.
         * @type {string}
         */
        icon: String,

        /**
         * @description Indicates whether to use a large icon.
         * @type {boolean}
         */
        iconLarge: Boolean,

        /**
         * @description Indicates whether to use a small icon.
         * @type {boolean}
         */
        iconSmall: Boolean,

        /**
         * @description Indicates whether to use a x-small icon.
         * @type {boolean}
         */
        iconXSmall: Boolean,

        /**
         * @description Indicates whether to use a xx-small icon.
         * @type {boolean}
         */
        iconXXSmall: Boolean,

        /**
         * @description The title of the tile.
         * @type {string}
         */
        title: {type: String, required: true},
    },

    computed: {
        showActions() {
            return this.actions && this.actions.length > 0
        }
    },

    methods: {
        /**
         * @description Fires a click event when the title is clicked.
         */
        onClickTitle() {
            this.$emit('click')
        }
    }
}
</script>
