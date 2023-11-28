<template>
    <div :class="containerClassNames">
        <slot/>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
    name: "slds-container",

    props: {
        /**
         * Indicates whether the container uses the large size.
         */
        large: Boolean,

        /**
         * Indicates whether the container uses the small size.
         */
        small: Boolean,

        /**
         * Indicates whether the container uses the x-large size.
         */
        xLarge: Boolean,
    },

    computed: {
        /**
         * The CSS class names for the container.
         */
        containerClassNames(): string {
            let classNames = ""

            // Size
            if (this.large) classNames += " slds-container_large"
            else if (this.small) classNames += " slds-container_small"
            else if (this.xLarge) classNames += " slds-container_x-large"
            else classNames += " slds-container_medium"

            return classNames
        },
    },
})
</script>
