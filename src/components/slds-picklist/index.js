import sldsPicklist from './picklist.vue'
import sldsPicklistOption from './picklist-option'
import sldsPicklistHeading from './picklist-heading'

export default Vue => {
    Vue.component(sldsPicklist.name, sldsPicklist)
    Vue.component(sldsPicklistOption.name, sldsPicklistOption)
    Vue.component(sldsPicklistHeading.name, sldsPicklistHeading)
}
