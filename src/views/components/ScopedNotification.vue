<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Scoped Notification"
            details="Components"
        >
            <template #details>
                Scoped notifications serve advisory information for the user that is not important enough to justify an
                alert. It is often presented as a status bar scoped to the container. They are not dismissible.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">
            <slds-scoped-notification/>
        </slds-card>

    </main>
</template>

<script>
export default {
    name: 'ScopedNotification',
}
</script>
