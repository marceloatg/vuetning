<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Spinner"
            details="Components"
        >
            <template #details>
                Spinners are CSS loading indicators that should be shown when retrieving data or performing slow
                computations. In some cases, the first time a parent component loads, a stencil is preferred to indicate
                network activity.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">
            <slds-spinner/>
        </slds-card>

    </main>
</template>

<script>
export default {
    name: 'SpinnerView',
}
</script>
