<template>
    <td class="slds-cell-edit" :style="{'text-align': align}">
        <span class="slds-grid slds-grid_align-spread">
            <slds-avatar
                    :src="cell.src"
                    :fallback-icon-name="cell.fallbackIconName"
                    :initials="cell.initials"
                    variant="circle"/>
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
            fallbackIconName: {
                type: String,
            },
            initials: {
                type: String,
            },
            cell: {
                type: Object,
                required: true,
            },
        },
    }
</script>
