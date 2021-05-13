import sldsBreadcrumbs from './breadcrumbs.vue'
import sldsBreadcrumb from './breadcrumb.vue'
import sldsOverflowedBreadcrumb from './overflowed-breadcrumb'

export default Vue => {
    Vue.component(sldsBreadcrumbs.name, sldsBreadcrumbs)
    Vue.component(sldsBreadcrumb.name, sldsBreadcrumb)
    Vue.component(sldsOverflowedBreadcrumb.name, sldsOverflowedBreadcrumb)
}
