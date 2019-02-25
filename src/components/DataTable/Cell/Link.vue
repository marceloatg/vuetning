<template>
    <td class="slds-cell-edit">
        <span class="slds-grid" :class="alignment">

            <a class="slds-truncate" :title="cell">
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
    import SldsCell from './Index'

    export default {
        extends: SldsCell,
        props: {
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
