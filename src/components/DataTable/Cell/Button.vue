<template>
    <td class="slds-cell-edit" :style="{'text-align': align}">
        <slds-button
                :label="typeAttributes.label"
                :variant="typeAttributes.variant"
                :class="typeAttributes.class"/>
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
