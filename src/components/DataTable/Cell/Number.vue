<template>
    <td class="slds-cell-edit">
        <span class="slds-grid" :class="alignment">

            <span :title="label" class="slds-truncate">
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
    import SldsCell from './Cell'

    export default {
        extends: SldsCell,
        props: {
            cell: {
                type: [Number, Object],
            },
            hasCopyButton: {
                type: Boolean,
                default: true,
            },
        },
        computed: {
            label() {
                if (this.cell instanceof Object) return this.cell.label;
                if (this.cell == null || isNaN(this.cell) || !isFinite(this.cell)) return null;

                let truncatedValue = `${Math.trunc(this.cell)}`;
                let values = parseFloat(truncatedValue).toFixed(this.getDecimalPlaces()).split('.');
                values[0] = values[0].split(/(?=(?:...)*$)/).join('.');

                return values.join(',');
            },
            value() {
                if (this.cell instanceof Object) return this.cell.value;
                return this.cell;
            },
        },
        methods: {
            getDecimalPlaces() {
                if (this.typeAttributes == null || this.typeAttributes.decimalPlaces == null) return 0;
                return this.typeAttributes.decimalPlaces;
            }
        }
    }
</script>
