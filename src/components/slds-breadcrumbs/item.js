import {v4 as Id} from 'uuid'

export default class {
    href
    key
    label
    name

    constructor(label, name = null, href = null) {
        this.key = Id()
        this.label = label
        this.name = name || label
        this.href = href

        if (label == null) console.warn('[slds-breadcrumbs] item.label must be a valid string.')
    }
}
