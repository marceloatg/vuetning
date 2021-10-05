<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Tree"
            details="Components"
        >
            <template #details>
                A tree is visualization of a structure hierarchy. A branch can be expanded or collapsed.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">
            <slds-tree/>
        </slds-card>

    </main>
</template>

<script>
export default {
    name: 'Tree',
}
</script>
