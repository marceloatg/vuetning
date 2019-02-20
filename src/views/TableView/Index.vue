<template>
    <main class="table-view" ref="tableView">

        <!-- Header -->
        <table-view-header :model="headerModel">

            <template slot="actions">
                <slot name="header-actions"></slot>
            </template>

        </table-view-header>

        <!-- Body -->
        <div class="table-view_body">
            <div class="slds-grid">
                <div class="slds-col slds-no-space">

                    <!-- Spinner -->
                    <div v-if="refreshing"></div>

                    <!-- Placeholder -->
                    <div v-if="!initialized"></div>

                    <!-- Initialized body -->
                    <div v-else>

                        <!--Empty message-->

                        <!-- Table -->
                        <slds-data-table :columns="columns" :rows="rows"/>

                    </div>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <div class="table-view_footer slds-grid slds-grid_align-spread">

            <div class="slds-col">
                <span style="display: inline-flex;">
                    <span style="line-height: 32px;">Rows per page</span>
                    <slds-picklist :options="rowsPerPage"
                                   :option="rowsPerPage[0]"
                                   orientation="bottom"
                                   class="slds-m-left_x-small"
                                   style="width: 100px;"/>
                </span>
            </div>

            <div class="slds-col">
                <span>
                    Rows per page
                </span>
            </div>

        </div>

    </main>
</template>

<script>
    import TableViewHeader from './Header'

    export default {
        name: 'TableView',
        components: {
            TableViewHeader: TableViewHeader,
        },
        props: {
            model: {
                type: Object,
                required: true,
                note: 'Table view model.',
            },
        },
        data() {
            return {
                refreshing: false,
                rowsPerPage: [
                    {key: 100, value: '100',},
                    {key: 50, value: '50',},
                    {key: 25, value: '25',},
                ],
            }
        },
        computed: {
            initialized() {
                return this.model.initialized;
            },
            columns() {
                return this.model.columns;
            },
            rows() {
                return this.model.rows;
            },
            isEmpty() {
                return this.model.rows.length === 0;
            },
            headerModel() {
                return {
                    figure: this.model.figure,
                    title: this.model.title,
                    listViews: this.model.listViews,
                    count: this.model.rows.length,
                };
            },
        },
    }
</script>

<style scoped lang="scss">
    $table-view-footer: 48px;

    .table-view_body {
        position: relative;
        overflow-y: auto;
        background: #fafaf9;

        .slds-table_bordered {
            border-top: none;
        }

        .empty-content {
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            position: absolute;
            text-align: center;
        }
    }

    .table-view_footer {
        display: flex;
        padding: 8px;
        align-items: center;
        height: $table-view-footer;
        border-top: 1px solid #dddbda;
        background-color: #f3f2f2;
    }
</style>