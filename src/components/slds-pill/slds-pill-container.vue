<template>
    <div class="slds-pill_container">
        <slot/>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
    name: "SldsPillContainer",
})
</script>
