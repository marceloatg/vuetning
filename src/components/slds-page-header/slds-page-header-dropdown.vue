<template>
    <div
        class="slds-dropdown slds-dropdown_left slds-dropdown_top slds-dropdown_large"
        role="listbox"
    >
        <ul class="slds-listbox slds-listbox_vertical" role="presentation">

            <!-- Slot options -->
            <slot v-if="$slots.default"/>

            <!-- Prop options -->
            <template v-else>
                <template v-for="option in options">

                    <!-- Headings -->
                    <slds-page-header-dropdown-heading
                        v-if="option.isHeading"
                        :key="option.value"
                        :label="option.label"
                    />

                    <!-- Options -->
                    <slds-page-header-dropdown-option
                        v-else
                        :key="option.value"
                        :label="option.label"
                        :is-selected="option.value === value"
                        :has-focus="focusedOption === option.value"
                        @click="handleClickOption(option.value)"
                        @mouseover="handleMouseOverOption(option.value)"
                    />

                </template>
            </template>

            <!-- Spinner -->
            <li v-if="showSpinner" role="presentation" class="slds-listbox__item">
                <div class="slds-align_absolute-center slds-p-top_medium">
                    <slds-spinner brand x-small inline/>
                </div>
            </li>

        </ul>
    </div>
</template>

<script lang="ts">
import SldsPageHeaderDropdownHeading from "./slds-page-header-dropdown-heading.vue"
import SldsPageHeaderDropdownOption from "./slds-page-header-dropdown-option.vue"
import SldsSpinner from "../slds-spinner/slds-spinner.vue"
import { EVENTS } from "../../constants"
import { defineComponent, type PropType } from "vue"
import type { PageHeaderDropdownOption } from "./page-header-dropdown-option"

export default defineComponent({
    name: "SldsPageHeaderDropdown",

    components: {
        SldsPageHeaderDropdownHeading,
        SldsPageHeaderDropdownOption,
        SldsSpinner,
    },

    props: {
        focusedOption: String,

        showSpinner: Boolean,

        options: {
            type: Array as PropType<PageHeaderDropdownOption[]>,
            default: () => [] as PageHeaderDropdownOption[],
        },

        value: String,
    },

    methods: {
        handleMouseOverOption(value: string): void {
            this.$emit(EVENTS.MOUSE_OVER, value)
        },

        handleClickOption(value: string): void {
            this.$emit(EVENTS.CLICK, value)
        },
    },
})
</script>

<style scoped lang="scss">

.slds-dropdown_large {
    min-width: 512px;
}

</style>
