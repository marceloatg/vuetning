<template>
    <div>

        <!-- Modal -->
        <section tabindex="-1" class="slds-modal slds-fade-in-open" :class="`slds-modal_${size}`">
            <div class="slds-modal__container">

                <!-- Header -->
                <header class="slds-modal__header" :class="[{'slds-modal__header_empty': !$slots.header}, headerClass]">

                    <!-- Close button -->
                    <slds-button-icon
                        icon-name="utility:close"
                        container="none"
                        variant="inverse"
                        size="large"
                        title="close"
                        class="slds-modal__close"
                        @click.stop="onClose"/>

                    <slot name="header"/>

                </header>

                <!-- Content -->
                <div class="slds-modal__content" :class="contentClass">
                    <slot name="content"/>
                </div>

                <!-- Footer -->
                <footer v-if="$slots.footer" class="slds-modal__footer" :class="footerClass">
                    <slot name="footer"/>
                </footer>

            </div>
        </section>

        <!-- Backdrop -->
        <div class="slds-backdrop slds-backdrop_open"/>

    </div>
</template>

<script>
    import SldsButtonIcon from '../ButtonIcon/index'

    export default {
        components: {
            SldsButtonIcon,
        },
        props: {
            contentClass: {
                type: String,
                default: 'slds-p-around_medium',
            },
            footerClass: {
                type: String,
            },
            headerClass: {
                type: String,
            },
            heading: {
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
        beforeDestroy() {
            document.body.removeEventListener("keyup", this.onKeyUp);
        },
        methods: {
            onClose() {
                this.$emit('close');
            },
            onKeyUp(event) {
                if (event.key === 'Escape') this.onClose();
            },
        },
    }
</script>

<style scoped lang="scss">
    .slds-modal {
        .slds-modal__content.slds-overflow_initial {
            overflow: initial;
        }
    }
</style>
