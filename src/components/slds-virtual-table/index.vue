<template>
    <div class="container">

        <div v-if="ruler.active" ref="ruler" class="ruler">
            {{ ruler.value }}
        </div>

        <div class="table">

            <div class="header" :style="{ width: `${tableWidth}px` }">

                <div v-if="hasLineNumberColumn" class="line-number"/>

                <div
                    v-if="hasCheckboxColumn"
                    class="checkbox"
                    :style="{left: `${selectAllStyle.left}px`, top: `${selectAllStyle.top}px`}">
                    <div class="slds-checkbox" @click="onSelectAll">
                        <input type="checkbox" :checked="(selectedRows.length > 0) && (rows.length === selectedRows.length)">
                        <label class="slds-checkbox__label">
                            <span class="slds-checkbox_faux"/>
                        </label>
                    </div>
                </div>

                <slds-column
                    v-for="(column, index) in columns"
                    :key="column.fieldName"
                    :column="column"
                    :index="index"
                    :initial-width="column.width"
                    :label="column.label"
                    :left="column.left"
                    :minimum-width="column.minimumWidth"
                    :resizable="column.resizable"
                    :sortable="column.sortable"
                    :sorted-ascending="column.sortedAscending"
                    :sorted-descending="column.sortedDescending"
                    :type="column.type"
                    @resize="onResize"
                    @fullwidth="onResizeFullWidth(index, column)"
                    @sort="(order) => onSort(order, column)"/>

            </div>

            <!-- No single file components inside RecycleScroller due to performance restrictions. -->
            <recycle-scroller
                class="body"
                :class="{'has-avatar': hasAvatar}"
                :items="filteredRows"
                :item-size="hasAvatar ? 40 : 28"
                :key-field="keyField"
                :buffer="100">

                <template v-slot="{ item, index }">
                    <div class="row" :class="{selected: isSelected(item)}" :style="{ width: `${rowWidth}px` }">

                        <!-- Line number -->
                        <div v-if="hasLineNumberColumn" class="cell line-number slds-text-body_small slds-text-color_weak">
                            {{ getLineNumber(index) }}
                        </div>

                        <!-- Checkbox -->
                        <div v-if="hasCheckboxColumn" class="cell checkbox">
                            <div class="slds-checkbox" @click="onSelect(item[keyField])">
                                <input type="checkbox" :checked="isSelected(item)">
                                <label class="slds-checkbox__label">
                                    <span class="slds-checkbox_faux"/>
                                </label>
                            </div>
                        </div>

                        <!-- Dynamic cells -->
                        <template
                            v-for="column in columns"
                            class="cell"
                            :style="{width: `${column.width}px`}">

                            <div :key="column.id" class="cell" :style="{width: `${column.width}px`}">
                                <span class="slds-grid slds-grid_align-spread cell-content">

                                    <!-- Text -->
                                    <span
                                        v-if="column.type === 'text'"
                                        :title="getFieldValue(column, item)"
                                        class="slds-truncate"
                                        :class="{'slds-text-font_monospace': column.monospaced}">
                                        {{ getFieldValue(column, item) }}
                                    </span>

                                    <!-- Event link -->
                                    <a
                                        v-else-if="column.type === 'event-link'"
                                        :title="getFieldValue(column, item)"
                                        class="slds-truncate"
                                        :class="{'slds-text-font_monospace': column.monospaced}"
                                        @click="onClickEventLink(column, item)">
                                        {{ getFieldValue(column, item) }}
                                    </a>

                                    <!-- Avatar -->
                                    <span
                                        v-else-if="column.type === 'avatar'"
                                        class="slds-avatar slds-avatar_circle slds-avatar_medium">
                                        <img alt="avatar" :src="getFieldValue(column, item)">
                                    </span>

                                    <!-- Badge -->
                                    <slds-badge
                                        v-else-if="column.type === 'badge' && getFieldObject(column, item) != null"
                                        :label="getFieldObject(column, item).label"
                                        :color="getFieldObject(column, item).color"
                                        :icon-name="getFieldObject(column, item).iconName"
                                        :icon-position="getFieldObject(column, item).iconPosition"/>

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

                                    <!-- Button -->
                                    <button
                                        v-else-if="column.type === 'button' && getFieldObject(column, item) != null"
                                        class="slds-button slds-button_outline-brand"
                                        @click="$emit(getFieldObject(column, item).action, item)">
                                        {{ getFieldObject(column, item).label }}
                                    </button>

                                    <!-- Icon -->
                                    <slds-icon
                                        v-else-if="column.type === 'icon' && getFieldObject(column, item) != null"
                                        :icon="getFieldObject(column, item).icon"
                                        :title="getFieldObject(column, item).title"
                                        v-bind="[getFieldObject(column, item).size, getFieldObject(column, item).variant]"
                                        class="icon-in-table"/>

                                    <!-- Copy to clipboard button -->
                                    <button
                                        v-if="column.hasCopyButton"
                                        class="slds-button slds-button_icon slds-cell-copy__button slds-m-left_x-small"
                                        title="Copy to clipboard"
                                        @click="copyToClipboard(column, item)">

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

                        <!-- Actions -->
                        <div v-if="hasActions && item.actions != null && item.actions.length > 0" class="cell line-actions">
                            <div class="slds-dropdown-trigger slds-dropdown-trigger_click slds-is-open">

                                <!-- Button -->
                                <button
                                    class="slds-button slds-button_icon slds-button_icon-border-filled slds-button_icon-x-small"
                                    title="Actions"
                                    @click="onActionsClick(item)">
                                    <svg
                                        class="slds-button__icon"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24">
                                        <path d="M3.8 6.5h16.4c.4 0 .8.6.4 1l-8 9.8c-.3.3-.9.3-1.2 0l-8-9.8c-.4-.4-.1-1 .4-1z"/>
                                    </svg>
                                </button>

                                <!-- Items -->
                                <div
                                    v-if="actionMenu.openedRowId === item[keyField]"
                                    ref="dropdown"
                                    v-on-clickaway="closeActionMenu"
                                    class="slds-dropdown slds-dropdown_length-5 slds-dropdown_right"
                                    :class="[`slds-dropdown_${actionMenu.orientation}`]"
                                    :style="{opacity: actionMenu.opacity}">

                                    <ul class="slds-dropdown__list" role="menu">
                                        <li
                                            v-for="action in item.actions"
                                            :key="action"
                                            class="slds-dropdown__item"
                                            role="presentation"
                                            @mousedown.prevent="onActionMouseDown(action, item)">

                                            <a role="menuitem">
                                                <span class="slds-truncate" :title="getAction(action).label">
                                                    <slds-icon
                                                        v-if="getAction(action).icon != null"
                                                        :icon="getAction(action).icon"
                                                        x-small
                                                        class="slds-m-right_x-small"/>
                                                    {{ getAction(action).label }}
                                                </span>
                                            </a>

                                        </li>
                                    </ul>

                                </div>

                            </div>
                        </div>

                    </div>
                </template>

            </recycle-scroller>

        </div>

    </div>
