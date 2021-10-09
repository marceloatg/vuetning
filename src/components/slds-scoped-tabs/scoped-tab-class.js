export default class {
    key
    label
    name

    constructor(label, name = null) {
        this.label = label
        this.name = name || label
        this.key = btoa(this.name)

        if (label == null) console.warn('[slds-scoped-tab] tab.label must be a valid string.')
    }
}
