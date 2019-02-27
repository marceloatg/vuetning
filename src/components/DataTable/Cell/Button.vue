<template>
    <td class="slds-cell-edit">
        <span class="slds-grid" :class="alignment">
            <slds-button
                :label="typeAttributes.label"
                :icon-name="typeAttributes.iconName"
                :icon-position="typeAttributes.iconPosition"
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
