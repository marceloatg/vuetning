<template>
    <div
        :id="`vertical-tab-content-${name}`"
        :class="contentClassNames"
        role="tabpanel"
        :aria-labelledby="`${name}__nav`"
    >
        <slot/>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
    name: "slds-vertical-tab-content",

    props: {
        /**
         * Indicates when this tab content is active.
         */
        isActive: Boolean,

        /**
         * Tab name.
         */
        name: { type: String, required: true },
    },

    computed: {
        /**
         * The CSS class names for the content.
         */
        contentClassNames(): string {
            let classNames = "slds-vertical-tabs__content"

            if (this.isActive) classNames += " slds-show"
            else classNames += " slds-hide"

            return classNames
        },
    },
})
</script>

