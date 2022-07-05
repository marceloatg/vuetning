<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Badge"
            details="Button Group"
        >
            <template #details>
                Button groups are used to bunch together buttons with similar actions.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">
            <slds-button-group/>
        </slds-card>

    </main>
</template>

<script>
export default {
    name: 'ButtonGroupView',
}
</script>
