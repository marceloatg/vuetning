<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Drop Zone"
            details="Components"
        >
            <template #details>
                Screen building elements that surround areas where components can be placed. Drop Zones visually
                indicate to users where they may drag and drop components onto a page.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">
            <slds-drop-zone/>
        </slds-card>

    </main>
</template>

<script>
export default {
    name: "DropZone",
}
</script>
