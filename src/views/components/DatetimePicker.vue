<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Datetime Picker"
            details="Components"
        >
            <template #details>
                A datetime picker is used to select a day and a time.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">
            <slds-datetime-picker
                v-model="now"
                label="Read only mode"
                readonly
            />
        </slds-card>

        <slds-card class="slds-m-top_medium">
            <slds-datetime-picker
                v-model="now"
                label="Read only (pt-BR)"
                locale="pt-br"
                format="LLLL"
                readonly
            />
        </slds-card>

        <slds-card class="slds-m-top_medium">
            <slds-datetime-picker
                v-model="now"
                label="Read only (multiple formats)"
                locale="pt-br"
                :format="['L', 'LTS']"
                readonly
            />
        </slds-card>

        <slds-card class="slds-m-top_medium">
            <slds-datetime-picker/>
        </slds-card>

    </main>
</template>

<script>
export default {
    name: 'DatetimePickerView',

    data() {
        return {
            now: Date.now(),
        }
    },
}
</script>
