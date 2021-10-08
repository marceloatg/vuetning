export default class {
    key
    label
    name
    icon
    error

    constructor(label, name = null) {
        this.label = label
        this.name = name || label
        this.key = btoa(this.name)

        if (label == null) console.warn('[slds-dropdown-option] option.label must be a valid string.')
    }
}
