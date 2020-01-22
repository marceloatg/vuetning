<template>
    <div class="slds-notify slds-notify_toast" :class="variant" role="status">

        <!-- Icon -->
        <slds-icon
            v-if="icon != null"
            :icon="icon"
            small
            inverse
            class="slds-m-right_small slds-no-flex slds-align-top"
            :class="iconVariant"/>

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
    import SldsButtonIcon from '../slds-button-icon/index.vue'
    import SldsIcon from '../slds-icon/index.vue'

    export default {
        name: 'SldsToast',
        components: {
            SldsButtonIcon,
            SldsIcon,
        },
        props: {
            error: {
                type: Boolean,
            },
            icon: {
                type: String,
            },
            success: {
                type: Boolean,
            },
            warning: {
                type: Boolean,
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
