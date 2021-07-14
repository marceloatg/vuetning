const CLICK_EVENT = 'click'
const HANDLER = '_click_outside_handler'
const TIMEOUT = 0

function bind(el, binding, vnode) {
    unbind(el)

    let callback = binding.value
    let initialMacrotaskEnded = false

    setTimeout(function () {
        initialMacrotaskEnded = true
    }, TIMEOUT)

    el[HANDLER] = function (ev) {
        const path = ev.path || (ev.composedPath ? ev.composedPath() : undefined)
        if (initialMacrotaskEnded && (path ? path.indexOf(el) < 0 : !el.contains(ev.target))) {
            return callback.call(vnode.context, ev)
        }
    }

    document.documentElement.addEventListener(CLICK_EVENT, el[HANDLER], false)
}

function update(el, binding) {
    if (binding.value === binding.oldValue) return
    bind(el, binding)
}

function unbind(el) {
    document.documentElement.removeEventListener(CLICK_EVENT, el[HANDLER], false)
    delete el[HANDLER]
}

export default {
    bind: bind,
    update: update,
    unbind: unbind,
}
