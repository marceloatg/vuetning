import sldsDataTable from './slds-data-table.vue'
import Clipboard from 'v-clipboard'

export default Vue => {
    Vue.use(Clipboard)
    Vue.component(sldsDataTable.name, sldsDataTable)
}
