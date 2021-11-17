<template>
    <span class="slds-badge" :class="badgeClass">

        <!-- Left Icon -->
        <span v-if="icon && $data.$_left" class="slds-badge__icon slds-badge__icon_left">
            <slds-icon
                :icon="icon"
                xx-small
                current-color
            />
        </span>

        <!-- Label -->
        {{ label }}

        <!-- Right Icon -->
        <span v-if="icon && $data.$_right" class="slds-badge__icon slds-badge__icon_right">
            <slds-icon
                :icon="icon"
                xx-small
                current-color
            />
        </span>

    </span>
</template>

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
        brand: Boolean,
        error: Boolean,
        icon: String,
        inverse: Boolean,
        label: String,
        lightest: Boolean,
        outlineBrand: Boolean,
        outlineError: Boolean,
        outlineSuccess: Boolean,
        outlineWarning: Boolean,
        success: Boolean,
        warning: Boolean,
    },

    computed: {
        badgeClass() {
            return {
                'slds-badge_inverse': this.inverse,
                'slds-badge_lightest': this.lightest,
                'slds-badge_brand': this.brand,
                'slds-badge_outline-brand': this.outlineBrand,
                'slds-badge_success': this.success,
                'slds-badge_outline-success': this.outlineSuccess,
                'slds-badge_warning': this.warning,
                'slds-badge_outline-warning': this.outlineWarning,
                'slds-badge_error': this.error,
                'slds-badge_outline-error': this.outlineError,
            }
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
        padding: 2px 8px;

        svg {
            fill: $color;
        }
    }
}
</style>
