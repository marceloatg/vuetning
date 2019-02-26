<template>
    <td class="slds-cell-edit">
        <span class="slds-grid" :class="alignment">
            <slds-avatar
                :src="cell.src"
                :fallback-icon-name="cell.fallbackIconName"
                :initials="cell.initials"
                variant="circle"/>
        </span>
    </td>
</template>

<script>
    import SldsCell from './Index'

    export default {
        extends: SldsCell,
        props: {
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
