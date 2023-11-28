<template>
    <transition-group :name="animation" tag="div" class="slds-notification-container">
        <slds-notification
            v-for="notification in notifications"
            :key="notification.id"
            :message="notification.message"
            :subject="notification.subject"
            :icon-name="notification.iconName"
            :icon-class="notification.iconClass"
            @close="handleClose(notification)"
        />
    </transition-group>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue"
import SldsNotification from "../../components/slds-notification/slds-notification.vue"
import { type Notification } from "../../components/slds-notification/notification"
import { EVENTS } from "../../constants"

export default defineComponent({
    name: "slds-notification-group",
    components: { SldsNotification },

    props: {
        notifications: { type: Array as PropType<Notification[]>, default: () => [] as Notification[] },
    },

    computed: {
        animation(){
            return (this.notifications.length > 3)
                ? "notification-fade-overflow"
                : "notification-fade"
        },
    },

    methods: {
        handleClose(notification: Notification) {
            this.$emit(EVENTS.CLOSE, notification)
        },
    },

})
</script>

<style scoped lang="scss">

// Animations for 3 notifications
.notification-fade {
    &-enter-active,
    &-leave-active {
        transition: all 300ms;
        transform: translateX(0%);
    }

    &-enter-from,
    &-leave-to {
        transform: translateX(100%);
    }
}

// Animations for more than 3 notifications
.notification-fade-overflow {
    &-enter-active {
        transition: all 300ms;
        transform: translate( 0%, -90%) scaleX(.95);
    }

    &-leave-active {
        transition: all 300ms;
        transform: translate( 0%, 0%);
    }

    &-enter-from {
        transform: translate(100%, -90%) scaleX(.95);
    }

    &-leave-to {
        transform: translate(90%, 0%);
    }
}

</style>
