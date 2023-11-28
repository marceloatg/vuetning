<template>
    <div :class="columnClassNames" :style="columnStyleValues">

        <!-- Label -->
        <div class="cell slds-grid slds-grid_vertical-align-center slds-has-flexi-truncate">

            <!-- Label -->
            <span class="slds-truncate" :title="label">
                {{ label }}
            </span>

            <!-- Sort icon -->
            <span v-if="sortable" class="slds-icon_container slds-icon-utility-arrowup">
                <slds-svg icon="utility:arrowup" class="slds-icon slds-icon-text-default slds-is-sortable__icon"/>
            </span>

        </div>

        <!-- Menu -->
        <slds-menu
            v-if="hasMenu"
            bare
            x-small
            :options="options"
            class="slds-m-right_xx-small"
            @sort-asc="$emit('sort', 'asc')"
            @sort-desc="$emit('sort', 'desc')"
        >
            <template #after>
                <div class="slds-p-around_small" style="width: 15rem">
                    <slds-input label="Filter this column by:"/>
                </div>
            </template>
        </slds-menu>

        <!-- Handle -->
        <span
            v-if="isResizable"
            class="handle"
            :style="{transform: `translateX(${resizerTranslation}px)`}"
            @mousedown.prevent.stop="handleResizerMouseDown"
            @click.stop
        >
            <span class="divider"/>
        </span>

    </div>
</template>

<script lang="ts">
import SldsSvg from "../slds-svg/slds-svg.vue"
import SldsInput from "../slds-input/slds-input.vue"
import SldsMenu from "../slds-menu/slds-menu.vue"
import { EVENTS } from "../../constants"
import { defineComponent, type StyleValue } from "vue"
import type { DropdownOption } from "../slds-dropdown/dropdown-option"

export default defineComponent({
    name: "SldsDataTableColumn",

    components: {
        SldsMenu,
        SldsInput,
        SldsSvg,
    },

    props: {
        hasMenu: Boolean,

        index: { type: Number, required: true },

        left: Number,

        label: String,

        minimumWidth: { type: Number, default: 48 },

        isResizable: { type: Boolean, default: true },

        sortable: { type: Boolean, default: true },

        sortedAscending: Boolean,

        sortedDescending: Boolean,

        type: {
            type: String,
            default: "text",
            validator(value: string) {
                return [
                    "avatar",
                    "badge",
                    "boolean",
                    "button",
                    "link",
                    "icon",
                    "text",
                ].indexOf(value) !== -1
            },
        },

        width: Number,
    },

    data() {
        return {
            startX: null as unknown as number,

            currentX: null as unknown as number,

            options: [] as DropdownOption[],

            touchingResizer: false,

            resizerTranslation: 0,
        }
    },

    computed: {
        /**
         * The CSS class names for the column.
         */
        columnClassNames(): string {
            let classNames = "column"

            if (this.isResizable) classNames += " is-resizable"
            if (this.sortable) classNames += " slds-is-sortable"

            if (this.sortedAscending) classNames += " slds-is-sorted slds-is-sorted_asc"
            else if (this.sortedDescending) classNames += " slds-is-sorted slds-is-sorted_desc"

            return classNames
        },

        /**
         * The CSS style values for the column.
         */
        columnStyleValues(): StyleValue {
            return {
                width: `${this.width}px`,
                left: `${this.left}px`,
            }
        },
    },

    created() {
        if (this.sortable) {
            this.options.push({ value: "sort-asc", label: "Sort A to Z", iconName: "utility:arrowup" })
            this.options.push({ value: "sort-desc", label: "Sort Z to A", iconName: "utility:arrowdown" })
        }
    },

    methods: {
        handleDoubleClick() {
            if (!this.isResizable || (this.type !== "text" && this.type !== "link")) return
            this.$emit("expand")
        },

        handleResizerMouseDown(event: Event) {
            if (!(event instanceof MouseEvent)) return

            this.startX = event.pageX
            this.currentX = this.startX
            this.touchingResizer = true

            document.body.addEventListener(EVENTS.MOUSE_MOVE, this.handleResizerMove)
            document.body.addEventListener(EVENTS.MOUSE_UP, this.onResizerMoveEnd)
            document.body.addEventListener(EVENTS.MOUSE_LEAVE, this.onResizerMoveEnd)
        },

        handleResizerMove(event: Event) {
            if (!(event instanceof MouseEvent)) return

            if (!this.touchingResizer) return
            if (this.currentX === event.pageX) return

            this.currentX = event.pageX
            const delta = this.currentX - this.startX

            this.resizing(delta)
        },

        onResizerMoveEnd() {
            if (!this.touchingResizer) return

            this.touchingResizer = false
            document.body.removeEventListener(EVENTS.MOUSE_MOVE, this.handleResizerMove)
            document.body.removeEventListener(EVENTS.MOUSE_UP, this.onResizerMoveEnd)
            document.body.removeEventListener(EVENTS.MOUSE_LEAVE, this.onResizerMoveEnd)

            const delta = this.currentX - this.startX
            this.resize(delta)
        },

        handleSingleClick() {
            if (!this.sortable) return

            if (this.sortedAscending) this.$emit("sort", "desc")
            else this.$emit("sort", "asc")
        },

        resize(delta: number) {
            // Apply column width validations to delta
            if (this.width + delta < this.minimumWidth) {
                delta = this.minimumWidth - this.width
                if (delta === 0) return
            }

            // Emit resize event with delta
            this.$emit(EVENTS.RESIZE, this.index, delta)
            this.resizerTranslation = 0
        },

        resizing(delta: number) {
            if (this.width + delta < this.minimumWidth) delta = this.minimumWidth - this.width
            this.resizerTranslation = delta
        },
    },
})
</script>

<style scoped lang="scss">
$color-background-button-brand: #0070d2;
$spacing-xx-small: .25rem;

.column {
    display: flex;
    height: 100%;
    width: 100%;
    align-items: center;
    user-select: none;

    &.slds-is-sortable {
        cursor: pointer;
    }

    .cell {
        padding: .25rem .5rem;
    }

    .handle {
        margin-left: auto;
        width: $spacing-xx-small;
        height: 100%;
        background: $color-background-button-brand;
        cursor: col-resize;
        opacity: 0;
        will-change: transform;
        z-index: 5000;

        &:hover,
        &:focus,
        &:active {
            opacity: 1;

            .divider {
                position: absolute;
                right: 0;
                height: 100vh;
                width: 1px;
                background: $color-background-button-brand;
            }
        }
    }

    &:hover {
        background-color: white;
        color: currentColor;

        &.is-resizable {
            box-shadow: inset -0.25rem 0 0 #dddbda;
        }

        .slds-is-sortable__icon {
            display: inline-block;
            fill: #0070d2;
        }
    }
}

.unclickable {
    pointer-events: none;
}

</style>
