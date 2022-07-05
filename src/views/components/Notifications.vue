<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Notifications"
            details="Components"
        >
            <template #details>
                Notifications serve as a feedback & confirmation mechanism that comes in at the top right.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">
            <slds-notifications/>
        </slds-card>

    </main>
</template>

<script>
export default {
    name: 'NotificationsView',
}
</script>
