<template>
    <li role="presentation" :class="itemClassNames">
        <template v-if="!isDivider">

            <!-- Heading -->
            <div
                v-if="isHeading"
                class="slds-media slds-listbox__option slds-listbox__option_plain slds-media_small"
                role="presentation"
            >
                <h3 class="slds-listbox__option-header" role="presentation">
                    {{ label }}
                </h3>
            </div>

            <!-- Option -->
            <div
                v-else
                :aria-disabled="disabled"
                :class="optionClassNames"
                role="option"
            >

                <!-- Icon -->
                <span class="slds-media__figure slds-listbox__option-icon">

                    <!-- Custom icon -->
                    <slds-icon
                        v-if="iconName"
                        :current-color="disabled"
                        :icon-name="iconName"
                        :small="isEntityOption"
                        :x-small="!isEntityOption"
                    />

                    <!-- Check icon -->
                    <slds-icon
                        v-else-if="isSelected"
                        current-color
                        icon-name="utility:check"
                        x-small
                    />

                </span>

                <!-- Text -->
                <span class="slds-media__body">

                    <!-- Label -->
                    <span :class="labelClassNames" :title="label" v-html="filteredLabel"/>

                    <!-- Description -->
                    <span v-if="description" :class="descriptionClassNames">
                        {{ description }}
                    </span>

                </span>

            </div>

        </template>
    </li>

</template>

<script lang="ts">
import { defineComponent } from "vue"
import { IconUtils } from "../../utils"
import { ICON_CATEGORIES } from "../../constants"
import SldsIcon from "../slds-icon/slds-icon.vue"

export default defineComponent({
    name: "SldsDropdownOption",

    components: { SldsIcon },

    props: {
        /**
         * Optional lower text displayed bellow the label.
         */
        description: String,

        /**
         * Indicates whether this option is disabled.
         */
        disabled: Boolean,

        /**
         * Option filter.
         */
        filter: String,

        /**
         * Optional icon name.
         */
        iconName: String,

        /**
         * Indicates whether this option is a divider.
         */
        isDivider: Boolean,

        /**
         * Indicates whether this option is focused.
         */
        isFocused: Boolean,

        /**
         * Indicates whether this option is a heading.
         */
        isHeading: Boolean,

        /**
         * Indicates whether this option is selected.
         */
        isSelected: Boolean,

        /**
         * Option label.
         */
        label: String,
    },

    computed: {
        /**
         * The CSS class names for the description.
         */
        descriptionClassNames(): string {
            let classNames = "slds-listbox__option-meta"

            // Type
            if (this.isEntityOption) classNames += " slds-listbox__option-meta_entity"
            else classNames += " slds-listbox__option-meta_plain"

            // Disabled
            if (this.disabled) classNames += " slds-listbox__option-meta-disabled"

            return classNames
        },

        /**
         * The CSS class names for the item.
         */
        itemClassNames(): string {
            let classNames = "slds-listbox__item"

            // Divider
            if (this.isDivider) classNames += " slds-has-divider_top-space"

            return classNames
        },

        /**
         * The filtered label with highlighted letters.
         */
        filteredLabel() {
            if (!this.filter || !this.label) return this.label
            const indices = this.getIndicesOf(this.filter, this.label)

            let label = ""
            for (let i = 0; i < indices.length; i++) {
                if (indices[i] > 0) {
                    const prefixStartIndex = (i === 0) ? 0 : indices[i - 1] + 1
                    const prefixEndIndex = indices[i]
                    label += this.label.substring(prefixStartIndex, prefixEndIndex)
                }

                label += `<mark>${this.label.substring(indices[i], indices[i] + this.filter.length)}</mark>`
            }

            if (indices[indices.length - 1] !== this.label.length - 1) {
                const postfixStartIndex = indices[indices.length - 1] + this.filter.length
                const postfixEndIndex = this.label.length
                label += this.label.substring(postfixStartIndex, postfixEndIndex)
            }

            return label
        },

        /**
         * Indicates whether this option is of entity type.
         */
        isEntityOption(): boolean {
            return Boolean(
                this.description &&
                this.iconName &&
                IconUtils.getCategory(this.iconName) === ICON_CATEGORIES.STANDARD
            )
        },

        /**
         * The CSS class names for the label.
         */
        labelClassNames(): string {
            let classNames = "slds-truncate slds-listbox__option-text"

            // Type
            if (this.isEntityOption) classNames += " slds-listbox__option-text_entity"
            else classNames += " slds-listbox__option-text_plain"

            return classNames
        },

        /**
         * The CSS class names for the option.
         */
        optionClassNames(): string {
            let classNames = "slds-media slds-media_center slds-listbox__option"

            // Type
            if (this.isEntityOption) classNames += " slds-listbox__option_entity"
            else classNames += " slds-listbox__option_plain"

            // Focus
            if (this.isFocused || this.isSelected) classNames += " slds-has-focus"

            // Description
            if (this.description) classNames += " slds-listbox__option_has-meta"

            // Selected
            if (this.isSelected) classNames += " slds-is-selected"

            return classNames
        },
    },

    methods: {
        /**
         * Gets the indices of the substrings that matched the option filter.
         * @param filter Filter to match.
         * @param label String to search.
         */
        getIndicesOf(filter: string, label: string) {
            const filterLength = filter.length
            if (filterLength === 0) return []

            let startIndex = 0, index
            const indices = []

            label = label.toLowerCase()
            filter = filter.toLowerCase()

            while ((index = label.indexOf(filter, startIndex)) > -1) {
                indices.push(index)
                startIndex = index + filterLength
            }

            return indices
        },
    },
})
</script>
