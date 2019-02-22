<template>
    <div class="table-view_footer slds-grid slds-grid_align-spread">

        <div class="slds-col">
            <span class="rows-per-page">

                <span>Rows per page</span>

                <slds-picklist :options="rowsPerPageOptions"
                               :option="rowsPerPage"
                               orientation="upwards"
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
</template>

<script>
    export default {
        props: {
            rowsPerPageOptions: {
                type: Array,
                required: true,
            },
            rowsPerPage: {
                type: Object,
                required: true,
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