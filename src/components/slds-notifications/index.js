import sldsNotification from './slds-notification.vue'
import sldsNotifications from './slds-notifications.vue'

export default Vue => {
    Vue.component(sldsNotification.name, sldsNotification)
    Vue.component(sldsNotifications.name, sldsNotifications)
}
