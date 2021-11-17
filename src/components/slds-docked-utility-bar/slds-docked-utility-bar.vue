<template>
    <footer class="slds-utility-bar_container" aria-label="Utility Bar">
        <h2 class="slds-assistive-text">
            Utility Bar
        </h2>
        <ul class="slds-utility-bar">
            <li class="slds-utility-bar__item">
                <button class="slds-button slds-utility-bar__action" aria-pressed="false">
                    <svg class="slds-button__icon slds-button__icon_left" aria-hidden="true">
                        <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#call"/>
                    </svg>
                    <span class="slds-utility-bar__text">Call</span>
                </button>
            </li>
            <li class="slds-utility-bar__item">
                <button class="slds-button slds-utility-bar__action" aria-pressed="false">
                    <svg class="slds-button__icon slds-button__icon_left" aria-hidden="true">
                        <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#clock"/>
                    </svg>
                    <span class="slds-utility-bar__text">History</span>
                </button>
            </li>
            <li class="slds-utility-bar__item">
                <button class="slds-button slds-utility-bar__action" aria-pressed="false">
                    <svg class="slds-button__icon slds-button__icon_left" aria-hidden="true">
                        <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#note"/>
                    </svg>
                    <span class="slds-utility-bar__text">Notes</span>
                </button>
            </li>
            <li class="slds-utility-bar__item">
                <button class="slds-button slds-utility-bar__action" aria-pressed="false">
                    <svg class="slds-button__icon slds-button__icon_left" aria-hidden="true">
                        <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#omni_channel"/>
                    </svg>
                    <span class="slds-utility-bar__text">
                        <span class="slds-m-bottom_xxx-small">Online</span>
                        <span>Omni-Channel</span>
                    </span>
                </button>
            </li>
        </ul>
        <div class="slds-utility-panel slds-grid slds-grid_vertical" role="dialog" aria-labelledby="panel-heading-01">
            <div class="slds-utility-panel__header slds-grid slds-shrink-none">
                <div class="slds-media slds-media_center">
                    <div class="slds-media__figure slds-m-right_x-small">
                        <span class="slds-icon_container">
                            <svg class="slds-icon slds-icon_small slds-icon-text-default" aria-hidden="true">
                                <use xlink:href="/assets/icons/standard-sprite/svg/symbols.svg#call"/>
                            </svg>
                        </span>
                    </div>
                    <div class="slds-media__body">
                        <h2 id="panel-heading-01">
                            Call
                        </h2>
                    </div>
                </div>
                <div class="slds-col_bump-left slds-shrink-none">
                    <button class="slds-button slds-button_icon slds-button_icon" title="Close Panel">
                        <svg class="slds-button__icon" aria-hidden="true">
                            <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#minimize_window"/>
                        </svg>
                        <span class="slds-assistive-text">Close Panel</span>
                    </button>
                </div>
            </div>
            <div class="slds-utility-panel__body">
                <div class="slds-align_absolute-center">
                    Utility Panel Body
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'SldsDockedUtilityBar'
}
</script>

<style scoped>

</style>
