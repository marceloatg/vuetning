<template>
    <td class="slds-cell-edit">
        <span class="slds-grid" :class="alignment">

            <span :title="duration" class="slds-truncate">
                {{ duration }}
            </span>

            <slds-button-icon
                v-if="hasCopyButton"
                v-clipboard="duration"
                icon-name="utility:copy_to_clipboard"
                container="none"
                class="slds-cell-edit__button slds-m-left_x-small"
                icon-class="slds-button__icon_hint slds-button__icon_edit"
                title="Copy to clipboard"/>

        </span>
    </td>
</template>

<script>
    import humanizeDuration from 'humanize-duration'
    import SldsCell from './Cell'

    export default {
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
