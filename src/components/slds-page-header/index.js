import sldsPageHeader from './slds-page-header.vue'
import sldsPageHeaderDetail from './slds-page-header-detail.vue'

export default Vue => {
    Vue.component(sldsPageHeader.name, sldsPageHeader)
    Vue.component(sldsPageHeaderDetail.name, sldsPageHeaderDetail)
}
