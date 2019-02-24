<template>
    <th scope="col" :style="{ width: `${column.fixedWidth}px` }">
        <div class="slds-cell-fixed" :style="{ left: `${column.left}px` }">
            <div class="slds-truncate" :title="column.label" style="display: flex;padding: .25rem .5rem;height: 2rem;align-items: center;">
                {{ column.label }}
            </div>
        </div>
    </th>
</template>

<script>
    import SldsColumn from './Column';

    export default {
        extends: SldsColumn,
        props: {
            column: {
                type: Object,
                required: true,
            },
        },
    }
</script>
