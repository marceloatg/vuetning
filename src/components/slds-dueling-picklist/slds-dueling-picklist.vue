<template>
    <slds-form-element
        :label="label"
        :required="required"
        :error="error"
        v-bind="dataAttributes"
    >
        <div class="slds-dueling-list">

            <div class="slds-dueling-list__column">

                <!-- Source label -->
                <span class="slds-form-element__label">
                    {{ sourceLabel }}
                </span>

                <!-- Available options -->
                <div
                    :aria-disabled="disabled"
                    class="slds-dueling-list__options"
                    :class="disableDuelingPicklistClass"
                >
                    <ul class="slds-listbox slds-listbox_vertical" role="listbox">
                        <slds-dueling-picklist-option
                            v-for="option in availableOptions"
                            :key="option.key"
                            :label="option.label"
                            :is-active="isActiveOptions(option)"
                            @click="onClickAvailableOption(option)"
                            @ctrl-click="onCtrlClickAvailableOption(option)"
                            @shift-click="onShiftClickAvailableOption(option)"
                        />
                    </ul>
                </div>

            </div>

            <div class="slds-dueling-list__column">

                <!-- Move right button -->
                <slds-button-icon
                    bare
                    icon="utility:right"
                    @click="toRight"
                />

                <!-- Move left button -->
                <slds-button-icon
                    bare
                    icon="utility:left"
                    @click="toLeft"
                />

            </div>

            <div class="slds-dueling-list__column">

                <!-- Selected label -->
                <span class="slds-form-element__label">
                    {{ selectedLabel }}
                </span>

                <!-- Selected options -->
                <div
                    :aria-disabled="disabled"
                    class="slds-dueling-list__options"
                    :class="disableDuelingPicklistClass"
                >
                    <ul class="slds-listbox slds-listbox_vertical" role="listbox">
                        <slds-dueling-picklist-option
                            v-for="option in selectedOptions"
                            :key="option.key"
                            :label="option.label"
                            :is-active="isActiveOptions(option)"
                            @click="onClickSelectedOption(option)"
                            @ctrl-click="onCtrlClickSelectedOption(option)"
                            @shift-click="onShiftClickSelectedOption(option)"
                        />
                    </ul>
                </div>

            </div>

            <div class="slds-dueling-list__column">

                <!-- Move up button -->
                <slds-button-icon
                    bare
                    icon="utility:up"
                    @click="toUp"
                />

                <!-- Move down button -->
                <slds-button-icon
                    bare
                    icon="utility:down"
                    @click="toDown"
                />

            </div>

        </div>
    </slds-form-element>
</template>

<script>
import SldsFormElement from '@/components/slds-form-element/slds-form-element'
import SldsDuelingPicklistOption from '@/components/slds-dueling-picklist/slds-dueling-picklist-option'
import DropdownOption from '@/components/slds-options/dropdown-option-class'

const AVAILABLE = 'available'
const SELECTED = 'selected'

