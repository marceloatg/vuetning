<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Illustration"
            details="Components"
        >
            <template #details>
                An illustration is an image and inline text that work in tandem to communicate a state in a more
                friendly way.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">
            <slds-illustration/>
        </slds-card>

    </main>
</template>

<script>
export default {
    name: 'IllustrationView',
}
</script>
