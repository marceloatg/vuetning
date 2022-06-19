<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Multi-Picklist"
            details="Components"
        >
            <template #details>
                A Picklist provides a user with an read-only input field that is accompanied with a listbox of
                pre-defined options. A picklist has both single and multi-selection patterns.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">

            <slds-multi-picklist
                v-model="values"
                :options="objectOptions"
                label="Relate To"
                placeholder="Select an option..."
                tooltip="Lorem ipsum dolor sit amet."
            />

            <br>

            Values: {{ values }}
        </slds-card>

    </main>
</template>

<script>
export default {
    name: 'MultiPicklist',

    data() {
        return {
            objectOptions: [
                {value: '7a8478ba-aa60-4385-a963-075db1fb2d7f', label: 'Accounts', meta: 'Represents business', disabled: false, nonRemovable: true},
                {value: 'fb457804-8af7-4f30-bca9-c830dc0ebb7c', label: 'Contacts', meta: 'Represents people', disabled: false},
                {value: '8c5a8e0e-31f0-433a-b6f6-c0da8e612668', label: 'Leads', meta: 'Represents potential accounts', disabled: false},
                {value: '46938efc-7767-460a-958f-8b66eb545c26', label: 'Groups', meta: 'Represents groups of users', disabled: false},
                {value: '3dcc8c38-242b-4890-aafa-6ea14aea0d1f', label: 'Files', meta: 'Represents files', disabled: true},
                {value: 'ecb67ff8-0b5d-44f9-9871-1fc6fe164c45', label: 'Reports', meta: 'Represents custom reports', disabled: false},
                {value: '9bc518c8-579a-41dc-95da-28340d238729', label: 'Products', meta: 'Represents goods to sell', disabled: false},
                {value: '5d18d77c-495b-4ae9-9772-9ec1adb49344', label: 'Users', meta: 'Represents internal users', disabled: false},
            ],
            values: [],
        }
    }
}
</script>
