<template>
    <span :class="badgeClass">

        <!-- Left Icon -->
        <span v-if="hasLeftPositionedIcon" class="slds-badge__icon slds-badge__icon_left">
            <slds-icon current-color :icon-name="iconName!" xx-small/>
        </span>

        <!-- Label -->
        <slot>
            {{ label }}
        </slot>

        <!-- Right Icon -->
        <span v-if="hasRightPositionedIcon" class="slds-badge__icon slds-badge__icon_right">
            <slds-icon current-color :icon-name="iconName!" xx-small/>
        </span>

    </span>
</template>

<script lang="ts">
import SldsIcon from "../slds-icon/slds-icon.vue"
import PositionableIconMixin from "../../mixins/positionable-icon-mixin.js"
import { defineComponent } from "vue"

export default defineComponent({
    name: "SldsBadge",

    components: {
        SldsIcon,
    },

    mixins: [
        PositionableIconMixin,
    ],

    props: {
        /**
         * Indicates whether this badge has the brand theme.
         */
        brand: Boolean,

        /**
         * Indicates whether this badge has the error theme.
         */
        error: Boolean,

        /**
         * Indicates whether this badge has the inverse theme.
         */
        inverse: Boolean,

        /**
         * Badge label.
         * When using the default slot this prop is ignored.
         */
        label: String,

        /**
         * Indicates whether this badge has the inverse theme.
         */
        lightest: Boolean,

        /**
         Indicates whether this badge has the outline brand theme.
         */
        outlineBrand: Boolean,

        /**
         Indicates whether this badge has the outline error theme.
         */
        outlineError: Boolean,

        /**
         Indicates whether this badge has the outline success theme.
         */
        outlineSuccess: Boolean,

        /**
         Indicates whether this badge has the outline warning theme.
         */
        outlineWarning: Boolean,

        /**
         Indicates whether this badge has the success theme.
         */
        success: Boolean,

        /**
         Indicates whether this badge has the warning theme.
         */
        warning: Boolean,
    },

    computed: {
        /**
         * The CSS class names for the badge.
         */
        badgeClass(): string {
            let classNames = "slds-badge"

            // Badge theme
            if (this.brand) classNames += " slds-badge_brand"
            else if (this.error) classNames += " slds-badge_error"
            else if (this.inverse) classNames += " slds-badge_inverse"
            else if (this.lightest) classNames += " slds-badge_lightest"
            else if (this.outlineBrand) classNames += " slds-badge_outline-brand"
            else if (this.outlineError) classNames += " slds-badge_outline-error"
            else if (this.outlineSuccess) classNames += " slds-badge_outline-success"
            else if (this.outlineWarning) classNames += " slds-badge_outline-warning"
            else if (this.success) classNames += " slds-badge_success"
            else if (this.warning) classNames += " slds-badge_warning"

            return classNames
        },
    },
})
</script>

<style scoped lang="scss">

$colors: (
    'brand': #0070d2,
    'error': #ea001e,
    'success': #2e844a,
    'warning': #fe9339,
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

.slds-badge_warning,
.slds-badge__icon_warning {
    color: unset;
}

</style>
