<template>
    <div class="slds-notify slds-notify_toast" :class="variant" role="status">

        <!-- Icon -->
        <span v-if="icon != null" class="slds-icon_container slds-m-right_small slds-no-flex slds-align-top" :class="iconVariant">
            <slds-icon :icon="icon" small/>
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
            error: {
                type: String,
            },
            icon: {
                type: String,
            },
            success: {
                type: String,
            },
            warning: {
                type: String,
            },
        },
        computed: {
            iconVariant() {
                if (this.error) return 'slds-icon-utility-error';
                if (this.success) return 'slds-icon-utility-success';
                if (this.warning) return 'slds-icon-utility-warning';
                return 'slds-icon-utility-info';
            },
            variant() {
                if (this.error) return 'slds-theme_error';
                if (this.success) return 'slds-theme_success';
                if (this.warning) return 'slds-theme_warning';
                return 'slds-theme_info';
            },
        },
        methods: {
            onClickClose() {
                this.$emit('close');
            },
        },
    }
</script>
