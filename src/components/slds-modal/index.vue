<template>
    <div ref="root" tabindex="0" @keyup.esc="onClose" @keyup.enter="onSubmit">

        <!-- Modal -->
        <section tabindex="-1" class="slds-modal slds-fade-in-open" :class="size">
            <div class="slds-modal__container">

                <!-- Header -->
                <header class="slds-modal__header" :class="[{'slds-modal__header_empty': !$slots.header}, headerClass]">

                    <!-- Close button -->
                    <slds-button-icon
                        icon="utility:close"
                        inverse
                        large
                        title="close"
                        class="slds-modal__close"
                        @click.stop="onClose"/>

                    <slot name="header"/>

                </header>

                <!-- Content -->
                <div
                    class="slds-modal__content"
                    :class="[contentClass, contentClasses]">
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
import SldsButtonIcon from '../slds-button-icon/index.vue'

export default {
    name: 'SldsModal',

    components: {
        SldsButtonIcon,
    },

    props: {
        contentClass: {
            type: String,
            default: 'slds-p-around_medium',
        },
        fixedHeight: Boolean,
        footerClass: String,
        headerClass: String,
        initialOverflow: Boolean,
        large: Boolean,
        maxHeight: Boolean,
        medium: Boolean,
        small: Boolean,
    },

    computed: {
        contentClasses() {
            return {
                'slds-grow': this.maxHeight,
                'slds-modal_fixed-height': this.fixedHeight,
                'slds-overflow_initial': this.initialOverflow
            };
        },

        size() {
            if (this.small) return 'slds-modal_small';
            if (this.medium) return 'slds-modal_medium';
            if (this.large) return 'slds-modal_large';
            return '';
        },
    },

    mounted() {
        this.$refs.root.focus();
    },

    methods: {
        onClose() {
            this.$emit('close');
        },

        onSubmit() {
            this.$emit('submit');
        },
    },
}
</script>

<style scoped lang="scss">
.slds-modal {
    .slds-modal__content.slds-overflow_initial {
        overflow: initial;
    }

    .slds-modal__content.slds-modal_fixed-height {
        height: 500px;
    }

    @media (max-height: 700px) {
        .slds-modal__content.slds-modal_fixed-height {
            height: 400px;
        }
    }

    .slds-modal__footer .slds-popover__container {
        text-align: left;

        & + .slds-popover__container,
        & + .slds-button {
            margin-left: 0.5rem;
        }
    }
}
</style>
