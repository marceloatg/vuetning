<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Expression"
            details="Components"
        >
            <template #details>
                Expression builders help users declaratively construct logical expressions. These expressions can be
                used when querying for a filtered set of records, creating rules to control when something executes, or
                any other conditional logic.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">
            <slds-expression/>
        </slds-card>

    </main>
</template>

<script>
export default {
    name: 'Expression',
}
</script>
