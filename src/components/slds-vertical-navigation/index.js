import sldsVerticalNavigation from './vertical-navigation'
import sldsVerticalNavigationSection from './vertical-navigation-section'
import sldsVerticalNavigationItem from './vertical-navigation-item'

export default Vue => {
    Vue.component(sldsVerticalNavigation.name, sldsVerticalNavigation)
    Vue.component(sldsVerticalNavigationSection.name, sldsVerticalNavigationSection)
    Vue.component(sldsVerticalNavigationItem.name, sldsVerticalNavigationItem)
}
