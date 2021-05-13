<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="App Launcher"
            details="Components"
        >
            <template #details>
                The App Launcher allows the user to quickly access all the apps and functionality within their
                organization.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">
            <slds-app-launcher/>
        </slds-card>

    </main>
</template>

<script>
export default {
    name: "AppLauncher",
}
</script>
