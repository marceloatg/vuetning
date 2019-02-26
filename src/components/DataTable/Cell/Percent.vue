<template>
    <td class="slds-cell-edit">
        <span class="slds-grid" :class="alignment"/>
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
