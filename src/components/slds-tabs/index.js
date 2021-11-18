import sldsTabs from './slds-tabs'
import sldsTab from './slds-tab'
import sldsTabContent from './slds-tab-content'

export default Vue => {
    Vue.component(sldsTabs.name, sldsTabs)
    Vue.component(sldsTab.name, sldsTab)
    Vue.component(sldsTabContent.name, sldsTabContent)
}
