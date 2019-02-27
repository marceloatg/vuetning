<template>
    <footer class="slds-modal__footer">

        <!-- Secondary button -->
        <slds-button
            ref="secondaryButton"
            :label="secondaryButtonLabel"
            @click="onSecondaryClick"/>

        <!-- Primary button -->
        <slds-button
            ref="primaryButton"
            :label="primaryButtonLabel"
            variant="brand"
            @click="onPrimaryClick"/>

    </footer>
</template>

<script>
    import SldsButton from '../Button/Index'

    export default {
        components: {
            SldsButton,
        },
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