<template>
    <div class="slds-notify_container">
        <slot/>
    </div>
</template>

<script>
export default {
    name: "SldsToasts"
}
</script>

<style scoped lang="scss">
.slds-notify_container {
    pointer-events: none;
}
</style>
