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
            base
            icon="standard:opportunity"
            title="Rohde Corp - 80,000 Widgets"
            details="Mark Jaeckal • Unlimited Customer • 11/13/15"
            class="slds-m-top_medium"
        />

        <slds-page-header
            icon="standard:opportunity"
            title="Recently Viewed"
            details="Opportunities"
            class="slds-m-top_medium"
            has-dropdown
        >
            <template #dropdown>
                <p class="slds-p-around_large">
                    Dropdown
                </p>
            </template>
        </slds-page-header>

        <slds-page-header
            icon="standard:opportunity"
            title="Recently Viewed"
            class="slds-m-top_medium"
        >
            <template #breadcrumb>
                <slds-breadcrumb/>
            </template>
        </slds-page-header>

    </main>
</template>

<script>
export default {
    name: "PageHeader",
}
</script>
