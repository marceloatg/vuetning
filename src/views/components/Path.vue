<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Path"
            details="Components"
        >
            <template #details>
                The Path communicates to the user the progress of a particular process.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">
            <slds-path/>
        </slds-card>

    </main>
</template>

<script>
export default {
    name: "Path",
}
</script>
