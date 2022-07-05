<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Radio Button Group"
            details="Components"
        >
            <template #details>
                A styled select list that can have a single entry checked at any one time.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">
            <slds-radio-button-group/>
        </slds-card>

    </main>
</template>

<script>
export default {
    name: 'RadioButtonGroupView',
}
</script>
