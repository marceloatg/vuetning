<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Popover"
            details="Components"
        >
            <template #details>
                A popover is a non-modal dialog. The component should be paired with a clickable trigger element and
                contain at least one focusable element.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">
            <slds-popover/>
        </slds-card>

    </main>
</template>

<script>
export default {
    name: 'PopoverView',
}
</script>
