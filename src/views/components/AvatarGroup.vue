<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Avatar Group"
            details="Components"
        >
            <template #details>
                An avatar group is an element that communicates to the user that there is more than 1 person associated
                to an item.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">
            <slds-avatar-group/>
        </slds-card>

    </main>
</template>

<script>
export default {
    name: "AvatarGroup",
}
</script>
