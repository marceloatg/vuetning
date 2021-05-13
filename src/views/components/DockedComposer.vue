<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Docked Composer"
            details="Components"
        >
            <template #details>
                Docked Composer is a persistent utility bar that allows a user to continually use the app to complete
                tasks or gather information while expanding/collapsing a composer window.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">
            <slds-docked-composer/>
        </slds-card>

    </main>
</template>

<script>
export default {
    name: "DockedComposer",
}
</script>
