<template>
    <td class="slds-cell-edit" :style="{'text-align': align}">
        <span class="slds-grid slds-grid_align-spread">
            <slds-icon
                    v-if="cell"
                    icon-name="utility:check"
                    variant="default"
                    size="x-small"/>
        </span>
    </td>
</template>

<script>
    export default {
        props: {
            align: {
                type: String,
                default: 'left',
            },
            cell: {
                type: Boolean,
                required: true,
            },
        },
    }
</script>
