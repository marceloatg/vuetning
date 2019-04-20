<template>
    <td class="slds-cell-edit">
        <span class="slds-grid" :class="alignment">

            <span :title="label" class="slds-truncate">
                {{ label }}
            </span>

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
