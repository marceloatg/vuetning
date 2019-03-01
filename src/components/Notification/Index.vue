<template>
    <section class="slds-notification">
        <div class="slds-notification__body">

            <a class="slds-notification__target slds-media">

                <!-- Icon -->
                <slds-icon icon-name="standard:event" size="small" class="slds-media__figure"/>

                <!-- Body -->
                <div class="slds-media__body">
                    <h2 class="slds-text-heading_small slds-m-bottom_xx-small">
                        Tesla - Renewal meeting
                    </h2>
                    <p>
                        Event at 11:00am on Jan 8
                    </p>
                </div>

            </a>

            <!-- Close button -->
            <slds-button-icon
                icon-name="utility:close"
                container="bare"
                class="slds-notification__close"
                @click="onClose"/>

        </div>
    </section>
</template>

<script>
    export default {
        methods: {
            onClose() {
                this.$emit('close');
            },
        },
    }
</script>

<style scoped>

</style>