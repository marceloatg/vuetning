<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Card"
            details="Components"
        >
            <template #details>
                Cards are used to apply a container around a related grouping of information.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">
            <slds-card
                icon="standard:account"
                title="Accounts"
            >
                Anything can go into the card body
            </slds-card>
        </slds-card>

    </main>
</template>

<script>
export default {
    name: "Card",
}
</script>
