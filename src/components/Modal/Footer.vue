<template>
    <footer class="slds-modal__footer">

        <!-- Secondary button -->
        <slds-button :label="secondaryButtonLabel"/>

        <!-- Primary button -->
        <slds-button :label="primaryButtonLabel" variant="brand"/>

    </footer>
</template>

<script>
    export default {
        props: {
            primaryButtonLabel: {
                type: String,
                default: 'Save',
            },
            secondaryButtonLabel: {
                type: String,
                default: 'Cancel',
            },
        },
    }
</script>