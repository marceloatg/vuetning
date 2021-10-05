<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="File"
            details="Components"
        >
            <template #details>
                Files are a representation of content uploaded as an attachment.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">
            <slds-file/>
        </slds-card>

    </main>
</template>

<script>
export default {
    name: 'File',
}
</script>
