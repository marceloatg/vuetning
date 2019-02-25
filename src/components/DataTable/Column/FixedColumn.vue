<template>
    <th scope="col" :style="{ width: `${fixedWidth}px` }">
        <div class="slds-cell-fixed" :style="{ left: `${left}px` }">
            <div :title="label" class="slds-truncate">
                {{ label }}
            </div>
        </div>
    </th>
</template>

<script>
    import Commons from '../commons'
    import SldsColumn from './Column';

    export default {
        extends: SldsColumn,
        props: {
            fixedWidth: {
                type: Number,
                default: Commons.DEFAULT_FIXED_WIDTH,
            },
        },
    }
</script>

<style scoped lang="scss">
    th {
        > div {
            > div {
                display: flex;
                padding: .25rem .5rem;
                height: 2rem;
                align-items: center;
            }
        }
    }
</style>
