<template>
    <td class="slds-cell-edit">
        <span class="slds-grid" :class="alignment">
            <slds-icon
                v-if="cell != null"
                :icon-name="cell.iconName"
                :icon-class="cell.iconClass"
                :size="cell.size"
                :title="cell.title"
                :variant="cell.variant"/>
        </span>
    </td>
</template>

<script>
    import SldsCell from './Cell'

    export default {
        extends: SldsCell,
        props: {
            cell: {
                type: Object,
            },
        },
    }
</script>
