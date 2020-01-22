<template>
    <td class="slds-cell-edit">
        <span class="slds-grid" :class="alignment">
            <slds-icon v-if="cell" name="utility:check" x-small/>
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
                required: true,
            },
        },
    }
</script>
