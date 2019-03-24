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
        props: {},
        computed: {
            items() {
                if (this.typeAttributes == null || this.typeAttributes.rowActions == null) return [];
                return this.typeAttributes.rowActions;
            },
        },
        methods: {
            onClick(value) {
                this.$emit('action', value);
            },
        },
    }
</script>
