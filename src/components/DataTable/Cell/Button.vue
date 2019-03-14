<template>
    <td class="slds-cell-edit">
        <span class="slds-grid" :class="alignment">
            <slds-button
                :label="label"
                :icon-name="typeAttributes.iconName"
                :icon-position="typeAttributes.iconPosition"
                :variant="typeAttributes.variant"
                :class="typeAttributes.class"
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
            label() {
                if (this.cell != null) {
                    if (this.cell instanceof Object) return this.cell.label;
                    else return this.cell;
                }

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
