<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Rich Text Editor"
            details="Components"
        >
            <template #details>
                The Rich Text Editor is a textarea with added capabilities for use in various publishers.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">
            <slds-rich-text-editor
                v-model="value"
                label="Details and Steps to Reproduce"
                syntax-highlighter
                placeholder="Compose an epic..."
            />
        </slds-card>

    </main>
</template>

<script>
export default {
    name: "RichTextEditor",

    data() {
        return {
            value: null,
        }
    },
}
</script>
