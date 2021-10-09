import sldsScopedTabs from './scoped-tabs'
import sldsScopedTab from './scoped-tab'
import sldsScopedTabContent from './scoped-tab-content'


export default Vue => {
    Vue.component(sldsScopedTabs.name, sldsScopedTabs)
    Vue.component(sldsScopedTab.name, sldsScopedTab)
    Vue.component(sldsScopedTabContent.name, sldsScopedTabContent)
}
