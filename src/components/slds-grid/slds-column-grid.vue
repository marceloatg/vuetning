<template>
    <div class="slds-col slds-grid" :class="[columnClassNames, gridClassNames]">
        <slot/>
    </div>
</template>

<script lang="ts">
import ColumnMixin from "./column-mixin"
import GridMixin from "./grid-mixin"
import { defineComponent } from "vue"

export default defineComponent({
    name: "SldsColumnGrid",

    mixins: [
        ColumnMixin,
        GridMixin,
    ],
})
</script>