</template>

<script>
    import Commons from "../slds-data-table/commons";
    import SldsColumn from "./column";
    import numeral from 'numeral'
    import 'numeral/locales/pt-br'
    import uuid from 'uuid/v4';
    import {mixin as clickaway} from 'vue-clickaway'
    import {RecycleScroller} from 'vue-virtual-scroller'
    import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

    export default {
        name: 'SldsVirtualTable',
        components: {
            RecycleScroller,
            SldsColumn,
        },
        mixins: [clickaway],
        props: {
            actions: {
                type: Array,
            },
            columns: {
                type: Array,
                required: true,
            },
            filter: {
                type: String,
                default: null,
            },
            hasCheckboxColumn: {
                type: Boolean,
                default: false,
            },
            hasLineNumberColumn: {
                type: Boolean,
                default: true,
            },
            initialSort: {
                type: Object,
            },
            keyField: {
                type: String,
                required: true,
            },
            rows: {
                type: Array,
                required: true,
            },
            selectedRows: {
                type: Array,
                default: () => [],
            },
        },
        data() {
            return {
                actionMenu: {
                    openedRowId: null,
                    orientation: 'top',
                    opacity: 0,
                },
                rowWidth: null,
                ruler: {
                    value: '',
                    active: false
                },
                selectAllStyle: {
                    left: 8,
                    top: 8,
                },
                scrollTop: 0,
                scrollbarWidth: 0,
                sortedColumnId: null,
                sortedOrder: null,
                tableWidth: null,
            }
        },
        computed: {
            filteredRows() {
                if (this.filter == null) return this.rows;

                return this.rows.filter((row) => {
                    for (let column of this.columns) {
                        const value = this.getFieldValue(column, row);

                        if (String(value).toLowerCase().indexOf(this.filter.toLowerCase()) !== -1) {
                            return true;
                        }
                    }

                    return false;
                })
            },
            hasActions() {
                if (this.actions == null) return false;
                return (this.actions.length > 0);
            },
            hasAvatar() {
                let hasAvatar = false;
                for (let column of this.columns) {
                    if (column.type === 'avatar') {
                        hasAvatar = true;
                        break;
                    }
                }

                return hasAvatar;
            },
        },
        watch: {
            filter() {
                this.$el.querySelector('.body').scrollTop = 0;
            }
        },
        created() {
            numeral.locale('pt-br');
            this.enrichColumns();
            this.initializeSort();
        },
        async mounted() {
            await this.getScrollbarWidth();
            this.getTableWidth();
            this.getColumnWidths();
            this.getColumnLeftOffsets();

            this.$el
                .querySelector('.vue-recycle-scroller')
                .addEventListener('scroll', this.onScroll);
        },
        activated() {
            this.$el.querySelector('.body').scrollTop = this.scrollTop;
        },
        beforeDestroy() {
            this.$el
                .querySelector('.vue-recycle-scroller')
                .removeEventListener('scroll', this.onScroll);
        },
        methods: {
            closeActionMenu() {
                this.actionMenu.openedRowId = null;
                this.actionMenu.opacity = 0;
                this.actionMenu.orientation = 'top';
            },
            copyToClipboard(column, row) {
                const value = this.getFieldValue(column, row);
                if (value != null) this.$clipboard(value);
            },
            enrichColumns() {
                for (const column of this.columns) {
                    this.$set(column, 'id', uuid());
                    if (column.type == null) this.$set(column, 'type', 'text');
                    if (column.hasCopyButton == null) this.$set(column, 'hasCopyButton', true);
                    if (column.resizable == null) this.$set(column, 'resizable', true);
                    this.$set(column, 'sortedAscending', false);
                    this.$set(column, 'sortedDescending', false);
                    this.$set(column, 'fullWidth', null);

                    if (column.type === 'avatar' ||
                        column.type === 'badge' ||
                        column.type === 'boolean' ||
                        column.type === 'button' ||
                        column.type === 'icon'
                    ) column.hasCopyButton = false;
                }
            },
            getAction(actionValue) {
                return this.actions.find(action => action.value === actionValue);
            },
            getColumnLeftOffsets() {
                let columnLeftSum = 0;

                if (this.hasLineNumberColumn) {
                    columnLeftSum += Commons.LINE_COUNTER_WIDTH;
                    this.selectAllStyle.left += Commons.LINE_COUNTER_WIDTH;
                }

                if (this.hasCheckboxColumn) columnLeftSum += Commons.LINE_CHECKBOX_WIDTH;
                if (this.hasCheckboxButtonColumn) columnLeftSum += Commons.LINE_CHECKBOX_BUTTON_WIDTH;

                for (let column of this.columns) {
                    this.$set(column, 'offsetLeft', columnLeftSum);
                    this.$set(column, 'left', columnLeftSum);
                    columnLeftSum += column.width;
                }
            },
            getColumnWidths() {
                let knownWidth = 0;
                let unknownWidthColumns = 0;

                if (this.hasLineNumberColumn) knownWidth += Commons.LINE_COUNTER_WIDTH;
                if (this.hasCheckboxColumn) knownWidth += Commons.LINE_CHECKBOX_WIDTH;
                if (this.hasCheckboxButtonColumn) knownWidth += Commons.LINE_CHECKBOX_BUTTON_WIDTH;
                if (this.hasActions) knownWidth += Commons.LINE_ACTIONS_WIDTH;

                for (let column of this.columns) {
                    if (column.resizable) {
                        if (column.width == null) unknownWidthColumns++;
                        else knownWidth += column.width;
                    }
                    else {
                        if (column.width == null) {
                            knownWidth += Commons.DEFAULT_FIXED_WIDTH;
                            this.$set(column, 'width', Commons.DEFAULT_FIXED_WIDTH);
                        }
                        else {
                            knownWidth += column.width;
                            this.$set(column, 'width', column.width);
                        }
                    }
                }

                const width = Math.floor((this.rowWidth - knownWidth) / unknownWidthColumns);

                for (let column of this.columns) {
                    if (column.width == null) this.$set(column, 'width', width);
                }
            },
            getFieldObject(column, row) {
                const value = this.getFieldValue(column, row);
                if (value instanceof Object) return value;
                return null;
            },
            getFieldValue(column, row) {
                if (column.fieldName == null) return null;

                const fields = column.fieldName.split('.');
                let fieldValue = row[fields[0]];

                if (fieldValue == null) return null;

                for (let i = 1; i < fields.length; i++) {
                    fieldValue = fieldValue[fields[i]];
                    if (fieldValue == null) return null;
                }

                return fieldValue;
            },
            getLineNumber(index) {
                return numeral(index + 1).format('0,0');
            },
            async getScrollbarWidth() {
                const scroller = this.$el.querySelector('.vue-recycle-scroller');
                if (scroller == null) return;

                await this.$nextTick();

                const noVerticalOverflow = scroller.scrollHeight <= scroller.clientHeight;
                if (noVerticalOverflow) return;

                this.scrollbarWidth = scroller.offsetWidth - scroller.clientWidth;
            },
            getSorterValue(column, row) {
                const fields = column.sortBy.split('.');
                let sorterValue = row[fields[0]];

                if (sorterValue == null) return null;

                for (let i = 1; i < fields.length; i++) {
                    sorterValue = sorterValue[fields[i]];
                    if (sorterValue == null) return null;
                }

                return sorterValue;
            },
            getTableWidth() {
                const table = this.$el.querySelector('.table');
                this.tableWidth = table.offsetWidth;
                this.rowWidth = this.tableWidth - this.scrollbarWidth;
            },
            initializeSort() {
                if (this.initialSort == null) return;

                const column = this.columns.find(col => col.fieldName.trim() === this.initialSort.columnName.trim());

                if (column == null) return;

                this.onSort(this.initialSort.order, column);
            },
            isSelected(row) {
                if (this.selectedRows.length === 0) return false;
                if (this.selectedRows.length === this.rows.length) return true;
                const selected = this.selectedRows.find(keyField => keyField === row[this.keyField]);
                return (selected != null);
            },
            async onActionsClick(item) {
                this.closeActionMenu();
                this.actionMenu.openedRowId = item[this.keyField];
                await this.$nextTick();

                // Adjusting z-index
                const items = this.$el.querySelectorAll('.vue-recycle-scroller__item-view');
                for (const item of items) {
                    if (item.querySelector('.slds-dropdown') == null) item.style.zIndex = "0";
                    else item.style.zIndex = "1000";
                }

                // Setting vertical orientation of dropdown
                const dropdown = this.$refs["dropdown"];
                let parent = dropdown.offsetParent;

                while (!parent.classList.contains('vue-recycle-scroller')) {
                    parent = parent.offsetParent;
                }

                if (dropdown.getBoundingClientRect().bottom > parent.getBoundingClientRect().bottom) {
                    this.actionMenu.orientation = 'bottom';
                }

                this.actionMenu.opacity = 1;
            },
            onActionMouseDown(action, item) {
                this.$emit(action, item);
                this.closeActionMenu();
            },
            onClickEventLink(column, item) {
                if (column.typeAttributes == null) return;
                if (column.typeAttributes.action == null) return;

                this.$emit(column.typeAttributes.action, item);
            },
            onResize(index, delta) {
                this.columns[index].width += delta;
                this.tableWidth += delta;
                this.rowWidth += delta;

                for (++index; index < this.columns.length; index++) {
                    this.columns[index].left += delta;
                    this.columns[index].offsetLeft += delta;
                }
            },
            async onResizeFullWidth(index, column) {
                if (column.width === column.fullWidth) return;

                if (column.fullWidth == null) {
                    for (const row of this.rows) {
                        const value = this.getFieldValue(column, row);
                        if (value == null) continue;
                        if (value.length > this.ruler.value.length) this.ruler.value = value;
                    }

                    this.ruler.active = true;
                    await this.$nextTick();

                    const ruler = this.$refs.ruler;
                    column.fullWidth = (ruler.clientWidth + 24);
                    if (column.hasCopyButton) column.fullWidth += 24;
                    if (column.fullWidth < Commons.DEFAULT_MINIMUM_WIDTH) column.fullWidth = Commons.DEFAULT_MINIMUM_WIDTH;

                    this.ruler.value = '';
                    this.ruler.active = false;
                }

                const delta = column.fullWidth - column.width;
                this.onResize(index, delta);
            },
            onSelect(keyField) {
                this.$emit('select', keyField);
            },
            onSelectAll() {
                this.$emit('selectall');
            },
            onScroll(event) {
                if (this.scrollTop !== event.target.scrollTop) {
                    this.scrollTop = event.target.scrollTop;
                    if (this.actionMenu.openedRowId !== null) this.closeActionMenu();
                    return;
                }

                const scrollLeft = this.$el.querySelector('.vue-recycle-scroller').scrollLeft;
                for (let column of this.columns) column.left = column.offsetLeft - scrollLeft;
                // TODO: decouple column/row dependency to improve performance in extreme cases, this way vue doesn't need to rerender all rows when columns are updated.
            },
            onSort(order, sortedColumn) {
                this.sortedOrder = order;
                this.sortedColumnId = sortedColumn.id;

                for (let column of this.columns) {
                    column.sortedAscending = false;
                    column.sortedDescending = false;
                }

                if (order === 'asc') {
                    sortedColumn.sortedAscending = true;
                    sortedColumn.sortedDescending = false;
                }
                else {
                    sortedColumn.sortedAscending = false;
                    sortedColumn.sortedDescending = true;
                }

                this.rows.sort(this.sorter)
            },
            sorter(rowA, rowB) {
                const sortedColumn = this.columns.find(column => column.id === this.sortedColumnId);
                let a;
                let b;

                if (sortedColumn.sortBy != null) {
                    a = this.getSorterValue(sortedColumn, rowA);
                    b = this.getSorterValue(sortedColumn, rowB);
                }
                else {
                    a = this.getFieldValue(sortedColumn, rowA);
                    b = this.getFieldValue(sortedColumn, rowB);
                }

                if (typeof a === 'string') a = a.toLowerCase();
                if (typeof b === 'string') b = b.toLowerCase();
                const bothStringValues = ((typeof a === 'string') && (typeof b === 'string'));

                if (a === b) return 0;
                else if (a === null) return 1;
                else if (b === null) return -1;
                else if (this.sortedOrder === 'asc') {
                    if (bothStringValues) return (a.localeCompare(b) < 0) ? -1 : 1;
                    return (a < b) ? -1 : 1;
                }
                else {
                    if (bothStringValues) return (a.localeCompare(b) < 0) ? 1 : -1;
                    return (a < b) ? 1 : -1;
                }
            },
        },
    }
