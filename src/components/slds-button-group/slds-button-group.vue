<template>
    <div class="slds-button-group" role="group">
        <slot/>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
    name: "SldsButtonGroup",
})
</script>
