<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Accordion"
            details="Components"
        >
            <template #details>
                An accordion allows a user to toggle the display of a section of content.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">
            <slds-accordion/>
        </slds-card>

    </main>
</template>

<script>
export default {
    name: "Accordion",
}
</script>
