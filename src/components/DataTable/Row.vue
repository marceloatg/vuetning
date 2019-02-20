<template>
    <tr class="slds-hint-parent">

        <td class="slds-cell-edit slds-cell-error slds-text-align_center" role="gridcell">
            <span class="slds-row-number slds-text-body_small slds-text-color_weak"></span>
        </td>

        <td v-for="(column, index) in columns" :key="index"
            class="slds-cell-edit" role="gridcell"
            :style="{'text-align': column.textAlign}">

            <!-- Output types -->
            <span v-if="column.getDataCategory() === 'output'" class="slds-grid slds-grid_align-spread">

                <!-- Text types -->
                <span v-if="column.type === 'text'" class="slds-truncate" :title="row[column.fieldName]">
                    {{ row[column.fieldName] }}
                </span>

                <a v-else-if="column.type === 'link'" class="slds-truncate" :title="row[column.fieldName]">
                    {{ row[column.fieldName] }}
                </a>

                <!-- Copy to clipboard button -->
                <slds-button-icon v-if="column.hasCopyButton"
                                  icon-name="utility:copy_to_clipboard"
                                  container="none"
                                  class="slds-cell-edit__button slds-m-left_x-small"
                                  icon-class="slds-button__icon_hint slds-button__icon_edit"
                                  title="Copy to clipboard"/>

            </span>

            <!-- Input types -->
            <span v-else class="slds-truncate" :title="row[column.fieldName]">

                <slds-menu v-if="column.type === 'action'" :items="column.actions" size="small" position="right"/>

                <slds-button v-else-if="column.type === 'button'"
                             :label="column.typeAttributes.label"
                             :variant="column.typeAttributes.variant"
                             :class="column.typeAttributes.class"/>

            </span>

        </td>

    </tr>
</template>

<script>
    export default {
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