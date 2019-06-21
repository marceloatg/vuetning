<template>
    <div class="container">
        <div class="table">

            <div class="header" :style="{ width: `${tableWidth}px` }">

                <div v-if="hasLineNumberColumn" class="line-number"/>

                <slds-column
                    v-for="(column, index) in columns"
                    :key="column.fieldName"
                    :column="column"
                    :index="index"
                    :initial-width="column.width"
                    :label="column.label"
                    :left="column.left"
                    :minimum-width="column.minimumWidth"
                    :sortable="column.sortable"
                    :sorted-ascending="column.sortedAscending"
                    :sorted-descending="column.sortedDescending"
                    :type="column.type"
                    @resize="onResize"
                    @sort="(order) => onSort(order, column)"/>

            </div>

            <!-- No single file components inside RecycleScroller due to performance restrictions. -->
            <RecycleScroller
                class="body"
                :items="filteredRows"
                :item-size="30"
                :key-field="keyField"
                :buffer="100">

                <template v-slot="{ item, index }">
                    <div class="row" :style="{ width: `${rowWidth}px` }">

                        <div v-if="hasLineNumberColumn" class="cell line-number slds-text-body_small slds-text-color_weak">
                            {{ lineNumber(index) }}
                        </div>

                        <template
                            v-for="column in columns"
                            class="cell"
                            :style="{width: `${column.width}px`}">

                            <div :key="column.id" class="cell" :style="{width: `${column.width}px`}">
                                <span class="slds-grid slds-grid_align-spread">

                                    <!-- Field value -->
                                    <span
                                        v-if="column.type === 'text'"
                                        :title="getFieldValue(column, item)"
                                        class="slds-truncate"
                                        :class="{'slds-text-font_monospace': column.monospaced}">
                                        {{ getFieldValue(column, item) }}
                                    </span>

                                    <a
                                        v-else-if="column.type === 'event-link'"
                                        :title="getFieldValue(column, item)"
                                        class="slds-truncate"
                                        :class="{'slds-text-font_monospace': column.monospaced}"
                                        @click="onClickEventLink(column, item)">
                                        {{ getFieldValue(column, item) }}
                                    </a>

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

                    </div>
                </template>

            </RecycleScroller>

        </div>
    </div>
</template>

<script>
    import Commons from "../DataTable/commons";
    import SldsColumn from "./Column";
    import numeral from 'numeral'
    import 'numeral/locales/pt-br'
    import uuid from 'uuid/v4';

    export default {
        components: {
            SldsColumn
        },
        props: {
            columns: {
                type: Array,
                required: true,
            },
            hasLineNumberColumn: {
                type: Boolean,
                default: true,
            },
            keyField: {
                type: String,
                required: true,
            },
            rows: {
                type: Array,
                required: true,
            },
            filter: {
                type: String,
                default: null,
            },
        },
        data() {
            return {
                rowWidth: null,
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
        },
        created() {
            numeral.locale('pt-br');
            this.enrichColumns();
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
            copyToClipboard(column, row) {
                const value = this.getFieldValue(column, row);
                if (value != null) this.$clipboard(value);
            },
            enrichColumns() {
                for (const column of this.columns) {
                    this.$set(column, 'id', uuid());
                    if (column.hasCopyButton == null) this.$set(column, 'hasCopyButton', true);
                    if (column.resizable == null) this.$set(column, 'resizable', true);
                    this.$set(column, 'sortedAscending', false);
                    this.$set(column, 'sortedDescending', false);
                }
            },
            getColumnLeftOffsets() {
                let columnLeftSum = 0;
                if (this.hasLineNumberColumn) columnLeftSum += Commons.LINE_COUNTER_WIDTH;
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

                for (let column of this.columns) {
                    if (column.resizable) {
                        if (column.width == null) unknownWidthColumns++;
                        else knownWidth += column.width;
                    }
                    else {
                        if (column.fixedWidth == null) knownWidth += Commons.DEFAULT_FIXED_WIDTH;
                        else knownWidth += column.fixedWidth;
                    }
                }

                const width = Math.floor((this.rowWidth - knownWidth) / unknownWidthColumns);

                for (let column of this.columns) {
                    if (!column.resizable) continue;
                    if (column.width == null) this.$set(column, 'width', width);
                }
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
            lineNumber(index) {
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
            getTableWidth() {
                const table = this.$el.querySelector('.table');
                this.tableWidth = table.offsetWidth;
                this.rowWidth = this.tableWidth - this.scrollbarWidth;
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
            onScroll(event) {
                this.scrollTop = event.target.scrollTop;

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

<style lang="scss">
    $color-background-alt: #ffffff;
    $header-height: 2rem;
    $row-height: 1.875rem;
    $table-color-background-header: #fafaf9;

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

        .column {
            position: absolute;
        }
    }

    .body {
        height: calc(100% - #{$header-height});
        overflow-x: auto;
        border-top: 1px solid #dddbda;
    }

    .row {
        display: flex;
        height: $row-height;
        align-items: center;
        border-bottom: 1px solid #dddbda;
        background-color: $color-background-alt;

        .cell {
            padding: .25rem .5rem;
            height: 100%;
            line-height: 1.375rem;

            .slds-cell-copy__button {
                opacity: 0;
                width: 1.25rem;
                height: 1.25rem;
                flex-shrink: 0;
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
