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
                            {{ index + 1 }}
                        </div>

                        <template
                            v-for="(column, index) in columns"
                            class="cell"
                            :style="{width: `${column.width}px`}">

                            <div
                                v-if="column.type === 'text'"
                                :key="index"
                                :title="item.name"
                                class="cell slds-truncate"
                                :style="{width: `${column.width}px`}">
                                {{ getFieldValue(column.fieldName, item) }}
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

            this.$el
                .querySelector('.vue-recycle-scroller')
                .addEventListener('scroll', this.onScroll);
        },
        beforeDestroy() {
            this.$el
                .querySelector('.vue-recycle-scroller')
                .removeEventListener('scroll', this.onScroll);
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
            getFieldValue(fieldName, row){
                if (fieldName == null) return null;

                const fields = fieldName.split('.');
                let fieldValue = row[fields[0]];
                if (fieldValue == null) return null;

                for (let i = 1; i < fields.length; i++) {
                    fieldValue = fieldValue[fields[i]];
                    if (fieldValue == null) return null;
                }

                return fieldValue;
            },
            getTableWidth() {
                const table = this.$el.querySelector('.table');
                this.tableWidth = table.offsetWidth;
                this.rowWidth = this.tableWidth - 19;
            },
            onScroll() {
                const scrollLeft = this.$el.querySelector('.vue-recycle-scroller').scrollLeft;
                for (let column of this.columns) column.left = column.offsetLeft - scrollLeft;
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
        font-size: inherit;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .1);
        border: 1px solid #dddbda;
        border-radius: .25rem;
        height: 544px;
    }

    .header {
        position: static;
        height: 2rem;

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

        .scrollbar {
            min-width: 17px;
            position: absolute;
        }
    }

    .body {
        height: 512px;
        overflow-x: auto;
        border-top: 1px solid #dddbda;
    }

    .row {
        display: flex;
        height: 2rem;
        align-items: center;
        border-bottom: 1px solid #dddbda;
        background-color: $color-background-alt;

        .cell {
            padding: .25rem .5rem;
            height: 100%;
            line-height: 1.5rem;

            &:hover {
                background-color: $color-background-alt;
                box-shadow: #dddbda 0 -1px 0 inset, #dddbda 0 1px 0 inset;
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
</style>
