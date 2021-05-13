<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Panel"
            details="Components"
        >
            <template #details>
                A panel is typically used to provide supplemental information or form inputs that relate to your primary
                canvas.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">
            <slds-panel left title="Panel Header" back-button>
                A panel body accepts any layout or component
            </slds-panel>
        </slds-card>

    </main>
</template>

<script>
export default {
    name: "Panel",
}
</script>
