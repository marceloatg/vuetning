<template>
    <transition :name="dropdownAnimation">
        <div v-if="isOpen" :class="dropdownClassNames" role="listbox">

            <slot name="before"/>

            <transition-group
                appear
                class="slds-listbox slds-listbox_vertical"
                role="presentation"
                tag="ul"
                @before-enter="staggeredBeforeEnter"
                @enter="staggeredEnter"
            >

                <!-- Options -->
                <template v-if="!isEmpty">
                    <slds-dropdown-option
                        v-for="(option, index) in options"
                        :key="index"
                        :data-index="bottomAlignment ? options.length - 1 - index : index"
                        :description="option.description"
                        :disabled="option.disabled"
                        :filter="filter"
                        :icon-name="option.iconName"
                        :is-divider="option.isDivider"
                        :is-focused="option.value === focusedOption?.value"
                        :is-heading="option.isHeading"
                        :is-selected="checkForSelection(option)"
                        :label="option.label"
                        @click="handleClickOption(option)"
                        @mouseover="handleMouseOverOption(option)"
                    />
                </template>

                <!-- Spinner -->
                <li v-if="showSpinner" role="presentation" class="slds-listbox__item">
                    <div class="slds-align_absolute-center slds-p-top_medium translate-y">
                        <slds-spinner inline x-small/>
                    </div>
                </li>

                <!-- No options -->
                <li v-else-if="isEmpty" role="presentation" class="slds-listbox__item">
                    <div class="slds-align_absolute-center slds-p-vertical_small">
                        No options to display
                    </div>
                </li>

            </transition-group>

            <slot name="after"/>

        </div>
    </transition>
</template>

<script lang="ts">
import SldsSpinner from "../slds-spinner/slds-spinner.vue"
import SldsDropdownOption from "../slds-dropdown/slds-dropdown-option.vue"
import gsap from "gsap"
import { EVENTS } from "../../constants"
import { type PropType, defineComponent } from "vue"
import type { DropdownOption } from "./dropdown-option"

export default defineComponent({
    name: "SldsDropdown",

    components: {
        SldsDropdownOption,
        SldsSpinner,
    },

    props: {
        bottomAlignment: Boolean,

        centerAlignment: Boolean,

        /**
         * Option filter.
         */
        filter: { type: String, default: "" },

        /**
         * Focused option value.
         */
        focusedOption: Object as PropType<DropdownOption>,

        /**
         * Indicates whether the dropdown is open.
         */
        isOpen: { type: Boolean, required: true },

        length: Number,

        /**
         * Picklist options.
         */
        options: { type: Array as PropType<DropdownOption[]>, required: true },

        rightAlignment: Boolean,

        /**
         * Selected option value.
         */
        selectedOption: Object as PropType<DropdownOption>,

        /**
         * Selected option values.
         */
        selectedOptions: Array as PropType<DropdownOption[]>,

        /**
         * Indicates whether this dropdown is showing a spinner.
         */
        showSpinner: Boolean,
    },

    computed: {
        /**
         * The animation name for the dropdown.
         */
        dropdownAnimation(): string {
            let animation = "dropdown"

            if (this.rightAlignment) animation += "-right"
            if (this.centerAlignment) animation += "-center"
            if (this.bottomAlignment) animation += "-bottom"

            return animation
        },

        /**
         * The CSS class names for the dropdown.
         */
        dropdownClassNames(): string {
            let classNames = "slds-dropdown slds-dropdown_fluid"

            // Menu alignment
            if (this.centerAlignment) classNames += " slds-dropdown_center"
            else if (this.rightAlignment) classNames += " slds-dropdown_right"
            else classNames += " slds-dropdown_left"

            if (this.bottomAlignment) classNames += " slds-dropdown_bottom"

            // Length
            if (this.length) classNames += ` slds-dropdown_length-${this.length}`

            return classNames
        },

        /**
         * Indicates whether there are no options on this dropdown.
         */
        isEmpty(): boolean {
            if (!this.options || this.options.length === 0) return true
            return this.options.filter(option => !option.isHeading && !option.isDivider).length === 0
        },
    },

    methods: {
        /**
         * Checks if a given options is selected.
         * @param optionToCheck Option to be checked.
         */
        checkForSelection(optionToCheck: DropdownOption): boolean {
            if (!optionToCheck.value) return false
            if (this.selectedOption) return Boolean(this.selectedOption.value === optionToCheck.value)
            if (this.selectedOptions) return this.selectedOptions.some(option => optionToCheck.value === option.value)
            return false
        },

        /**
         * Handles the click event on the option.
         * @param option Clicked option.
         */
        handleClickOption(option: DropdownOption): void {
            if (option.isDivider || option.isHeading) return
            this.$emit(EVENTS.CLICK_OPTION, option)
        },

        /**
         * Handles the mouse over event on the option.
         * @param option Hovered option.
         */
        handleMouseOverOption(option: DropdownOption): void {
            this.$emit(EVENTS.MOUSE_OVER_OPTION, option)
        },

        /**
         * Before enter animation.
         * @param element DOM element.
         */
        staggeredBeforeEnter(element: Element): void {
            const translation = this.bottomAlignment ? "16px" : "-16px"
            const htmlElement = element as HTMLElement

            htmlElement.style.opacity = String(0)
            htmlElement.style.transform = `translateY(${translation})`
        },

        /**
         * Enter animation.
         * @param element DOM element.
         * @param done Callback.
         */
        staggeredEnter(element: Element, done: any): void {
            const htmlElement = element as HTMLElement
            const index = Number(htmlElement?.dataset?.index) || 0

            gsap.to(htmlElement, {
                opacity: 1,
                y: 0,
                duration: .2,
                onComplete: done,
                delay: index * 0.025,
            })
        },
    },
})
</script>

<style scoped lang="scss">

.translate-y {
    transform: translateY(16px);
}

.slds-dropdown_right {
    transform: translateX(-12px);
}

</style>
