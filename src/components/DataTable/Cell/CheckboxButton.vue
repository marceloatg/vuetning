<template>
    <td class="slds-cell-edit">
        <span class="slds-grid" :class="alignment">
            <slds-checkbox-button :checked="cell"/>
        </span>
    </td>
</template>

<script>
    import SldsCell from './Cell'

    export default {
        extends: SldsCell,
        props: {
            cell: {
                type: Boolean,
                default: false,
            },
        },
    }
</script>
