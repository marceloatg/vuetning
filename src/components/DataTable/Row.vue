<template>
    <tr class="slds-hint-parent">

        <td class="slds-cell-edit slds-cell-error slds-text-align_center" role="gridcell">
            <span class="slds-row-number slds-text-body_small slds-text-color_weak"></span>
        </td>

        <slds-cell v-for="(column, index) in columns" :key="index" :column="column" :cell="row[column.fieldName]"/>

    </tr>
</template>

<script>
    import SldsCell from './Cell';

    export default {
        components: {
            SldsCell
        },
        props: {
            columns: {
                type: Array,
                required: true,
            },
            row: {
                type: Object,
                required: true
            },
        },
    }
</script>

<style scoped>

</style>