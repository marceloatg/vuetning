<template>
    <div class="slds-trial-header slds-grid">

        <!-- Tour --> <!-- TODO: make into slot -->
        <div class="slds-grid">
            <button class="slds-button slds-m-right_small">
                Take the salesforce tour
            </button>
            <div class="slds-grid slds-dropdown-trigger slds-dropdown-trigger_click">
                <button class="slds-button">
                    <slds-svg icon="utility:right" class="slds-button__icon slds-button__icon_left"/>
                    Choose your tour
                </button>
            </div>
        </div>

        <!-- Subscribe -->
        <div class="slds-grid slds-grid_vertical-align-center slds-col_bump-left">
            <span class="slds-box slds-box_xx-small slds-theme_default">{{ daysLeft }}</span>
            <span class="slds-m-horizontal_x-small">Days left in trial</span>
            <slds-button text="Subscribe Now" success/>
        </div>

    </div>
</template>

<script>
    export default {
        props: {
            daysLeft: {
                type: Number,
                required: true
            }
        }
    }
</script>

<style scoped lang="scss">

</style>
