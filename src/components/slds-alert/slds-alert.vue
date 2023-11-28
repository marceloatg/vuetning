<template>
    <div role="alert" :class="alertClass">

        <!-- Assistive text -->
        <span v-if="assistiveText" class="slds-assistive-text">
            {{ assistiveText }}
        </span>

        <!-- Icon -->
        <slds-icon
            v-if="iconName"
            class="slds-m-right_x-small"
            current-color
            :icon-name="iconName"
            x-small
        />

        <!-- Content -->
        <slot>
            <h2>
                {{ message }}
            </h2>
        </slot>

        <!-- Close button -->
        <div v-if="!nonCloseable" class="slds-notify__close">
            <slds-button-icon
                assistive-text="Close"
                icon-name="utility:close"
                inverse
                small
                title="Close"
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
    name: "SldsAlert",

    components: {
        SldsButtonIcon,
        SldsIcon,
    },

    props: {
        /**
         * Hidden text used by a screen reader to read text.
         */
        assistiveText: String,

        /**
         * Indicates whether this alert has a close button.
         */
        nonCloseable: Boolean,

        /**
         * Indicates whether this alert has the error theme.
         */
        error: Boolean,

        /**
         * The Lightning Design System name of the icon.
         * Names are written in the format 'utility:down' where 'utility' is the category, and 'down' is the specific icon to be displayed.
         */
        iconName: String,

        /**
         * Indicates whether this alert has the info theme.
         * If no other theme is set, this one will be used by default.
         */
        info: Boolean,

        /**
         * Alert message.
         * When using the default slot this prop is ignored.
         */
        message: String,

        /**
         * Indicates whether this alert has texture.
         */
        noTexture: Boolean,

        /**
         * Indicates whether this alert has the offline theme.
         */
        offline: Boolean,

        /**
         * Indicates whether this alert has the warning theme.
         */
        warning: Boolean,
    },

    computed: {
        /**
         * The CSS class names for the alert.
         */
        alertClass(): string {
            let classNames = "slds-notify slds-notify_alert"

            // Alert texture
            if (this.noTexture) classNames += " slds-theme_alert-no-texture"

            // Alert theme
            if (this.error) classNames += " slds-theme_error"
            else if (this.offline) classNames += " slds-theme_offline"
            else if (this.warning) classNames += " slds-theme_warning"
            else classNames += " slds-theme_info"

            return classNames
        },
    },

    methods: {
        /**
         * Handles the click on the close button.
         * Emits a close event when the close button is clicked.
         */
        handleClickClose(): void {
            this.$emit(EVENTS.CLOSE)
        },
    },
})
</script>

<style scoped lang="scss">

.slds-theme_alert-no-texture {
    background-image: unset;
}

</style>
