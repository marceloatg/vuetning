<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Button"
            details="Components"
        >
            <template #details>
                Displays a nested tree.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">

            <slds-button
                brand
                label="Click Me"
                @click="onclick"
            />

            <slds-button
                brand
                label="Click Me"
                icon="utility:add"
                @click="onclick"
            />

        </slds-card>

    </main>
</template>

<script>
export default {
    name: "Button",

    methods: {
        onclick() {
            console.log('Clicked!')
        }
    }
}
</script>
