<template>
    <li
        role="presentation"
        class="slds-listbox__item"
        @click="onClick"
        @mouseover="onMouseOver"
    >
        <slds-media-object
            center
            small
            role="option"
            class="slds-listbox__option slds-listbox__option_plain"
            :class="mediaObjectClass"
            :figure-class="figureClass"
            :body-class="bodyClass"
            figure-reverse-class="slds-m-around_none"
            :aria-selected="isSelected"
            :aria-checked="isSelected"
            :aria-disabled="disabled"
        >

            <template #figure>

                <!-- Custom icon -->
                <span v-if="icon" class="slds-icon_container" :class="iconClass">
                    <slds-svg
                        :icon="icon"
                        class="slds-icon slds-icon_small"
                        :class="svgClass"
                    />
                </span>

                <!-- Custom left icon -->
                <slds-icon
                    v-else-if="leftIcon"
                    :icon="leftIcon"
                    x-small
                    :current-color="disabled || level"
                />

                <!-- Check icon -->
                <span v-else-if="isSelectable" class="slds-icon_container slds-icon-utility-check">
                    <slds-svg
                        icon="utility:check"
                        class="slds-icon slds-icon_x-small slds-listbox__icon-selected"
                    />
                </span>

            </template>

            <template #default>

                <!-- Label -->
                <span
                    class="slds-truncate slds-listbox__option_label"
                    :title="label"
                    v-html="filteredLabel"
                />

                <!-- Meta -->
                <span v-if="meta != null" class="slds-listbox__option-meta">
                    {{ meta }}
                </span>

            </template>

            <template #figure-reverse>
                <slds-icon
                    v-if="rightIcon"
                    :icon="rightIcon"
                    x-small
                    :current-color="disabled || level"
                    class="slds-m-left_small slds-shrink-none"
                />
            </template>

        </slds-media-object>
    </li>
</template>

<script>
import SldsIcon from '@/components/slds-icon/icon'
import SldsMediaObject from '@/components/slds-media-object/media-object'
import SldsSvg from '@/components/slds-svg/svg'
import {computeBackgroundClass} from "@/utils/icon-utils";

export default {
    name: "SldsDropdownOption",

    components: {
        SldsIcon,
        SldsMediaObject,
        SldsSvg
    },

    props: {
        disabled: Boolean,
        hasFocus: Boolean,
        filter: String,
        icon: String,
        isSelectable: Boolean,
        isSelected: Boolean,
        label: {type: String, required: true},
        leftIcon: String,
        level: String,
        meta: String,
        rightIcon: String
    },

    computed: {
        bodyClass() {
            return {
                'slds-p-left_xx-small': this.icon || this.leftIcon
            }
        },

        figureClass() {
            const classNames = []

            if (this.icon || this.isSelectable) {
                classNames.push('slds-listbox__option-icon')

                if (this.disabled) {
                    classNames.push('slds-listbox__option-icon-disabled')
                }
            }

            return classNames
        },

        filteredLabel() {
            if (this.filter == null) return this.label
            const indices = this.getIndicesOf(this.filter, this.label)

            let label = ''
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

        iconClass() {
            return computeBackgroundClass(this.icon)
        },

        mediaObjectClass() {
            const classNames = []

            if (this.hasFocus || this.isSelected) classNames.push('slds-has-focus')
            if (this.level) classNames.push(`slds-has-${this.level}`)
            if (this.isSelected) classNames.push('slds-is-selected')
            if (this.disabled) classNames.push('slds-is-disabled')
            if (!this.isSelectable) classNames.push('slds-p-vertical_x-small slds-p-horizontal_small')

            return classNames
        },

        svgClass() {
            return {
                'slds-icon_disabled': this.disabled
            }
        }
    },

    methods: {
        getIndicesOf(filter, label) {
            const searchStrLen = filter.length
            if (searchStrLen === 0) return []

            let startIndex = 0, index, indices = []
            label = label.toLowerCase()
            filter = filter.toLowerCase()

            while ((index = label.indexOf(filter, startIndex)) > -1) {
                indices.push(index)
                startIndex = index + searchStrLen
            }

            return indices
        },

        onClick() {
            const event = this.disabled ? 'click-disabled' : 'click'
            this.$emit(event)
        },

        onMouseOver() {
            this.$emit('mouseover')
        }
    }
}
</script>

<style scoped lang="scss">

.slds-listbox__option_label {
    font-size: 13px;
}

.slds-is-disabled {
    color: #c9c7c5;
    cursor: default;
    user-select: none;
    pointer-events: none;

    .slds-listbox__option-meta {
        color: #c9c7c5;
    }
}

.slds-has-error {
    background: #c23934 !important;
}

.slds-has-success {
    background: #04844b !important;
}

.slds-has-error,
.slds-has-success {
    color: white;
}

.slds-has-warning {
    background: #ffb75d !important;
}

</style>
