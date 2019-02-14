<!--
    @Description: Badges are labels which hold small amounts of information.
    @Documentation: https://www.lightningdesignsystem.com/components/badges/
-->

<template>
    <span class="slds-badge" :class="['slds-badge_' + color]" :title="title">
        {{(iconPosition === 'right') ? text : '' }}
        <span v-if="hasIcon" class="slds-badge__icon"
              :class="['slds-badge__icon_' + color, 'slds-badge__icon_' + iconPosition]">
            <span class="slds-icon_container slds-current-color">
                <slds-svg :icon-name="`${iconCategory}:${iconName}`" class="slds-icon slds-icon_xx-small"/>
            </span>
        </span>{{(iconPosition === 'left') ? text : '' }}
    </span>
</template>

<script>
    export default {
        name: 'Badge',
        props: {
            text: {
                type: String,
                default: '',
                note: 'Badge text.'
            },
            title: {
                type: String,
                note: 'Badge title.'
            },
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
                        'success',
                        'warning',
                        'error',
                    ].indexOf(value) !== -1
                }
            },
            iconCategory: {
                type: String,
                default: null,
                note: 'Badge icon category.'
            },
            iconName: {
                type: String,
                default: null,
                note: 'Badge icon name.'
            },
            iconPosition: {
                type: String,
                default: 'left',
                note: 'Badge icon position. Check the validator for available options.',
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
                return (this.iconCategory != null && this.iconName != null)
            }
        }
    }
</script>

<style scoped lang="scss">
    .slds-badge_brand,
    .slds-badge__icon_brand {
        color: white;
        background-color: #0070d2;
    }

    .slds-badge_success,
    .slds-badge__icon_success {
        color: white;
        background-color: #04844b;
    }

    .slds-badge_warning,
    .slds-badge__icon_warning {
        color: white;
        background-color: #ffb75d;
    }

    .slds-badge_error,
    .slds-badge__icon_error {
        color: white;
        background-color: #c23934;
    }

</style>