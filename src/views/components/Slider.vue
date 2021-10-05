<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Slider"
            details="Components"
        >
            <template #details>
                An input range slider lets the user specify a numeric value which must be between two specified values.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">
            <slds-slider/>
        </slds-card>

    </main>
</template>

<script>
export default {
    name: 'Slider',
}
</script>
