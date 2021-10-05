<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Icon"
            details="Components"
        >
            <template #details>
                Icons provide visual context and enhance usability. Read more in the Iconography design guideline and
                for a full list of icons available, visit the Icons page.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">
            <slds-icon icon="utility:announcement"/>
        </slds-card>

    </main>
</template>

<script>
export default {
    name: 'Icon',
}
</script>
