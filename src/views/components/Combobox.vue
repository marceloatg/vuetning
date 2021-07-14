<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Combobox"
            details="Components"
        >
            <template #details>
                A widget that provides a user with an input field that is either an autocomplete or readonly,
                accompanied by a listbox of options.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">

            <slds-combobox
                v-model="value"
                :options="stringOptions"
                label="Relate To"
                placeholder="Select an option..."
                required
                loading
            />

            <br>

            <slds-combobox
                v-model="value"
                :options="objectOptions"
                label="Relate To"
                placeholder="Select an option..."
            />

            <br>

            <slds-combobox
                v-model="value"
                :options="iconOptions"
                label="Relate To"
                placeholder="Select an option..."
            />

            <br>

            Value: {{ value }}
        </slds-card>

        <slds-card class="slds-m-top_medium" title="Lengths">

            <slds-combobox
                v-model="value"
                :options="stringOptions"
                label="Fluid combobox"
                placeholder="Select an option..."
            />

            <br>

            <slds-combobox
                v-model="value"
                :options="stringOptions"
                label="Length 10 combobox"
                placeholder="Select an option..."
                :length="10"
            />

            <br>

            <slds-combobox
                v-model="value"
                :options="stringOptions"
                label="Length 7 combobox"
                placeholder="Select an option..."
                :length="7"
            />

            <br>

            <slds-combobox
                v-model="value"
                :options="stringOptions"
                label="Length 5 combobox"
                placeholder="Select an option..."
                :length="5"
            />

        </slds-card>

        <slds-card class="slds-m-top_medium" title="Sizes">

            <slds-combobox
                v-model="value"
                :options="stringOptions"
                label="Fluid combobox"
                placeholder="Select an option..."
            />

            <br>

            <slds-combobox
                v-model="value"
                :options="stringOptions"
                label="xx-large combobox"
                placeholder="Select an option..."
                xx-large
            />

            <br>

            <slds-combobox
                v-model="value"
                :options="stringOptions"
                label="x-large combobox"
                placeholder="Select an option..."
                x-large
            />

            <br>

            <slds-combobox
                v-model="value"
                :options="stringOptions"
                label="large combobox"
                placeholder="Select an option..."
                large
            />

            <br>

            <slds-combobox
                v-model="value"
                :options="stringOptions"
                label="medium combobox"
                placeholder="Select an option..."
                medium
            />

            <br>

            <slds-combobox
                v-model="value"
                :options="stringOptions"
                label="x-small combobox"
                placeholder="Select an option..."
                x-small
            />

            <br>

            <slds-combobox
                v-model="value"
                :options="stringOptions"
                label="xx-small combobox"
                placeholder="Select an option..."
                xx-small
            />

        </slds-card>

    </main>
</template>

<script>
export default {
    name: "Combobox",

    data() {
        return {
            iconOptions: [
                {
                    heading: 'Group One'
                },
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
                    icon: 'standard:groups',
                    disabled: false
                },
                {
                    name: 'Users',
                    label: 'Users',
                    meta: 'Represents internal users',
                    icon: 'standard:user',
                    disabled: false
                },
                {
                    heading: 'Group Two'
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
            ],
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
