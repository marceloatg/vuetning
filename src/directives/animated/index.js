import DomHandler from '../../utils/dom-utils/index'

function create(el) {
    DomHandler.addClass(el, 'slds-has-animation')
}

const Animated = {
    bind(el, binding, vnode) {
        if (vnode.context.$vuetning && vnode.context.$vuetning.hasAnimations) {
            create(el)
        }
    },
}

export default Animated
