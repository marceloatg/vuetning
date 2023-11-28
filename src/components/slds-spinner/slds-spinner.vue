<template>
    <div role="status" :class="spinnerClassNames" @scroll.prevent>

        <span v-if="assistiveText" class="slds-assistive-text">
            {{ assistiveText }}
        </span>

        <div class="slds-spinner__dot-a"/>
        <div class="slds-spinner__dot-b"/>

        <div v-if="text" class="slds-text slds-align_absolute-center">
            {{ text }}
        </div>

    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
    name: "SldsSpinner",

    props: {
        /**
         * The alternative text used to describe the reason for the wait and need for a spinner.
         */
        assistiveText: String,

        /**
         * Indicates whether the spinner has the brand variant.
         */
        brand: Boolean,

        /**
         * Indicates whether the spinner has a delay before starting the animation.
         */
        delayed: Boolean,

        /**
         * Indicates whether to display the spinner in an inline format.
         */
        inline: Boolean,

        /**
         * Indicates whether the spinner has the inverse variant.
         */
        inverse: Boolean,

        /**
         * Indicates whether the spinner uses the large size.
         */
        large: Boolean,

        /**
         * Indicates whether the spinner uses the medium size.
         * If no other size is set, this one will be used by default.
         */
        medium: Boolean,

        /**
         * Indicates whether the spinner uses the small size.
         */
        small: Boolean,

        /**
         * An optional text displayed below the spinner.
         */
        text: String,

        /**
         * Indicates whether the spinner uses the extra-small size.
         */
        xSmall: Boolean,

        /**
         * Indicates whether the spinner uses the extra-extra-small size.
         */
        xxSmall: Boolean,
    },

    computed: {
        /**
         * The CSS class names for the spinner.
         */
        spinnerClassNames(): string {
            let classNames = "slds-spinner"

            // Spinner size
            if (this.xxSmall) classNames += " slds-spinner_xx-small"
            else if (this.xSmall) classNames += " slds-spinner_x-small"
            else if (this.small) classNames += " slds-spinner_small"
            else if (this.large) classNames += " slds-spinner_large"
            else classNames += " slds-spinner_medium"

            // Spinner variant
            if (this.brand) classNames += " slds-spinner_brand"
            else if (this.inverse) classNames += " slds-spinner_inverse"

            // Spinner delay
            if (this.delayed) classNames += " slds-spinner_delayed"

            // Spinner layout
            if (this.inline) classNames += " slds-spinner_inline"

            return classNames
        },
    },
})
</script>

<style scoped lang="scss">

.slds-spinner {
    .slds-text {
        color: #b0adab;
        transform: translate(120%, -50%) rotate(-90deg);
    }

    &.slds-spinner_brand {
        .slds-text {
            color: #1589ee;
        }
    }

    &.slds-spinner_inverse {
        .slds-text {
            color: white;
        }
    }

    &.slds-spinner_large {
        .slds-text {
            font-size: 18px;
        }
    }

    &.slds-spinner_medium {
        .slds-text {
            font-size: 14px;
        }
    }

    &.slds-spinner_small {
        .slds-text {
            font-size: 12px;
        }
    }

    &.slds-spinner_x-small {
        .slds-text {
            font-size: 10px;
        }
    }

    &.slds-spinner_xx-small {
        .slds-text {
            display: none;
        }
    }
}

</style>
