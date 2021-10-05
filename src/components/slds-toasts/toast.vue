<template>
    <div class="slds-notify slds-notify_toast" :class="toastClass" role="status">

        <!-- Assistive text -->
        <span v-if="assistiveText" class="slds-assistive-text">
            {{ assistiveText }}
        </span>

        <!-- Icon -->
        <slds-icon
            v-if="icon"
            :icon="icon"
            small
            inverse
            class="slds-m-right_small slds-no-flex slds-align-top"
            :class="iconClass"
        />

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
                assistive-text="Close"
                @click="onClickClose"
            />
        </div>

    </div>
</template>

<script>
import SldsButtonIcon from '../slds-button-icon/button-icon'
import SldsIcon from '../slds-icon/icon'

export default {
    name: 'SldsToast',

    components: {
        SldsButtonIcon,
        SldsIcon,
    },

    props: {
        assistiveText: String,
        error: Boolean,
        icon: String,
        success: Boolean,
        warning: Boolean,
    },

    computed: {
        iconClass() {
            if (this.error) return 'slds-icon-utility-error'
            if (this.success) return 'slds-icon-utility-success'
            if (this.warning) return 'slds-icon-utility-warning'
            return 'slds-icon-utility-info'
        },

        toastClass() {
            if (this.error) return 'slds-theme_error'
            if (this.success) return 'slds-theme_success'
            if (this.warning) return 'slds-theme_warning'
            return 'slds-theme_info'
        },
    },

    methods: {
        onClickClose() {
            this.$emit('close')
        },
    },
}
</script>

<style scoped lang="scss">
.slds-notify_toast {
    pointer-events: auto;
}
</style>
