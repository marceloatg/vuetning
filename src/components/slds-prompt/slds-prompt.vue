<template>
    <div
        ref="root"
        tabindex="0"
        @keyup.esc="handleClose"
        @keyup.enter="handleSubmit"
    >

        <!-- Prompt -->
        <transition appear :name="transitionName">
            <section tabindex="-1" class="slds-modal slds-fade-in-open slds-modal_prompt">
                <div class="slds-modal__container">

                    <!-- Header -->
                    <header :class="headerClassNames">
                        <slot name="header"/>
                    </header>

                    <!-- Content -->
                    <div class="slds-modal__content slds-p-around_medium">
                        <slot name="content"/>
                    </div>

                    <!-- Footer -->
                    <footer class="slds-modal__footer slds-theme_default">
                        <slds-button :label="buttonLabel" neutral @click="handleSubmit"/>
                    </footer>

                </div>
            </section>
        </transition>

        <!-- Backdrop -->
        <div class="slds-backdrop slds-backdrop_open"/>

    </div>
</template>

<script lang="ts">
import SldsButton from "../slds-button/slds-button.vue"
import { EVENTS } from "../../constants"
import { defineComponent } from "vue"

export default defineComponent({
    name: "SldsPrompt",

    components: { SldsButton },

    props: {
        alternativeInverseTheme: Boolean,

        buttonLabel: { type: String, default: "Okay" },

        errorTheme: Boolean,

        hasTexture: Boolean,

        infoTheme: Boolean,

        inverseTheme: Boolean,

        noAnimation: Boolean,

        offlineTheme: Boolean,

        shadeTheme: Boolean,

        successTheme: Boolean,

        warningTheme: Boolean,
    },

    computed: {
        headerClassNames(): string {
            let classNames = "slds-modal__header"

            if (this.hasTexture) classNames += " slds-theme_alert-texture"

            if (this.alternativeInverseTheme) classNames += " slds-theme_alt-inverse"
            else if (this.errorTheme) classNames += " slds-theme_error"
            else if (this.infoTheme) classNames += " slds-theme_info"
            else if (this.inverseTheme) classNames += " slds-theme_inverse"
            else if (this.offlineTheme) classNames += " slds-theme_offline"
            else if (this.shadeTheme) classNames += " slds-theme_shade"
            else if (this.successTheme) classNames += " slds-theme_success"
            else if (this.warningTheme) classNames += " slds-theme_warning"
            else classNames += " slds-theme_default"

            return classNames
        },

        /**
         * Transition name, if any.
         */
        transitionName(): string {
            return this.noAnimation ? "" : "blow-up"
        },
    },

    mounted() {
        const root = this.$refs.root as HTMLDivElement
        root.focus()
    },

    methods: {
        /**
         * Handles the key up event on the esc key.
         */
        handleClose(): void {
            this.$emit(EVENTS.CLOSE)
        },

        /**
         * Handles the key up event on the enter key.
         */
        handleSubmit(): void {
            this.$emit(EVENTS.SUBMIT)
        },
    },
})
</script>

