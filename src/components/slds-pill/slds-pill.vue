<template>
    <span :class="pillClassNames" @click="handleClickPill">

        <!-- Icon -->
        <span v-if="iconName" class="slds-pill__icon_container">
            <slds-icon aria-hidden="true" :icon-name="iconName" :error="hasError"/>
        </span>

        <!-- Image -->
        <span v-if="src" class="slds-pill__icon_container">
            <slds-avatar circle :src="src"/>
        </span>

        <!-- Label -->
        <a :class="pillActionClassNames" :title="title">
            <span class="slds-pill__label">
                {{ label }}
            </span>
        </a>

        <!-- Remove button -->
        <button
            v-if="!nonRemovable"
            class="slds-button slds-button_icon slds-button_icon slds-pill__remove"
            title="Remove"
            @click.stop="handleClickRemove"
        >
            <slds-svg aria-hidden="true" class="slds-button__icon" icon="utility:close"/>
        </button>

    </span>
</template>

<script lang="ts">
import SldsIcon from "../slds-icon/slds-icon.vue"
import SldsAvatar from "../slds-avatar/slds-avatar.vue"
import SldsSvg from "../slds-svg/slds-svg.vue"
import { defineComponent } from "vue"
import { EVENTS } from "../../constants"

export default defineComponent({
    name: "SldsPill",

    components: { SldsSvg, SldsAvatar, SldsIcon },

    props: {
        /**
         * If present, the pill is shown with a red border and an error icon on the left of the label.
         */
        hasError: Boolean,

        /**
         * The Lightning Design System name of the icon. Names are written in the format
         * 'utility:down' where 'utility' is the category, and 'down' is the specific icon to be displayed.
         */
        iconName: String,

        /**
         * Specifies whether the element variant is a link.
         */
        link: Boolean,

        /**
         * The text label that displays in the pill.
         */
        label: { Type: String, required: true },

        /**
         * If present, the does not show the remove button.
         */
        nonRemovable: Boolean,

        /**
         * The URL for the image.
         */
        src: String,

        /**
         * The title text containing full pill label verbiage.
         */
        title: String,
    },

    computed: {
        /**
         * The CSS class names for the pill.
         */
        pillClassNames(): string {
            let classNames = "slds-pill slds-pill_link"

            if (this.hasError) classNames += " slds-has-error"

            return classNames
        },

        /**
         * The CSS class names for the pill action.
         */
        pillActionClassNames(): string {
            let classNames = "slds-pill__action"

            if (!this.link) classNames += " slds-text-link_reset"
            if (this.nonRemovable) classNames += " non-removable"

            return classNames
        },
    },

    methods: {
        /**
         * Handles the click event on the remove button.
         */
        handleClickRemove(): void {
            this.$emit(EVENTS.REMOVE)
        },

        /**
         * Handles the click event on the pill link.
         */
        handleClickPill(): void {
            if (this.link) this.$emit(EVENTS.CLICK)
        },
    },
})
</script>

<style scoped lang="scss">

.non-removable {
    padding-right: .125rem
}

.slds-text-link_reset {
    cursor: default !important;
}

</style>
