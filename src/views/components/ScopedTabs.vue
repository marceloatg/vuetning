<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Scoped Tabs"
            details="Components"
        >
            <template #details>
                A tab keeps related content in a single container that is shown and hidden through navigation.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">
            <slds-scoped-tabs/>
        </slds-card>

    </main>
</template>

<script>
export default {
    name: 'ScopedTabsView',
}
</script>
