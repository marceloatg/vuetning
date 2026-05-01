<template>
    <ul class="slds-timeline">
        <slot/>
    </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
    name: "SldsActivityTimeline",
})
</script>
