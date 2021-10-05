<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="List Builder"
            details="Components"
        >
            <template #details>
                The List Builder is a quick, visual and efficient ‘shopping cart’ approach to adding multiple items to a
                parent object.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">
            <slds-list-builder/>
        </slds-card>

    </main>
</template>

<script>
export default {
    name: 'ListBuilder',
}
</script>
