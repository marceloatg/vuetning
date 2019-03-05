<template>
    <main class="table-view" ref="tableView">

        <!-- Modals -->
        <slot name="modals"/>

        <!-- Header -->
        <table-view-header
            :count="totalRows"
            :figure="figure"
            :list-views="listViews"
            :title="title">

            <template #actions>
                <slot name="header-actions"/>
            </template>

        </table-view-header>

        <!-- Body -->
        <div class="table-view_body">
            <div class="slds-grid">
                <div class="slds-col slds-no-space">

                    <!-- Spinner -->
                    <div v-if="refreshing"/>

                    <transition
                        name="router-animation"
                        enter-active-class="animated fadeIn quicker"
                        leave-active-class="animated fadeOut quicker"
                        mode="out-in">

                        <!-- Placeholder -->
                        <list-placeholder v-if="!initialized"/>

                        <!-- Initialized body -->
                        <div v-else>

                            <!--Empty message-->
                            <empty-list-message
                                v-if="isEmpty"
                                :heading="emptyMessage.heading"
                                :message="emptyMessage.message"/>

                            <!-- Table -->
                            <slds-data-table
                                v-else
                                :all-rows-selected="allRowsSelected"
                                :key-field="keyField"
                                :columns="columns"
                                :rows="rows"
                                :selected-rows="selectedRows"
                                :show-row-number-column="showRowNumberColumn"
                                :show-row-selection-column="showRowSelectionColumn"
                                @actionlink="onActionLink"
                                @select="onSelect(...arguments)"
                                @selectall="onSelectAll($event)"/>

                        </div>

                    </transition>

                </div>
            </div>
        </div>

        <!-- Footer -->
        <table-view-footer
            :current-page="footer.currentPage"
            :initialized="initialized"
            :rows-per-page-options="rowsPerPageOptions"
            :rows-per-page="rowsPerPageOptions[0]"
            :total-pages="footer.totalPages"
            @pagechanged="onPageChanged"/>

    </main>
</template>

<script>
    import EmptyListMessage from './EmptyListMessage'
    import ListPlaceholder from './ListPlaceholder'
    import TableViewFooter from './Footer'
    import TableViewHeader from './Header'

    export default {
        components: {
            EmptyListMessage,
            ListPlaceholder,
            TableViewFooter,
            TableViewHeader,
        },
        props: {
            columns: {
                type: Array,
                required: true,
            },
            emptyMessage: {
                type: Object,
                required: true,
            },
            figure: {
                type: Object,
                required: true,
            },
            footer: {
                type: Object,
                required: true,
            },
            initialized: {
                type: Boolean,
                required: true,
            },
            keyField: {
                type: String,
            },
            listViews: {
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
            showRowNumberColumn: {
                type: Boolean,
                default: true,
            },
            showRowSelectionColumn: {
                type: Boolean,
                default: false,
            },
            title: {
                type: String,
                required: true,
            },
            totalRows: {
                type: Number,
                required: true,
            },
        },
        data() {
            return {
                refreshing: false,
                rowsPerPageOptions: [
                    {value: 100, label: '100',},
                    {value: 50, label: '50',},
                    {value: 25, label: '25',},
                ],
            }
        },
        computed: {
            allRowsSelected() {
                return this.totalRows == this.selectedRows.length;
            },
            isEmpty() {
                return this.rows.length === 0;
            },
        },
        methods: {
            onActionLink(action, row) {
                this.$emit(action, row);
            },
            onPageChanged(page) {
                this.currentPage = page;
            },
            onSelect(selected, key) {
                if (selected) this.selectedRows.push(key);
                else this.selectedRows.splice(this.selectedRows.indexOf(key), 1);
            },
            onSelectAll(selected) {
                if (selected) {
                    for (let i = 0; i < this.totalRows; i++) {
                        if (this.selectedRows.indexOf(i) === -1) this.selectedRows.push(i);
                    }
                }
                else {
                    this.selectedRows.splice(0);
                }
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
