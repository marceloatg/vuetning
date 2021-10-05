<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Vertical Tabs"
            details="Components"
        >
            <template #details>
                A component that shows groups of content, separated into tabs, and controlled by the tabs
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">
            <slds-vertical-tabs/>
        </slds-card>

    </main>
</template>

<script>
export default {
    name: 'VerticalTabs',
}
</script>
