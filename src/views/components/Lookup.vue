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
                tooltip="Lorem ipsum dolor sit amet."
                loading
            />

            <br>

            Value: {{ value }}

        </slds-card>

    </main>
</template>

<script>
export default {
    name: 'Lookup',

    data() {
        return {
            objectOptions: [
                {
                    value: '6a978413-76b9-44c7-9ca4-bde3178382aa',
                    label: 'Accounts',
                    meta: 'Represents business',
                    icon: 'standard:account',
                    disabled: false
                },
                {
                    value: '0f913c2c-56aa-48e9-8771-6739e62c39a0',
                    label: 'Contacts',
                    meta: 'Represents people',
                    icon: 'standard:contact',
                    disabled: false
                },
                {
                    value: '46f3c0b6-0cee-4d69-bfb2-96884078f32a',
                    label: 'Leads',
                    meta: 'Represents potential accounts',
                    icon: 'standard:lead',
                    disabled: false
                },
                {
                    value: 'f6f8b9e3-e809-4937-ad97-fa2777728040',
                    label: 'Groups',
                    meta: 'Represents groups of users',
                    disabled: false
                },
                {
                    value: 'd91a24a5-aa7e-4b43-be0f-6f8897e9210b',
                    label: 'Files',
                    meta: 'Represents files',
                    icon: 'standard:file',
                    disabled: true
                },
                {
                    value: 'baf6a685-dcfe-43bf-99be-4108189798b3',
                    label: 'Reports',
                    meta: 'Represents custom reports',
                    icon: 'standard:report',
                    disabled: false
                },
                {
                    value: 'ba21361f-6020-4c0e-a3aa-6b7897484588',
                    label: 'Products',
                    meta: 'Represents goods to sell',
                    icon: 'standard:product',
                    disabled: false
                },
                {
                    value: '48d5d099-0a31-4f33-9548-6f821c20a045',
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
