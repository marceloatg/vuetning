<template>
    <div class="vue-container vp-raw slds-box_border" :class="{inverse: inverse}" :style="{height: height || 'auto'}">
        <div class="slds-p-around_medium">
            <slot/>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
    name: "example-container",

    props: {
        height: String,
        inverse: Boolean,
    },
})
</script>

<style lang="scss">

.vue-container {
    position: relative;
    border-radius: .5rem;
    font-size: .8125rem;
    line-height: 1.5;
}

.inverse {
    background-color: rgb(22, 50, 92);
}



</style>
