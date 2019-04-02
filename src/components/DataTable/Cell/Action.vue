<template>
    <td class="slds-cell-edit">
        <span class="slds-grid" :class="alignment">
            <slds-menu :items="items" size="x-small" @click="onClick"/>
        </span>
    </td>
</template>

<script>
    import SldsCell from './Cell'

    export default {
        extends: SldsCell,
        props: {
            cell: {
                type: Array,
            },
        },
        computed: {
            items() {
                if (this.typeAttributes == null || this.typeAttributes.rowActions == null) return [];
                if (this.cell == null) return this.typeAttributes.rowActions;
                return this.typeAttributes.rowActions.filter(action => this.cell.includes(action.name));
            },
        },
        methods: {
            onClick(value) {
                this.$emit('action', value);
            },
        },
    }
</script>
