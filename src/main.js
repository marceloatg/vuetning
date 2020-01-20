import Vue from 'vue'
import App from './App.vue'
import Vuetning from './index'

Vue.config.productionTip = false;
Vue.use(Vuetning);

new Vue({
    render: h => h(App),
}).$mount('#app');
