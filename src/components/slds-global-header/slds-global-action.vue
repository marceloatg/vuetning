<template>
    <li class="slds-global-actions__item">
        <div class="slds-dropdown-trigger slds-dropdown-trigger_click">
            <button
                class="slds-button slds-button_icon slds-button_icon slds-button_icon-container slds-button_icon-small slds-global-actions__setup slds-global-actions__item-action"
                aria-haspopup="true"
                :title="assistiveText"
            >

                <!-- SVG -->
                <slds-svg :icon="iconName" class="slds-button__icon slds-global-header__icon"/>

                <!-- Assistive text -->
                <span class="slds-assistive-text">
                    {{ assistiveText }}
                </span>

            </button>
        </div>
    </li>
</template>

<script lang="ts">
import SldsSvg from "../slds-svg/slds-svg.vue"
import { defineComponent } from "vue"

export default defineComponent({
    name: "SldsGlobalAction",

    components: {
        SldsSvg,
    },

    props: {
        /**
         * The alternative text used to describe the icon.
         * This text should describe what happens when you click the button,
         * for example 'Upload File', not what the icon looks like, 'Paperclip'.
         */
        assistiveText: String,

        /**
         * The Lightning Design System name of the icon.
         * Names are written in the format 'utility:down' where 'utility' is the category, and 'down' is the specific icon to be displayed.
         */
        iconName: { type: String, required: true },
    },
})
</script>
