<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Dynamic Icon"
            details="Components"
        >
            <template #details>
                A set of delightful animated icons.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">
            <slds-dynamic-icon/>
        </slds-card>

    </main>
</template>

<script>
export default {
    name: 'DynamicIconView',
}
</script>
