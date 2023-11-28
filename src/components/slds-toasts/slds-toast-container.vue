<template>
    <div class="slds-notify_container">
        <slot/>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
    name: "SldsToastContainer",
})
</script>

<style scoped lang="scss">
.slds-notify_container {
    pointer-events: none;
}

</style>
