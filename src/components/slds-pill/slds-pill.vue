<template>
    <span class="slds-pill slds-pill_link">
        <a href="javascript:void(0);" class="slds-pill__action" title="Full pill label verbiage mirrored here">
            <span class="slds-pill__label">Pill Label</span>
        </a>
        <button class="slds-button slds-button_icon slds-button_icon slds-pill__remove" title="Remove">
            <svg class="slds-button__icon" aria-hidden="true">
                <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#close"/>
            </svg>
            <span class="slds-assistive-text">Remove</span>
        </button>
    </span>
</template>

<script>
export default {
    name: 'SldsPill'
}
</script>

<style scoped>

</style>
