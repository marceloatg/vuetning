<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Checkbox Toggle"
            details="Components"
        >
            <template #details>
                A checkable input that communicates if an option is true, false or indeterminate.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">
            <slds-checkbox-toggle
                v-model="value"
                label="Toggle Label"
                inline
                disabled
            />
        </slds-card>

    </main>
</template>

<script>
export default {
    name: 'CheckboxToggleView',

    data() {
        return {
            value: false
        }
    }
}
</script>
