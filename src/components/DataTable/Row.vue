<template>
    <tr class="slds-hint-parent">

        <td class="slds-cell-edit slds-cell-error slds-text-align_center" role="gridcell">
            <span class="slds-row-number slds-text-body_small slds-text-color_weak"></span>
        </td>

        <slds-cell v-for="(column, index) in columns"
                   :key="index"
                   :column="column"
                   :type="column.type"
                   :cell="cell(column.fieldName)"/>

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
        data() {
            return {
                selected: false,
            }
        },
        methods: {
            cell(fieldName) {
                const fields = fieldName.split('.');
                let cell = this.row[fields[0]];

                for (let i = 1; i < fields.length; i++) {
                    cell = cell[fields[i]];
                }

                return cell;
            },
        },
    }
</script>

<style scoped>

</style>
