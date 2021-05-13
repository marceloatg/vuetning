<template>
    <div style="padding-left:2rem;padding-top:5rem;position:relative">
        <button class="slds-button" aria-describedby="help" aria-disabled="true">
            Help Text
        </button>
        <div id="help" class="slds-popover slds-popover_tooltip slds-nubbin_bottom-left" role="tooltip" style="position:absolute;top:-4px;left:35px">
            <div class="slds-popover__body">
                Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt aute id consequat veniam incididunt duis in sint irure nisi.
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "SldsTooltip"
}
</script>

<style scoped>

</style>
