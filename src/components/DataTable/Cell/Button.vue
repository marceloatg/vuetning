<template>
    <td class="slds-cell-edit">
        <span class="slds-grid" :class="alignment">
            <slds-button
                :label="label"
                :disabled="disabled"
                :spinner-active="spinnerActive"
                :icon-name="iconName"
                :icon-position="iconPosition"
                :variant="variant"
                :class="style"
                @click="onClick"/>
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
            },
        },
        computed: {
            style() {
                if (this.cell != null) return this.cell.class;
                if (this.typeAttributes != null) return this.typeAttributes.class;
                return null;
            },
            disabled() {
                if (this.cell != null) return this.cell.disabled;
                if (this.typeAttributes != null) return this.typeAttributes.disabled;
                return false;
            },
            iconName() {
                if (this.cell != null) return this.cell.iconName;
                if (this.typeAttributes != null) return this.typeAttributes.iconName;
                return null;
            },
            iconPosition() {
                if (this.cell != null) return this.cell.iconPosition;
                if (this.typeAttributes != null) return this.typeAttributes.iconPosition;
                return null;
            },
            label() {
                if (this.cell != null) {
                    if (this.cell instanceof Object) return this.cell.label;
                    else return this.cell;
                }

                return this.typeAttributes.label;
            },
            spinnerActive() {
                if (this.cell != null) return this.cell.spinnerActive;
                if (this.typeAttributes != null) return this.typeAttributes.spinnerActive;
                return false;
            },
            variant() {
                if (this.cell != null) return this.cell.variant;
                if (this.typeAttributes != null) return this.typeAttributes.variant;
                return null;
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
