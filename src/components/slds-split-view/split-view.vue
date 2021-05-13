<template>
    <div style="display:flex;width:20rem;height:37.5rem">
        <div class="slds-split-view_container slds-is-open">
            <button class="slds-button slds-button_icon slds-button_icon slds-split-view__toggle-button slds-is-open" aria-controls="split-view-id" aria-expanded="true" title="Close Split View">
                <svg class="slds-button__icon slds-button__icon_x-small" aria-hidden="true">
                    <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#left"/>
                </svg>
                <span class="slds-assistive-text">Close Split View</span>
            </button>
            <article id="split-view-id" aria-hidden="false" class="slds-split-view slds-grid slds-grid_vertical slds-grow">
                <header class="slds-split-view__header">
                    <div class="slds-grid slds-grid_vertical-align-center slds-m-bottom_xx-small">
                        <div class="slds-has-flexi-truncate">
                            <div class="slds-media slds-media_center">
                                <div class="slds-media__figure">
                                    <div class="slds-icon_container slds-icon-standard-lead">
                                        <svg class="slds-icon" aria-hidden="true">
                                            <use xlink:href="/assets/icons/standard-sprite/svg/symbols.svg#lead"/>
                                        </svg>
                                        <span class="slds-assistive-text">Leads</span>
                                    </div>
                                </div>
                                <div class="slds-media__body">
                                    <h1 class="slds-text-heading_small slds-text-color_default slds-p-right_x-small">
                                        <button class="slds-button slds-button_reset slds-type-focus slds-truncate" aria-haspopup="true" title="">
                                            <span class="slds-grid slds-has-flexi-truncate slds-grid_vertical-align-center">
                                                <span class="slds-truncate" title="My Leads">My Leads</span>
                                                <svg class="slds-button__icon slds-button__icon_right slds-no-flex" aria-hidden="true">
                                                    <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#down"/>
                                                </svg>
                                            </span>
                                        </button>
                                    </h1>
                                </div>
                            </div>
                        </div>
                        <div class="slds-no-flex slds-grid">
                            <button class="slds-button slds-button_icon slds-button_icon-border-filled" aria-haspopup="true" title="More Actions">
                                <svg class="slds-button__icon" aria-hidden="true">
                                    <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#down"/>
                                </svg>
                                <span class="slds-assistive-text">More Actions</span>
                            </button>
                        </div>
                    </div>
                    <div class="slds-grid slds-grid_vertical-align-center">
                        <p class="slds-text-body_small slds-text-color_weak">
                            42 items • Updated just now
                        </p>
                        <div class="slds-no-flex slds-grid slds-col_bump-left">
                            <div class="slds-button-group">
                                <button class="slds-button slds-button_icon slds-button_icon slds-button_icon-container-more" aria-haspopup="true" title="Display As Split View">
                                    <svg class="slds-button__icon" aria-hidden="true">
                                        <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#side_list"/>
                                    </svg>
                                    <svg class="slds-button__icon slds-button__icon_x-small" aria-hidden="true">
                                        <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#down"/>
                                    </svg>
                                    <span class="slds-assistive-text">Display As Split View</span>
                                </button>
                            </div>
                            <div class="slds-button-group">
                                <button class="slds-button slds-button_icon slds-button_icon slds-button_icon-container" title="Refresh List">
                                    <svg class="slds-button__icon" aria-hidden="true">
                                        <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#refresh"/>
                                    </svg>
                                    <span class="slds-assistive-text">Refresh List</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </header>
                <div class="slds-grid slds-grid_vertical">
                    <div class="slds-split-view__list-header slds-grid">
                        <span class="slds-assistive-text">Sorted by:</span>
                        <span>Lead Score
                            <svg class="slds-icon slds-icon_xx-small slds-icon-text-default slds-align-top" aria-hidden="true">
                                <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#arrowdown"/>
                            </svg>
                        </span>
                        <span class="slds-assistive-text">- Descending</span>
                    </div>
                    <ul aria-multiselectable="true" class="slds-scrollable_y" role="listbox" aria-label="Select an item to open it in a new workspace tab.">
                        <li class="slds-split-view__list-item" role="presentation">
                            <a href="javascript:void(0);" aria-selected="false" role="option" class="slds-split-view__list-item-action slds-grow slds-has-flexi-truncate" tabindex="0">
                                <div class="slds-grid slds-wrap">
                                    <span class="slds-truncate slds-text-body_regular slds-text-color_default" title="Riley Shultz">Riley
                                        Shultz</span>
                                    <span class="slds-truncate slds-col_bump-left" title="99">99</span>
                                </div>
                                <div class="slds-grid slds-wrap">
                                    <span class="slds-truncate" title="Biotech, Inc.">Biotech, Inc.</span>
                                    <span class="slds-truncate slds-col_bump-left" title="Nurturing">Nurturing</span>
                                </div>
                            </a>
                        </li>
                        <li class="slds-split-view__list-item" role="presentation">
                            <a href="javascript:void(0);" aria-selected="false" role="option" class="slds-split-view__list-item-action slds-grow slds-has-flexi-truncate" tabindex="-1">
                                <div class="slds-grid slds-wrap">
                                    <span class="slds-truncate slds-text-body_regular slds-text-color_default" title="Jason A. - VP of Sales">Jason
                                        A. - VP of Sales</span>
                                    <span class="slds-truncate slds-col_bump-left" title="92">92</span>
                                </div>
                                <div class="slds-grid slds-wrap">
                                    <span class="slds-truncate" title="Case Management Solutions">Case Management
                                        Solutions</span>
                                    <span class="slds-truncate slds-col_bump-left" title="Contacted">Contacted</span>
                                </div>
                            </a>
                        </li>
                        <li class="slds-split-view__list-item" role="presentation">
                            <a href="javascript:void(0);" aria-selected="false" role="option" class="slds-split-view__list-item-action slds-grow slds-has-flexi-truncate" tabindex="-1">
                                <div class="slds-grid slds-wrap">
                                    <span class="slds-truncate slds-text-body_regular slds-text-color_default" title="Josh Smith">Josh
                                        Smith</span>
                                    <span class="slds-truncate slds-col_bump-left" title="90">90</span>
                                </div>
                                <div class="slds-grid slds-wrap">
                                    <span class="slds-truncate" title="Acme, Inc.">Acme, Inc.</span>
                                    <span class="slds-truncate slds-col_bump-left" title="Contacted">Contacted</span>
                                </div>
                            </a>
                        </li>
                        <li class="slds-split-view__list-item" role="presentation">
                            <a href="javascript:void(0);" aria-selected="false" role="option" class="slds-split-view__list-item-action slds-grow slds-has-flexi-truncate" tabindex="-1">
                                <div class="slds-grid slds-wrap">
                                    <span class="slds-truncate slds-text-body_regular slds-text-color_default" title="Bobby Tree">Bobby
                                        Tree</span>
                                    <span class="slds-truncate slds-col_bump-left" title="89">89</span>
                                </div>
                                <div class="slds-grid slds-wrap">
                                    <span class="slds-truncate" title="Salesforce, Inc.">Salesforce, Inc.</span>
                                    <span class="slds-truncate slds-col_bump-left" title="Closing">Closing</span>
                                </div>
                            </a>
                        </li>
                        <li class="slds-split-view__list-item" role="presentation">
                            <a href="javascript:void(0);" aria-selected="false" role="option" class="slds-split-view__list-item-action slds-grow slds-has-flexi-truncate" tabindex="-1">
                                <div class="slds-grid slds-wrap">
                                    <span class="slds-truncate slds-text-body_regular slds-text-color_default" title="Riley Shultz">Riley
                                        Shultz</span>
                                    <span class="slds-truncate slds-col_bump-left" title="74">74</span>
                                </div>
                                <div class="slds-grid slds-wrap">
                                    <span class="slds-truncate" title="Tesla">Tesla</span>
                                    <span class="slds-truncate slds-col_bump-left" title="Contacted">Contacted</span>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </article>
        </div>
    </div>
</template>

<script>
export default {
    name: "SldsSplitView"
}
</script>

<style scoped>

</style>
