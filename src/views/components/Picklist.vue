<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Picklist"
            details="Components"
        >
            <template #details>
                A Picklist provides a user with an read-only input field that is accompanied with a listbox of
                pre-defined options. A picklist has both single and multi-selection patterns.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">

            <slds-picklist
                v-model="value"
                :options="stringOptions"
                label="Relate To"
                placeholder="Select an option..."
                tooltip="Lorem ipsum dolor sit amet."
                required
                loading
            />

            <br>

            <slds-picklist
                v-model="value"
                :options="objectOptions"
                label="Relate To"
                placeholder="Select an option..."
            />

            <br>

            Value: {{ value }}
        </slds-card>

    </main>
</template>

<script>
export default {
    name: 'PicklistView',

    data() {
        return {
            objectOptions: [
                {name: 'Accounts', label: 'Accounts', meta: 'Represents business', disabled: false},
                {name: 'Contacts', label: 'Contacts', meta: 'Represents people', disabled: false},
                {name: 'Leads', label: 'Leads', meta: 'Represents potential accounts', disabled: false},
                {name: 'Groups', label: 'Groups', meta: 'Represents groups of users', disabled: false},
                {name: 'Files', label: 'Files', meta: 'Represents files', disabled: true},
                {name: 'Reports', label: 'Reports', meta: 'Represents custom reports', disabled: false},
                {name: 'Products', label: 'Products', meta: 'Represents goods to sell', disabled: false},
                {name: 'Users', label: 'Users', meta: 'Represents internal users', disabled: false},
            ],
            stringOptions: ['Accounts', 'Contacts', 'Leads', 'Groups', 'Files', 'Reports', 'Products', 'Users'],
            value: null,
        }
    }
}
</script>
