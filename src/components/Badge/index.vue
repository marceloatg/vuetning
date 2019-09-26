<template>
    <span class="slds-badge" :class="['slds-badge_' + color]">
        {{ (iconPosition === 'right') ? label : '' }}
        <span
            v-if="hasIcon"
            class="slds-badge__icon"
            :class="['slds-badge__icon_' + color, 'slds-badge__icon_' + iconPosition]">
            <span class="slds-icon_container slds-current-color">
                <slds-svg :icon-name="iconName" class="slds-icon slds-icon_xx-small" style="margin-top: -4px;"/>
            </span>
        </span>{{ (iconPosition === 'left') ? label : '' }}
    </span>
</template>

<script>
    export default {
        props: {
            color: {
                type: String,
                default: 'default',
                note: 'Badge color. Check the validator for available options.',
                validator(value) {
                    return [
                        'default',
                        'inverse',
                        'lightest',
                        'brand',
                        'outline-brand',
                        'success',
                        'outline-success',
                        'warning',
                        'outline-warning',
                        'error',
                        'outline-error',
                    ].indexOf(value) !== -1
                }
            },
            label: {
                type: String,
            },
            iconName: {
                type: String,
            },
            iconPosition: {
                type: String,
                default: 'left',
                validator(value) {
                    return [
                        'left',
                        'right',
                    ].indexOf(value) !== -1
                }
            }
        },
        computed: {
            hasIcon() {
                return (this.iconName != null)
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

    .slds-badge {
        padding: 3px 8px;
    }

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
