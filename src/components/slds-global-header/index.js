import sldsGlobalHeader from './slds-global-header'
import sldsGlobalAction from './slds-global-action'
import sldsGlobalActionAvatar from './slds-global-action-avatar'
import sldsGlobalActionFavorites from './slds-global-action-favorites'
import sldsGlobalActionHelp from './slds-global-action-help'
import sldsGlobalActionNotifications from './slds-global-action-notifications'
import sldsGlobalActionSetup from './slds-global-action-setup'
import sldsGlobalActionTask from './slds-global-action-task'

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
