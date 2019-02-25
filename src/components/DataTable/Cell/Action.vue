<template>
    <td class="slds-cell-edit" :style="{'text-align': align}">
        <slds-menu :items="typeAttributes.rowActions" size="small" position="right"/>
    </td>
</template>

<script>
    export default {
        props: {
            align: {
                type: String,
                default: 'left',
            },
            typeAttributes: {
                type: Object,
                required: true,
            },
        },
    }
</script>