export default {
    name: 'SldsDuelingPicklist',

    components: {
        SldsFormElement,
        SldsDuelingPicklistOption,
    },

    props: {
        /**
         * @description If present, the dueling picklist is disabled and users cannot interact with it.
         * @type {boolean}
         */
        disabled: Boolean,

        /**
         * @description Indicates whether this component has an error.
         * @type {boolean}
         */
        error: Boolean,

        /**
         * @description Help text detailing the purpose and function of the dueling picklist.
         * @type {string}
         */
        fieldLevelHelp: String,

        /**
         * @description Label for the dueling picklist.
         * @type {string}
         */
        label: {type: String, required: true},

        /**
         * @description	A list of options that are available for selection. Each option has the following attributes: label and value.
         * @type {string}
         */
        options: {type: Array, required: true},

        /**
         * @description Indicates whether this field is required.
         * @type {boolean}
         */
        required: Boolean,

        /**
         * @description Label for the selected dueling picklist.
         * @type {string}
         */
        selectedLabel: {type: String, required: true},

        /**
         * @description Label for the source options dueling picklist.
         * @type {string}
         */
        sourceLabel: {type: String, required: true},

        value: {type: Array, default: () => []},
    },

    data() {
        return {
            activeOptions: [],

            availableOptions: [],

            lastActivatedOption: null,

            selectedOptions: [],

            $_value: this.value,
        }
    },

    computed: {
        dataAttributes() {
            const attributes = {...this.$attrs}

            for (const attributesKey in attributes) {
                if (!attributesKey.startsWith('data-')) {
                    delete attributes[attributesKey]
                }
            }

            return attributes
        },

        disableDuelingPicklistClass() {
            return {
                'slds-is-disabled': this.disabled,
            }
        }
    },

    watch: {
        options: {
            deep: true,
            handler() {
                this.parseOptions()
            }
        },
    },

    created() {
        this.parseOptions()
    },

    methods: {
        emitValue() {
            this.$emit('input', this.selectedOptions.map(option => option.value))
        },

        isActiveOptions(option) {
            return this.activeOptions.includes(option)
        },

        onClickAvailableOption(option) {
            this.activeOptions.splice(0, this.activeOptions.length)
            this.activeOptions.push(option)
            this.lastActivatedOption = option
        },

        onClickSelectedOption(option) {
            this.activeOptions.splice(0, this.activeOptions.length)
            this.activeOptions.push(option)
            this.lastActivatedOption = option
        },

        onCtrlClickAvailableOption(option) {
            let hasActiveSelectedOptions = false
            for (const activeOption of this.activeOptions) {
                if (this.selectedOptions.includes(activeOption)) {
                    hasActiveSelectedOptions = true
                    break
                }
            }

            if (hasActiveSelectedOptions) {
                this.activeOptions.splice(0, this.activeOptions.length)
            }

            const optionIndex = this.activeOptions.indexOf(option)
            if (optionIndex === -1) this.activeOptions.push(option)
            else this.activeOptions.splice(optionIndex, 1)

            this.lastActivatedOption = option
        },

        onCtrlClickSelectedOption(option) {
            let hasActiveSelectedOptions = false
            for (const activeOption of this.activeOptions) {
                if (this.availableOptions.includes(activeOption)) {
                    hasActiveSelectedOptions = true
                    break
                }
            }

            if (hasActiveSelectedOptions) {
                this.activeOptions.splice(0, this.activeOptions.length)
            }

            const optionIndex = this.activeOptions.indexOf(option)
            if (optionIndex === -1) this.activeOptions.push(option)
            else this.activeOptions.splice(optionIndex, 1)

            this.lastActivatedOption = option
        },

        onShiftClickAvailableOption(option) {
            this.activeOptions.splice(0, this.activeOptions.length)
            const lastActivatedOptionList = this.availableOptions.includes(this.lastActivatedOption)
                ? AVAILABLE
                : SELECTED

            const lastActivatedOptionIndex = this.availableOptions.indexOf(this.lastActivatedOption)
            const optionIndex = this.availableOptions.indexOf(option)
            const indexes = [optionIndex, lastActivatedOptionIndex]

            if (lastActivatedOptionList === AVAILABLE || optionIndex === lastActivatedOptionIndex) {
                for (let i = Math.min(...indexes); i <= Math.max(...indexes); i++) {
                    this.activeOptions.push(this.availableOptions[i])
                }
            }
            else {
                this.activeOptions.push(option)
            }

            this.lastActivatedOption = option
        },

        onShiftClickSelectedOption(option) {
            this.activeOptions.splice(0, this.activeOptions.length)
            const lastActivatedOptionList = this.selectedOptions.includes(this.lastActivatedOption)
                ? SELECTED
                : AVAILABLE

            const lastActivatedOptionIndex = this.selectedOptions.indexOf(this.lastActivatedOption)
            const optionIndex = this.selectedOptions.indexOf(option)
            const indexes = [optionIndex, lastActivatedOptionIndex]

            if (lastActivatedOptionList === SELECTED || optionIndex === lastActivatedOptionIndex) {
                for (let i = Math.min(...indexes); i <= Math.max(...indexes); i++) {
                    this.activeOptions.push(this.selectedOptions[i])
                }
            } else {
                this.activeOptions.push(option)
            }

            this.lastActivatedOption = option
        },

        toDown() {
            if (this.availableOptions.includes(this.lastActivatedOption)) return

            const activeOptions = this.activeOptions.map(option => ({
                index: this.selectedOptions.indexOf(option),
                option: option
            }))

            activeOptions.sort((a, b) => a.index - b.index)

            const inactiveOptions = this.selectedOptions.map(option => ({
                index: !this.activeOptions.includes(option) ? this.selectedOptions.indexOf(option) : -1,
                option: option
            })).filter(option => option.index >= 0)

            for (const option of activeOptions) {
                if (option.index === this.selectedOptions.length - 1) return

                option.index++
            }

            const newIndexes = activeOptions.map(option => option.index)

            for (const option of inactiveOptions) {
                while (newIndexes.includes(option.index)) {
                    if (option.index === 0) break

                    option.index--
                }
                newIndexes.push(option.index)
            }

            let options = []

            for (let i = 0; i < activeOptions.length; i++) {
                options.push(activeOptions[i])
            }

            for (let i = 0; i < inactiveOptions.length; i++) {
                options.push(inactiveOptions[i])
            }

            options = options.sort((a, b) => a.index - b.index).map(option => option.option)

            this.selectedOptions.splice(0, this.selectedOptions.length)

            for (let i = 0; i < options.length; i++) {
                this.selectedOptions.push(options[i])
            }

            this.emitValue()
        },

        toUp() {
            if (this.availableOptions.includes(this.lastActivatedOption)) return

            const activeOptions = this.activeOptions.map(option => ({
                index: this.selectedOptions.indexOf(option),
                option: option
            }))

            activeOptions.sort((a, b) => a.index - b.index)

            const inactiveOptions = this.selectedOptions.map(option => ({
                index: !this.activeOptions.includes(option) ? this.selectedOptions.indexOf(option) : -1,
                option: option
            })).filter(option => option.index >= 0)

            for (const option of activeOptions) {
                if (option.index === 0) return

                option.index--
            }

            const newIndexes = activeOptions.map(option => option.index)

            for (const option of inactiveOptions) {
                while (newIndexes.includes(option.index)) {
                    if (option.index === this.selectedOptions.length - 1) break

                    option.index++
                }
                newIndexes.push(option.index)
            }

            let options = []

            for (let i = 0; i < activeOptions.length; i++) {
                options.push(activeOptions[i])
            }

            for (let i = 0; i < inactiveOptions.length; i++) {
                options.push(inactiveOptions[i])
            }

            options = options.sort((a, b) => a.index - b.index).map(option => option.option)

            this.selectedOptions.splice(0, this.selectedOptions.length)

            for (let i = 0; i < options.length; i++) {
                this.selectedOptions.push(options[i])
            }

            this.emitValue()
        },

        parseOptions() {
            this.lastActivatedOption = null
            this.activeOptions.splice(0, this.activeOptions.length)
            this.availableOptions.splice(0, this.availableOptions.length)
            this.selectedOptions.splice(0, this.selectedOptions.length)

            if (this.options == null) return

            for (const option of this.options) {
                if (typeof option === 'string') {
                    this.availableOptions.push(new DropdownOption(null, option))
                }
                else if (typeof option === 'object') {
                    const dropdownOption = new DropdownOption(option.heading, option.label, option.value)
                    dropdownOption.disabled = option.disabled

                    this.availableOptions.push(dropdownOption)
                }
                else {
                    throw'[slds-dueling-picklist] options must be of type string or a valid dueling picklist option object.'
                }
            }
        },

        toLeft() {
            if (this.availableOptions.length) {
                for (const option of this.availableOptions)
                    if (this.activeOptions.includes(option)) return
            }

            for (const option of this.activeOptions) {
                const indexSelected = this.selectedOptions.indexOf(option)
                this.availableOptions.push(option)
                this.selectedOptions.splice(indexSelected, 1)
            }

            this.activeOptions.splice(0, this.activeOptions.length)
            this.lastActivatedOption = null
            this.emitValue()
        },

        toRight() {
            if (this.selectedOptions.length) {
                for (const option of this.selectedOptions)
                    if (this.activeOptions.includes(option)) return
            }

            for (const option of this.activeOptions) {
                const indexAvailable = this.availableOptions.indexOf(option)
                this.selectedOptions.push(option)
                this.availableOptions.splice(indexAvailable, 1)
            }

            this.activeOptions.splice(0, this.activeOptions.length)
            this.lastActivatedOption = null
            this.emitValue()
        },
    }
}
</script>

