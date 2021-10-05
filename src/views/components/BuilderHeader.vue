<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Builder Header"
            details="Components"
        >
            <template #details>
                Every builder needs a builder header, which contains basic navigation elements. It also shows the
                builder type and content name.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">
            <slds-builder-header/>
        </slds-card>

    </main>
</template>

<script>
export default {
    name: 'BuilderHeader',
}
</script>
