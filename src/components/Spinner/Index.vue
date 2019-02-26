<!--
    @Description: Spinners are CSS loading indicators that should be shown when retrieving data or performing slow computations.
    In some cases, the first time a parent component loads, a stencil is preferred to indicate network activity.
    @Documentation: https://www.lightningdesignsystem.com/components/spinners/
-->

<template>
    <div role="status"
         class="slds-spinner"
         :class="[`slds-spinner_${size}`, `slds-spinner_${variant}`, {'slds-spinner_delayed': hasDelay}]">

        <div class="slds-spinner__dot-a"/>

        <div class="slds-spinner__dot-b"/>

        <div v-if="text !== null" class="slds-text slds-align_absolute-center">
            {{ text }}
        </div>

    </div>
</template>

<script>
    export default {
        props: {
            variant: {
                type: String,
                default: 'base',
                note: 'Spinner variant. Check the validator for available options.',
                validator(value) {
                    return [
                        'base',
                        'brand',
                        'inverse',
                    ].indexOf(value) !== -1
                }
            },
            size: {
                type: String,
                default: 'medium',
                note: 'Spinner size. Check the validator for available options.',
                validator(value) {
                    return [
                        'xx-small',
                        'x-small',
                        'small',
                        'medium',
                        'large',
                    ].indexOf(value) !== -1
                }
            },
            hasDelay: {
                type: Boolean,
                default: false,
                note: 'Set a delay of 300ms on spinner.'
            },
            inline: {
                type: Boolean,
                default: false,
                note: 'Set a delay of 300ms on spinner.'
            },
            text: {
                type: String,
                default: null,
                note: 'Set a text to be shown bellow th spinner.'
            },
        },
    }
</script>

<style scoped lang="scss">
    .slds-spinner {

        .slds-text {
            color: #b0adab;
            transform: translate(120%, -50%) rotate(-90deg);
        }
    }

    .slds-spinner.slds-spinner_brand {

        .slds-text {
            color: #1589ee;
        }
    }

    .slds-spinner.slds-spinner_inverse {

        .slds-text {
            color: white;
        }
    }

    .slds-spinner.slds-spinner_large {

        .slds-text {
            font-size: 18px;
        }
    }

    .slds-spinner.slds-spinner_medium {

        .slds-text {
            font-size: 14px;
        }
    }

    .slds-spinner.slds-spinner_small {

        .slds-text {
            font-size: 12px;
        }
    }

    .slds-spinner.slds-spinner_x-small {

        .slds-text {
            font-size: 10px;
        }
    }

    .slds-spinner.slds-spinner_xx-small {

        .slds-text {
            display: none;
        }
    }
</style>