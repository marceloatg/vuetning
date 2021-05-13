<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Lookup"
            details="Components"
        >
            <template #details>
                Lookup is an autocomplete combobox that will search against a database object.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">

            <slds-lookup
                v-model="value"
                label="Relate To"
                :options="objectOptions"
                placeholder="Search..."
                loading
            />

            <br>

            Value: {{ value }}

        </slds-card>

    </main>
</template>

<script>
export default {
    name: "Lookup",

    data() {
        return {
            objectOptions: [
                {
                    name: 'Accounts',
                    label: 'Accounts',
                    meta: 'Represents business',
                    icon: 'standard:account',
                    disabled: false
                },
                {
                    name: 'Contacts',
                    label: 'Contacts',
                    meta: 'Represents people',
                    icon: 'standard:contact',
                    disabled: false
                },
                {
                    name: 'Leads',
                    label: 'Leads',
                    meta: 'Represents potential accounts',
                    icon: 'standard:lead',
                    disabled: false
                },
                {
                    name: 'Groups',
                    label: 'Groups',
                    meta: 'Represents groups of users',
                    disabled: false
                },
                {
                    name: 'Files',
                    label: 'Files',
                    meta: 'Represents files',
                    icon: 'standard:file',
                    disabled: true
                },
                {
                    name: 'Reports',
                    label: 'Reports',
                    meta: 'Represents custom reports',
                    icon: 'standard:report',
                    disabled: false
                },
                {
                    name: 'Products',
                    label: 'Products',
                    meta: 'Represents goods to sell',
                    icon: 'standard:product',
                    disabled: false
                },
                {
                    name: 'Users',
                    label: 'Users',
                    meta: 'Represents internal users',
                    icon: 'standard:user',
                    disabled: false
                },
            ],
            stringOptions: ['Accounts', 'Contacts', 'Leads', 'Groups', 'Files', 'Reports', 'Products', 'Users'],
            value: null,
        }
    }
}
</script>
