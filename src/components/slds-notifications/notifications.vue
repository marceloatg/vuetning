<template>
    <div class="slds-notification-container">
        <div aria-live="assertive" aria-atomic="true" class="slds-assistive-text">event notification: Tesla - Renewal
            meeting
        </div>
        <section class="slds-notification" role="dialog" aria-labelledby="noti52" aria-describedby="dialog-body-id-4">
            <div id="dialog-body-id-4" class="slds-notification__body">
                <a class="slds-notification__target slds-media" href="javascript:void(0);">
                    <span class="slds-icon_container slds-icon-standard-event slds-media__figure" title="event">
                        <svg class="slds-icon slds-icon_small" aria-hidden="true">
                            <use xlink:href="/assets/icons/standard-sprite/svg/symbols.svg#event"/>
                        </svg>
                    </span>
                    <div class="slds-media__body">
                        <h2 id="noti52" class="slds-text-heading_small slds-m-bottom_xx-small">
                            <span class="slds-assistive-text">event notification:</span>Tesla - Renewal meeting</h2>
                        <p>Event at 11:00am on Jan 8</p>
                    </div>
                </a>
                <button class="slds-button slds-button_icon slds-button_icon-container slds-notification__close" title="Dismiss Tesla - Renewal meeting notification">
                    <svg class="slds-button__icon" aria-hidden="true">
                        <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#close"/>
                    </svg>
                    <span class="slds-assistive-text">Dismiss Tesla - Renewal meeting notification</span>
                </button>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name: "SldsNotifications"
}
</script>

<style scoped>

</style>
