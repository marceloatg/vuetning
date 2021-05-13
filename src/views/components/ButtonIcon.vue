<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Button Icon"
            details="Components"
        >
            <template #details>
                Button icons provide the user with visual iconography that is typically used to invoke an event or
                action.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">
            <slds-button-icon icon="utility:settings"/>
        </slds-card>

    </main>
</template>

<script>
export default {
    name: "ButtonIcon",
}
</script>
