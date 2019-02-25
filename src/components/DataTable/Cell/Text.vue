<template>
    <td class="slds-cell-edit" :style="{'text-align': align}">
        <span class="slds-grid slds-grid_align-spread">

            <span :title="cell" class="slds-truncate">
                {{ cell }}
            </span>

            <slds-button-icon
                    v-if="hasCopyButton"
                    icon-name="utility:copy_to_clipboard"
                    container="none"
                    class="slds-cell-edit__button slds-m-left_x-small"
                    icon-class="slds-button__icon_hint slds-button__icon_edit"
                    title="Copy to clipboard"/>

        </span>
    </td>
</template>

<script>
    export default {
        props: {
            align: {
                type: String,
                default: 'left',
            },
            cell: {
                type: String,
                required: true,
            },
            hasCopyButton: {
                type: Boolean,
                default: true,
            },
        },
    }
</script>