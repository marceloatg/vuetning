<template>
    <td class="slds-cell-edit">
        <span class="slds-grid" :class="alignment">

            <a class="slds-truncate" :title="label" @click="onClick">
                {{ label }}
            </a>

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
    import SldsCell from './Cell'

    export default {
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
