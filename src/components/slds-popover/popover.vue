<template>
    <section aria-describedby="dialog-body-id-2" aria-label="Dialog Title" class="slds-popover slds-nubbin_left" role="dialog">
        <button class="slds-button slds-button_icon slds-button_icon-small slds-float_right slds-popover__close" title="Close dialog">
            <svg class="slds-button__icon" aria-hidden="true">
                <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#close"/>
            </svg>
            <span class="slds-assistive-text">Close dialog</span>
        </button>
        <div id="dialog-body-id-2" class="slds-popover__body">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
    </section>
</template>

<script>
export default {
    name: "SldsPopover"
}
</script>

<style scoped>

</style>
