<template>
    <div>

        <!-- Modal -->
        <section role="dialog" tabindex="-1" class="slds-modal slds-fade-in-open" :class="`slds-modal_${size}`">
            <div class="slds-modal__container">

                <!-- Header -->
                <slds-modal-header :header-empty="headerEmpty" :heading="heading" @close="onClose">
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
                    :secondary-button-label="secondaryButtonLabel"
                    @primaryclick="onPrimaryClick"
                    @secondaryclick="onSecondaryClick"/>

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
            size: {
                type: String,
                default: 'default',
                validator(value) {
                    return [
                        'default',
                        'small',
                        'medium',
                        'large',
                    ].indexOf(value) !== -1
                },
            },
        },
        created() {
            document.body.addEventListener("keyup", this.onKeyUp);
        },
        destroyed() {
            document.body.removeEventListener("keyup", this.onKeyUp);
        },
        methods: {
            onClose() {
                this.$emit('close');
            },
            onKeyUp(event) {
                switch (event.key) {

                    case 'Enter':
                        if (!this.$slots.footer) this.onPrimaryClick();
                        break;

                    case 'Escape':
                        this.onClose();
                        break;
                }
            },
            onPrimaryClick() {
                this.$emit('primaryclick');
            },
            onSecondaryClick() {
                this.$emit('secondaryclick');
            },
        },
    }
</script>