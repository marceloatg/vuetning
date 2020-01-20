import * as SldsComponents from './components'

const Vuetning = {
    install(Vue) {
        Object.values(SldsComponents).forEach((sldsComponent) => {
            Vue.use(sldsComponent)
        });
    }
};

if (typeof window !== 'undefined' && window.Vue) window.Vue.use(Vuetning);

export default Vuetning
