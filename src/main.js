import Vue from 'vue'
import App from './App.vue'
import Vuetning from './index'
import router from './router'

Vue.config.productionTip = false
Vue.use(Vuetning, {
    hasAnimations: true
})

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
