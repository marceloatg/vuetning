<template>
    <div class="slds-scoped-notification slds-media slds-media_center slds-scoped-notification_light" role="status">
        <div class="slds-media__figure">
            <span class="slds-icon_container slds-icon-utility-info" title="information">
                <svg class="slds-icon slds-icon_small slds-icon-text-default" aria-hidden="true">
                    <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#info"/>
                </svg>
                <span class="slds-assistive-text">information</span>
            </span>
        </div>
        <div class="slds-media__body">
            <p>It looks as if duplicates exist for this lead.
                <a href="javascript:void(0);">
                    View Duplicates.
                </a>
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: "SldsScopedNotification"
}
</script>

<style scoped>

</style>
