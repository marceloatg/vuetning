<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Checkbox Group"
            details="Components"
        >
            <template #details>
                A checkable input that communicates if an option is true, false or indeterminate.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">
            <slds-checkbox-group
                v-model="value"
                label="Lorem ipsum"
            />
        </slds-card>

    </main>
</template>

<script>
export default {
    name: "CheckboxGroup",

    data() {
        return {
            value: false
        }
    }
}
</script>
