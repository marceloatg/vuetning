<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Checkbox"
            details="Components"
        >
            <template #details>
                A checkable input that communicates if an option is true, false or indeterminate.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">
            <slds-checkbox
                v-model="value"
                label="Lorem ipsum"
                tooltip="Lorem ipsum dolor sit amet."
            />
        </slds-card>

    </main>
</template>

<script>
export default {
    name: 'Checkbox',

    data() {
        return {
            value: true
        }
    }
}
</script>
