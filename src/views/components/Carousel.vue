<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Carousel"
            details="Components"
        >
            <template #details>
                A carousel allows multiple pieces of featured content to occupy an allocated amount of space.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">
            <slds-carousel/>
        </slds-card>

    </main>
</template>

<script>
export default {
    name: 'Carousel',
}
</script>
