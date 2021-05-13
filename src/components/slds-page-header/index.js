import sldsPageHeader from './page-header.vue'
import sldsPageHeaderDetail from './page-header-detail.vue'

export default Vue => {
    Vue.component(sldsPageHeader.name, sldsPageHeader)
    Vue.component(sldsPageHeaderDetail.name, sldsPageHeaderDetail)
}
