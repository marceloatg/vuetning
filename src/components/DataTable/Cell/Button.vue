<template>
    <td class="slds-cell-edit">
        <span class="slds-grid" :class="alignment">
            <slds-button
                    :label="typeAttributes.label"
                    :variant="typeAttributes.variant"
                    :class="typeAttributes.class"/>
        </span>
    </td>
</template>

<script>
    import SldsCell from './Index'

    export default {
        extends: SldsCell,
    }
</script>
