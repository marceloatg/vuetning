import sldsToasts from './toasts'
import sldsToast from './toast'

export default Vue => {
    Vue.component(sldsToasts.name, sldsToasts)
    Vue.component(sldsToast.name, sldsToast)
}
