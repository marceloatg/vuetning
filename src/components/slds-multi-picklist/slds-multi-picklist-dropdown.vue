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
                    <slds-multi-picklist-heading
                        v-if="option.heading"
                        :key="option.key"
                        :heading="option.heading"
                    />

                    <!-- Options -->
                    <slds-multi-picklist-option
                        v-else
                        :key="option.key"
                        :label="option.label"
                        :meta="option.meta"
                        :disabled="option.disabled"
                        :is-selected="value.includes(option.value)"
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
            <li v-if="loading" role="presentation" class="slds-listbox__item">
                <div class="slds-align_absolute-center slds-p-top_medium">
                    <slds-spinner x-small inline/>
                </div>
            </li>

        </ul>
    </div>
</template>

<script>
import SldsMultiPicklistOption from './slds-multi-picklist-option'
import SldsMultiPicklistHeading from './slds-multi-picklist-heading'
import SldsSpinner from '@/components/slds-spinner/slds-spinner'

export default {
    name: 'SldsMultiPicklistDropdown',

    components: {
        SldsMultiPicklistHeading,
        SldsMultiPicklistOption,
        SldsSpinner
    },

    props: {
        focusedOption: String,
        isEmpty: Boolean,
        loading: Boolean,
        options: Array,
        value: Array
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
