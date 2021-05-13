<template>
    <div class="slds-docked_container">
        <section class="slds-docked-composer slds-grid slds-grid_vertical slds-is-open" role="dialog" aria-labelledby="dialog-heading-id-1" aria-describedby="dialog-content-id-1">
            <header class="slds-docked-composer__header slds-grid slds-shrink-none" aria-live="assertive">
                <div class="slds-media slds-media_center slds-no-space">
                    <div class="slds-media__figure slds-m-right_x-small">
                        <span class="slds-icon_container">
                            <svg class="slds-icon slds-icon_small slds-icon-text-default" aria-hidden="true">
                                <use xlink:href="/assets/icons/standard-sprite/svg/symbols.svg#call"/>
                            </svg>
                        </span>
                    </div>
                    <div class="slds-media__body">
                        <h2 id="dialog-heading-id-1" class="slds-truncate" title="Header">
                            Header
                        </h2>
                    </div>
                </div>
                <div class="slds-col_bump-left slds-shrink-none">
                    <button class="slds-button slds-button_icon slds-button_icon" title="Minimize window">
                        <svg class="slds-button__icon" aria-hidden="true">
                            <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#minimize_window"/>
                        </svg>
                        <span class="slds-assistive-text">Minimize Composer Panel</span>
                    </button>
                    <button class="slds-button slds-button_icon slds-button_icon" title="Expand Composer">
                        <svg class="slds-button__icon" aria-hidden="true">
                            <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#expand_alt"/>
                        </svg>
                        <span class="slds-assistive-text">Expand Composer Panel</span>
                    </button>
                    <button class="slds-button slds-button_icon slds-button_icon" title="Close">
                        <svg class="slds-button__icon" aria-hidden="true">
                            <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#close"/>
                        </svg>
                        <span class="slds-assistive-text">Close Composer Panel</span>
                    </button>
                </div>
            </header>
            <div id="dialog-content-id-1" class="slds-docked-composer__body">
                <div class="slds-align_absolute-center">Docked Composer Panel Body
                    <br> This area consumes the feature</div>
            </div>
            <footer class="slds-docked-composer__footer slds-shrink-none">
                <div class="slds-col_bump-left slds-text-align_right">
                    <button class="slds-button slds-button_brand">
                        Action
                    </button>
                </div>
            </footer>
        </section>
    </div>
</template>

<script>
export default {
    name: "SldsDockedComposer"
}
</script>

<style scoped>

</style>
