<template>
    <main class="table-view" ref="tableView">

        <!-- Header -->
        <table-view-header
            :count="count"
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

                    <!-- Placeholder -->
                    <div v-if="!initialized"/>

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
        <table-view-footer
            :rows-per-page-options="rowsPerPageOptions"
            :rows-per-page="rowsPerPageOptions[0]"
            :total-pages="10"
            :current-page="currentPage"
            @pagechanged="onPageChanged"/>

    </main>
</template>

<script>
    import TableViewFooter from './Footer'
    import TableViewHeader from './Header'

    export default {
        components: {
            TableViewFooter,
            TableViewHeader,
        },
        props: {
            columns: {
                type: Array,
                required: true,
            },
            figure: {
                type: Object,
                required: true,
            },
            initialized: {
                type: Boolean,
                required: true,
            },
            listViews: {
                type: String,
                required: true,
            },
            rows: {
                type: Array,
                required: true,
            },
            title: {
                type: String,
                required: true,
            },
        },
        data() {
            return {
                currentPage: 1,
                refreshing: false,
                rowsPerPageOptions: [
                    {value: 100, label: '100',},
                    {value: 50, label: '50',},
                    {value: 25, label: '25',},
                ],
            }
        },
        computed: {
            count() {
                return this.rows.length;
            },
            isEmpty() {
                return this.model.rows.length === 0;
            },
        },
        methods: {
            onPageChanged(page) {
                this.currentPage = page;
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
