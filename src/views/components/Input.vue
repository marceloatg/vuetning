<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Input"
            details="Components"
        >
            <template #details>
                Text inputs are used for freeform data entry.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">
            <slds-input
                v-model="value"
                label="Form Label"
                icon="utility:search"
            >
                <template #error>
                    Enter a value.
                </template>
            </slds-input>
        </slds-card>

    </main>
</template>

<script>
export default {
    name: 'Input',

    data() {
        return {
            value: 'My input value'
        }
    }
}
</script>
