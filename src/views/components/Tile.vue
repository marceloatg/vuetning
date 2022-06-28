<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Tile"
            details="Components"
        >
            <template #details>
                A tile is a grouping of related information associated with a record.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium" title="Base">
            <slds-tile title="Salesforce UX" no-link @click="clickTitle">

                <slds-tile-item
                    label="First Label:"
                    detail="Description for first label."
                />

                <slds-tile-item
                    label="Second Label:"
                    detail="Description for second label."
                />

            </slds-tile>
        </slds-card>

        <slds-card class="slds-m-top_medium" title="Default with actions">
            <slds-tile
                :actions="iconOptions"
                title="Salesforce UX"
            >

                <slds-tile-item
                    label="First Label:"
                    detail="Description for first label."
                />

                <slds-tile-item
                    label="Second Label:"
                    detail="Description for second label."
                />

            </slds-tile>
        </slds-card>

        <slds-card class="slds-m-top_medium" title="With icon">
            <slds-tile
                title="Salesforce UX"
                icon="standard:user"
            >

                <slds-tile-item
                    label="First Label:"
                    detail="Description for first label."
                />

                <slds-tile-item
                    label="Second Label:"
                    detail="Description for second label."
                />

            </slds-tile>
        </slds-card>

        <slds-card class="slds-m-top_medium" title="With avatar">
            <slds-tile
                avatar="/assets/images/avatar2.jpg"
                title="Salesforce UX"
            />
        </slds-card>

        <slds-card class="slds-m-top_medium" title="Article">
            <slds-tile
                title="Company One beats Company Two to the 200-mile affordable electric car"
            >
                <slds-tile-article
                    author="Gustavo Gomes"
                    :items="articleItems"
                />

            </slds-tile>
        </slds-card>

    </main>
</template>

<script>
export default {
    name: 'Tile',

    data() {
        return {
            articleItems: ['Breaking News', '1 day ago'],

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
        }
    },

    methods: {
        clickTitle() {
            alert('Click')
        }
    }
}
</script>
