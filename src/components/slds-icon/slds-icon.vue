<template>
    <span class="slds-icon_container" :class="containerClass" :title="title">

        <!-- Icon -->
        <slds-svg
            :icon="icon"
            class="slds-icon"
            :standard-format="standardFormat"
            :class="[iconClass, sizeClass, variantClass]"
            aria-hidden="true"
        />

        <!-- Assistive text -->
        <span v-if="assistiveText" class="slds-assistive-text">
            {{ assistiveText }}
        </span>

    </span>
</template>

<script>
import {computeBackgroundClass, getCategory, isValidName} from '../../utils/icon-utils/index'

export default {
    name: 'SldsIcon',

    props: {
        assistiveText: String,
        brand: Boolean,
        currentColor: [Boolean, String],
        error: Boolean,
        icon: {type: String, required: true},
        iconClass: [Array, String],
        inverse: Boolean,
        large: Boolean,
        light: Boolean,
        medium: Boolean,
        small: Boolean,
        standardFormat: Boolean,
        success: Boolean,
        xSmall: Boolean,
        xxSmall: Boolean,
        title: String,
        warning: Boolean,
    },

    data() {
        return {
            backgroundClass: null,
            category: null,
            name: null,
        }
    },

    computed: {
        containerClass() {
            let classNames = [this.backgroundClass]

            if (this.currentColor) classNames.push('slds-current-color')

            return classNames
        },

        sizeClass() {
            if (this.xxSmall) return 'slds-icon_xx-small'
            if (this.xSmall) return 'slds-icon_x-small'
            if (this.small) return 'slds-icon_small'
            if (this.medium) return 'slds-icon_medium'
            if (this.large) return 'slds-icon_large'
            return 'slds-icon_medium'
        },

        variantClass() {
            if (!isValidName(this.icon)) return ''
            if (getCategory(this.icon) !== 'utility') return ''

            if (this.brand) return 'slds-icon-text-brand'
            if (this.error) return 'slds-icon-text-error'
            if (this.inverse || this.standardFormat) return 'slds-icon-text-inverse'
            if (this.light) return 'slds-icon-text-light'
            if (this.success) return 'slds-icon-text-success'
            if (this.warning) return 'slds-icon-text-warning'
            if (this.currentColor) return ''
            return 'slds-icon-text-default'
        },
    },

    watch: {
        icon(value) {
            this.parseBackground(value)
        },
    },

    mounted() {
        this.parseBackground(this.icon)
    },

    methods: {
        parseBackground(iconName) {
            let classNames = this.$el.classList
            if (classNames == null) classNames = []

            // Remove old background class if it exists
            if (this.backgroundClass) classNames.remove(this.backgroundClass)

            // If some custom background class was defined, just return
            for (let className of classNames) {
                if (className.startsWith('slds-icon-')) return
            }

            // Otherwise compute the proper background class for the icon
            if (this.icon == null) return
            this.backgroundClass = computeBackgroundClass(iconName)
        },
    },
}
</script>
