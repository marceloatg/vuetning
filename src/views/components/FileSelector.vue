<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="File Selector"
            details="Components"
        >
            <template #details>
                The File selector component allows the user to select file(s) from a user’s file system. Either natively
                using an file input or drag and drop.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">
            <slds-file-selector/>
        </slds-card>

    </main>
</template>

<script>
export default {
    name: "FileSelector",
}
</script>
