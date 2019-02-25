<template>
    <td class="slds-cell-edit" :style="{'text-align': align}">
        <span class="slds-grid slds-grid_align-spread">

            <a :href="`mailto:${cell}`" class="slds-truncate" :title="cell">
                <slds-icon icon-name="utility:email" size="x-small" variant="default"/>
                {{ cell }}
            </a>

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