<template>
    <div class="slds-trial-header slds-grid">

        <!-- Left grid -->
        <div class="slds-grid">
            <!-- To be implemented -->
        </div>

        <!-- Right grid -->
        <div class="slds-grid slds-grid_vertical-align-center slds-col_bump-left">

            <span class="slds-box slds-box_xx-small slds-theme_default">{{ daysLeft }}</span>

            <span class="slds-m-horizontal_x-small">Days left in trial</span>

            <slds-button label="Subscribe Now" success @click="handleClickSubscribe"/>

        </div>

    </div>
</template>

<script lang="ts">
import SldsButton from "../slds-button/slds-button.vue"
import { EVENTS } from "../../constants"
import { defineComponent } from "vue"

export default defineComponent({
    name: "SldsTrialBar",

    components: {
        SldsButton,
    },

    props: {
        /**
         * Number of days left in trial.
         */
        daysLeft: { type: Number, required: true },
    },

    methods: {
        handleClickSubscribe(): void {
            this.$emit(EVENTS.SUBSCRIBE)
        },
    },
})
</script>
