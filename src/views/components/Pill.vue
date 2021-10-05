<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Pill"
            details="Components"
        >
            <template #details>
                A pill represents an object that can be viewed with or without an icon.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">
            <slds-pill/>
        </slds-card>

    </main>
</template>

<script>
export default {
    name: 'Pill',
}
</script>
