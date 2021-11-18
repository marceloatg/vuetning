import sldsBreadcrumbs from './slds-breadcrumbs.vue'
import sldsBreadcrumb from './slds-breadcrumb.vue'
import sldsOverflowedBreadcrumb from './slds-overflowed-breadcrumb'

export default Vue => {
    Vue.component(sldsBreadcrumbs.name, sldsBreadcrumbs)
    Vue.component(sldsBreadcrumb.name, sldsBreadcrumb)
    Vue.component(sldsOverflowedBreadcrumb.name, sldsOverflowedBreadcrumb)
}
