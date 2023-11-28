<template>
    <li class="slds-global-actions__item">
        <div class="slds-dropdown-trigger slds-dropdown-trigger_click">
            <button
                class="slds-button slds-button_icon slds-button_icon slds-button_icon-container slds-button_icon-small slds-global-actions__notifications slds-global-actions__item-action"
                title="no new notifications"
                aria-live="assertive"
                aria-atomic="true"
            >
                <!-- SVG -->
                <slds-svg :icon="iconName" class="slds-button__icon slds-global-header__icon"/>

                <!-- Assistive text -->
                <span class="slds-assistive-text">
                    No new notifications
                </span>

            </button>

            <!-- Badge -->
            <span aria-hidden="true" class="slds-notification-badge">
                0
            </span>

        </div>
    </li>
</template>


<script lang="ts">
import SldsSvg from "../slds-svg/slds-svg.vue"
import { defineComponent } from "vue"

export default defineComponent({
    name: "SldsGlobalActionNotifications",

    components: {
        SldsSvg,
    },

    props: {
        /**
         * The Lightning Design System name of the icon.
         * Names are written in the format 'utility:down' where 'utility' is the category, and 'down' is the specific icon to be displayed.
         */
        iconName: { type: String, default: "utility:notification" },
    },
})
</script>
