<template>
    <div @keyup.esc="onClose" @keyup.enter="onSubmit">

        <!-- Modal -->
        <section tabindex="0" class="slds-modal slds-fade-in-open slds-modal_prompt">
            <div class="slds-modal__container">

                <!-- Header -->
                <header class="slds-modal__header" :class="[theme, {'slds-theme_alert-texture': this.hasTexture}]">
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
import SldsButton from '../slds-button/index.vue'

export default {
    name: "SldsPrompt",

    components: {
        SldsButton,
    },

    props: {
        alternativeInverseTheme: Boolean,
        buttonLabel: {
            type: String,
            default: 'Okay',
        },
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
        theme() {
            if (this.alternativeInverseTheme) return 'slds-theme_alt-inverse';
            if (this.errorTheme) return 'slds-theme_error';
            if (this.infoTheme) return 'slds-theme_info';
            if (this.inverseTheme) return 'slds-theme_inverse';
            if (this.offlineTheme) return 'slds-theme_offline';
            if (this.shadeTheme) return 'slds-theme_shade';
            if (this.successTheme) return 'slds-theme_success';
            if (this.warningTheme) return 'slds-theme_warning';
            return 'slds-theme_default';
        },
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
