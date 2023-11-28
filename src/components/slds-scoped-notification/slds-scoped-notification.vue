<template>
    <div :class="scopedNotificationClass" role="status">

        <div class="slds-media__figure">
            <slds-icon :icon-name="iconName || fallbackIconName" :inverse="inverse" small/>
        </div>

        <div class="slds-media__body">
            <slot/>
        </div>

    </div>
</template>

<script lang="ts">
import SldsIcon from "../slds-icon/slds-icon.vue"
import { ICONS } from "../../constants"
import { defineComponent } from "vue"

export default defineComponent({
    name: "SldsScopedNotification",

    components: { SldsIcon },

    props: {
        error: Boolean,

        iconName: String,

        info: Boolean,

        success: Boolean,

        warning: Boolean,
    },

    computed: {
        /**
         * Scoped notification icon name.
         */
        fallbackIconName(): string {
            let iconName = ""

            if (this.error) iconName += ICONS.UTILITY.ERROR
            else if (this.success) iconName += ICONS.UTILITY.SUCCESS
            else if (this.warning) iconName += ICONS.UTILITY.WARNING
            else iconName += ICONS.UTILITY.INFO

            return iconName
        },

        /**
         * Indicates whether this scoped notification has the inverse theme.
         */
        inverse(): boolean {
            return Boolean(this.error || this.info || this.success)
        },

        /**
         * The CSS class names for the scoped notification.
         */
        scopedNotificationClass(): string {
            let classNames = "slds-scoped-notification slds-media slds-media_center"

            if (this.error) classNames += " slds-theme_error"
            else if (this.info) classNames += " slds-theme_info"
            else if (this.success) classNames += " slds-theme_success"
            else if (this.warning) classNames += " slds-theme_warning"
            else classNames += " slds-scoped-notification_light"

            return classNames
        },
    },
})
</script>
