<template>
    <div class="table-view_footer slds-grid slds-grid_align-spread">

        <div v-if="initialized" class="slds-col">
            <span class="rows-per-page">

                <span>
                    Rows per page
                </span>

                <slds-picklist
                    :options="rowsPerPageOptions"
                    :option="rowsPerPage"
                    orientation="upwards"
                    size="xx-small"
                    class="slds-m-left_x-small"/>
            </span>
        </div>

        <div v-if="initialized && currentPage > 0" class="slds-col">
            <slds-pagination
                :total-pages="totalPages"
                :current-page="currentPage"
                @pagechanged="onPageChanged"/>
        </div>

    </div>
</template>

<script>
    export default {
        props: {
            currentPage: {
                type: Number,
                required: true
            },
            initialized: {
                type: Boolean,
                required: true
            },
            rowsPerPageOptions: {
                type: Array,
                required: true,
            },
            rowsPerPage: {
                type: Object,
                required: true,
            },
            totalPages: {
                type: Number,
                required: true,
            },
        },
        methods: {
            onPageChanged(page) {
                this.$emit('pagechanged', page);
            },
        },
    }
</script>

<style scoped lang="scss">
    .rows-per-page {
        display: inline-flex;

        > span {
            line-height: 32px;
        }
    }
</style>
