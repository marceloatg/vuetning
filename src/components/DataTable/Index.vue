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
                            <div class="slds-cell-fixed"
                                 :style="{ width: `${column.initialWidth}px`, left: `${column.left}px` }">

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
                                          :style="{transform: `translateX(${column.resizerTranslation}px)`}"
                                          @mousedown.prevent.stop="onResizerMouseDown(column, $event)">

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
                <slds-row v-for="row in rows" :key="row.id" :row="row" :columns="columns"/>
                </tbody>

            </table>
        </div>
    </div>
</template>

<script>
    import SldsRow from './Row';

    export default {
        components: {
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
                scrollLeft: 0,
                column: null,
                startX: null,
                currentX: null,
                touchingResizer: false,
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
            onResizerMouseDown(column, event) {
                this.column = column;
                this.startX = event.pageX;
                this.currentX = this.startX;
                this.touchingResizer = true;

                document.body.addEventListener("mousemove", this.onResizerMove);
                document.body.addEventListener("mouseup", this.onResizerMoveEnd);
                document.body.addEventListener("mouseleave", this.onResizerMoveEnd);

            },
            onResizerMove() {
                if (!this.touchingResizer) return;
                if (this.currentX === event.pageX) return;

                this.currentX = event.pageX;
                const delta = this.currentX - this.startX;

                this.resizing(delta);
            },
            resizing(delta) {
                if (this.column.initialWidth + delta < this.column.minimumWidth) {
                    delta = this.column.minimumWidth - this.column.initialWidth;
                }

                this.column.resizerTranslation = delta;
            },
            onResizerMoveEnd() {
                if (!this.touchingResizer) return;

                this.touchingResizer = false;
                document.body.removeEventListener("mousemove", this.onResizerMove);
                document.body.removeEventListener("mouseup", this.onResizerMoveEnd);
                document.body.removeEventListener("mouseleave", this.onResizerMoveEnd);

                const delta = this.currentX - this.startX;
                this.resize(delta);
            },
            resize(delta) {

                // Apply column width validations to delta
                if (this.column.initialWidth + delta < this.column.minimumWidth) {
                    delta = this.column.minimumWidth - this.column.initialWidth;

                    if (delta === 0) {
                        this.column = null;
                        return;
                    }
                }

                // Update table and column widths
                this.tableWidth += delta;
                this.column.initialWidth += delta;
                this.column.resizerTranslation = 0;

                let index = this.columns.indexOf(this.column);
                for (++index; index < this.columns.length; index++) {
                    this.columns[index].left += delta;
                    this.columns[index].offsetLeft += delta;
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
                will-change: transform;
            }
        }
    }
</style>