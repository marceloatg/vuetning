import Vue from 'vue'
import App from './App.vue'
import SldsAlert from './components/Alert/Index'
import SldsBrandBand from './components/BrandBand/Index'
import SldsButton from './components/Button/Index'
import SldsButtonIcon from './components/ButtonIcon/Index'
import SldsGlobalHeader from './components/GlobalHeader/Index'
import SldsGlobalNavigation from './components/GlobalNavigation/Index'
import SldsSvg from './shared/Svg/index'

Vue.component('slds-alert', SldsAlert);
Vue.component('slds-brand-band', SldsBrandBand);
Vue.component('slds-button', SldsButton);
Vue.component('slds-button-icon', SldsButtonIcon);
Vue.component('slds-global-header', SldsGlobalHeader);
Vue.component('slds-global-navigation', SldsGlobalNavigation);
Vue.component('slds-svg', SldsSvg);

Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
}).$mount('#app');
