<template>
    <td class="slds-cell-edit">
        <span class="slds-grid" :class="alignment">

            <span :title="title" class="slds-truncate">
                {{ label }}
            </span>

            <slds-button-icon
                v-if="hasCopyButton"
                v-clipboard="label"
                icon-name="utility:copy_to_clipboard"
                container="none"
                class="slds-cell-edit__button slds-m-left_x-small"
                icon-class="slds-button__icon_hint slds-button__icon_edit"
                title="Copy to clipboard"/>

        </span>
    </td>
</template>

<script>
    import moment from 'moment'
    import SldsCell from './Cell'

    export default {
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
