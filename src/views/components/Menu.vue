<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Menu"
            details="Components"
        >
            <template #details>
                A Menu offers a list of actions or functions that a user can access.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">

            <slds-menu
                bordered-filled
                icon="utility:thunder"
                :items="stringOptions"
                :length="5"
                @click="onClick"
            />

            <slds-menu
                bordered-filled
                :items="iconOptions"
                @click="onClick"
            />

            <br>

            Value: {{ value }}

        </slds-card>

    </main>
</template>

<script>
export default {
    name: "Menu",

    data() {
        return {
            iconOptions: [
                {
                    heading: 'Group One'
                },
                {
                    name: 'Accounts',
                    label: 'Accounts',
                    level: 'error',
                    leftIcon: 'utility:error',
                    disabled: false
                },
                {
                    name: 'Contacts',
                    label: 'Contacts',
                    level: 'warning',
                    leftIcon: 'utility:warning',
                    disabled: false
                },
                {
                    name: 'Leads',
                    label: 'Leads',
                    level: 'success',
                    leftIcon: 'utility:success',
                    disabled: false
                },
                {
                    name: 'Groups',
                    label: 'Groups',
                    leftIcon: 'standard:groups',
                    disabled: false
                },
                {
                    name: 'Users',
                    label: 'Users',
                    leftIcon: 'utility:user',
                    rightIcon: 'utility:add',
                    disabled: false
                },
                {
                    divider: true
                },
                {
                    name: 'Files',
                    label: 'Files',
                    rightIcon: 'utility:ban',
                    disabled: true
                },
                {
                    name: 'Reports',
                    label: 'Reports',
                    leftIcon: 'utility:edit',
                    rightIcon: 'utility:engage',
                    disabled: true
                },
                {
                    name: 'Products',
                    label: 'Products',
                    leftIcon: 'standard:product',
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
    },

    methods: {
        onClick(value) {
            this.value = value
        }
    }
}
</script>
