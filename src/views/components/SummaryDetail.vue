<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Summary Detail"
            details="Components"
        >
            <template #details>
                Use Summary Detail to show and hide details while always showing a summary.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">
            <slds-summary-detail/>
        </slds-card>

    </main>
</template>

<script>
export default {
    name: "SummaryDetail",
}
</script>
