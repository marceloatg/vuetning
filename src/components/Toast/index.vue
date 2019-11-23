<template>
    <div class="slds-notify slds-notify_toast" :class="`slds-theme_${variant}`">

        <!-- Icon -->
        <span v-if="iconName != null" class="slds-icon_container slds-icon-utility-error slds-m-right_small slds-no-flex slds-align-top">
            <slds-icon :icon="iconName" small/>
        </span>

        <!-- Content -->
        <div class="slds-notify__content">

            <h2 class="slds-text-heading_small">
                <slot name="heading"/>
            </h2>

            <slot name="details"/>

        </div>

        <!-- Close button -->
        <div class="slds-notify__close">
            <slds-button-icon
                icon="utility:close"
                large
                inverse
                @click="onClickClose"/>
        </div>

    </div>
</template>

<script>
    import SldsButtonIcon from '../ButtonIcon/index'
    import SldsIcon from '../Icon/index'

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
        methods: {
            onClickClose() {
                this.$emit('close');
            },
        },
    }
</script>
