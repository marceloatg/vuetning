<template>
    <div ref="root" class="slds-virtual-table">

        <!-- Table -->
        <div ref="container" class="slds-virtual-table_container">

            <!-- Header -->
            <div ref="header" class="slds-virtual-table_header">

                <!-- Line number header-->
                <div v-if="!hideLineNumber" class="slds-virtual-table_header-line-number"/>

                <!-- Selection all header -->
                <div v-if="hasSelection" class="slds-virtual-table_header-select-all" @click="$emit('select-all')">
                    <div class="slds-checkbox">
                        <input type="checkbox" :checked="allRowsSelected">
                        <label class="slds-checkbox__label">
                            <span class="slds-checkbox_faux"/>
                        </label>
                    </div>
                </div>

                <!-- Dynamic headers -->
                <column
                    v-for="(column, index) in columnConfigurations"
                    :key="column.id"
                    :has-menu="column.hasMenu"
                    :index="index"
                    :label="column.label"
                    :left="column.left"
                    :minimum-width="column.minimumWidth"
                    :is-resizable="column.isResizable"
                    :sortable="column.sortable"
                    :sorted-ascending="column.sortedAscending"
                    :sorted-descending="column.sortedDescending"
                    :type="column.type"
                    :width="column.width"
                    @resize="onResizeColumn"
                    @expand="onExpandColumn(index, column)"
                    @sort="(order) => onSort(order, column)"
                />

            </div>

            <!-- Body -->
            <slds-virtual-scroller
                class="slds-virtual-table_body"
                :items="filteredRows"
                :item-size="rowHeight"
                :key-field="keyField">
                <template v-slot="/* eslint-disable vue/no-unused-vars */{ item, index }">
                    <div
                        :data-index="index"
                        class="slds-virtual-table_row"
                        :class="{'is-selected': hasSelection && item.isSelected}"
                    >

                        <!-- Line number cell -->
                        <div v-if="!hideLineNumber" class="slds-virtual-table_cell slds-virtual-table_cell-line-number">
                            {{ getLineNumber(index) }}
                        </div>

                        <!-- Selection cell -->
                        <div v-if="hasSelection" class="slds-virtual-table_cell slds-virtual-table_cell-selection" @click="onClickSelect(item)">
                            <div class="slds-checkbox">
                                <input type="checkbox" :checked="item.isSelected">
                                <label class="slds-checkbox__label">
                                    <span class="slds-checkbox_faux"/>
                                </label>
                            </div>
                        </div>

                        <!-- Dynamic cell -->
                        <template v-for="column in columnConfigurations">
                            <div :key="column.id" class="slds-virtual-table_cell" :style="{width: `${column.width}px`}">
                                <span class="slds-grid slds-grid_align-spread slds-virtual-table_cell-content">

                                    <!-- Text -->
                                    <span
                                        v-if="column.type === 'text'"
                                        :title="getFieldValue(column, item)"
                                        class="slds-truncate"
                                        :class="{'slds-text-font_monospace': column.isMonospaced}">
                                        {{ getFieldValue(column, item) }}
                                    </span>

                                    <!-- Link -->
                                    <a
                                        v-else-if="column.type === 'link'"
                                        :title="getFieldValue(column, item)"
                                        class="slds-truncate"
                                        :class="{'slds-text-font_monospace': column.isMonospaced}"
                                        @click="onClickAction(column, item)">
                                        {{ getFieldValue(column, item) }}
                                    </a>

                                    <!-- Badge -->
                                    <span
                                        v-else-if="column.type === 'badge' && getFieldValue(column, item) != null"
                                        class="slds-badge"
                                        :class="['slds-badge_' + getFieldValue(column, item).color]">
                                        <span
                                            v-if="getFieldValue(column, item).icon"
                                            class="slds-badge__icon slds-badge__icon_left"
                                            :class="'slds-badge__icon_' + getFieldValue(column, item).color">
                                            <span class="slds-icon_container slds-current-color">
                                                <slds-svg :icon="getFieldValue(column, item).icon" class="slds-icon slds-icon_xx-small" style="margin-top: -4px;"/>
                                            </span>
                                        </span>{{ getFieldValue(column, item).label }}
                                    </span>

                                    <!-- Boolean -->
                                    <span
                                        v-else-if="column.type === 'boolean' && getFieldValue(column, item)"
                                        class="slds-truncate">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            width="100%"
                                            style="width: .95rem;height: .95rem;"
                                            height="100%"
                                            fill="#706e6b">
                                            <path d="M8.8 19.6L1.2 12c-.3-.3-.3-.8 0-1.1l1-1c.3-.3.8-.3 1 0L9 15.7c.1.2.5.2.6 0L20.9 4.4c.2-.3.7-.3 1 0l1 1c.3.3.3.7 0 1L9.8 19.6c-.2.3-.7.3-1 0z"/>
                                        </svg>
                                    </span>

                                    <!-- Avatar -->
                                    <span
                                        v-else-if="column.type === 'avatar'"
                                        class="slds-avatar slds-avatar_circle slds-avatar_medium">
                                        <img alt="avatar" :src="getFieldValue(column, item)">
                                    </span>

                                    <!-- Icon -->
                                    <span v-else-if="column.type === 'icon'">
                                        <slds-icon
                                            small
                                            inverse
                                            standard-format
                                            :icon="getFieldValue(column, item).name"
                                            :icon-class="getFieldValue(column, item).class"
                                        />
                                    </span>

                                    <!-- Button -->
                                    <button
                                        v-else-if="column.type === 'button' && getFieldValue(column, item) != null"
                                        class="slds-button slds-button_outline-brand"
                                        @click="onClickButton(column, item)">
                                        {{ getFieldValue(column, item).label }}
                                    </button>

                                    <!-- Copy to clipboard button -->
                                    <button
                                        v-if="column.hasCopyButton"
                                        class="slds-button slds-button_icon slds-virtual-table_cell-copy__button slds-m-left_x-small"
                                        title="Copy to clipboard"
                                        @click="onClickCopy(column, item)">

                                        <svg
                                            fill="#b0adab"
                                            style="width: .875rem;height: .875rem;"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            width="100%"
                                            height="100%">
                                            <path d="M8 5.4h8c.4 0 .8-.4.8-.8V3.1c0-1.2-1-2.2-2.2-2.2H9.5c-1.2 0-2.2 1-2.2 2.2v1.5c0 .4.3.8.7.8zm12-2.6h-.8c-.2 0-.3.1-.3.3v1.5c0 1.6-1.3 3-2.9 3H8c-1.6 0-2.9-1.4-2.9-3V3.1c0-.2-.1-.3-.3-.3H4c-1.2 0-2.2 1-2.2 2.2v15.9c0 1.2 1 2.2 2.2 2.2h16c1.2 0 2.2-1 2.2-2.2V5c0-1.2-1-2.2-2.2-2.2z"/>
                                        </svg>

                                    </button>

                                </span>
                            </div>
                        </template>

                        <!-- Actions cell -->
                        <div
                            v-if="hasActions && item.actions != null && item.actions.length > 0"
                            class="slds-virtual-table_cell slds-virtual-table_cell-actions"
                        >
                            <div class="slds-dropdown-trigger slds-dropdown-trigger_click slds-is-open">

                                <!-- Button -->
                                <button
                                    class="slds-button slds-button_icon slds-button_icon-border-filled slds-button_icon-x-small"
                                    title="Actions"
                                    @click="onClickActionMenu(item, index)">
                                    <svg
                                        class="slds-button__icon"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24">
                                        <path d="M3.8 6.5h16.4c.4 0 .8.6.4 1l-8 9.8c-.3.3-.9.3-1.2 0l-8-9.8c-.4-.4-.1-1 .4-1z"/>
                                    </svg>
                                </button>

                                <!-- Items -->
                                <transition name="dropdown">
                                    <div
                                        v-if="actionMenu.openedRowId === item[keyField]"
                                        ref="dropdown"
                                        v-click-outside="onCloseActionMenu"
                                        class="slds-dropdown slds-dropdown_length-5 slds-dropdown_right"
                                        :class="[`slds-dropdown_${actionMenu.orientation}`]"
                                        :style="{opacity: actionMenu.opacity}">

                                        <ul class="slds-dropdown__list" role="menu">
                                            <li
                                                v-for="action in currentActions"
                                                :key="action.value"
                                                class="slds-dropdown__item"
                                                role="presentation"
                                                @mousedown.prevent="onMouseDownAction(action, item)">

                                                <a role="menuitem" :class="{'slds-is-disabled': action.disabled}">
                                                    <span class="slds-truncate" :title="action.label">
                                                        <slds-icon
                                                            v-if="action.icon != null"
                                                            :icon="action.icon"
                                                            x-small
                                                            class="slds-m-right_x-small"/>
                                                        {{ action.label }}
                                                    </span>
                                                </a>

                                            </li>
                                        </ul>

                                    </div>
                                </transition>

                            </div>
                        </div>

                    </div>
                </template>
            </slds-virtual-scroller>

        </div>

        <!-- Ruler -->
        <div v-if="ruler.active" ref="ruler" class="ruler">
            {{ ruler.value }}
        </div>

    </div>
