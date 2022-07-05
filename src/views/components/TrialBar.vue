<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Trial Bar"
            details="Components"
        >
            <template #details>
                Trial bar components are used to provide an interactive and educational prospect experience for setup.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">
            <slds-trial-bar/>
        </slds-card>

    </main>
</template>

<script>
export default {
    name: 'TrialBarView',
}
</script>
