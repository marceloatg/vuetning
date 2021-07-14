<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Welcome Mat"
            details="Components"
        >
            <template #details>
                A Welcome Mat provides a series of unordered items a user can click to learn about a thematic topic.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">
            <slds-welcome-mat/>
        </slds-card>

    </main>
</template>

<script>
export default {
    name: "WelcomeMat",
}
</script>
