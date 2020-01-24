import sldsComponent from './index.vue'
import Clipboard from 'v-clipboard'

export default Vue => {
    Vue.component(sldsComponent.name, sldsComponent);
    Vue.use(Clipboard)
}
