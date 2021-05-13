<template>
    <div ref="root" tabindex="0" @keyup.esc="onClose" @keyup.enter="onSubmit">

        <!-- Modal -->
        <section tabindex="0" class="slds-modal slds-fade-in-open slds-modal_prompt">
            <div class="slds-modal__container">

                <!-- Header -->
                <header class="slds-modal__header" :class="headerClass">
                    <slot name="header"/>
                </header>

                <!-- Content -->
                <div class="slds-modal__content slds-p-around_medium">
                    <slot name="content"/>
                </div>

                <!-- Footer -->
                <footer class="slds-modal__footer slds-theme_default">
                    <slds-button neutral :label="buttonLabel" @click="onSubmit"/>
                </footer>

            </div>
        </section>

        <!-- Backdrop -->
        <div class="slds-backdrop slds-backdrop_open"/>

    </div>
</template>

<script>
import SldsButton from '../slds-button/button'

export default {
    name: 'SldsPrompt',

    components: {
        SldsButton,
    },

    props: {
        alternativeInverseTheme: Boolean,
        buttonLabel: {type: String, default: 'Okay'},
        errorTheme: Boolean,
        hasTexture: Boolean,
        infoTheme: Boolean,
        inverseTheme: Boolean,
        offlineTheme: Boolean,
        shadeTheme: Boolean,
        successTheme: Boolean,
        warningTheme: Boolean,
    },

    computed: {
        headerClass() {
            const classNames = []

            if (this.hasTexture) classNames.push('slds-theme_alert-texture')

            if (this.alternativeInverseTheme) classNames.push('slds-theme_alt-inverse')
            else if (this.errorTheme) classNames.push('slds-theme_error')
            else if (this.infoTheme) classNames.push('slds-theme_info')
            else if (this.inverseTheme) classNames.push('slds-theme_inverse')
            else if (this.offlineTheme) classNames.push('slds-theme_offline')
            else if (this.shadeTheme) classNames.push('slds-theme_shade')
            else if (this.successTheme) classNames.push('slds-theme_success')
            else if (this.warningTheme) classNames.push('slds-theme_warning')
            else classNames.push('slds-theme_default')

            return classNames
        }
    },

    mounted() {
        this.$refs.root.focus()
    },

    methods: {
        onClose() {
            this.$emit('close')
        },

        onSubmit() {
            this.$emit('submit')
        },
    },
}
</script>