</script>

<style scoped lang="scss">
    $color-background-alt: #ffffff;
    $header-height: 2rem;
    $row-height: 1.75rem;
    $avatar-row-height: 2.5rem;
    $table-color-background-header: #fafaf9;

    .ruler {
        position: absolute;
        visibility: hidden;
        height: auto;
        width: auto;
        white-space: nowrap;
    }

    .vue-recycle-scroller.ready.direction-vertical {
        .vue-recycle-scroller__item-wrapper {
            overflow-x: auto;
            position: static;
        }
    }

    .container {
        height: 100%;
        width: 100%;
        position: relative;
        overflow: hidden;
        background-color: #fafaf9;
    }

    .table {
        height: 100%;
        font-size: inherit;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .1);
    }

    .header {
        position: static;
        height: $header-height;

        display: flex;
        color: #514f4d;
        font-weight: 700;
        line-height: normal;
        background-color: $table-color-background-header;

        .line-number {
            min-width: 3.75rem;
            position: absolute;
        }

        .checkbox {
            min-width: 2rem;
            position: absolute;
        }

        .column {
            position: absolute;
        }
    }

    .body {
        height: calc(100% - #{$header-height});
        overflow-x: auto;
        border-top: 1px solid #dddbda;

        &.has-avatar {
            .row {
                height: $avatar-row-height;
            }
        }
    }

    .row {
        display: flex;
        height: $row-height;
        align-items: center;
        border-bottom: 1px solid #dddbda;
        background-color: $color-background-alt;

        &.selected {
            background-color: #f3f2f2;
        }

        .cell {
            padding: .25rem .5rem;
            height: 100%;
            line-height: 1.25rem;

            &-content {
                height: 100%;
                align-items: center;
            }

            .slds-cell-copy__button {
                opacity: 0;
                width: 1.25rem;
                height: 1.25rem;
                flex-shrink: 0;
            }

            &.line-actions {
                position: relative;

                .slds-dropdown-trigger {
                    margin: 0;
                    position: absolute;
                    top: 50%;
                    -ms-transform: translateY(-50%);
                    transform: translateY(-50%);
                }
            }

            &:hover {
                background-color: $color-background-alt;
                box-shadow: #dddbda 0 -1px 0 inset, #dddbda 0 1px 0 inset;

                .slds-cell-copy__button {
                    opacity: 0.5;
                }

                .slds-cell-copy__button:hover {
                    opacity: 1;
                }
            }
        }

        .line-number {
            min-width: 3.75rem;
            width: 3.75rem;
            text-align: center;
        }

        .checkbox {
            min-width: 2rem;
            width: 2rem;
            text-align: center;
        }

        .line-actions {
            min-width: 3rem;
            width: 3rem;

            .slds-button {
                margin-top: -2px;
            }

            .slds-button:focus {
                box-shadow: none;
                color: #706e6b;
            }
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
        .row {
            background-color: #f3f2f2;
            box-shadow: #dddbda 0 -1px 0 inset, #dddbda 0 1px 0 inset;
        }
    }

    .slds-button_icon {

        &:active {
            animation: click-effect 120ms cubic-bezier(1, 1.9, 0.94, 0.98);
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
