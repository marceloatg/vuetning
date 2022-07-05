<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Progress Ring"
            details="Components"
        >
            <template #details>
                Customizable and configurable progress ring. Will display progress in a circular progress bar factor,
                and is capable of displaying iconography inside of the ring structure.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">
            <slds-progress-ring/>
        </slds-card>

    </main>
</template>

<script>
export default {
    name: 'ProgressRingView',
}
</script>
