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
            <slds-datetime-picker/>
        </slds-card>

    </main>
</template>

<script>
export default {
    name: "DatetimePicker",
}
</script>
