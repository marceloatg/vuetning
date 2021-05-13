import sldsGlobalHeader from './global-header'
import sldsGlobalAction from './global-action'
import sldsGlobalActionAvatar from './global-action-avatar'
import sldsGlobalActionFavorites from './global-action-favorites'
import sldsGlobalActionHelp from './global-action-help'
import sldsGlobalActionNotifications from './global-action-notifications'
import sldsGlobalActionSetup from './global-action-setup'
import sldsGlobalActionTask from './global-action-task'

export default Vue => {
    Vue.component(sldsGlobalHeader.name, sldsGlobalHeader)
    Vue.component(sldsGlobalAction.name, sldsGlobalAction)
    Vue.component(sldsGlobalActionAvatar.name, sldsGlobalActionAvatar)
    Vue.component(sldsGlobalActionFavorites.name, sldsGlobalActionFavorites)
    Vue.component(sldsGlobalActionHelp.name, sldsGlobalActionHelp)
    Vue.component(sldsGlobalActionNotifications.name, sldsGlobalActionNotifications)
    Vue.component(sldsGlobalActionSetup.name, sldsGlobalActionSetup)
    Vue.component(sldsGlobalActionTask.name, sldsGlobalActionTask)
}
