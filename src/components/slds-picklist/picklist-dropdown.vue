<template>
    <div
        class="slds-dropdown slds-dropdown_left slds-dropdown_top slds-dropdown_fluid"
        role="listbox"
    >
        <ul class="slds-listbox slds-listbox_vertical" role="presentation">

            <!-- Slot options -->
            <slot v-if="$slots.default"/>

            <!-- Prop options -->
            <template v-else>
                <template v-for="option in options">

                    <!-- Headings -->
                    <slds-picklist-heading
                        v-if="option.heading"
                        :key="option.key"
                        :heading="option.heading"
                    />

                    <!-- Options -->
                    <slds-picklist-option
                        v-else
                        :key="option.key"
                        :label="option.label"
                        :meta="option.meta"
                        :disabled="option.disabled"
                        :is-selected="option.value === value"
                        :has-focus="focusedOption === option.value"
                        @click="onClickOption(option.value)"
                        @mouseover="onMouseOverOption(option.value)"
                    />

                </template>
            </template>

            <!-- No options -->
            <li v-if="isEmpty" role="presentation" class="slds-listbox__item">
                <div class="slds-align_absolute-center slds-p-vertical_small">
                    No options to display
                </div>
            </li>

            <!-- Spinner -->
            <li v-if="isLoading" role="presentation" class="slds-listbox__item">
                <div class="slds-align_absolute-center slds-p-top_medium">
                    <slds-spinner x-small inline/>
                </div>
            </li>

        </ul>
    </div>
</template>

<script>
import SldsPicklistOption from './picklist-option'
import SldsPicklistHeading from './picklist-heading'
import SldsSpinner from '@/components/slds-spinner/spinner'

export default {
    name: 'SldsPicklistDropdown',

    components: {
        SldsPicklistHeading,
        SldsPicklistOption,
        SldsSpinner
    },

    props: {
        focusedOption: String,
        isEmpty: Boolean,
        isLoading: Boolean,
        options: Array,
        value: String
    },

    methods: {
        onMouseOverOption(value) {
            this.$emit('mouseover', value)
        },

        onClickOption(value) {
            this.$emit('click', value)
        },
    }
}
</script>
