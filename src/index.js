import * as SldsComponents from './components'

const Vuetning = {
    install(Vue, options) {
        Vue.prototype.$vuetning = {
            hasAnimations: options ? options.hasAnimations : false
        }

        Object.values(SldsComponents).forEach((sldsComponent) => {
            Vue.use(sldsComponent)
        })
    }
};

if (typeof window !== 'undefined' && window.Vue) window.Vue.use(Vuetning)

export default Vuetning
