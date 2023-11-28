<template>
    <li
        role="presentation"
        class="slds-listbox__item"
        @click="handleClick"
        @mouseover="handleMouseOver"
    >
        <slds-media-object
            center
            small
            role="option"
            :class="mediaObjectClassNames"
            :figure-class="figureClassNames"
            :body-class="bodyClassNames"
            figure-reverse-class="slds-m-around_none"
            :aria-selected="isSelected"
            :aria-checked="isSelected"
            :aria-disabled="disabled"
        >

            <template #figure>

                <!-- Custom icon -->
                <span v-if="icon" :class="iconClassNames">
                    <slds-svg :icon="icon" :class="svgClassNames"/>
                </span>

                <!-- Custom left icon -->
                <slds-icon
                    v-else-if="leftIcon"
                    :icon-name="leftIcon"
                    x-small
                    :current-color="isIconCurrentColored"
                />

                <!-- Check icon -->
                <span v-else-if="isSelectable" class="slds-icon_container slds-icon-utility-check">
                    <slds-svg icon="utility:check" class="slds-icon slds-icon_x-small slds-listbox__icon-selected"/>
                </span>

            </template>

            <template #default>

                <!-- Label -->
                <span class="slds-truncate slds-listbox__option_label" :title="label" v-html="filteredLabel"/>

                <!-- Meta -->
                <span v-if="meta != null" class="slds-listbox__option-meta">
                    {{ meta }}
                </span>

            </template>

            <template #figure-reverse>
                <slds-icon
                    v-if="rightIcon"
                    :icon-name="rightIcon"
                    x-small
                    :current-color="isIconCurrentColored"
                    class="slds-m-left_small slds-shrink-none"
                />
            </template>

        </slds-media-object>
    </li>
</template>

<script lang="ts">
import SldsIcon from "../slds-icon/slds-icon.vue"
import SldsMediaObject from "../slds-media-object/slds-media-object.vue"
import SldsSvg from "../slds-svg/slds-svg.vue"
import { IconUtils } from "../../utils"
import { defineComponent } from "vue"
import { EVENTS } from "../../constants"

export default defineComponent({
    name: "SldsPageHeaderDropdownOption",

    components: {
        SldsIcon,
        SldsMediaObject,
        SldsSvg,
    },

    props: {
        disabled: Boolean,

        hasFocus: Boolean,

        filter: String,

        icon: String,

        isSelectable: Boolean,

        isSelected: Boolean,

        label: { type: String, required: true },

        leftIcon: String,

        level: String,

        meta: String,

        rightIcon: String,
    },

    computed: {
        /**
         * The CSS class names for the body.
         */
        bodyClassNames(): string {
            let classNames = ""

            if (this.icon || this.leftIcon) classNames += " slds-p-left_xx-small"

            return classNames
        },

        /**
         * The CSS class names for the figure.
         */
        figureClassNames(): string {
            let classNames = ""

            if (this.icon || this.isSelectable) {
                classNames += " slds-listbox__option-icon"

                if (this.disabled) {
                    classNames += " slds-listbox__option-icon-disabled"
                }
            }

            return classNames
        },

        filteredLabel(): string {
            if (this.filter == null) return this.label
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
         * The CSS class names for the icon.
         */
        iconClassNames(): string {
            let classNames = "slds-icon_container"

            if (this.icon && this.icon.length > 0) {
                classNames += ` ${IconUtils.computeBackgroundClass(this.icon)}`
            }

            return classNames
        },

        isIconCurrentColored(): boolean {
            return Boolean(this.disabled || this.level)
        },

        /**
         * The CSS class names for the media object.
         */
        mediaObjectClassNames(): string {
            let classNames = "slds-listbox__option slds-listbox__option_plain"

            if (this.hasFocus || this.isSelected) classNames += " slds-has-focus"
            if (this.level) classNames += ` slds-has-${this.level}`
            if (this.isSelected) classNames += " slds-is-selected"
            if (this.disabled) classNames += " slds-is-disabled"
            if (!this.isSelectable) classNames += " slds-p-vertical_x-small slds-p-horizontal_small"

            return classNames
        },

        /**
         * The CSS class names for the SVG.
         */
        svgClassNames(): string {
            let classNames = "slds-icon slds-icon_small"

            if (this.disabled) classNames += " slds-icon_disabled"

            return classNames
        },
    },

    methods: {
        getIndicesOf(filter: string, label: string): number[] {
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

        handleClick(): void {
            const event = this.disabled ? EVENTS.CLICK_DISABLED : EVENTS.CLICK
            this.$emit(event)
        },

        handleMouseOver(): void {
            this.$emit(EVENTS.MOUSE_OVER)
        },
    },
})
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
