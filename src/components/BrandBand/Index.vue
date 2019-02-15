<!--
    @Description: The brand band provides theming capability that adds personality and improves information density and
                  contrast.
    @Documentation: https://www.lightningdesignsystem.com/components/brand-band/
-->

<template>
    <div class="slds-brand-band" :class="['slds-brand-band_' + theme, 'slds-brand-band_' + size]"></div>
</template>

<script>
    export default {
        props: {
            size: {
                type: String,
                default: 'medium',
                note: 'Height of brand band.'
            },
            theme: {
                type: String,
                default: 'default',
                note: 'Theme of brand band. Check the validator for available options.',
                validator(value) {
                    return [
                        'default',
                        'group-public',
                        'group-private',
                        'user',
                    ].indexOf(value) !== -1
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    $start-color: rgb(27, 95, 158);
    $end-color: rgb(176, 196, 223);

    .slds-brand-band {

        &:after {
            background-image: linear-gradient(to bottom, rgba($end-color, 0) 60%, $end-color);
        }

        &.slds-brand-band_default:before {
            background-image: url(/assets/images/themes/oneSalesforce/banner-brand-default.png),
            linear-gradient(to top, rgba($end-color, 0) 0, $start-color);
        }

        &.slds-brand-band_group-public:before {
            background-image: url(/assets/images/themes/oneSalesforce/banner-group-public-default.png),
            linear-gradient(to top, rgba($end-color, 0) 0, $start-color);
        }

        &.slds-brand-band_group-private:before {
            background-image: url(/assets/images/themes/oneSalesforce/banner-group-private-default.png),
            linear-gradient(to top, rgba($end-color, 0) 0, $start-color);
        }

        &.slds-brand-band_user:before {
            background-image: url(/assets/images/themes/oneSalesforce/banner-user-default.png),
            linear-gradient(to top, rgba($end-color, 0) 0, $start-color);
        }
    }
</style>