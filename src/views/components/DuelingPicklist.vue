<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Dueling Picklist"
            details="Components"
        >
            <template #details>
                A dueling-picklist is used to move options between two lists and is often referred to as a multi-select.
                Sometimes, the list options can then be re-ordered, depending on the use case.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">
            <slds-dueling-picklist/>
        </slds-card>

    </main>
</template>

<script>
export default {
    name: 'DuelingPicklistView',
}
</script>
