<template>
    <td class="slds-cell-edit">
        <span class="slds-grid" :class="alignment">

            <span :title="duration" class="slds-truncate">
                {{ duration }}
            </span>

            <slds-copy-to-clipboard-button v-if="hasCopyButton" :value="duration"/>

        </span>
    </td>
</template>

<script>
    import humanizeDuration from 'humanize-duration'
    import SldsCell from './Cell'
    import SldsCopyToClipboardButton from './CopyToClipboardButton'

    export default {
        components: {
            SldsCopyToClipboardButton,
        },
        extends: SldsCell,
        props: {
            cell: {
                type: Number,
            },
            hasCopyButton: {
                type: Boolean,
                default: true,
            },
        },
        computed: {
            duration() {
                if (this.cell == null) return null;
                return humanizeDuration(this.cell);
            },
        },
    }
</script>
