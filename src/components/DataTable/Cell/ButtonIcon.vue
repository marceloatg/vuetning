<template>
    <td class="slds-cell-edit">
        <span class="slds-grid" :class="alignment">
            <slds-button-icon
                :icon="typeAttributes.iconName"
                :class="typeAttributes.class"
                v-bind="typeAttributes.variant"/>
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
