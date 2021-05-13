import {v4 as Id} from 'uuid'

export default class {
    key
    label
    name
    disabled

    constructor(label, disabled = false, name = null) {
        this.key = Id()
        this.label = label
        this.name = name || label
        this.disabled = disabled

        if (label == null) console.warn('[slds-checkbox-button-group] option.label must be a valid string.')
    }
}
