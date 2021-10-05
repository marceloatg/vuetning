<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Checkbox Button"
            details="Components"
        >
            <template #details>
                A styled checkable input that communicates if an option is being added to a group.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">
            <slds-checkbox-button
                v-model="value"
            />
        </slds-card>

    </main>
</template>

<script>
export default {
    name: 'CheckboxButton',

    data() {
        return {
            value: false
        }
    }
}
</script>
