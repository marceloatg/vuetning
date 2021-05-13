<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Docked Form Footer"
            details="Components"
        >
            <template #details>
                Docked form footer is used to dock form actions to the bottom of the viewport.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">
            <slds-docked-form-footer/>
        </slds-card>

    </main>
</template>

<script>
export default {
    name: "DockedFormFooter",
}
</script>
