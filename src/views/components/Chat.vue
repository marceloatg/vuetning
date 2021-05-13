<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Chat"
            details="Components"
        >
            <template #details>
                The Chat component is used to display real-time and past chat logs between service agents and customers.
                It comes with a number of sub components that can be used to display the different types of chat items.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">
            <slds-chat/>
        </slds-card>

    </main>
</template>

<script>
export default {
    name: "Chat",
}
</script>
