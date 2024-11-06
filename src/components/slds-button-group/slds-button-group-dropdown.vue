<template>
    <transition name="dropdown-right">
        <div v-if="isOpen" class="slds-dropdown slds-dropdown_right slds-dropdown_actions">
            <ul class="slds-dropdown__list" role="menu">
                <li
                    v-for="(option, index) in dropdownOptions"
                    :key="index"
                    class="slds-dropdown__item"
                    role="presentation"
                    @click="handleClickOption(option)"
                >
                    <a role="menuitem" tabindex="0">
                        <span class="slds-truncate">
                            {{ option.label }}
                        </span>
                    </a>
                </li>
            </ul>
        </div>
    </transition>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue"
import { DropdownOption } from "../slds-dropdown/dropdown-option"
import { EVENTS } from "../../constants"

export default defineComponent({
    name: "SldsButtonGroupDropdown",

    props: {
        /**
         * Dropdown options.
         */
        dropdownOptions: { type: Array as PropType<DropdownOption[]>, default: () => [] as DropdownOption[] },

        /**
         * Indicates whether the dropdown is open.
         */
        isOpen: { type: Boolean, required: true },
    },

    methods: {
        /**
         * Handles the click event on the option.
         * @param option Clicked option.
         */
        handleClickOption(option: DropdownOption): void {
            if (option.isDivider || option.isHeading) return
            this.$emit(EVENTS.CLICK_OPTION, option)
        },
    },
})
</script>

