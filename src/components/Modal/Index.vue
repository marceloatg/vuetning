<template>
    <div>

        <!-- Modal -->
        <section role="dialog" tabindex="-1" class="slds-modal slds-fade-in-open">
            <div class="slds-modal__container">

                <!-- Header -->
                <slds-modal-header :header-empty="headerEmpty" :heading="heading">
                    <template #tagline>
                        <slot name="tagline"/>
                    </template>
                </slds-modal-header>

                <!-- Body -->
                <div class="slds-modal__content" :class="bodyClass">
                    <slot name="body"/>
                </div>

                <!-- Footer -->
                <footer v-if="$slots.footer" class="slds-modal__footer">
                    <slot name="footer"/>
                </footer>

                <slds-modal-footer
                    v-else
                    :primary-button-label="primaryButtonLabel"
                    :secondary-button-label="secondaryButtonLabel"/>

            </div>
        </section>

        <!-- Backdrop -->
        <div class="slds-backdrop slds-backdrop_open"/>

    </div>
</template>

<script>
    import SldsModalFooter from './Footer'
    import SldsModalHeader from './Header'

    export default {
        components: {
            SldsModalFooter,
            SldsModalHeader,
        },
        props: {
            bodyClass: {
                type: String,
                default: 'slds-p-around_medium',
            },
            headerEmpty: {
                type: Boolean,
                default: false,
            },
            heading: {
                type: String,
                required: true,
            },
            primaryButtonLabel: {
                type: String,
            },
            secondaryButtonLabel: {
                type: String,
            },
        },
    }
</script>

<style lang="scss">
    .slds-backdrop_open {
        pointer-events: none;
    }
</style>