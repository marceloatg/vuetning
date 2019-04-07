<template>
    <td class="slds-cell-edit">
        <span class="slds-grid" :class="alignment">

            <span :title="cell" class="slds-truncate">
                {{ cell }}
            </span>

            <slds-copy-to-clipboard-button v-if="hasCopyButton" :value="cell"/>

        </span>
    </td>
</template>

<script>
    import SldsCell from './Cell'
    import SldsCopyToClipboardButton from './CopyToClipboardButton'

    export default {
        components: {
            SldsCopyToClipboardButton,
        },
        extends: SldsCell,
        props: {
            cell: {
                type: String,
            },
            hasCopyButton: {
                type: Boolean,
                default: true,
            },
        },
    }
</script>
