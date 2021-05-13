import {v4 as Id} from 'uuid'
import {kebabCase} from '@/utils/string-utils'

export default class {
    key
    label
    name
    icon
    error

    constructor(label, name = null) {
        this.key = Id()
        this.label = label
        this.name = name || kebabCase(label)

        if (label == null) console.warn('[slds-dropdown-option] option.label must be a valid string.')
    }
}
