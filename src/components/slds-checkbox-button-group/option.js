import {v4 as Id} from 'uuid'

export default class {
    key
    label
    value
    disabled

    constructor(label, disabled = false, value = null) {
        this.key = Id()
        this.label = label
        this.value = value || label
        this.disabled = disabled

        if (label == null) console.warn('[slds-checkbox-button-group] option.label must be a valid string.')
    }
}
