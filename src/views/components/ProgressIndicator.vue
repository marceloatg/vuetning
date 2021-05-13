<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Progress Indicator"
            details="Components"
        >
            <template #details>
                A progress indicator component communicates to the user the progress of a particular process.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">
            <slds-progress-indicator/>
        </slds-card>

    </main>
</template>

<script>
export default {
    name: "ProgressIndicator",
}
</script>
