<template>
    <div
        v-click-outside="handleClickOutside"
        class="slds-dropdown-trigger slds-dropdown-trigger_click slds-is-open"
        @keydown.down.prevent
        @keydown.up.prevent
        @keyup.down="handleKeyDown"
        @keyup.enter.stop="handleKeyEnter"
        @keyup.esc="handleKeyEsc"
        @keyup.up="handleKeyUp"
    >

        <!-- Button -->
        <slds-button-icon
            :icon-name="icon"
            :has-dropdown="icon !== 'utility:down'"
            :bare="bare"
            :bordered="borderedFallback"
            :bordered-filled="borderedFilled"
            :bordered-inverse="borderedInverse"
            :inverse="inverse"
            :xx-small="xxSmall"
            :x-small="xSmall"
            :small="small"
            :large="large"
            :disabled="disabled"
            :title="title"
            :assistive-text="title"
            aria-haspopup="true"
            @click="handleClickButton"
            @keyup.enter.stop.prevent
        />

        <!-- Dropdown -->
        <slds-dropdown
            :bottom-alignment="bottomAlignment"
            :center-alignment="centerAlignment"
            :focused-option="focusedOption"
            :is-open="isOpen"
            :options="options"
            :right-alignment="rightAlignment"
            @click-option="handleClickOption"
            @mouse-over-option="setFocusedOption"
        >

            <template #before>
                <slot name="before"/>
            </template>

            <template #after>
                <slot name="after"/>
            </template>

        </slds-dropdown>

    </div>
</template>

<script lang="ts">
import HasDropdownMixin from "../../mixins/has-dropdown-mixin"
import SldsButtonIcon from "../slds-button-icon/slds-button-icon.vue"
import SldsDropdown from "../slds-dropdown/slds-dropdown.vue"
import { vOnClickOutside } from "@vueuse/components"
import { defineComponent } from "vue"
import { type DropdownOption } from "../slds-dropdown/dropdown-option"
import { ICONS } from "../../constants"

export default defineComponent({
    name: "SldsMenu",

    components: {
        SldsDropdown,
        SldsButtonIcon,
    },

    directives: {
        ClickOutside: vOnClickOutside,
    },

    mixins: [
        HasDropdownMixin,
    ],

    props: {
        bare: Boolean,
        bordered: Boolean,
        borderedFilled: Boolean,
        borderedInverse: Boolean,
        disabled: Boolean,
        icon: { type: String, default: ICONS.UTILITY.DOWN },
        inverse: Boolean,
        large: Boolean,
        nubbin: Boolean,
        small: Boolean,
        title: String,
        xSmall: Boolean,
        xxSmall: Boolean,
    },

    computed: {
        borderedFallback(): boolean {
            return (
                (this.bordered) ||
                (!this.bare && !this.borderedFilled && !this.borderedInverse && !this.inverse && !this.bare)
            )
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
                this.setFocusedOption()
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
         * Handles the key down event on the menu.
         */
        handleKeyDown(): void {
            if (!this.isOpen) {
                this.setFocusedOption()
                this.showDropdown()
            }
            else if (!this.isEmpty) {
                this.setFocusedOptionDown()
            }
        },

        /**
         * Handles the key enter event on the menu.
         */
        handleKeyEnter(): void {
            if (!this.isOpen) {
                this.setFocusedOption()
                this.showDropdown()
            }
            else if (!this.isEmpty) {
                this.selectOption(this.focusedOption!)
            }
        },

        /**
         * Handles the key enter event on the menu.
         */
        handleKeyEsc(): void {
            if (!this.isOpen) return

            this.hideDropdown()
            this.clearFocusedOption()
        },

        /**
         * Handles the key up event on the menu.
         */
        handleKeyUp(): void {
            if (!this.isOpen) {
                this.setFocusedOption()
                this.showDropdown()
            }
            else if (!this.isEmpty) {
                this.setFocusedOptionUp()
            }
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

        /**
         * Set the focused item.
         * @param focusedOption Hovered option, if any.
         */
        setFocusedOption(focusedOption?: DropdownOption): void {
            if (this.isEmpty) return

            if (focusedOption) this.focusedOption = focusedOption
            else this.focusedOption = this.options.find(option => !option.disabled && !option.isHeading && !option.isDivider)
        },
    },
})
</script>
