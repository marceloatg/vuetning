import sldsCombobox from './slds-combobox'
import sldsComboboxOption from './slds-combobox-option'
import sldsComboboxHeading from './slds-combobox-heading'

export default Vue => {
    Vue.component(sldsCombobox.name, sldsCombobox)
    Vue.component(sldsComboboxOption.name, sldsComboboxOption)
    Vue.component(sldsComboboxHeading.name, sldsComboboxHeading)
}
