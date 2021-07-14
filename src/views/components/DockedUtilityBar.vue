<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Docked Utility Bar"
            details="Components"
        >
            <template #details>
                Docked utility bar is a persistent bar that allows a user to continually use the app to complete tasks
                while expanding/collapsing utility panels.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">
            <slds-docked-utility-bar/>
        </slds-card>

    </main>
</template>

<script>
export default {
    name: "DockedUtilityBar",
}
</script>
