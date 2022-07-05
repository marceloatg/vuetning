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
                tooltip="Lorem ipsum dolor sit amet."
                min="0"
                max="100"
                step="10"
            />
        </slds-card>

        <slds-card class="slds-m-top_medium">
            <slds-counter
                v-model="bigValue"
                label="Read only"
                readonly
            />
        </slds-card>

        <slds-card class="slds-m-top_medium">
            <slds-counter
                v-model="bigValue"
                label="Read only (custom format)"
                format="'0,0.00'"
                readonly
            />
        </slds-card>

        <slds-card class="slds-m-top_medium">
            <slds-counter
                v-model="bigValue"
                label="Read only (pt-BR)"
                locale="pt-BR"
                format="'0,0.00'"
                readonly
            />
        </slds-card>

    </main>
</template>

<script>
export default {
    name: 'CounterView',

    data() {
        return {
            value: 0,
            bigValue: 1234657890.123
        }
    }
}
</script>
