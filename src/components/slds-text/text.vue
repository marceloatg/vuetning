<template>
    <div :class="textClass">
        <slot/>
    </div>
</template>

<script>
export default {
    name: 'SldsText',

    props: {
        alignCenter: Boolean,
        alignLeft: Boolean,
        alignRight: Boolean,
        default: Boolean,
        destructive: Boolean,
        error: Boolean,
        headingLarge: Boolean,
        headingMedium: Boolean,
        headingSmall: Boolean,
        inverse: Boolean,
        inverseWeak: Boolean,
        longForm: Boolean,
        monospace: Boolean,
        regular: Boolean,
        small: Boolean,
        success: Boolean,
        title: Boolean,
        titleUppercase: Boolean,
        weak: Boolean,
    },

    computed: {
        textClass() {
            let classNames = ''

            // Text body
            if (this.small) classNames += ' slds-text-body_small'
            else if (this.regular) classNames += ' slds-text-body_regular'

            // Text heading
            if (this.headingLarge) classNames += ' slds-text-heading_large'
            else if (this.headingMedium) classNames += ' slds-text-heading_medium'
            else if (this.headingSmall) classNames += ' slds-text-heading_small'

            // Text title
            if (this.title) classNames += ' slds-text-title'
            else if (this.titleUppercase) classNames += ' slds-text-title_caps'

            // Text long form
            if (this.longForm) classNames += ' slds-text-longform'

            // Text alignment
            if (this.alignLeft) classNames += ' slds-text-align_left'
            else if (this.alignRight) classNames += ' slds-text-align_right'
            else if (this.alignCenter) classNames += ' slds-text-align_center'

            // Text color
            if (this.default) classNames += ' slds-text-color_default'
            else if (this.success) classNames += ' slds-text-color_success'
            else if (this.weak) classNames += ' slds-text-color_weak'
            else if (this.error) classNames += ' slds-text-color_error'
            else if (this.destructive) classNames += ' slds-text-color_destructive'
            else if (this.inverse) classNames += ' slds-text-color_inverse'
            else if (this.inverseWeak) classNames += ' slds-text-color_inverse-weak'

            // Text monospace
            if (this.monospace) classNames += ' slds-text-font_monospace'

            return classNames
        }
    }
}
</script>