</template>

<script>
import Column from './column'
import ColumnConfiguration from './column-configuration'
import SldsVirtualScroller from '../slds-virtual-scroller/virtual-scroller'
import ClickOutside from '@/directives/click-outside/index'
import 'numeral/locales/pt-br'
import numeral from 'numeral'

const DEFAULT_FIXED_WIDTH = 48
const DEFAULT_MINIMUM_WIDTH = 100
const LINE_ACTIONS_WIDTH = 48
const LINE_COUNTER_WIDTH = 60
const LINE_CHECKBOX_WIDTH = 32
const ROUNDING_ERROR = 1

export default {
    name: 'SldsDataTable',

    components: {
        Column,
        SldsVirtualScroller,
    },

    directives: {
        ClickOutside
    },

    props: {
        actions: Array,
        allRowsSelected: Boolean,
        columns: {type: Array, required: true},
        filter: {type: String, default: null},
        hasSelection: Boolean,
        hideLineNumber: Boolean,
        keyField: {type: String, default: 'id'},
        rows: {type: Array, required: true},
    },

    data() {
        return {
            actionMenu: {
                openedRowId: null,
                orientation: 'top',
                opacity: 0,
            },
            columnConfigurations: [],
            currentActions: [],
            filteredRows: [],
            filterTimerId: null,
            rowWidth: null,
            ruler: {
                value: '',
                active: false
            },
            scrollbarWidth: 0,
            scrollLeft: 0,
            scrollTop: 0,
            sortedColumnId: null,
            sortedOrder: null,
            tableWidth: null,
        }
    },

    computed: {
        hasActions() {
            if (this.actions == null) return false
            return (this.actions.length > 0)
        },

        rowHeight() {
            return this.columnConfigurations.some(column => column.type === 'avatar')
                ? 40
                : 28
        },
    },

    watch: {
        filter() {
            this.$el.querySelector('.slds-virtual-table_body').scrollTop = 0

            // Debouncing filtration
            if (this.filterTimerId) clearTimeout(this.filterTimerId)
            this.filterTimerId = setTimeout(function () {
                this.filterRows()
                this.filterTimerId = null
            }.bind(this), 200)
        },

        rows() {
            this.filterRows()
        },
    },

    created() {
        numeral.locale('pt-br')
        this.initializeColumns()
        this.filterRows()
    },

    async mounted() {
        this.$refs.root.style.setProperty('--row-height', `${this.rowHeight}px`)
        await this.$nextTick()

        await this.getScrollbarWidth()
        this.getTableWidth()

        this.initializeColumnWidths()
        this.initializeColumnOffsets()

        this.$el
            .querySelector('.slds-virtual-table_body')
            .addEventListener('scroll', this.onScrollBody)
    },

    activated() {
        this.$el.querySelector('.slds-virtual-table_body').scrollTop = this.scrollTop
    },

    beforeDestroy() {
        this.$el
            .querySelector('.slds-virtual-table_body')
            .removeEventListener('scroll', this.onScrollBody)
    },

    methods: {
        filterRows() {
            if (this.filter == null || this.filter.length === 0) {
                this.filteredRows = this.rows
            }
            else {
                this.filteredRows = this.rows.filter((row) => {
                    for (let column of this.columnConfigurations) {
                        if (column.fieldName == null) return false
                        const value = this.getFieldValue(column, row)

                        if (String(value).toLowerCase().indexOf(this.filter.toLowerCase()) !== -1) {
                            return true
                        }
                    }

                    return false
                })
            }
        },

        getFieldValue(column, row) {
            if (column.fieldName == null) return null

            return column.fieldName.split('.').reduce(function (prev, curr) {
                return prev ? prev[curr] : null
            }, row || self)
        },

        getLineNumber(index) {
            return numeral(index + 1).format('0,0')
        },

        async getScrollbarWidth() {
            const scroller = this.$el.querySelector('.virtual-scroller')
            if (scroller == null) return

            await this.$nextTick()

            const noVerticalOverflow = scroller.scrollHeight <= scroller.clientHeight
            if (noVerticalOverflow) return

            this.scrollbarWidth = scroller.offsetWidth - scroller.clientWidth
        },

        getTableWidth() {
            if (this.$refs.container != null) {
                this.tableWidth = this.$refs.container.offsetWidth
                this.$refs.header.style.setProperty('--header-width', `${this.tableWidth}px`)
            }

            if (this.$refs.root != null) {
                this.rowWidth = this.tableWidth - this.scrollbarWidth - ROUNDING_ERROR
                this.$refs.root.style.setProperty('--row-width', `${this.rowWidth}px`)
            }
        },

        initializeColumns() {
            for (const column of this.columns) {
                const columnConfiguration = new ColumnConfiguration(column)
                this.columnConfigurations.push(columnConfiguration)
            }
        },

        initializeColumnOffsets() {
            let columnLeftSum = 0

            if (!this.hideLineNumber) columnLeftSum += LINE_COUNTER_WIDTH
            if (this.hasSelection) columnLeftSum += LINE_CHECKBOX_WIDTH

            for (let column of this.columnConfigurations) {
                column.offsetLeft = columnLeftSum
                column.left = columnLeftSum
                columnLeftSum += column.width
            }
        },

        initializeColumnWidths() {
            let knownWidth = 0
            let unknownWidthColumns = 0

            if (!this.hideLineNumber) knownWidth += LINE_COUNTER_WIDTH
            if (this.hasSelection) knownWidth += LINE_CHECKBOX_WIDTH
            if (this.hasActions) knownWidth += LINE_ACTIONS_WIDTH

            for (let column of this.columnConfigurations) {
                if (column.isResizable) {
                    if (column.width == null) unknownWidthColumns++
                    else knownWidth += column.width
                }
                else {
                    if (column.width == null) {
                        knownWidth += DEFAULT_FIXED_WIDTH
                        column.width = DEFAULT_FIXED_WIDTH
                    }
                    else {
                        knownWidth += column.width
                    }
                }
            }

            const width = Math.floor((this.rowWidth - knownWidth) / unknownWidthColumns)

            for (let column of this.columnConfigurations) {
                if (column.width == null) column.width = width
            }
        },

        onClickAction(column, item) {
            if (column.typeAttributes == null) return
            if (column.typeAttributes.action == null) return

            this.$emit(column.typeAttributes.action, item)
        },

        async onClickActionMenu(item, index) {
            this.onCloseActionMenu()
            this.actionMenu.openedRowId = item[this.keyField]
            this.currentActions = this.actions.filter(action => item.actions.includes(action))

            await this.$nextTick()

            // Adjusting z-index
            const items = this.$el.querySelectorAll('.virtual-scroller__item-view')
            for (const item of items) {
                item.style.zIndex = item.querySelector(`[data-index="${index}"]`)
                    ? '1000'
                    : '0'
            }

            // Setting vertical orientation of dropdown
            const dropdown = this.$refs.dropdown
            let parent = dropdown.offsetParent

            while (!parent.classList.contains('virtual-scroller')) {
                parent = parent.offsetParent
            }

            if (dropdown.getBoundingClientRect().bottom > parent.getBoundingClientRect().bottom) {
                this.actionMenu.orientation = 'bottom'
            }

            this.actionMenu.opacity = 1
        },

        onClickButton(column, item) {
            const button = this.getFieldValue(column, item)
            if (button.action == null) return
            this.$emit(button.action, item)
        },

        onClickCopy(column, item) {
            const value = this.getFieldValue(column, item)
            if (value && value.length) this.$clipboard(value)
        },

        onClickSelect(item) {
            this.$emit('select', item)
        },

        onCloseActionMenu() {
            this.actionMenu.openedRowId = null
            this.actionMenu.opacity = 0
            this.actionMenu.orientation = 'top'
            this.currentActions.splice(0, this.currentActions.length)
        },

        async onExpandColumn(index, column) {
            if (column.width === column.fullWidth) return
            let aColumn = column // Enforce atomicity

            if (aColumn.fullWidth == null) {
                for (const row of this.rows) {
                    const value = this.getFieldValue(aColumn, row)
                    if (value == null) continue
                    if (value.length > this.ruler.value.length) this.ruler.value = value
                }

                this.ruler.active = true
                await this.$nextTick()

                const ruler = this.$refs.ruler
                aColumn.fullWidth = (ruler.clientWidth + 24)
                if (aColumn.hasCopyButton) aColumn.fullWidth += 24
                if (aColumn.fullWidth < DEFAULT_MINIMUM_WIDTH) aColumn.fullWidth = DEFAULT_MINIMUM_WIDTH

                this.ruler.value = ''
                this.ruler.active = false
            }

            const delta = aColumn.fullWidth - aColumn.width
            this.onResizeColumn(index, delta)
        },

        onMouseDownAction(action, item) {
            this.$emit(action.value, item)
            this.onCloseActionMenu()
        },

        onResizeColumn(index, delta) {
            this.columnConfigurations[index].width += delta

            this.tableWidth += delta
            this.$refs.header.style.setProperty('--header-width', `${this.tableWidth}px`)

            this.rowWidth += delta
            this.$refs.root.style.setProperty('--row-width', `${this.rowWidth}px`)

            for (++index; index < this.columnConfigurations.length; index++) {
                this.columnConfigurations[index].left += delta
                this.columnConfigurations[index].offsetLeft += delta
            }
        },

        onScrollBody(event) {
            // Handle vertical scroll
            if (this.scrollTop !== event.target.scrollTop) {
                this.scrollTop = event.target.scrollTop
                if (this.actionMenu.openedRowId !== null) this.onCloseActionMenu()
                return
            }

            // Handle horizontal scroll
            if (event.target.scrollLeft === this.scrollLeft) return
            this.scrollLeft = event.target.scrollLeft
            this.$refs.header.style.setProperty('--header-offset', `-${event.target.scrollLeft}px`)
        },

        onSort(order, sortedColumn) {
            this.sortedOrder = order
            this.sortedColumnId = sortedColumn.id

            for (let column of this.columnConfigurations) {
                column.sortedAscending = false
                column.sortedDescending = false
            }

            if (order === 'asc') {
                sortedColumn.sortedAscending = true
                sortedColumn.sortedDescending = false
            }
            else {
                sortedColumn.sortedAscending = false
                sortedColumn.sortedDescending = true
            }

            this.rows.sort(this.sorter)
            this.filterRows()
        },

        sorter(rowA, rowB) {
            const sortedColumn = this.columnConfigurations.find(column => column.id === this.sortedColumnId)
            let a
            let b

            if (sortedColumn.sortBy != null) {
                a = rowA[sortedColumn.sortBy]
                b = rowB[sortedColumn.sortBy]
            }
            else {
                a = rowA[sortedColumn.fieldName]
                b = rowB[sortedColumn.fieldName]
            }

            if (typeof a === 'string') a = a.toLowerCase()
            if (typeof b === 'string') b = b.toLowerCase()
            const bothStringValues = ((typeof a === 'string') && (typeof b === 'string'))

            if (a === b) return 0
            else if (a === null) return 1
            else if (b === null) return -1
            else if (this.sortedOrder === 'asc') {
                if (bothStringValues) return (a.localeCompare(b) < 0) ? -1 : 1
                return (a < b) ? -1 : 1
            }
            else {
                if (bothStringValues) return (a.localeCompare(b) < 0) ? 1 : -1
                return (a < b) ? 1 : -1
            }
        },
    },
}
</script>

