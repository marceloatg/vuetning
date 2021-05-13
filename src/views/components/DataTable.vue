<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Data Table"
            details="Components"
        >
            <template #details>
                Data tables are an enhanced version of an HTML table and are used to display tabular data.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">
            <slds-data-table/>
        </slds-card>

    </main>
</template>

<script>
export default {
    name: "DataTable",
}
</script>
