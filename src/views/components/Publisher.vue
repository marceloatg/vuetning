<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Publisher"
            details="Components"
        >
            <template #details>
                A publisher is an advanced longform text input form element.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">
            <slds-publisher/>
        </slds-card>

    </main>
</template>

<script>
export default {
    name: 'Publisher',
}
</script>
