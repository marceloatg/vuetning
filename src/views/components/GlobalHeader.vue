<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Global Header"
            details="Components"
        >
            <template #details>
                The global header is the anchor for the Salesforce platform and spans all other parts of the UI. The
                functionality in the header is applicable across all contexts in the Salesforce ecosystem (internal or
                3rd party).
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">
            <slds-global-header>
                <template #actions>
                    <slds-global-action-setup/>
                    <slds-global-action-avatar src="/assets/images/avatar2.jpg"/>
                </template>
            </slds-global-header>
        </slds-card>

    </main>
</template>

<script>
export default {
    name: 'GlobalHeaderView',
}
</script>
