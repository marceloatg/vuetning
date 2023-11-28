<template>
    <slds-form-element
        :errors="errors"
        :label="label"
        :required="required"
        v-bind="formElementAttributes"
    >
        <template #default>

            <div class="slds-dueling-list">

                <div class="slds-dueling-list__column">

                    <span class="slds-form-element__label">
                        {{ sourceLabel }}
                    </span>

                    <!-- Available options -->
                    <div
                        :aria-disabled="disabled"
                        :class="duelingPicklistClassNames"
                    >
                        <ul class="slds-listbox slds-listbox_vertical" role="listbox">
                            <slds-dueling-picklist-option
                                v-for="option in availableOptions"
                                :key="option.id"
                                :is-active="isActiveOptions(option)"
                                :label="option.label"
                                @click="handleClickAvailableOption($event, option)"
                                @ctrl-click="handleCtrlClickAvailableOption(option)"
                                @shift-click="handleShiftClickAvailableOption(option)"
                            />
                        </ul>
                    </div>

                </div>

                <div class="slds-dueling-list__column">

                    <!-- Move right button -->
                    <slds-button-icon
                        icon-name="utility:right"
                        @click="handleClickToRight"
                    />

                    <!-- Move left button -->
                    <slds-button-icon
                        icon-name="utility:left"
                        @click="handleClickToLeft"
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
                        :class="duelingPicklistClassNames"
                    >
                        <ul class="slds-listbox slds-listbox_vertical" role="listbox">
                            <slds-dueling-picklist-option
                                v-for="option in selectedOptions"
                                :key="option.id"
                                :is-active="isActiveOptions(option)"
                                :label="option.label"
                                @click="handleClickSelectedOption($event, option)"
                                @ctrl-click="handleCtrlClickSelectedOption(option)"
                                @shift-click="handleShiftClickSelectedOption(option)"
                            />
                        </ul>
                    </div>

                </div>

                <div class="slds-dueling-list__column">

                    <!-- Move up button -->
                    <slds-button-icon
                        icon-name="utility:up"
                        @click="handleClickToUp"
                    />

                    <!-- Move down button -->
                    <slds-button-icon
                        icon-name="utility:down"
                        @click="handleClickToDown"
                    />

                </div>

            </div>

            <slot/>

        </template>
    </slds-form-element>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue"
import SldsFormElement from "../slds-form-element/slds-form-element.vue"
import SldsButtonIcon from "../slds-button-icon/slds-button-icon.vue"
import SldsDuelingPicklistOption from "../slds-dueling-picklist/slds-dueling-picklist-option.vue"
import { type ValidationError } from "../slds-form-element/validation-error"
import { EVENTS } from "../../constants"
import type Option from "./option"

const AVAILABLE = "available"
const SELECTED = "selected"

