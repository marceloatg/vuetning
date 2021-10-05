<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Brand Band"
            details="Components"
        >
            <template #details>
                The brand band provides theming capability that adds personality and improves information density and contrast
                .
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">
            <slds-brand-band/>
        </slds-card>

    </main>
</template>

<script>
export default {
    name: 'BrandBand',
}
</script>
