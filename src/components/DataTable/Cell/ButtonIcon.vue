<template>
    <td class="slds-cell-edit">
        <span class="slds-grid" :class="alignment">
            <slds-button-icon
                :icon-name="typeAttributes.iconName"
                :variant="typeAttributes.variant"
                :class="typeAttributes.class"/>
        </span>
    </td>
</template>

<script>
    import SldsCell from './Cell'

    export default {
        extends: SldsCell,
    }
</script>

<style scoped>

</style>
