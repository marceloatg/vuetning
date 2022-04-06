<template>
    <div
        class="slds-scoped-notification slds-media slds-media_center"
        :class="scopedNotificationClass"
        role="status"
    >

        <div class="slds-media__figure">
            <slds-icon :icon="iconName" :inverse="inverse" small/>
        </div>

        <div class="slds-media__body">
            <slot/>
        </div>

    </div>
</template>

<script>
import SldsIcon from '@/components/slds-icon/slds-icon'

export default {
    name: 'SldsScopedNotification',

    components: {
        SldsIcon
    },

    props: {
        error: Boolean,
        icon: String,
        info: Boolean,
        success: Boolean,
        warning: Boolean
    },

    computed: {
        iconName() {
            let iconName = ''

            if (this.error) iconName += 'utility:error'
            else if (this.success) iconName += 'utility:success'
            else if (this.warning) iconName += 'utility:warning'
            else iconName += this.icon || 'utility:info'

            return iconName
        },

        inverse() {
            return (this.error || this.info || this.success)
        },

        scopedNotificationClass() {
            let classNames = ''

            if (this.error) classNames += ' slds-theme_error'
            else if (this.info) classNames += ' slds-theme_info'
            else if (this.success) classNames += ' slds-theme_success'
            else if (this.warning) classNames += ' slds-theme_warning'
            else classNames += ' slds-scoped-notification_light'

            return classNames
        }
    }
}
</script>

<style scoped>

</style>
