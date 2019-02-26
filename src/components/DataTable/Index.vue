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

                        <th scope="col" style="width: 60px;">
                            <div class="slds-cell-fixed">
                                <div class="slds-truncate slds-assistive-text" title="Errors">
                                    Errors
                                </div>
                            </div>
                        </th>

                        <template v-for="(column, index) in columns">

                            <SldsResizableColumn
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

                            <SldsFixedColumn
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
                    <SldsRow
                        v-for="row in rows"
                        :key="row.id"
                        :row="row"
                        :columns="columns"/>
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
            rows: {
                type: Array,
                required: true,
            },
        },
        data() {
            return {
                tableWidth: null,
            }
        },
        mounted() {
            // Settings table width to prevent abnormal behavior when resizing window
            const table = this.$el.getElementsByTagName('table')[0];
            this.tableWidth = table.offsetWidth;

            // Calculating column widths
            let knownWidth = Commons.LINE_COUNTER_WIDTH;
            let unknownWidthColumns = 0;

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

            // Saving column offset left values as a data attribute
            const cells = this.$el.getElementsByClassName('slds-cell-fixed');
            for (let index = 1; index < cells.length; index++) {
                this.$set(this.columns[index - 1], 'offsetLeft', cells[index].offsetLeft);
                this.$set(this.columns[index - 1], 'left', cells[index].offsetLeft);
            }

            // Adding scroll event listener
            this.$el
                .getElementsByClassName('slds-scrollable_area')[0]
                .addEventListener('scroll', this.onScroll);
        },
        destroyed() {

            // Removing scroll event listener
            this.$el
                .getElementsByClassName('slds-scrollable_area')[0]
                .removeEventListener('scroll', this.onScroll);
        },
        methods: {
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
