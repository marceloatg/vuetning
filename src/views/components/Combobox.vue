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
    value: "Combobox",

    data() {
        return {
            iconOptions: [
                {
                    heading: 'Group One'
                },
                {
                    value: 'Accounts',
                    label: 'Accounts',
                    meta: 'Represents business',
                    icon: 'standard:account',
                    disabled: false
                },
                {
                    value: 'Contacts',
                    label: 'Contacts',
                    meta: 'Represents people',
                    icon: 'standard:contact',
                    disabled: false
                },
                {
                    value: 'Leads',
                    label: 'Leads',
                    meta: 'Represents potential accounts',
                    icon: 'standard:lead',
                    disabled: false
                },
                {
                    value: 'Groups',
                    label: 'Groups',
                    meta: 'Represents groups of users',
                    icon: 'standard:groups',
                    disabled: false
                },
                {
                    value: 'Users',
                    label: 'Users',
                    meta: 'Represents internal users',
                    icon: 'standard:user',
                    disabled: false
                },
                {
                    heading: 'Group Two'
                },
                {
                    value: 'Files',
                    label: 'Files',
                    meta: 'Represents files',
                    icon: 'standard:file',
                    disabled: true
                },
                {
                    value: 'Reports',
                    label: 'Reports',
                    meta: 'Represents custom reports',
                    icon: 'standard:report',
                    disabled: false
                },
                {
                    value: 'Products',
                    label: 'Products',
                    meta: 'Represents goods to sell',
                    icon: 'standard:product',
                    disabled: false
                },
            ],
            objectOptions: [
                {value: '6a978413-76b9-44c7-9ca4-bde3178382aa', label: 'Accounts', meta: 'Represents business', disabled: false},
                {value: '0f913c2c-56aa-48e9-8771-6739e62c39a0', label: 'Contacts', meta: 'Represents people', disabled: false},
                {value: '46f3c0b6-0cee-4d69-bfb2-96884078f32a', label: 'Leads', meta: 'Represents potential accounts', disabled: false},
                {value: 'f6f8b9e3-e809-4937-ad97-fa2777728040', label: 'Groups', meta: 'Represents groups of users', disabled: false},
                {value: 'd91a24a5-aa7e-4b43-be0f-6f8897e9210b', label: 'Files', meta: 'Represents files', disabled: true},
                {value: 'baf6a685-dcfe-43bf-99be-4108189798b3', label: 'Reports', meta: 'Represents custom reports', disabled: false},
                {value: 'ba21361f-6020-4c0e-a3aa-6b7897484588', label: 'Products', meta: 'Represents goods to sell', disabled: false},
                {value: '48d5d099-0a31-4f33-9548-6f821c20a045', label: 'Users', meta: 'Represents internal users', disabled: false},
            ],
            stringOptions: ['Accounts', 'Contacts', 'Leads', 'Groups', 'Files', 'Reports', 'Products', 'Users'],
            value: null,
        }
    }
}
</script>
