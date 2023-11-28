<template>
    <div class="slds-col" :class="columnClassNames">
        <slot/>
    </div>
</template>

<script lang="ts">
import ColumnMixin from "./column-mixin"
import { defineComponent } from "vue"

export default defineComponent({
    name: "SldsColumn",

    mixins: [
        ColumnMixin,
    ],
})
</script>
