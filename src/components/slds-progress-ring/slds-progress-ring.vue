<template>
    <div class="slds-progress-ring">
        <div class="slds-progress-ring__progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="100">
            <svg viewBox="-1 -1 2 2">
                <circle id="slds-progress-ring-path-3" class="slds-progress-ring__path" cx="0" cy="0" r="1"/>
            </svg>
        </div>
        <div class="slds-progress-ring__content"/>
    </div>
</template>

<script>
export default {
    name: 'SldsProgressRing'
}
</script>

<style scoped>

</style>
