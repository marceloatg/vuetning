<template>
    <div
        :id="`scoped-tab-default-${name}`"
        :aria-labelledby="`${name}__item`"
        :class="contentClassNames"
        role="tabpanel"
    >
        <slot/>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
    name: "SldsScopedTabContent",

    props: {
        isActive: Boolean,

        name: { type: String, required: true },
    },

    computed: {
        /**
         * The CSS class names for the content.
         */
        contentClassNames(): string {
            let classNames = "slds-tabs_scoped__content"

            if (this.isActive) classNames += " slds-show"
            else classNames += " slds-hide"

            return classNames
        },
    },
})
</script>

