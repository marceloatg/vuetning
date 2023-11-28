<template>
    <li class="slds-breadcrumb__item">
        <a :class="anchorClassNames" @click.stop.prevent="handleAnchorClick">
            {{ label }}
        </a>
    </li>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { EVENTS } from "../../constants"

export default defineComponent({
    name: "SldsBreadcrumb",

    props: {
        /**
         * The URL of the page that the breadcrumb goes to.
         */
        href: String,

        /**
         * The text label for the breadcrumb.
         */
        label: { type: String, required: true },

        /**
         * Indicates whether the breadcrumb color should be neutral and only act like an anchor tag when hovered.
         */
        neutral: Boolean,

        /**
         * The name for the breadcrumb component.
         * This value is used to identify the breadcrumb in a callback.
         */
        name: { type: String, required: true },
    },

    computed: {
        /**
         * The CSS class names for the anchor tag.
         */
        anchorClassNames(): string {
            let classNames = ""

            if (this.neutral) classNames += " slds-text-color_weak"

            return classNames
        },
    },

    methods: {
        /**
         * Handles the click event on the breadcrumb.
         */
        handleAnchorClick(): void {
            if (this.href) window.location.assign(this.href)
            else this.$emit(EVENTS.CLICK, this.name)
        },
    },
})
</script>
