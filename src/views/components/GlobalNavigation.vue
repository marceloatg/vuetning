<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Global Navigation"
            details="Components"
        >
            <template #details>
                Global Navigation is the list of navigation links your users find in the Header on every page in
                Salesforce. Your Global Navigation includes a Navigation Bar where your users find the App Launcher, App
                Name, and Pages that each App includes.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">
            <slds-global-navigation/>
        </slds-card>

    </main>
</template>

<script>
export default {
    name: "GlobalNavigation",
}
</script>
