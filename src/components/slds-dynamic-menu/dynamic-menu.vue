<template>
    <div style="height:13rem;position:relative;margin-left:1rem">
        <button class="slds-button slds-button_icon slds-button_icon-border-filled" title="Show Favorites">
            <svg class="slds-button__icon" aria-hidden="true">
                <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#favorite"/>
            </svg>
            <span class="slds-assistive-text">Show Favorites</span>
        </button>
        <section aria-describedby="dialog-body-id-3" aria-label="My Favourites" class="slds-popover slds-nubbin_top-left slds-dynamic-menu" role="dialog" style="position:absolute;left:-0.5rem;top:48px">
            <div id="dialog-body-id-3" class="slds-popover__body slds-p-horizontal_none">
                <div class="slds-p-vertical_x-small slds-p-horizontal_small">
                    <h3 class="slds-dynamic-menu__header slds-m-bottom_x-small" role="presentation">
                        My Favorites
                    </h3>
                    <p>You can favorite any page!</p>
                </div>
            </div>
            <footer class="slds-popover__footer">
                <ul>
                    <li>
                        <button class="slds-button slds-button_reset slds-p-vertical_xx-small slds-size_1-of-1">
                            <svg class="slds-button__icon slds-button__icon_left" aria-hidden="true">
                                <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#add"/>
                            </svg>Favorite this page</button>
                    </li>
                    <li>
                        <button class="slds-button slds-button_reset slds-p-vertical_xx-small slds-size_1-of-1">
                            <svg class="slds-button__icon slds-button__icon_left" aria-hidden="true">
                                <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#edit"/>
                            </svg>Edit Favorites</button>
                    </li>
                </ul>
            </footer>
        </section>
    </div>
</template>

<script>
export default {
    name: "SldsDynamicMenu"
}
</script>

<style scoped>

</style>
