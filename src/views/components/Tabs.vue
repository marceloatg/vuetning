<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Tabs"
            details="Components"
        >
            <template #details>
                Tabs keeps related content in a single container that is shown and hidden through navigation.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">
            <slds-tabs :tabs="objectTabs">

                <template #opportunities>
                    Item One Content
                </template>

                <template #cases>
                    Item Two Content
                </template>

                <template #products>
                    Item Three Content
                </template>

                <template #contacts>
                    Item Three Contacts
                </template>

            </slds-tabs>
        </slds-card>

    </main>
</template>

<script>
export default {
    name: "Tabs",

    data() {
        return {
            tabs: ['Opportunities', 'Cases', 'Products'],
            objectTabs: [
                {label: 'Opportunities', name: 'opportunities', icon: 'standard:opportunity'},
                {label: 'Cases', name: 'cases', icon: 'standard:case'},
                {label: 'Products', name: 'products', icon: 'standard:product', error: true},
                {label: 'Contacts', name: 'contacts', icon: 'standard:contact'},
            ]
        }
    }
}
</script>
