import sldsCombobox from './combobox'
import sldsComboboxOption from './combobox-option'
import sldsComboboxHeading from './combobox-heading'

export default Vue => {
    Vue.component(sldsCombobox.name, sldsCombobox)
    Vue.component(sldsComboboxOption.name, sldsComboboxOption)
    Vue.component(sldsComboboxHeading.name, sldsComboboxHeading)
}
