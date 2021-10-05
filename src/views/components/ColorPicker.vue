<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Color Picker"
            details="Components"
        >
            <template #details>
                A configurable interface for color selection.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">
            <slds-color-picker/>
        </slds-card>

    </main>
</template>

<script>
export default {
    name: 'ColorPicker',
}
</script>
