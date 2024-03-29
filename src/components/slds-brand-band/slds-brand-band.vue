<template>
    <div :class="brandBandClass"/>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
    name: "SldsBrandBand",

    props: {
        endColor: String,

        groupPrivateTheme: Boolean,

        groupPublicTheme: Boolean,

        large: Boolean,

        medium: Boolean,

        noTheme: Boolean,

        small: Boolean,

        startColor: String,

        userTheme: Boolean,
    },

    computed: {
        /**
         * The CSS class names for the brand band.
         */
        brandBandClass(): string {
            let classNames = "slds-brand-band"

            // Brand band size
            if (this.small) classNames += " slds-brand-band_small"
            else if (this.large) classNames += " slds-brand-band_large"
            else classNames += " slds-brand-band_medium"

            // Brand band theme
            if (this.noTheme) classNames += " slds-brand-band_none"
            else if (this.userTheme) classNames += " slds-brand-band_user"
            else if (this.groupPublicTheme) classNames += " slds-brand-band_group-public"
            else if (this.groupPrivateTheme) classNames += " slds-brand-band_group-private"
            else classNames += " slds-brand-band_default"

            return classNames
        },
    },

    watch: {
        endColor() {
            this.updateColors()
        },

        startColor() {
            this.updateColors()
        },
    },

    mounted() {
        this.updateColors()
    },

    methods: {
        updateColors(): void {
            const startColorProperty = "--start-color"
            const startColorValue = this.startColor ? this.startColor : "rgb(27, 95, 158)"
            this.$el.style.setProperty(startColorProperty, startColorValue)

            const endColorProperty = "--end-color"
            const endColorValue = this.endColor ? this.endColor : "rgb(176, 196, 223)"
            this.$el.style.setProperty(endColorProperty, endColorValue)
        },
    },
})
</script>

<style scoped lang="scss">

.slds-brand-band {
    --start-color: rgb(27, 95, 158);
    --end-color: rgb(176, 196, 223);
    height: 0;

    &:after {
        background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0) 60%, var(--end-color));
    }

    &.slds-brand-band_default:before {
        background-image: url(../../assets/images/themes/oneSalesforce/banner-brand-default.png),
        linear-gradient(to top, rgba(0, 0, 0, 0) 0, var(--start-color));
    }

    &.slds-brand-band_group-public:before {
        background-image: url(../../assets/images/themes/oneSalesforce/banner-group-public-default.png),
        linear-gradient(to top, rgba(0, 0, 0, 0) 0, var(--start-color));
    }

    &.slds-brand-band_group-private:before {
        background-image: url(../../assets/images/themes/oneSalesforce/banner-group-private-default.png),
        linear-gradient(to top, rgba(0, 0, 0, 0) 0, var(--start-color));
    }

    &.slds-brand-band_user:before {
        background-image: url(../../assets/images/themes/oneSalesforce/banner-user-default.png),
        linear-gradient(to top, rgba(0, 0, 0, 0) 0, var(--start-color));
    }
}

</style>
