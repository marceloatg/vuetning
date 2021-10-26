export default class {
    href
    key
    label
    name

    constructor(label, name = null, href = null) {
        this.label = label
        this.name = name || label
        this.href = href
        this.key = btoa(this.name)

        if (label == null) console.warn('[slds-breadcrumbs] item.label must be a valid string.')
    }
}
