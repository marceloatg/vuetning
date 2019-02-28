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
                        :is-selected="selectedRows.includes((keyField != null) ? row[keyField] : index)"
                        :key="(keyField != null) ? row[keyField] : index"
                        :row="row"
                        :show-row-number-column="showRowNumberColumn"/>
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

                const cells = this.$el.getElementsByClassName('slds-cell-fixed');

                for (let index = indexOffset; index < cells.length; index++) {
                    this.$set(this.columns[index - indexOffset], 'offsetLeft', cells[index].offsetLeft);
                    this.$set(this.columns[index - indexOffset], 'left', cells[index].offsetLeft);
                }
            },
            isColumnResizable(column) {
                if (column.resizable == null) this.$set(column, 'resizable', true);
                return column.resizable;
            },
            onScroll() {
                const scrollLeft = this.$el.getElementsByClassName('slds-scrollable_area')[0].scrollLeft;
                for (let column of this.columns) column.left = column.offsetLeft - scrollLeft;
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
