import Vue from 'vue'
import App from './App.vue'
import { RecycleScroller } from 'vue-virtual-scroller'

import './vuetning'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

Vue.config.productionTip = false;

Vue.component('RecycleScroller', RecycleScroller)

new Vue({
    render: h => h(App),
}).$mount('#app');
