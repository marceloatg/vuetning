import sldsMenu from './menu'
import sldsMenuItem from './menu-item'
import sldsMenuHeading from './menu-heading'
import sldsMenuDivider from './menu-divider'

export default Vue => {
    Vue.component(sldsMenu.name, sldsMenu)
    Vue.component(sldsMenuItem.name, sldsMenuItem)
    Vue.component(sldsMenuHeading.name, sldsMenuHeading)
    Vue.component(sldsMenuDivider.name, sldsMenuDivider)
}
