import sldsScopedTabs from './slds-scoped-tabs'
import sldsScopedTab from './slds-scoped-tab'
import sldsScopedTabContent from './slds-scoped-tab-content'


export default Vue => {
    Vue.component(sldsScopedTabs.name, sldsScopedTabs)
    Vue.component(sldsScopedTab.name, sldsScopedTab)
    Vue.component(sldsScopedTabContent.name, sldsScopedTabContent)
}
