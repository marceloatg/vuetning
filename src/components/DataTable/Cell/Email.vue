<template>
    <td class="slds-cell-edit">
        <span class="slds-grid" :class="alignment">

            <a :href="`mailto:${cell}`" class="slds-truncate" :title="cell">
                <slds-icon icon-name="utility:email" size="x-small" variant="default"/>
                {{ cell }}
            </a>

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
                required: true,
            },
            hasCopyButton: {
                type: Boolean,
                default: true,
            },
        },
    }
</script>
