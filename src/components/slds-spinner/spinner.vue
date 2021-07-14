<template>
    <div
        role="status"
        class="slds-spinner"
        :class="spinnerClass"
        @scroll.prevent>

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

<script>
export default {
    name: "SldsSpinner",

    props: {
        assistiveText: String,
        base: Boolean,
        brand: Boolean,
        delayed: Boolean,
        inline: Boolean,
        inverse: Boolean,
        large: Boolean,
        medium: Boolean,
        small: Boolean,
        text: String,
        xSmall: Boolean,
        xxSmall: Boolean
    },

    computed: {
        spinnerClass() {
            let classNames = []

            // Spinner size
            if (this.xxSmall) classNames += ' slds-spinner_xx-small'
            else if (this.xSmall) classNames += ' slds-spinner_x-small'
            else if (this.small) classNames += ' slds-spinner_small'
            else if (this.large) classNames += ' slds-spinner_large'
            else classNames += ' slds-spinner_medium'

            // Spinner variant
            if (this.brand) classNames += ' slds-spinner_brand'
            else if (this.inverse) classNames += ' slds-spinner_inverse'
            else classNames += ' slds-spinner_base'

            // Spinner delay
            if (this.delayed) classNames += ' slds-spinner_delayed'

            // Spinner layout
            if (this.inline) classNames += ' slds-spinner_inline'

            return classNames
        }
    }
}
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
