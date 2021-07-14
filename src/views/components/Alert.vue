<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Alert"
            details="Components"
        >
            <template #details>
                Alert banners communicate a state that affects the entire system, not just a feature or page. It
                persists over a session and appears without the user initiating the action.
            </template>
        </slds-page-header>

        <!-- Base -->
        <slds-card class="slds-m-top_medium" title="Base">

            <slds-text class="slds-p-bottom_medium">
                Use the info alert when notifying the user of neutral information about the system.
            </slds-text>

            <slds-alert
                assistive-text="info"
                icon="utility:user"
                message="Logged in as John Smith (johnsmith@acme.com)."
            />

        </slds-card>

        <!-- Variations -->
        <slds-card class="slds-m-top_medium" title="Variations">

            <slds-text heading-small>
                Warning
            </slds-text>

            <slds-text class="slds-p-bottom_medium">
                Use the warning variant to warn the user about important system information that deserves caution.
            </slds-text>

            <slds-alert
                assistive-text="warning"
                icon="utility:warning"
                warning
            >
                Your browser is outdated. Your Salesforce experience may be degraded. <a href="javascript:void(0);">More
                    Information</a>
            </slds-alert>

            <slds-text heading-small class="slds-p-top_large">
                Error
            </slds-text>

            <slds-text class="slds-p-bottom_medium">
                Use the error variant when you need to alert the user about an error in the system that needs immediate
                attention.
            </slds-text>

            <slds-alert
                assistive-text="warning"
                icon="utility:user"
                error
            >
                Your browser is outdated. Your Salesforce experience may be degraded. <a href="javascript:void(0);">More
                    Information</a>
            </slds-alert>

            <slds-text heading-small class="slds-p-top_large">
                Offline
            </slds-text>

            <slds-text class="slds-p-bottom_medium">
                Use the offline alert to let the user know that they are not connected to the internet.
            </slds-text>

            <slds-alert
                assistive-text="offline"
                icon="utility:user"
                offline
            >
                You are in offline mode. <a href="javascript:void(0);">
                    More Information
                </a>
            </slds-alert>

        </slds-card>

    </main>
</template>

<script>
export default {
    name: "Alert"
}
</script>

<style scoped>

</style>
