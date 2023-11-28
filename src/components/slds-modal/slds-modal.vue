<template>
    <div
        ref="root"
        tabindex="0"
        @keyup.esc="handleClose"
        @keyup.enter="handleSubmit"
    >

        <!-- Modal -->
        <transition appear :name="transitionName">
            <section tabindex="-1" :class="modalClassNames">
                <div class="slds-modal__container">

                    <!-- Header -->
                    <header :class="modalHeaderClassNames">

                        <!-- Close button -->
                        <slds-button-icon
                            icon-name="utility:close"
                            inverse
                            large
                            title="close"
                            class="slds-modal__close"
                            @click.stop="handleClose"
                        />

                        <slot name="header"/>

                    </header>

                    <!-- Content -->
                    <div :class="modalContentClassNames">
                        <slot name="content"/>
                    </div>

                    <!-- Footer -->
                    <footer v-if="$slots.footer" :class="modalFooterClassNames">
                        <slot name="footer"/>
                    </footer>

                </div>
            </section>
        </transition>

        <!-- Backdrop -->
        <div class="slds-backdrop slds-backdrop_open"/>

    </div>
</template>

<script lang="ts">
import SldsButtonIcon from "../slds-button-icon/slds-button-icon.vue"
import { EVENTS } from "../../constants"
import { defineComponent } from "vue"

export default defineComponent({
    name: "SldsModal",

    components: {
        SldsButtonIcon,
    },

    props: {
        contentClass: { type: String, default: "slds-p-around_medium" },

        fixedHeight: Boolean,

        footerClass: String,

        headerClass: String,

        initialOverflow: Boolean,

        large: Boolean,

        maxHeight: Boolean,

        medium: Boolean,

        noAnimation: Boolean,

        small: Boolean,
    },

    computed: {
        /**
         * Transition name, if any.
         */
        transitionName(): string {
            return this.noAnimation ? "" : "blow-up"
        },

        /**
         * The CSS class names for the modal.
         */
        modalClassNames(): string {
            let classNames = "slds-modal slds-fade-in-open"

            if (this.small) classNames += " slds-modal_small"
            else if (this.medium) classNames += " slds-modal_medium"
            else if (this.large) classNames += " slds-modal_large"

            return classNames
        },

        /**
         * The CSS class names for the modal content.
         */
        modalContentClassNames(): string {
            let classNames = "slds-modal__content"

            if (this.maxHeight) classNames += " slds-grow"
            if (this.fixedHeight) classNames += " slds-modal_fixed-height"
            if (this.initialOverflow) classNames += " slds-overflow_initial"
            if (this.contentClass && this.contentClass.length > 0) classNames += ` ${this.contentClass}`

            return classNames
        },

        /**
         * The CSS class names for the modal footer.
         */
        modalFooterClassNames(): string {
            let classNames = "slds-modal__footer"

            if (this.footerClass && this.footerClass.length > 0) classNames += this.footerClass

            return classNames
        },

        /**
         * The CSS class names for the modal header.
         */
        modalHeaderClassNames(): string {
            let classNames = "slds-modal__header"

            if (!this.$slots.header) classNames += " slds-modal__header_empty"
            if (this.headerClass && this.headerClass.length > 0) classNames += this.headerClass

            return classNames
        },
    },

    mounted() {
        (this.$refs.root as HTMLDivElement).focus()
    },

    methods: {
        /**
         * Handles the key up event on the esc key.
         */
        handleClose() {
            this.$emit(EVENTS.CLOSE)
        },

        /**
         * Handles the key up event on the enter key.
         */
        handleSubmit() {
            this.$emit(EVENTS.SUBMIT)
        },
    },
})
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

    .slds-modal__container {
        padding: 3rem 0 3rem;
    }
}

</style>