<style scoped lang="scss">
$header-height: 2rem;
$table-color-background: #fafaf9;
$table-color-hover: #f3f2f2;

.slds-virtual-table {
    --row-height: 1.75rem;
    --row-width: 100%;

    height: 100%;
    width: 100%;
    position: relative;
    overflow: hidden;
    background-color: $table-color-background;

    &_header {
        --header-offset: 0px;
        --header-width: 100%;

        display: flex;
        position: relative;
        height: $header-height;
        width: var(--header-width);
        margin-left: var(--header-offset);
        color: #514f4d;
        font-weight: 700;
        background-color: $table-color-background;

        .slds-virtual-table_header-line-number {
            height: $header-height;
            min-width: 3.75rem;
        }

        .slds-virtual-table_header-select-all {
            padding: .5rem;
        }
    }

    &_body {
        height: calc(100% - #{$header-height});
        border-top: 1px solid #dddbda;
    }

    &_row {
        display: flex;
        height: var(--row-height);
        width: var(--row-width);
        align-items: center;
        border-bottom: 1px solid #dddbda;
        background-color: white;

        &.is-selected {
            background-color: $table-color-hover;
        }
    }

    &_cell {
        padding: .25rem .5rem;
        height: 100%;

        &:hover {
            background-color: white;
            box-shadow: #dddbda 0 -1px 0 inset, #dddbda 0 1px 0 inset;

            .slds-virtual-table_cell-copy__button {
                opacity: 0.5;

                &:hover {
                    opacity: 1;
                }
            }
        }

        &.slds-virtual-table_cell-line-number {
            width: 3.75rem;
            font-size: .75rem;
            text-align: center;
            line-height: calc(var(--row-height) - .5rem);
            color: #3e3e3c;
        }

        &.slds-virtual-table_cell-selection {
            line-height: calc(var(--row-height) - .5rem);
        }

        &-content {
            height: 100%;
            align-items: center;
        }

        &.slds-virtual-table_cell-actions {
            width: 3rem;

            .slds-dropdown-trigger {
                margin: 0;
                position: absolute;
                top: 50%;
                transform: translateY(-50%);

                .slds-button {
                    margin-top: -2px;

                    &:active {
                        animation: click-effect 120ms cubic-bezier(1, 1.9, 0.94, 0.98);
                    }

                    // Prevent focus appearing in random recycled buttons
                    &:focus {
                        box-shadow: none;
                        color: #706e6b;
                    }
                }
            }
        }

        &-copy__button {
            opacity: 0;
            width: 1.25rem;
            height: 1.25rem;
            flex-shrink: 0;
        }

        .slds-button_outline-brand {
            padding: 0 6px;
            line-height: 1.125rem;

            &:active {
                animation: click-effect 120ms cubic-bezier(1, 1.9, 0.94, 0.98);
            }

            &:focus {
                box-shadow: none;
                color: #0070d2;
                background-color: #fff;
            }

            .slds-button__icon_left {
                margin-right: 0;
            }
        }
    }

    .hover {
        .slds-virtual-table_row {
            background-color: $table-color-hover;
            box-shadow: #dddbda 0 -1px 0 inset, #dddbda 0 1px 0 inset;
        }
    }

    &_line-number {
        min-width: 3.75rem;
    }

    &_selection {
        min-width: 2rem;
    }

    &_container {
        height: 100%;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .1);
    }

    &_actions {
        width: 3rem;
    }
}

.ruler {
    position: absolute;
    visibility: hidden;
    height: auto;
    width: auto;
    white-space: nowrap;
}

$badge-colors: (
    'brand': #0070d2,
    'error': #c23934,
    'success': #04844b,
    'warning': #ffb75d,
);

.slds-badge {
    padding: 3px 8px;
}

.slds-is-disabled {
    color: #c9c7c5 !important;
    cursor: not-allowed !important;
    user-select: none !important;
}

.dropdown-enter,
.dropdown-leave-to {
    opacity: 0 !important;
    transform: translateY(5%) !important;
}

.dropdown-enter-active,
.dropdown-leave-active {
    transition: transform .3s, opacity .15s !important;
}

@each $name, $color in $badge-colors {
    .slds-badge_#{$name},
    .slds-badge__icon_#{$name} {
        color: white;
        background-color: $color;
    }

    .slds-badge_outline-#{$name} {
        border: 1px solid $color;
        background-color: white;
        color: $color;
        padding: 2px 8px;

        svg {
            fill: $color !important;
        }
    }
}

@keyframes click-effect {

    25% {
        transform: scale(0.94, 0.94);
    }

    100% {
        transform: scale(0.98, 0.98);
    }
}

</style>
