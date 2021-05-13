import sldsTabs from './tabs'
import sldsTab from './tab'
import sldsTabContent from './tab-content'

export default Vue => {
    Vue.component(sldsTabs.name, sldsTabs)
    Vue.component(sldsTab.name, sldsTab)
    Vue.component(sldsTabContent.name, sldsTabContent)
}
