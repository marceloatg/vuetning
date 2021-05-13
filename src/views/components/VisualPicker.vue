<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Visual Picker"
            details="Components"
        >
            <template #details>
                A visual picker can be either radio buttons, checkboxes, or links that are visually enhanced.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">
            <slds-visual-picker/>
        </slds-card>

    </main>
</template>

<script>
export default {
    name: "VisualPicker",
}
</script>
