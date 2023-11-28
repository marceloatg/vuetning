<template>
    <div
        :id="`tab-default-${name}`"
        :class="contentClassNames"
        role="tabpanel"
        :aria-labelledby="`${name}__item`"
    >
        <slot/>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
    name: "SldsTabContent",

    props: {
        name: { type: String, required: true },

        isActive: Boolean,
    },

    computed: {
        /**
         * The CSS class names for the content.
         */
        contentClassNames(): string {
            let classNames = "slds-tabs_default__content"

            if (this.isActive) classNames += " slds-show"
            else classNames += " slds-hide"

            return classNames
        },
    },
})
</script>
