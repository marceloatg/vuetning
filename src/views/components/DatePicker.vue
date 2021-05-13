<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Date Picker"
            details="Components"
        >
            <template #details>
                A datepicker is a text input to capture a date. You can select a single date, date range or date and
                time.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">
            <slds-date-picker/>
        </slds-card>

    </main>
</template>

<script>
export default {
    name: "DatePicker",
}
</script>
