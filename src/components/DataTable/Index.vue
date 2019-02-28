<!--
    @Description: Data tables are an enhanced version of an HTML table and are used to display tabular data.
    @Documentation: https://www.lightningdesignsystem.com/components/data-tables/
-->

<template>
    <div class="slds-table_header-fixed_container">
        <div class="slds-table_edit_container slds-is-static slds-scrollable_area">
            <table
                class="slds-table slds-no-cell-focus slds-table_bordered slds-table_header-fixed slds-table_edit slds-table_fixed-layout slds-table_resizable-cols"
                :style="{ width: `${tableWidth}px` }"
                role="grid">

                <!-- Head -->
                <thead>
                    <tr class="slds-line-height_reset">

                        <th v-if="showRowNumberColumn" scope="col" style="width: 60px;">
                            <div class="slds-cell-fixed">
                                <div class="slds-truncate slds-assistive-text">
                                    Errors
                                </div>
                            </div>
                        </th>

                        <th v-if="showRowSelectionColumn" scope="col" style="width: 36px;">
                            <div class="slds-cell-fixed slds-th__action slds-th__action_form"/>
                        </th>

                        <template v-for="(column, index) in columns">

                            <slds-resizable-column
                                v-if="isColumnResizable(column)"
                                :key="column.fieldName"
                                :column="column"
                                :index="index"
                                :initial-width="column.initialWidth"
                                :label="column.label"
                                :left="column.left"
                                :minimum-width="column.minimumWidth"
                                :sortable="column.sortable"
                                :type="column.type"
                                @resize="onResize"/>

                            <slds-fixed-column
                                v-else
                                :key="column.fieldName"
                                :column="column"
                                :fixed-width="column.fixedWidth"
                                :label="column.label"
                                :left="column.left"
                                :sortable="column.sortable"
                                :type="column.type"/>

                        </template>

                    </tr>
                </thead>

                <!-- Body -->
                <tbody>
                    <slds-row
                        v-for="(row, index) in rows"
                        :columns="columns"
                        :is-selected="selectedRows.includes(getRowKey(row, index))"
                        :key="getRowKey(row, index)"
                        :row="row"
                        :show-row-number-column="showRowNumberColumn"
                        :show-row-selection-column="showRowSelectionColumn"
                        @select="onSelect($event, getRowKey(row, index))"/>
                </tbody>

            </table>
        </div>
    </div>
</template>

<script>
    import Commons from './commons'
    import SldsFixedColumn from './Column/FixedColumn';
    import SldsResizableColumn from './Column/ResizableColumn';
    import SldsRow from './Row';

    export default {
        components: {
            SldsFixedColumn,
            SldsResizableColumn,
            SldsRow,
        },
        props: {
            columns: {
                type: Array,
                required: true,
            },
            keyField: {
                type: String,
            },
            rows: {
                type: Array,
                required: true,
            },
            selectedRows: {
                type: Array,
                default: () => [],
            },
            showRowNumberColumn: {
                type: Boolean,
                default: true,
            },
            showRowSelectionColumn: {
                type: Boolean,
                default: false,
            },
        },
        data() {
            return {
                tableWidth: null,
            }
        },
        mounted() {
            this.getTableWidth();
            this.getColumnWidths();
            this.getColumnLeftOffsets();

            this.$el
                .getElementsByClassName('slds-scrollable_area')[0]
                .addEventListener('scroll', this.onScroll);
        },
        destroyed() {
            this.$el
                .getElementsByClassName('slds-scrollable_area')[0]
                .removeEventListener('scroll', this.onScroll);
        },
        methods: {
            getTableWidth() {
                const table = this.$el.getElementsByTagName('table')[0];
                this.tableWidth = table.offsetWidth;
            },
            getColumnWidths() {
                let knownWidth = 0;
                let unknownWidthColumns = 0;

                if (this.showRowNumberColumn) knownWidth += Commons.LINE_COUNTER_WIDTH;
                if (this.showRowSelectionColumn) knownWidth += Commons.LINE_SELECTION_WIDTH;

                for (let column of this.columns) {
                    if (column.resizable) {
                        if (column.initialWidth == null) unknownWidthColumns++;
                        else knownWidth += column.initialWidth;
                    }
                    else {
                        if (column.fixedWidth == null) knownWidth += Commons.DEFAULT_FIXED_WIDTH;
                        else knownWidth += column.fixedWidth;
                    }
                }

                const rowWidth = this.$el.getElementsByTagName('tr')[0].offsetWidth;
                const initialWidth = Math.floor((rowWidth - knownWidth) / unknownWidthColumns);

                for (let column of this.columns) {
                    if (!column.resizable) continue;
                    if (column.initialWidth == null) this.$set(column, 'initialWidth', initialWidth);
                }
            },
            getColumnLeftOffsets() {
                let indexOffset = 0;
                if (this.showRowNumberColumn) indexOffset++;
                if (this.showRowSelectionColumn) indexOffset++;

                const header = this.$el.getElementsByTagName('th');

                for (let index = indexOffset; index < header.length; index++) {
                    this.$set(this.columns[index - indexOffset], 'offsetLeft', header [index].offsetLeft);
                    this.$set(this.columns[index - indexOffset], 'left', header [index].offsetLeft);
                }
            },
            getRowKey(row, index) {
                return (this.keyField != null) ? row[this.keyField] : index;
            },
            isColumnResizable(column) {
                if (column.resizable == null) this.$set(column, 'resizable', true);
                return column.resizable;
            },
            onScroll() {
                const scrollLeft = this.$el.getElementsByClassName('slds-scrollable_area')[0].scrollLeft;
                for (let column of this.columns) column.left = column.offsetLeft - scrollLeft;
            },
            onSelect(event, key) {
                //this.$emit('select', event, key);
                if (event) this.selectedRows.push(key);
                else this.selectedRows.splice(this.selectedRows.indexOf(key), 1);
            },
            onResize(index, delta) {
                this.columns[index].initialWidth += delta;
                this.tableWidth += delta;

                for (++index; index < this.columns.length; index++) {
                    this.columns[index].left += delta;
                    this.columns[index].offsetLeft += delta;
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .slds-table_header-fixed_container {
        height: 100%;
        width: 100%;
        position: absolute;

        .slds-scrollable_area {
            height: 100%;
            overflow: auto;

            .slds-resizable__handle {
                will-change: transform;
            }
        }
    }
</style>
