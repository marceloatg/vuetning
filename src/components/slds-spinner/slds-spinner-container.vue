<template>
    <div :class="containerClassNames">
        <slot/>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
    name: "SldsSpinnerContainer",

    props: {
        /**
         * Indicates whether the examples container is fixed.
         */
        fixed: Boolean,
    },

    computed: {
        /**
         * Returns the CSS class names for the examples container.
         */
        containerClassNames(): string {
            let classNames = "slds-spinner_container"

            if (this.fixed) classNames += " slds-is-fixed"

            return classNames
        },
    },
})
</script>
