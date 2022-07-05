<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Setup Assistant"
            details="Components"
        >
            <template #details>
                Setup Assistant provides Administrators with a centralized list of tasks for onboarding organizations,
                clouds, or features within the Salesforce Platform. It provides a prescriptive and detailed guide for
                learning, configuring, and importing data which can take hours to days.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">
            <slds-setup-assistant/>
        </slds-card>

    </main>
</template>

<script>
export default {
    name: 'SetupAssistantView',
}
</script>
