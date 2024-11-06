<template>
    <div class="slds-button-group" role="group">

        <slot/>

        <div
            v-if="showDropdownButton"
            v-click-outside="handleClickOutside"
            class="slds-dropdown-trigger slds-dropdown-trigger_click slds-is-open slds-button_last"
        >

            <slds-button-icon
                bordered
                :disabled="disabled"
                icon-name="utility:down"
                @click="handleClickButton"
            />

            <slds-button-group-dropdown
                :is-open="isOpen"
                :dropdown-options="dropdownOptions"
                @click-option="handleClickOption"
            />

        </div>

    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue"
import SldsButtonIcon from "../slds-button-icon/slds-button-icon.vue"
import SldsButtonGroupDropdown from "./slds-button-group-dropdown.vue"
import HasDropdownMixin from "../../mixins/has-dropdown-mixin.ts"
import { vOnClickOutside } from "@vueuse/components"
import { DropdownOption } from "../slds-dropdown/dropdown-option.ts"

export default defineComponent({
    name: "SldsButtonGroup",

    components: { SldsButtonGroupDropdown, SldsButtonIcon },

    directives: {
        ClickOutside: vOnClickOutside,
    },

    mixins: [
        HasDropdownMixin,
    ],

    props: {
        /**
         * Indicates whether this component is disabled.
         */
        disabled: Boolean,

        /**
         * Dropdown options.
         */
        dropdownOptions: { type: Array as PropType<DropdownOption[]>, default: () => [] as DropdownOption[] },
    },

    computed: {
        /**
         * Indicates whether the dropdown button is visible.
         */
        showDropdownButton(): boolean {
            return Boolean(this.dropdownOptions && this.dropdownOptions.length > 0)
        },
    },

    methods: {
        /**
         * Handles the click event on the button.
         */
        handleClickButton(): void {
            if (this.isOpen) {
                this.hideDropdown()
            }
            else if (!this.disabled) {
                this.showDropdown()
            }
        },

        /**
         * Handles the click event on an option.
         * @param option The clicked option.
         */
        handleClickOption(option: DropdownOption): void {
            if (this.disabled || option.disabled) return
            this.selectOption(option)
        },

        /**
         * Handles the click event outside this component.
         */
        handleClickOutside(): void {
            this.hideDropdown()
        },

        /**
         * Selects an option.
         * @param selectedOption Selected option.
         */
        selectOption(selectedOption: DropdownOption): void {
            this.$emit(selectedOption.value!)
            this.hideDropdown()

            this.clearFocusedOption()
        },
    },
})
</script>

