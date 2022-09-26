<template>
    <span class="slds-badge" :class="badgeClass">

        <!-- Left Icon -->
        <span v-if="hasLeftPositionedIcon" class="slds-badge__icon slds-badge__icon_left">
            <slds-icon
                current-color
                :icon="icon"
                xx-small
            />
        </span>

        <!-- Label -->
        <slot>
            {{ label }}
        </slot>

        <!-- Right Icon -->
        <span v-if="hasRightPositionedIcon" class="slds-badge__icon slds-badge__icon_right">
            <slds-icon
                current-color
                :icon="icon"
                xx-small
            />
        </span>

    </span>
</template>

<!--suppress JSValidateTypes -->
<script>
import SldsIcon from '../slds-icon/slds-icon'
import IconPositionMixin from '@/mixins/icon-position-mixin'

export default {
    name: 'SldsBadge',

    components: {
        SldsIcon
    },

    mixins: [
        IconPositionMixin
    ],

    props: {
        /**
         * Indicates whether this badge has the brand theme.
         * @type {boolean}
         */
        brand: Boolean,

        /**
         * Indicates whether this badge has the error theme.
         * @type {boolean}
         */
        error: Boolean,

        /**
         * Indicates whether this badge has the inverse theme.
         * @type {boolean}
         */
        inverse: Boolean,

        /**
         * Badge label.
         * When using the default slot this prop is ignored.
         * @type {string}
         */
        label: String,

        /**
         * Indicates whether this badge has the inverse theme.
         * @type {boolean}
         */
        lightest: Boolean,

        /**
         Indicates whether this badge has the outline brand theme.
         * @type {boolean}
         */
        outlineBrand: Boolean,

        /**
         Indicates whether this badge has the outline error theme.
         * @type {boolean}
         */
        outlineError: Boolean,

        /**
         Indicates whether this badge has the outline success theme.
         * @type {boolean}
         */
        outlineSuccess: Boolean,

        /**
         Indicates whether this badge has the outline warning theme.
         * @type {boolean}
         */
        outlineWarning: Boolean,

        /**
         Indicates whether this badge has the success theme.
         * @type {boolean}
         */
        success: Boolean,

        /**
         Indicates whether this badge has the warning theme.
         * @type {boolean}
         */
        warning: Boolean,
    },

    computed: {
        /**
         * Returns the CSS class names for the badge.
         * @returns {string} The CSS class names.
         */
        badgeClass() {
            let classNames = ''

            // Badge theme
            if (this.brand) classNames += ' slds-badge_brand'
            else if (this.error) classNames += ' slds-badge_error'
            else if (this.inverse) classNames += ' slds-badge_inverse'
            else if (this.lightest) classNames += ' slds-badge_lightest'
            else if (this.outlineBrand) classNames += ' slds-badge_outline-brand'
            else if (this.outlineError) classNames += ' slds-badge_outline-error'
            else if (this.outlineSuccess) classNames += ' slds-badge_outline-success'
            else if (this.outlineWarning) classNames += ' slds-badge_outline-warning'
            else if (this.success) classNames += ' slds-badge_success'
            else if (this.warning) classNames += ' slds-badge_warning'

            return classNames
        }
    }
}
</script>

<style scoped lang="scss">
$colors: (
    'brand': #0070d2,
    'error': #c23934,
    'success': #04844b,
    'warning': #ffb75d,
);

@each $name, $color in $colors {
    .slds-badge_#{$name},
    .slds-badge__icon_#{$name} {
        color: white;
        background-color: $color;
    }

    .slds-badge_outline-#{$name} {
        border: 1px solid $color;
        background-color: white;
        color: $color;
        padding: .125rem .5rem;

        svg {
            fill: $color;
        }
    }
}
</style>
