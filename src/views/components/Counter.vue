<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Counter"
            details="Components"
        >
            <template #details>
                The Counter allows a user to increase or decrease a numerical value.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">
            <slds-counter
                v-model="value"
                label="Counter Label"
                min="0"
                max="100"
                step="10"
            />
        </slds-card>

    </main>
</template>

<script>
export default {
    name: 'Counter',

    data() {
        return {
            value: 0,
        }
    }
}
</script>
