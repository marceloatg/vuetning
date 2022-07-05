<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Toast"
            details="Components"
        >
            <template #details>
                Toast serves as a feedback & confirmation mechanism after the user takes an action.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">
            <slds-toasts/>
        </slds-card>

    </main>
</template>

<script>
export default {
    name: 'ToastsView',
}
</script>