export default defineComponent({
    name: "SldsDuelingPicklist",

    components: {
        SldsButtonIcon,
        SldsFormElement,
        SldsDuelingPicklistOption,
    },

    props: {
        /**
         * If present, the dueling picklist is disabled and users cannot interact with it.
         */
        disabled: Boolean,

        /**
         * Array of error objects from vuelidate.
         */
        errors: { type: Array as PropType<ValidationError[]>, default: () => [] as ValidationError[] },

        /**
         * Help text detailing the purpose and function of the dueling picklist.
         */
        fieldLevelHelp: String,

        /**
         * Label for the dueling picklist.
         */
        label: { type: String, required: true },

        /**
         * Dueling picklist values.
         */
        modelValue: { type: Array as PropType<Option[]>, default: () => [] as Option[] },

        /**
         * A list of options that are available for selection. Each option has the following attributes: label and value.
         */
        options: { type: Array, required: true },

        /**
         * Indicates whether this field is required.
         */
        required: Boolean,

        /**
         * Label for the selected dueling picklist.
         */
        selectedLabel: { type: String, required: true },

        /**
         * Label for the source options dueling picklist.
         */
        sourceLabel: { type: String, required: true },
    },

    data() {
        return {
            activeOptions: [] as Array<Option>,

            availableOptions: [] as Array<Option>,

            lastActivatedOption: null as unknown as Option,

            selectedOptions: [] as Array<Option>,
        }
    },

    computed: {
        formElementAttributes(): Record<string, unknown> {
            const attributes: Record<string, unknown> = {}

            for (const attribute in this.$attrs) {
                if (attribute.startsWith("data-") || attribute === "class") {
                    attributes[attribute] = this.$attrs[attribute]
                }
            }

            return attributes
        },

        duelingPicklistClassNames(): string {
            let classNames = "slds-dueling-list__options"

            if (this.disabled) classNames += " slds-is-disabled"

            return classNames
        },
    },

    watch: {
        options: {
            deep: true,
            handler() {
                this.parseOptions()
            },
        },
    },

    created() {
        this.parseOptions()
    },

    methods: {
        emitValue(): void {
            this.$emit(EVENTS.UPDATE_MODEL_VALUE, this.selectedOptions.map(option => option.value))
        },

        handleClickAvailableOption(event: MouseEvent, option: Option): void {
            if (event.ctrlKey || event.shiftKey) return

            this.activeOptions.splice(0, this.activeOptions.length)
            this.activeOptions.push(option)
            this.lastActivatedOption = option
        },

        handleClickSelectedOption(event: MouseEvent, option: Option): void {
            if (event.ctrlKey || event.shiftKey) return

            this.activeOptions.splice(0, this.activeOptions.length)
            this.activeOptions.push(option)
            this.lastActivatedOption = option
        },

        handleClickToDown(): void {
            if (this.availableOptions.includes(this.lastActivatedOption)) return

            const activeOptions = this.activeOptions.map(option => ({
                index: this.selectedOptions.indexOf(option),
                option: option,
            }))

            activeOptions.sort((a, b) => a.index - b.index)

            const inactiveOptions = this.selectedOptions.map(option => ({
                index: !this.activeOptions.includes(option) ? this.selectedOptions.indexOf(option) : -1,
                option: option,
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

        handleClickToLeft(): void {
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
            this.lastActivatedOption = null as unknown as Option
            this.emitValue()
        },

        handleClickToRight(): void {
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
            this.lastActivatedOption = null as unknown as Option
            this.emitValue()
        },

        handleClickToUp(): void {
            if (this.availableOptions.includes(this.lastActivatedOption)) return

            const activeOptions = this.activeOptions.map(option => ({
                index: this.selectedOptions.indexOf(option),
                option: option,
            }))

            activeOptions.sort((a, b) => a.index - b.index)

            const inactiveOptions = this.selectedOptions.map(option => ({
                index: !this.activeOptions.includes(option) ? this.selectedOptions.indexOf(option) : -1,
                option: option,
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

        handleCtrlClickAvailableOption(option: Option): void {
            let hasActiveSelectedOptions = false
            for (const activeOption of this.activeOptions) {
                if (this.selectedOptions.includes(activeOption)) {
                    hasActiveSelectedOptions = true
                    break
                }
            }

            if (hasActiveSelectedOptions) this.activeOptions.splice(0, this.activeOptions.length)

            const optionIndex = this.activeOptions.indexOf(option)
            if (optionIndex === -1) this.activeOptions.push(option)
            else this.activeOptions.splice(optionIndex, 1)

            this.lastActivatedOption = option
        },

        handleCtrlClickSelectedOption(option: Option): void {
            let hasActiveAvailableOptions = false
            for (const activeOption of this.activeOptions) {
                if (this.availableOptions.includes(activeOption)) {
                    hasActiveAvailableOptions = true
                    break
                }
            }

            if (hasActiveAvailableOptions) {
                this.activeOptions.splice(0, this.activeOptions.length)
            }

            const optionIndex = this.activeOptions.indexOf(option)
            if (optionIndex === -1) this.activeOptions.push(option)
            else this.activeOptions.splice(optionIndex, 1)

            this.lastActivatedOption = option
        },

        handleShiftClickAvailableOption(option: Option): void {
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
            } else {
                this.activeOptions.push(option)
            }

            this.lastActivatedOption = option
        },

        handleShiftClickSelectedOption(option: Option): void {
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

        isActiveOptions(option: Option): boolean {
            return this.activeOptions.includes(option)
        },

        parseOptions(): void {
            this.lastActivatedOption = null as unknown as Option
            this.activeOptions.splice(0, this.activeOptions.length)
            this.availableOptions.splice(0, this.availableOptions.length)
            this.selectedOptions.splice(0, this.selectedOptions.length)

            if (this.options.length === 0) return

            for (const option of this.options) {
                const duelingPicklistOption = option as unknown as Option
                this.availableOptions.push(duelingPicklistOption)
            }
        },
    },
})
</script>

