<template>
    <footer class="slds-modal__footer">

        <!-- Secondary button -->
        <slds-button :label="secondaryButtonLabel" @click.stop="onSecondaryClick"/>

        <!-- Primary button -->
        <slds-button :label="primaryButtonLabel" variant="brand" @click.stop="onPrimaryClick"/>

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
        methods: {
            onPrimaryClick() {
                this.$emit('primaryclick');
            },
            onSecondaryClick() {
                this.$emit('secondaryclick');
            },
        },
    }
</script>