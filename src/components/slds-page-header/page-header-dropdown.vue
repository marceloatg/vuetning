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
                    <slds-page-header-heading
                        v-if="option.heading"
                        :key="option.key"
                        :heading="option.heading"
                    />

                    <!-- Options -->
                    <slds-page-header-option
                        v-else
                        :key="option.key"
                        :label="option.label"
                        :is-selected="option.value === value"
                        :has-focus="focusedOption === option.value"
                        @click="onClickOption(option.value)"
                        @mouseover="onMouseOverOption(option.value)"
                    />

                </template>
            </template>

            <!-- Spinner -->
            <li v-if="isLoading" role="presentation" class="slds-listbox__item">
                <div class="slds-align_absolute-center slds-p-top_medium">
                    <slds-spinner brand x-small inline/>
                </div>
            </li>

        </ul>
    </div>
</template>

<script>
import SldsPageHeaderHeading from "./page-header-heading"
import SldsPageHeaderOption from './page-header-option'
import SldsSpinner from '@/components/slds-spinner/spinner'

export default {
    name: 'SldsPageHeaderDropdown',

    components: {
        SldsPageHeaderHeading,
        SldsPageHeaderOption,
        SldsSpinner
    },

    props: {
        focusedOption: String,
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

<style scoped lang="scss">
.slds-dropdown_large {
    min-width: 512px;
}
</style>
