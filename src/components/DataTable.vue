<!--
    @Description: Data tables are an enhanced version of an HTML table and are used to display tabular data.
    @Documentation: https://www.lightningdesignsystem.com/components/data-tables/
-->

<template>
    <div class="slds-table_header-fixed_container">
        <div class="slds-table_edit_container slds-is-static slds-scrollable_area">
            <table class="slds-table slds-no-cell-focus slds-table_bordered slds-table_header-fixed slds-table_edit slds-table_fixed-layout slds-table_resizable-cols"
                   :style="{ width: `${tableWidth}px` }"
                   role="grid">

                <!-- Head -->
                <thead>
                <tr class="slds-line-height_reset">

                    <th class="" scope="col" style="width: 60px;">
                        <div class="slds-cell-fixed">
                            <div class="slds-truncate slds-assistive-text" title="Errors">Errors</div>
                        </div>
                    </th>

                    <template v-for="column in columns">

                        <!-- Resizable column -->
                        <th :key="column.fieldName"
                            v-if="column.resizable"
                            scope="col"
                            class="slds-is-resizable"
                            :class="[{'slds-is-sortable': column.sortable}]"
                            :style="{ width: `${column.initialWidth}px` }">
                            <div class="slds-cell-fixed" :style="{ width: `${column.initialWidth}px`, left: `${column.left}px` }">

                                <!-- Column name -->
                                <a class="slds-th__action slds-text-link_reset" role="button" tabindex="-1">
                                    <div class="slds-grid slds-grid_vertical-align-center slds-has-flexi-truncate">

                                        <!-- Label -->
                                        <span class="slds-truncate" :title="column.label">
                                            {{ column.label }}
                                        </span>

                                        <!-- Sort icon -->
                                        <span v-if="column.sortable" class="slds-icon_container slds-icon-utility-arrowdown">
                                        <slds-svg icon-name="utility:arrowdown" class="slds-icon slds-icon-text-default slds-is-sortable__icon"/>
                                    </span>

                                    </div>
                                </a>

                                <!-- Column resizer -->
                                <div v-if="column.resizable" class="slds-resizable">

                                    <!-- Input -->
                                    <input tabindex="-1" type="range" class="slds-resizable__input slds-assistive-text"/>

                                    <!-- Handle -->
                                    <span class="slds-resizable__handle"
                                          draggable="true"
                                          @dragend="onDragEnd(column, $event)">

                                        <!-- Divider -->
                                        <span class="slds-resizable__divider"></span>

                                    </span>

                                </div>

                            </div>
                        </th>

                        <!-- Fixed column -->
                        <th :key="column.fieldName" v-else scope="col"
                            :style="{ width: `${column.fixedWidth}px` }">
                            <div class="slds-cell-fixed" :style="{ left: `${column.left}px` }">
                                <div class="slds-truncate" :title="column.label" style="display: flex;padding: .25rem .5rem;height: 2rem;align-items: center;">
                                    {{ column.label }}
                                </div>
                            </div>
                        </th>

                    </template>
                </tr>
                </thead>

                <!-- Body -->
                <tbody>
                <tr v-for="(row, index) in rows" :key="`${index}-${row.id}`" aria-selected="false" class="slds-hint-parent">

                    <td class="slds-cell-edit slds-cell-error" role="gridcell">
                        <button id="error-01" class="slds-button slds-button_icon slds-button_icon-error slds-m-horizontal_xxx-small slds-hidden" aria-hidden="true" tabindex="-1" title="Item 1 has errors">
                            <slds-svg icon-name="utility:error" class="slds-button__icon"/>
                        </button>
                        <span class="slds-row-number slds-text-body_small slds-text-color_weak"></span>
                    </td>

                    <td v-for="(column, index) in columns" :key="index"
                        class="slds-cell-edit" role="gridcell"
                        :style="{'text-align': column.textAlign}">

                        <!-- Output types -->
                        <span v-if="column.getDataCategory() === 'output'" class="slds-grid slds-grid_align-spread">

                            <!-- Text types -->
                            <span v-if="column.type === 'text'" class="slds-truncate" :title="row[column.fieldName]">
                                {{ row[column.fieldName] }}
                            </span>

                            <a v-else-if="column.type === 'link'" class="slds-truncate" :title="row[column.fieldName]">
                                {{ row[column.fieldName] }}
                            </a>

                            <!-- Copy to clipboard button -->
                            <slds-button-icon v-if="column.hasCopyButton"
                                              icon-name="utility:copy_to_clipboard"
                                              container="none"
                                              class="slds-cell-edit__button slds-m-left_x-small"
                                              icon-class="slds-button__icon_hint slds-button__icon_edit"
                                              title="Copy to clipboard"/>

                        </span>

                        <!-- Input types -->
                        <span v-else class="slds-truncate" :title="row[column.fieldName]">

                            <slds-menu v-if="column.type === 'action'" :items="column.actions" size="small" position="right"/>

                            <slds-button v-else-if="column.type === 'button'"
                                         :text="column.typeAttributes.label"
                                         :variant="column.typeAttributes.variant"
                                         :class="column.typeAttributes.class"/>

                        </span>

                    </td>

                </tr>
                </tbody>

            </table>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'DataTable',
        props: {
            columns: {
                type: Array,
                required: true,
                note: "Array of the columns object that's used to define the data types. " +
                    "Required properties include 'label', 'dataKey', and 'type'. " +
                    "The default type is 'text'.",
            },
            rows: {
                type: Array,
                required: true,
                note: "The array of data to be displayed.",
            },
        },
        data() {
            return {
                tableWidth: null,
                scrollLeft: 0,
            }
        },
        methods: {
            onScroll() {
                const scrollLeft = this.$el.getElementsByClassName('slds-scrollable_area')[0].scrollLeft;

                if (this.scrollLeft === scrollLeft) return;
                this.scrollLeft = scrollLeft;

                for (let column of this.columns) {
                    column.left = column.offsetLeft - scrollLeft;
                }
            },
            onDragEnd(column, event) {
                let offset = event.offsetX;

                if (column.initialWidth + event.offsetX < column.minimumWidth) {
                    offset = column.minimumWidth - column.initialWidth;
                    if (offset === 0) return;
                }

                this.tableWidth += offset;
                column.initialWidth += offset;

                let index = this.columns.indexOf(column);
                for (++index; index < this.columns.length; index++) {
                    this.columns[index].left += offset;
                    this.columns[index].offsetLeft += offset;
                }
            },
        },
        mounted() {
            // Settings table width to prevent abnormal behavior when resizing window
            const table = this.$el.getElementsByTagName('table')[0];
            this.tableWidth = table.offsetWidth;

            // Calculating column widths
            let totalFixedWidth = 60;
            let resizableColumns = 0;

            for (let column of this.columns) {
                if (column.resizable) resizableColumns++;
                else totalFixedWidth += column.fixedWidth;
            }

            const rowWidth = this.$el.getElementsByTagName('tr')[0].offsetWidth;
            const initialWidth = Math.floor((rowWidth - totalFixedWidth) / resizableColumns);

            for (let column of this.columns) {
                if (!column.resizable) continue;
                if (column.initialWidth === undefined) column.initialWidth = initialWidth;
            }

            // Saving column offset left values as a data attribute
            const cells = this.$el.getElementsByClassName('slds-cell-fixed');
            for (let index = 1; index < cells.length; index++) {
                this.columns[index - 1].offsetLeft = cells[index].offsetLeft;
                this.columns[index - 1].left = cells[index].offsetLeft;
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
                cursor: w-resize;
            }
        }
    }
</style>