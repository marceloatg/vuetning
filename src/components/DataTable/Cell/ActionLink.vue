<template>
    <td class="slds-cell-edit">
        <span class="slds-grid" :class="alignment">

            <a class="slds-truncate" :title="label" @click="onClick">
                {{ label }}
            </a>

            <button
                v-if="hasCopyButton"
                v-clipboard="label"
                class="slds-button slds-button_icon slds-cell-edit__button slds-m-left_x-small"
                title="Copy to clipboard">

                <svg
                    class="slds-button__icon slds-button__icon_hint slds-button__icon_edit"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="100%"
                    height="100%">
                    <path d="M8 5.4h8c.4 0 .8-.4.8-.8V3.1c0-1.2-1-2.2-2.2-2.2H9.5c-1.2 0-2.2 1-2.2 2.2v1.5c0 .4.3.8.7.8zm12-2.6h-.8c-.2 0-.3.1-.3.3v1.5c0 1.6-1.3 3-2.9 3H8c-1.6 0-2.9-1.4-2.9-3V3.1c0-.2-.1-.3-.3-.3H4c-1.2 0-2.2 1-2.2 2.2v15.9c0 1.2 1 2.2 2.2 2.2h16c1.2 0 2.2-1 2.2-2.2V5c0-1.2-1-2.2-2.2-2.2z"/>
                </svg>

            </button>

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
