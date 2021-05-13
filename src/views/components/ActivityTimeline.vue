<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Activity Timeline"
            details="Components"
        >
            <template #details>
                The activity timeline displays each of the user’s upcoming, current, and past activities.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">
            <slds-activity-timeline/>
        </slds-card>

    </main>
</template>

<script>
export default {
    name: "ActivityTimeline",
}
</script>
