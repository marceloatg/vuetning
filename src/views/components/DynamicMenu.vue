<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Dynamic Menu"
            details="Components"
        >
            <template #details>
                The Dynamic Menu can be used to give a user a variable number of actions to take. When that list of
                actions is long, a search mechanism is provided.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">
            <slds-dynamic-menu/>
        </slds-card>

    </main>
</template>

<script>
export default {
    name: 'DynamicMenuView',
}
</script>
