import sldsMenu from './slds-menu'
import sldsMenuItem from './slds-menu-item'
import sldsMenuHeading from './slds-menu-heading'
import sldsMenuDivider from './slds-menu-divider'

export default Vue => {
    Vue.component(sldsMenu.name, sldsMenu)
    Vue.component(sldsMenuItem.name, sldsMenuItem)
    Vue.component(sldsMenuHeading.name, sldsMenuHeading)
    Vue.component(sldsMenuDivider.name, sldsMenuDivider)
}
