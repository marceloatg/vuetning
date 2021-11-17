import sldsPicklist from './slds-picklist.vue'
import sldsPicklistOption from './slds-picklist-option'
import sldsPicklistHeading from './slds-picklist-heading'

export default Vue => {
    Vue.component(sldsPicklist.name, sldsPicklist)
    Vue.component(sldsPicklistOption.name, sldsPicklistOption)
    Vue.component(sldsPicklistHeading.name, sldsPicklistHeading)
}
