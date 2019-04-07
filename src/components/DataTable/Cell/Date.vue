<template>
    <td class="slds-cell-edit">
        <span class="slds-grid" :class="alignment">

            <span :title="title" class="slds-truncate">
                {{ label }}
            </span>

            <slds-copy-to-clipboard-button v-if="hasCopyButton" :value="label"/>

        </span>
    </td>
</template>

<script>
    import moment from 'moment'
    import SldsCell from './Cell'
    import SldsCopyToClipboardButton from './CopyToClipboardButton'

    export default {
        components: {
            SldsCopyToClipboardButton,
        },
        extends: SldsCell,
        props: {
            cell: {
                type: [Date, Number, String],
            },
            hasCopyButton: {
                type: Boolean,
                default: true,
            },
        },
        computed: {
            label() {
                if (this.cell == null) return null;
                return moment(this.cell).format(this.typeAttributes.format);
            },
            title() {
                if (this.cell == null) return null;

                let format = this.typeAttributes.format;
                if (this.typeAttributes.titleFormat != null) format = this.typeAttributes.titleFormat;
                return moment(this.cell).format(format);
            },
        },
    }
</script>
