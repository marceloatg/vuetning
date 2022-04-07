import sldsMultiPicklist from './slds-multi-picklist.vue'
import sldsMultiPicklistOption from './slds-multi-picklist-option'
import sldsMultiPicklistHeading from './slds-multi-picklist-heading'

export default Vue => {
    Vue.component(sldsMultiPicklist.name, sldsMultiPicklist)
    Vue.component(sldsMultiPicklistOption.name, sldsMultiPicklistOption)
    Vue.component(sldsMultiPicklistHeading.name, sldsMultiPicklistHeading)
}
