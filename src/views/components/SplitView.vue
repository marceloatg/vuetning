<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Split View"
            details="Components"
        >
            <template #details>
                Split view is used to navigate between records in a list while staying on the same screen.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">
            <slds-split-view/>
        </slds-card>

    </main>
</template>

<script>
export default {
    name: "SplitView",
}
</script>
