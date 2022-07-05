<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Feed"
            details="Components"
        >
            <template #details>
                A feed consists of a list of recurring elements of similar types. Examples of a feed would be a
                discussion feed.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">
            <slds-feed/>
        </slds-card>

    </main>
</template>

<script>
export default {
    name: 'FeedView',
}
</script>
