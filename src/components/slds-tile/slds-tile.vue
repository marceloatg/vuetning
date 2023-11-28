<template>
    <slds-media-object class="slds-tile">

        <template #figure>

            <!-- Avatar -->
            <slds-avatar
                v-if="avatar"
                circle
                medium
                :src="avatar"
            />

            <!-- Icon -->
            <slds-icon
                v-else-if="iconName"
                :icon-name="iconName"
                :icon-class="iconClass"
                :large="iconLarge"
                medium
                :small="iconSmall"
                :x-small="iconXSmall"
                :xx-small="iconXXSmall"
            />

        </template>

        <template #default>

            <!-- Header -->
            <div class="slds-grid slds-grid_align-spread slds-has-flexi-truncate slds-hint-parent">

                <!-- Title -->
                <h3 class="slds-tile__title slds-truncate" :title="title">
                    <slot name="title">

                        <p v-if="linkless">
                            <b>{{ title }}</b>
                        </p>

                        <a v-else @click="handleClickTitle">
                            {{ title }}
                        </a>

                    </slot>
                </h3>

                <!-- Actions -->
                <div v-if="$slots.actions" class="slds-shrink-none">
                    <slot name="actions"/>
                </div>

            </div>

            <!-- Content -->
            <div class="slds-tile__detail">
                <slot/>
            </div>

        </template>

    </slds-media-object>
</template>

<script lang="ts">
import SldsAvatar from "../slds-avatar/slds-avatar.vue"
import SldsIcon from "../slds-icon/slds-icon.vue"
import SldsMediaObject from "../slds-media-object/slds-media-object.vue"
import { EVENTS } from "../../constants"
import { defineComponent } from "vue"

export default defineComponent({
    name: "SldsTile",

    components: {
        SldsMediaObject,
        SldsAvatar,
        SldsIcon,
    },

    props: {
        /**
         * The URL for the avatar
         */
        avatar: String,

        /**
         * The class names to be passed to the icon.
         */
        iconClass: String,

        /**
         * The Lightning Design System name of the icon. Names are written in the format
         * 'utility:down' where 'utility' is the category, and 'down' is the specific icon to be displayed.value
         */
        iconName: String,

        /**
         * Indicates whether to use a large icon.
         */
        iconLarge: Boolean,

        /**
         * Indicates whether to use a small icon.
         */
        iconSmall: Boolean,

        /**
         * Indicates whether to use an x-small icon.
         */
        iconXSmall: Boolean,

        /**
         * Indicates whether to use a xx-small icon.
         */
        iconXXSmall: Boolean,

        /**
         * Indicates whether title no has link.
         */
        linkless: Boolean,

        /**
         * The title of the tile.
         */
        title: String,
    },

    methods: {
        /**
         * Handles the click event on the title.
         */
        handleClickTitle(): void {
            this.$emit(EVENTS.CLICK)
        },
    },
})
</script>
