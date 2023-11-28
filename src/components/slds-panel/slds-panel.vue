<template>
    <div aria-hidden="false" :class="panelClassNames">

        <!-- Custom header -->
        <div v-if="$slots.header" :class="headerClassNames">
            <slot name="header"/>
        </div>

        <!-- Header -->
        <div :class="headerClassNames">

            <!-- Back button -->
            <slds-button-icon
                v-if="backButton"
                class="slds-panel__back"
                icon-name="utility:back"
                small
                title="Collapse Panel Header"
                @click="handleClickBack"
            />

            <!-- Title -->
            <h2 class="slds-panel__header-title slds-text-heading_small slds-truncate" :title="title">
                {{ title }}
            </h2>

            <!-- Close button -->
            <slds-button-icon
                v-if="closeButton"
                :assistive-text="assistiveText"
                class="slds-panel__close"
                icon-name="utility:close"
                small
                title="Collapse Panel Header"
                @click="handleClickClose"
            />

        </div>

        <!-- Body -->
        <div class="slds-panel__body">
            <slot/>
        </div>

    </div>
</template>

<script lang="ts">
import SldsButtonIcon from "../slds-button-icon/slds-button-icon.vue"
import { EVENTS } from "../../constants"
import { defineComponent } from "vue"

export default defineComponent({
    name: "SldsPanel",

    components: { SldsButtonIcon },

    props: {
        assistiveText: String,

        backButton: Boolean,

        centeredHeader: Boolean,

        closeButton: { type: Boolean, default: true },

        full: Boolean,

        large: Boolean,

        left: Boolean,

        medium: Boolean,

        right: Boolean,

        small: Boolean,

        title: String,

        xLarge: Boolean,
    },

    computed: {
        /**
         * The CSS class names for the header.
         */
        headerClassNames(): string {
            let classNames = "slds-panel__header"

            if (this.$slots.header) classNames += " slds-panel__header_custom"
            if (this.centeredHeader) classNames += " slds-panel__header_align-center"

            return classNames
        },

        /**
         * The CSS class names for the panel.
         */
        panelClassNames(): string {
            let classNames = "slds-panel slds-panel_docked slds-is-open"

            // Size
            if (this.small) classNames += " slds-size_small"
            else if (this.medium) classNames += " slds-size_medium"
            else if (this.large) classNames += " slds-size_large"
            else if (this.xLarge) classNames += " slds-size_x-large"
            else if (this.full) classNames += " slds-size_full"
            else classNames += " slds-size_medium"

            // Position
            if (this.right) classNames += " slds-panel_docked-right"
            else if (this.left) classNames += " slds-panel_docked-left"

            return classNames
        },
    },

    methods: {
        /**
         * Handles the click event on the back button.
         */
        handleClickBack(): void {
            this.$emit(EVENTS.BACK)
        },

        /**
         * Handles the click event on the close button.
         */
        handleClickClose(): void {
            this.$emit(EVENTS.CLOSE)
        },
    },
})
</script>

