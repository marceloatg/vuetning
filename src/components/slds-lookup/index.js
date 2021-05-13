import sldsLookup from './lookup'
import sldsLookupOption from './lookup-option'

export default Vue => {
    Vue.component(sldsLookup.name, sldsLookup)
    Vue.component(sldsLookupOption.name, sldsLookupOption)
}
