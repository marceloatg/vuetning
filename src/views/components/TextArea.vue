<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Text Area"
            details="Components"
        >
            <template #details>
                Textarea inputs are used for freeform data entry.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">

            <slds-text-area
                v-model="value"
                label="Textarea Label"
                placeholder="Placeholder text..."
            />

            <br>

            Value: {{ value }}

        </slds-card>

    </main>
</template>

<script>
export default {
    name: "TextArea",

    data() {
        return {
            value: null
        }
    }
}
</script>
