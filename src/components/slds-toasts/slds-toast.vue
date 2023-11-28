<template>
    <div :class="toastClassNames" role="status">

        <!-- Assistive text -->
        <span v-if="assistiveText" class="slds-assistive-text">
            {{ assistiveText }}
        </span>

        <!-- Icon -->
        <slds-icon
            v-if="icon"
            :icon-name="icon"
            small
            inverse
            :class="iconClassNames"
        />

        <!-- Content -->
        <div class="slds-notify__content">

            <h2 class="slds-text-heading_small">
                <slot name="heading"/>
            </h2>

            <slot name="details"/>

        </div>

        <!-- Close button -->
        <div class="slds-notify__close">
            <slds-button-icon
                icon-name="utility:close"
                bare
                large
                inverse
                assistive-text="Close"
                @click="handleClickClose"
            />
        </div>

    </div>
</template>

<script lang="ts">
import SldsButtonIcon from "../slds-button-icon/slds-button-icon.vue"
import SldsIcon from "../slds-icon/slds-icon.vue"
import { defineComponent } from "vue"
import { EVENTS } from "../../constants"

export default defineComponent({
    name: "SldsToast",

    components: {
        SldsButtonIcon,
        SldsIcon,
    },

    props: {
        assistiveText: String,

        error: Boolean,

        icon: String,

        success: Boolean,

        warning: Boolean,
    },

    computed: {
        /**
         * The CSS class names for the icon.
         */
        iconClassNames(): string {
            let classNames = "slds-m-right_small slds-no-flex slds-align-top"

            if (this.error) classNames += " slds-icon-utility-error"
            else if (this.success) classNames += " slds-icon-utility-success"
            else if (this.warning) classNames += " slds-icon-utility-warning"
            else classNames += " slds-icon-utility-info"

            return classNames
        },

        /**
         * The CSS class names for the toast.
         */
        toastClassNames(): string {
            let classNames = "slds-notify slds-notify_toast"

            if (this.error) classNames += " slds-theme_error"
            else if (this.success) classNames += " slds-theme_success"
            else if (this.warning) classNames += " slds-theme_warning"
            else classNames += " slds-theme_info"

            return classNames
        },
    },

    methods: {
        /**
         * Handles the click event on the close button.
         */
        handleClickClose(): void {
            this.$emit(EVENTS.CLOSE)
        },
    },
})
</script>

<style scoped lang="scss">

.slds-notify_toast {
    pointer-events: auto;
}

</style>
