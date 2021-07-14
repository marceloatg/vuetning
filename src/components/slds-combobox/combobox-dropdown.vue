<template>
    <div
        class="slds-dropdown slds-dropdown_left slds-dropdown_top slds-dropdown_fluid"
        role="listbox"
    >
        <ul class="slds-listbox slds-listbox_vertical" role="presentation">

            <!-- filter -->
            <li
                v-if="filter && filter.length"
                role="presentation"
                class="slds-listbox__item slds-theme_shade"
                @mousedown.prevent.stop=""
            >
                <div
                    role="option"
                    class="slds-media slds-listbox__option slds-listbox__option_plain slds-media_small"
                >

                    <!-- Figure -->
                    <span class="slds-media__figure slds-listbox__option-icon">
                        <slds-icon icon="utility:search" x-small/>
                    </span>

                    <!-- Body -->
                    <span class="slds-media__body">
                        <span class="slds-truncate" :title="filter">
                            {{ filter }}
                        </span>
                    </span>

                </div>
            </li>

            <!-- Slot options -->
            <slot v-if="$slots.default"/>

            <!-- Prop options -->
            <template v-else>
                <template v-for="option in options">

                    <!-- Headings -->
                    <slds-combobox-heading
                        v-if="option.heading"
                        :key="option.key"
                        :heading="option.heading"
                    />

                    <!-- Options -->
                    <slds-combobox-option
                        v-else
                        :key="option.key"
                        :label="option.label"
                        :meta="option.meta"
                        :icon="option.icon"
                        :disabled="option.disabled"
                        :is-selected="option.value === value"
                        :has-focus="focusedOption === option.value"
                        :filter="filter"
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
import SldsComboboxOption from './combobox-option'
import SldsComboboxHeading from "./combobox-heading";
import SldsSpinner from '@/components/slds-spinner/spinner'

export default {
    name: 'SldsComboboxDropdown',

    components: {
        SldsComboboxHeading,
        SldsComboboxOption,
        SldsSpinner
    },

    props: {
        filter: String,
        focusedOption: String,
        isEmpty: Boolean,
        loading: Boolean,
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
