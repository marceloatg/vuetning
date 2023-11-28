<template>
    <div :class="illustrationClassNames">

        <!-- Image -->
        <img
            v-if="src"
            :src="src"
            :alt="alternativeText"
            class="slds-illustration__svg"
        >
        <slot v-else/>

        <!-- Text -->
        <div class="slds-text-longform">

            <!-- Heading -->
            <h3 class="slds-text-heading_medium">
                {{ heading }}
            </h3>

            <!-- Message -->
            <p class="slds-text-body_regular">
                {{ message }}
            </p>

        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
    name: "SldsIllustration",

    props: {
        /**
         * The alternative text used to describe the illustration image, which is displayed as hover text on the image.
         */
        alternativeText: String,

        /**
         * The heading of the illustration.
         */
        heading: String,

        /**
         Indicates whether the illustration uses the large size.
         */
        large: Boolean,

        /**
         * The message of the illustration.
         */
        message: String,

        /**
         * The URL for the image to display.
         * If the default slot is used, this property is ignored.
         */
        src: String,

        /**
         Indicates whether the illustration uses the small size.
         */
        small: Boolean,

        /**
         * Indicates whether the illustration uses the xSmall size.
         */
        xSmall: Boolean,
    },

    computed: {
        /**
         * The CSS class names for the illustration.
         */
        illustrationClassNames(): string {
            let classNames = "slds-illustration"

            if (this.xSmall) classNames += " slds-illustration_x-small"
            else if (this.small) classNames += " slds-illustration_small"
            else if (this.large) classNames += " slds-illustration_large"
            else classNames += " slds-illustration_small"

            return classNames
        },
    },
})
</script>

<style scoped lang="scss">

.slds-illustration.slds-illustration_x-small {
    .slds-illustration__svg {
        width: 100%;
        max-width: 182px;
        max-height: 120px;
        margin-bottom: 1rem;
    }
}

</style>
