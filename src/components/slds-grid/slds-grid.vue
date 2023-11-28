<template>
    <div class="slds-grid" :class="gridClassNames">
        <slot/>
    </div>
</template>

<script lang="ts">
import GridMixin from "./grid-mixin"
import { defineComponent } from "vue"

export default defineComponent({
    name: "SldsGrid",

    mixins: [
        GridMixin,
    ],
})
</script>

<style scoped lang="scss">

.slds-grid_fill {
    height: 100%;
    width: 100%;
}

</style>
