<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Time Picker"
            details="Components"
        >
            <template #details>
                A timepicker is an autocomplete text input to capture a time.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">
            <slds-time-picker/>
        </slds-card>

    </main>
</template>

<script>
export default {
    name: 'TimePickerView',
}
</script>
