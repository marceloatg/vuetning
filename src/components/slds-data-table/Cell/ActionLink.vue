<template>
    <td class="slds-cell-edit">
        <span class="slds-grid" :class="alignment">

            <a class="slds-truncate" :title="label" @click="onClick">
                {{ label }}
            </a>

            <slds-copy-to-clipboard-button v-if="hasCopyButton" :value="label"/>

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
        computed: {
            label() {
                if (this.cell != null) return this.cell;
                return this.typeAttributes.label;
            },
        },
        methods: {
            onClick() {
                if (this.typeAttributes == null) return;
                if (this.typeAttributes.action == null) return;

                this.$emit('action', this.typeAttributes.action);
            },
        },
    }
</script>
