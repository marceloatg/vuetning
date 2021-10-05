<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Map"
            details="Components"
        >
            <template #details>
                A map component is used to find a location.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">
            <slds-map/>
        </slds-card>

    </main>
</template>

<script>
export default {
    name: 'Map',
}
</script>
