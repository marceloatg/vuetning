import {v4 as Id} from 'uuid'

const validLevels = ['error', 'success', 'error']

export default class {
    key
    heading
    label
    value
    meta
    icon
    leftIcon
    rightIcon
    disabled
    divider
    level
    nonRemovable

    constructor(heading, label, value = null, divider = false) {
        this.key = Id()

        if (divider) {
            this.divider = divider
        }
        else if (heading) {
            this.heading = heading
        }
        else {
            this.label = label
            this.value = value || label

            if (label == null) console.warn('[slds-dropdown-option] option.label must be a valid string.')
        }
    }

    set level(level) {
        if (validLevels.includes(level.toLowerCase())) this.level = level
        else throw `[slds-dropdown-option] Valid levels are: ${validLevels}`
    }
}
