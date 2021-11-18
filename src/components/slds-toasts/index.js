import sldsToasts from './slds-toasts'
import sldsToast from './slds-toast'

export default Vue => {
    Vue.component(sldsToasts.name, sldsToasts)
    Vue.component(sldsToast.name, sldsToast)
}
