<template>
    <div class="slds-notify slds-notify_toast" :class="`slds-theme_${variant}`">

        <!-- Icon -->
        <span v-if="iconName != null" class="slds-icon_container slds-icon-utility-error slds-m-right_small slds-no-flex slds-align-top">
            <slds-icon :icon-name="iconName" size="small"/>
        </span>

        <!-- Content -->
        <div class="slds-notify__content">

            <h2 class="slds-text-heading_small">
                You've encountered some errors when trying to save edits to Samuel Smith.
            </h2>

            <p>
                Here's some detail of <a> what happened </a>, being very descriptive and transparent.
            </p>

        </div>

        <!-- Close button -->
        <div class="slds-notify__close">
            <slds-button-icon
                icon-name="utility:close"
                size="large"
                variant="inverse"
                container="none"/>
        </div>

    </div>
</template>

<script>
    import SldsButtonIcon from '../ButtonIcon/Index'
    import SldsIcon from '../Icon/Index'

    export default {
        components: {
            SldsButtonIcon,
            SldsIcon,
        },
        props: {
            iconName: {
                type: String,
            },
            variant: {
                type: String,
                default: 'base',
                validator(value) {
                    return [
                        'base',
                        'error',
                        'success',
                        'warning',
                    ].indexOf(value) !== -1
                },
            },
        },
    }
</script>