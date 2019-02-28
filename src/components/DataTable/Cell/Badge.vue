<template>
    <td class="slds-cell-edit">
        <span class="slds-grid" :class="alignment">
            <slds-badge
                :label="label"
                :color="color"
                :icon-name="iconName"
                :icon-position="iconPosition"/>
        </span>
    </td>
</template>

<script>
    import SldsCell from './Cell'

    export default {
        extends: SldsCell,
        props: {
            cell: {
                type: [String, Object],
                required: true,
            },
        },
        computed: {
            label() {
                if (this.cell instanceof Object) return this.cell.label;
                return this.cell;
            },
            color() {
                if (this.cell instanceof Object) return this.cell.color;
                return null;
            },
            iconName() {
                if (this.cell instanceof Object) return this.cell.iconName;
                return null;
            },
            iconPosition() {
                if (this.cell instanceof Object) return this.cell.iconPosition;
                return null;
            },
        },
    }
</script>
