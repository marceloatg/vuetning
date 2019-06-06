<template>
    <div class="container">
        <div class="table">

            <div class="header">

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
                    :type="column.type"
                    @resize="onResize"/>

                <div class="scrollbar"/>

            </div>

            <RecycleScroller
                class="body"
                :items="rows"
                :item-size="32"
                :buffer="100">

                <template v-slot="{ item, index }">
                    <div class="row" :style="{ width: `${rowWidth}px` }">

                        <div v-if="hasLineNumberColumn" class="cell line-number slds-text-body_small slds-text-color_weak">
                            {{ index }}
                        </div>

                        <div class="cell slds-truncate" :title="item.name" :style="{width: `${columns[0].width}px`}">
                            {{ item.name }}
                        </div>

                        <div class="cell slds-truncate" :title="item.email" :style="{width: `${columns[1].width}px`}">
                            {{ item.email }}
                        </div>

                        <div class="cell slds-truncate" :title="item.phone" :style="{width: `${columns[2].width}px`}">
                            {{ item.phone }}
                        </div>

                    </div>
                </template>
            </RecycleScroller>
        </div>
    </div>
</template>

<script>
    import Commons from "../DataTable/commons";
    import SldsColumn from "./Column";

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
        },
        data() {
            return {
                rowWidth: null,
                tableWidth: null,
            }
        },
        created() {
            this.enrichColumns();
            this.enrichRows();
        },
        mounted() {
            this.getTableWidth();
            this.getColumnWidths();
            this.getColumnLeftOffsets();
        },
        methods: {
            enrichColumns() {
                for (const column of this.columns) {
                    if (column.resizable == null) this.$set(column, 'resizable', true);
                }
            },
            enrichRows() {

            },
            getColumnLeftOffsets() {
                let indexOffset = 0;
                if (this.hasNumberColumn) indexOffset++;
                if (this.hasCheckboxColumn) indexOffset++;
                if (this.hasCheckboxButtonColumn) indexOffset++;

                const header = this.$el.querySelectorAll('.column');

                for (let index = indexOffset; index < header.length; index++) {
                    this.$set(this.columns[index - indexOffset], 'offsetLeft', header [index].offsetLeft);
                    this.$set(this.columns[index - indexOffset], 'left', header [index].offsetLeft);
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
            getTableWidth() {
                const table = this.$el.querySelector('.table');
                this.tableWidth = table.offsetWidth;
                this.rowWidth = this.tableWidth - 19;
            },
            onResize(index, delta) {
                this.columns[index].width += delta;
                this.tableWidth += delta;

                for (++index; index < this.columns.length; index++) {
                    this.columns[index].left += delta;
                    this.columns[index].offsetLeft += delta;
                }
            },
        },
    }
</script>

<style lang="scss">
    $color-background-alt: #ffffff;
    $table-color-background-header: #fafaf9;

    .vue-recycle-scroller.ready.direction-vertical {
        .vue-recycle-scroller__item-wrapper {
            overflow-x: auto;
            position: static;
        }
    }

    .container {
        width: 100%;
        position: relative;
        background-color: #fafaf9;
        overflow: hidden;
    }

    .table {
        position: relative;
        background-color: $color-background-alt;
        font-size: inherit;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .1);
        border: 1px solid #dddbda;
        border-radius: .25rem;
        height: 544px;
    }

    .header {
        display: flex;
        color: #514f4d;
        font-weight: 700;
        line-height: normal;
        background-color: $table-color-background-header;

        .line-number {
            min-width: 3.75rem;
            border-bottom: 1px solid #dddbda;
        }

        .scrollbar {
            min-width: 17px;
            border-bottom: 1px solid #dddbda;
        }
    }

    .body {
        height: 512px;
        overflow-x: auto;
    }

    .row {
        display: flex;
        height: 2rem;
        align-items: center;
        border-bottom: 1px solid #dddbda;

        .cell {
            padding: .25rem .5rem;
            height: 100%;
            line-height: 1.5rem;

            &:hover {
                background-color: $color-background-alt;
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
        }
    }
</style>
