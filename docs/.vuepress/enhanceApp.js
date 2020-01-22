import Vuetning from '../../src'
import Vuecode from 'viewcode/dist/vuecode.common.js'
import 'viewcode/dist/vuecode.css'

export default ({Vue}) => {
    Vue.use(Vuetning);
    Vue.use(Vuecode, {theme: 'flat'});
}
