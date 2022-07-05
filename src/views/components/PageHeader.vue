<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Page Header"
            details="Components"
        >
            <template #details>
                Notifications serve as a feedback & confirmation mechanism that comes in at the top right.
            </template>
        </slds-page-header>

        <slds-page-header
            icon="standard:opportunity"
            title="Rohde Corp - 80,000 Widgets"
            meta="Mark Jaeckal • Unlimited Customer • 11/13/15"
            class="slds-m-top_medium"
        />

        <slds-page-header
            object-home
            icon="standard:opportunity"
            name="Opportunities"
            title="Recently Viewed"
            class="slds-m-top_medium"
            has-dropdown
        >
            <template #actions>
                <slds-button neutral label="New"/>
            </template>
        </slds-page-header>

        <slds-page-header
            object-home
            icon="standard:opportunity"
            name="Opportunities"
            title="Recently Viewed"
            meta="10 items • Updated 13 minutes ago"
            class="slds-m-top_medium"
            has-dropdown
        >

            <template #actions>
                <slds-button neutral label="New"/>
            </template>

            <template #controls>
                <slds-button-group>
                    <slds-button-icon bordered-filled icon="utility:copy"/>
                    <slds-button-icon bordered-filled icon="utility:edit"/>
                    <slds-button-icon bordered-filled icon="utility:delete"/>
                </slds-button-group>
            </template>

        </slds-page-header>

        <slds-page-header
            record-home
            icon="standard:opportunity"
            name="Opportunities"
            title="Acme - 1,200 Widgets"
            class="slds-m-top_medium"
        >

            <template #actions>
                <slds-button neutral label="New"/>
            </template>

            <template #details>
                <slds-page-header-detail title="Field 1" value="Description that demonstrates truncation with a long text field."/>
                <slds-page-header-detail title="Field " value="Hyperlink" is-link/>
            </template>

        </slds-page-header>

        <slds-page-header
            related-list
            name="Opportunities"
            title="Recently Viewed"
            meta="10 items • Updated 13 minutes ago"
            class="slds-m-top_medium"
            has-dropdown
        >

            <template #actions>
                <slds-button neutral label="New"/>
            </template>

            <template #controls>
                <slds-button-group>
                    <slds-button-icon bordered-filled icon="utility:copy"/>
                    <slds-button-icon bordered-filled icon="utility:edit"/>
                    <slds-button-icon bordered-filled icon="utility:delete"/>
                </slds-button-group>
            </template>

        </slds-page-header>

    </main>
</template>

<script>

export default {
    name: 'PageHeaderViewView',
}
</script>
