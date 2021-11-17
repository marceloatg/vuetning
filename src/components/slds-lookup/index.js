import sldsLookup from './slds-lookup'
import sldsLookupOption from './slds-lookup-option'

export default Vue => {
    Vue.component(sldsLookup.name, sldsLookup)
    Vue.component(sldsLookupOption.name, sldsLookupOption)
}
