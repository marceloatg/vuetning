<template>
    <div>
        <!-- Context -->
        <div class="slds-context-bar slds-context-bar_tabs">
            <div class="slds-context-bar__primary">
                <div class="slds-context-bar__item slds-context-bar__dropdown-trigger slds-dropdown-trigger slds-dropdown-trigger_click slds-no-hover">
                    <div class="slds-context-bar__icon-action">
                        <button class="slds-button slds-icon-waffle_container slds-context-bar__button" title="Description of the icon when needed">
                            <span class="slds-icon-waffle">
                                <span class="slds-r1"/>
                                <span class="slds-r2"/>
                                <span class="slds-r3"/>
                                <span class="slds-r4"/>
                                <span class="slds-r5"/>
                                <span class="slds-r6"/>
                                <span class="slds-r7"/>
                                <span class="slds-r8"/>
                                <span class="slds-r9"/>
                            </span>
                            <span class="slds-assistive-text">Open App Launcher</span>
                        </button>
                    </div>
                    <span class="slds-context-bar__label-action slds-context-bar__app-name">
                        <span class="slds-truncate" title="App Name">App Name</span>
                    </span>
                </div>
                <div class="slds-context-bar__item slds-context-bar__object-switcher slds-context-bar__dropdown-trigger slds-dropdown-trigger slds-dropdown-trigger_click">
                    <a href="javascript:void(0);" class="slds-context-bar__label-action">
                        <span class="slds-truncate" title="Object">Object</span>
                    </a>
                    <div class="slds-context-bar__icon-action">
                        <button class="slds-button slds-button_icon slds-button_icon-container slds-button_icon-x-small" aria-haspopup="true" title="Open object switcher menu">
                            <svg class="slds-button__icon" aria-hidden="true">
                                <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#chevrondown"/>
                            </svg>
                            <span class="slds-assistive-text">Open object switcher menu</span>
                        </button>
                    </div>
                    <div class="slds-dropdown slds-dropdown_right">
                        <ul class="slds-dropdown__list" role="menu">
                            <li class="slds-dropdown__item" role="presentation">
                                <a href="javascript:void(0);" role="menuitem" tabindex="-1">
                                    <span class="slds-truncate" title="[object Object],Accounts">
                                        <svg class="slds-icon slds-icon_small slds-icon-standard-account slds-m-right_small" aria-hidden="true">
                                            <use xlink:href="/assets/icons/standard-sprite/svg/symbols.svg#account"/>
                                        </svg>
                                        Accounts</span>
                                </a>
                            </li>
                            <li class="slds-dropdown__item" role="presentation">
                                <a href="javascript:void(0);" role="menuitem" tabindex="-1">
                                    <span class="slds-truncate" title="[object Object],Cases">
                                        <svg class="slds-icon slds-icon_small slds-icon-standard-case slds-m-right_small" aria-hidden="true">
                                            <use xlink:href="/assets/icons/standard-sprite/svg/symbols.svg#case"/>
                                        </svg>
                                        Cases</span>
                                </a>
                            </li>
                            <li class="slds-dropdown__item" role="presentation">
                                <a href="javascript:void(0);" role="menuitem" tabindex="-1">
                                    <span class="slds-truncate" title="[object Object],Insights">
                                        <svg class="slds-icon slds-icon_small slds-icon-standard-work-order slds-m-right_small" aria-hidden="true">
                                            <use xlink:href="/assets/icons/standard-sprite/svg/symbols.svg#work_order"/>
                                        </svg>
                                        Insights</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="slds-context-bar__item slds-dropdown-trigger slds-dropdown-trigger_click">
                    <div class="slds-context-bar__icon-action">
                        <button class="slds-button slds-button_icon slds-button_icon-container slds-button_icon-small" title="Open a New Tab">
                            <svg class="slds-button__icon" aria-hidden="true">
                                <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#add"/>
                            </svg>
                            <span class="slds-assistive-text">Open a New Tab</span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="slds-context-bar__secondary">
                <div class="slds-context-bar__vertical-divider"/>
                <ul class="slds-grid" role="tablist">

                    <!-- Home -->
                    <li
                        class="slds-context-bar__item slds-context-bar__item_tab slds-is-active slds-has-sub-tabs"
                        role="presentation">

                        <a
                            id="context-tab-id-1"
                            href="javascript:void(0);"
                            class="slds-context-bar__label-action"
                            role="tab"
                            title="Home"
                            aria-selected="true"
                            tabindex="0"
                            aria-controls="context-tab-panel-1">
                            <span class="slds-indicator-container"/>
                            <span class="slds-icon_container" title="Home">
                                <svg class="slds-icon slds-icon_small slds-icon-text-default" aria-hidden="true">
                                    <use xlink:href="/assets/icons/standard-sprite/svg/symbols.svg#home"/>
                                </svg>
                                <span class="slds-assistive-text">Home</span>
                            </span>
                            <span class="slds-truncate" title="Home">Home</span>
                        </a>

                        <div class="slds-context-bar__icon-action slds-context-bar__dropdown-trigger slds-dropdown-trigger slds-dropdown-trigger_click slds-p-left_none slds-p-right_none">
                            <button
                                class="slds-button slds-button_icon slds-button_icon-current-color slds-button_icon-container slds-button_icon-x-small"
                                aria-haspopup="true"
                                tabindex="0"
                                title="Actions for Home">
                                <svg class="slds-button__icon" aria-hidden="true">
                                    <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#chevrondown"/>
                                </svg>
                                <span class="slds-assistive-text">Actions for Home</span>
                            </button>
                            <div class="slds-dropdown slds-dropdown_right">
                                <ul class="slds-dropdown__list" role="menu">
                                    <li class="slds-dropdown__item" role="presentation">
                                        <a href="javascript:void(0);" role="menuitem" tabindex="-1">
                                            <span class="slds-truncate" title="Refresh Tab">Refresh Tab</span>
                                            <span class="slds-text-body_small slds-text-color_weak slds-p-left_large">
                                                <span class="slds-assistive-text">:</span>r</span>
                                        </a>
                                    </li>
                                    <li class="slds-dropdown__item" role="presentation">
                                        <a href="javascript:void(0);" role="menuitem" tabindex="-1">
                                            <span class="slds-truncate" title="Open in a new window">Open in a new
                                                window</span>
                                            <span class="slds-text-body_small slds-text-color_weak slds-p-left_large">
                                                <span class="slds-assistive-text">:</span>⇧ + n</span>
                                        </a>
                                    </li>
                                    <li class="slds-dropdown__item" role="presentation">
                                        <a href="javascript:void(0);" role="menuitem" tabindex="-1">
                                            <span class="slds-truncate" title="Pin Tab">Pin Tab</span>
                                            <span class="slds-text-body_small slds-text-color_weak slds-p-left_large">
                                                <span class="slds-assistive-text">:</span>p</span>
                                        </a>
                                    </li>
                                    <li class="slds-dropdown__item" role="presentation">
                                        <a href="javascript:void(0);" role="menuitem" tabindex="-1">
                                            <span class="slds-truncate" title="Close Tab">Close Tab</span>
                                            <span class="slds-text-body_small slds-text-color_weak slds-p-left_large">
                                                <span class="slds-assistive-text">:</span>w</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div class="slds-context-bar__icon-action slds-col_bump-left slds-p-left_none">
                            <button class="slds-button slds-button_icon slds-button_icon-current-color slds-button_icon-container slds-button_icon-x-small" tabindex="0" title="Close Home">
                                <svg class="slds-button__icon" aria-hidden="true">
                                    <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#close"/>
                                </svg>
                                <span class="slds-assistive-text">Close Home</span>
                            </button>
                        </div>

                    </li>

                    <!-- Tab Item 1 -->
                    <li class="slds-context-bar__item slds-context-bar__item_tab" role="presentation">
                        <a
                            id="context-tab-id-2"
                            href="javascript:void(0);"
                            class="slds-context-bar__label-action"
                            role="tab"
                            title="Tab Item 1"
                            aria-selected="false"
                            tabindex="-1"
                            aria-controls="context-tab-panel-2">
                            <span class="slds-indicator-container"/>
                            <span class="slds-icon_container" title="Case">
                                <svg class="slds-icon slds-icon_small slds-icon-text-default" aria-hidden="true">
                                    <use xlink:href="/assets/icons/standard-sprite/svg/symbols.svg#case"/>
                                </svg>
                                <span class="slds-assistive-text">Case</span>
                            </span>
                            <span class="slds-truncate" title="Tab Item 1">Tab Item 1</span>
                        </a>
                        <div class="slds-context-bar__icon-action slds-context-bar__dropdown-trigger slds-dropdown-trigger slds-dropdown-trigger_click slds-p-left_none slds-p-right_none">
                            <button
                                class="slds-button slds-button_icon slds-button_icon-current-color slds-button_icon-container slds-button_icon-x-small"
                                aria-haspopup="true"
                                tabindex="-1"
                                title="Actions for Tab Item 1">
                                <svg class="slds-button__icon" aria-hidden="true">
                                    <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#chevrondown"/>
                                </svg>
                                <span class="slds-assistive-text">Actions for Tab Item 1</span>
                            </button>
                            <div class="slds-dropdown slds-dropdown_right">
                                <ul class="slds-dropdown__list" role="menu">
                                    <li class="slds-dropdown__item" role="presentation">
                                        <a href="javascript:void(0);" role="menuitem" tabindex="-1">
                                            <span class="slds-truncate" title="Refresh Tab">Refresh Tab</span>
                                            <span class="slds-text-body_small slds-text-color_weak slds-p-left_large">
                                                <span class="slds-assistive-text">:</span>r</span>
                                        </a>
                                    </li>
                                    <li class="slds-dropdown__item" role="presentation">
                                        <a href="javascript:void(0);" role="menuitem" tabindex="-1">
                                            <span class="slds-truncate" title="Open in a new window">Open in a new
                                                window</span>
                                            <span class="slds-text-body_small slds-text-color_weak slds-p-left_large">
                                                <span class="slds-assistive-text">:</span>⇧ + n</span>
                                        </a>
                                    </li>
                                    <li class="slds-dropdown__item" role="presentation">
                                        <a href="javascript:void(0);" role="menuitem" tabindex="-1">
                                            <span class="slds-truncate" title="Pin Tab">Pin Tab</span>
                                            <span class="slds-text-body_small slds-text-color_weak slds-p-left_large">
                                                <span class="slds-assistive-text">:</span>p</span>
                                        </a>
                                    </li>
                                    <li class="slds-dropdown__item" role="presentation">
                                        <a href="javascript:void(0);" role="menuitem" tabindex="-1">
                                            <span class="slds-truncate" title="Close Tab">Close Tab</span>
                                            <span class="slds-text-body_small slds-text-color_weak slds-p-left_large">
                                                <span class="slds-assistive-text">:</span>w</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="slds-context-bar__icon-action slds-col_bump-left slds-p-left_none">
                            <button class="slds-button slds-button_icon slds-button_icon-current-color slds-button_icon-container slds-button_icon-x-small" tabindex="-1" title="Close Tab Item 1">
                                <svg class="slds-button__icon" aria-hidden="true">
                                    <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#close"/>
                                </svg>
                                <span class="slds-assistive-text">Close Tab Item 1</span>
                            </button>
                        </div>
                    </li>

                    <!-- Tab Item 2 -->
                    <li class="slds-context-bar__item slds-context-bar__item_tab" role="presentation">
                        <a
                            id="context-tab-id-3"
                            href="javascript:void(0);"
                            class="slds-context-bar__label-action"
                            role="tab"
                            title="Tab Item 2"
                            aria-selected="false"
                            tabindex="-1"
                            aria-controls="context-tab-panel-3">
                            <span class="slds-indicator-container"/>
                            <span class="slds-icon_container" title="Case">
                                <svg class="slds-icon slds-icon_small slds-icon-text-default" aria-hidden="true">
                                    <use xlink:href="/assets/icons/standard-sprite/svg/symbols.svg#case"/>
                                </svg>
                                <span class="slds-assistive-text">Case</span>
                            </span>
                            <span class="slds-truncate" title="Tab Item 2">Tab Item 2</span>
                        </a>
                        <div class="slds-context-bar__icon-action slds-context-bar__dropdown-trigger slds-dropdown-trigger slds-dropdown-trigger_click slds-p-left_none slds-p-right_none">
                            <button
                                class="slds-button slds-button_icon slds-button_icon-current-color slds-button_icon-container slds-button_icon-x-small"
                                aria-haspopup="true"
                                tabindex="-1"
                                title="Actions for Tab Item 2">
                                <svg class="slds-button__icon" aria-hidden="true">
                                    <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#chevrondown"/>
                                </svg>
                                <span class="slds-assistive-text">Actions for Tab Item 2</span>
                            </button>
                            <div class="slds-dropdown slds-dropdown_right">
                                <ul class="slds-dropdown__list" role="menu">
                                    <li class="slds-dropdown__item" role="presentation">
                                        <a href="javascript:void(0);" role="menuitem" tabindex="-1">
                                            <span class="slds-truncate" title="Refresh Tab">Refresh Tab</span>
                                            <span class="slds-text-body_small slds-text-color_weak slds-p-left_large">
                                                <span class="slds-assistive-text">:</span>r</span>
                                        </a>
                                    </li>
                                    <li class="slds-dropdown__item" role="presentation">
                                        <a href="javascript:void(0);" role="menuitem" tabindex="-1">
                                            <span class="slds-truncate" title="Open in a new window">Open in a new
                                                window</span>
                                            <span class="slds-text-body_small slds-text-color_weak slds-p-left_large">
                                                <span class="slds-assistive-text">:</span>⇧ + n</span>
                                        </a>
                                    </li>
                                    <li class="slds-dropdown__item" role="presentation">
                                        <a href="javascript:void(0);" role="menuitem" tabindex="-1">
                                            <span class="slds-truncate" title="Pin Tab">Pin Tab</span>
                                            <span class="slds-text-body_small slds-text-color_weak slds-p-left_large">
                                                <span class="slds-assistive-text">:</span>p</span>
                                        </a>
                                    </li>
                                    <li class="slds-dropdown__item" role="presentation">
                                        <a href="javascript:void(0);" role="menuitem" tabindex="-1">
                                            <span class="slds-truncate" title="Close Tab">Close Tab</span>
                                            <span class="slds-text-body_small slds-text-color_weak slds-p-left_large">
                                                <span class="slds-assistive-text">:</span>w</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="slds-context-bar__icon-action slds-col_bump-left slds-p-left_none">
                            <button class="slds-button slds-button_icon slds-button_icon-current-color slds-button_icon-container slds-button_icon-x-small" tabindex="-1" title="Close Tab Item 2">
                                <svg class="slds-button__icon" aria-hidden="true">
                                    <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#close"/>
                                </svg>
                                <span class="slds-assistive-text">Close Tab Item 2</span>
                            </button>
                        </div>
                    </li>

                </ul>
            </div>
        </div>

        <!-- Sub Tabs -->
        <div
            id="context-tab-panel-1"
            class="slds-show"
            role="tabpanel"
            aria-labelledby="context-tab-id-1">
            <div class="slds-tabs_default slds-sub-tabs">
                <ul class="slds-tabs_default__nav" role="tablist">

                    <li class="slds-tabs_default__item slds-sub-tabs__item slds-grid slds-grid_vertical-align-center slds-active" role="presentation">
                        <a
                            id="subtab-tabitem-01"
                            aria-controls="subtab-tabpanel-01"
                            aria-selected="true"
                            class="slds-tabs_default__link slds-p-horizontal_xx-small"
                            href="javascript:void(0);"
                            role="tab"
                            tabindex="0"
                            title="00071938">
                            <span class="slds-indicator-container"/>
                            <span class="slds-icon_container" title="Case">
                                <svg class="slds-icon slds-icon_small slds-icon-text-default" aria-hidden="true">
                                    <use xlink:href="/assets/icons/standard-sprite/svg/symbols.svg#case"/>
                                </svg>
                                <span class="slds-assistive-text">Case</span>
                            </span>
                            <span class="slds-truncate" title="00071938">00071938</span>
                        </a>
                        <div class="slds-col_bump-left slds-p-left_none slds-p-right_none">
                            <button class="slds-button slds-button_icon slds-button_icon-container slds-button_icon-x-small" tabindex="0" title="Close 00071938">
                                <svg class="slds-button__icon" aria-hidden="true">
                                    <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#close"/>
                                </svg>
                                <span class="slds-assistive-text">Close 00071938</span>
                            </button>
                        </div>
                    </li>

                    <li class="slds-tabs_default__item slds-sub-tabs__item slds-grid slds-grid_vertical-align-center" role="presentation">
                        <a
                            id="subtab-tabitem-02"
                            aria-controls="subtab-tabpanel-02"
                            aria-selected="false"
                            class="slds-tabs_default__link slds-p-horizontal_xx-small"
                            href="javascript:void(0);"
                            role="tab"
                            tabindex="-1"
                            title="Chat - Customer">
                            <span class="slds-indicator-container"/>
                            <span class="slds-icon_container" title="Live Chat">
                                <svg class="slds-icon slds-icon_small slds-icon-text-default" aria-hidden="true">
                                    <use xlink:href="/assets/icons/standard-sprite/svg/symbols.svg#live_chat"/>
                                </svg>
                                <span class="slds-assistive-text">Live Chat</span>
                            </span>
                            <span class="slds-truncate" title="Chat - Customer">Chat - Customer</span>
                        </a>
                        <div class="slds-col_bump-left slds-p-left_none slds-p-right_none">
                            <button class="slds-button slds-button_icon slds-button_icon-container slds-button_icon-x-small" tabindex="-1" title="Close Chat - Customer">
                                <svg class="slds-button__icon" aria-hidden="true">
                                    <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#close"/>
                                </svg>
                                <span class="slds-assistive-text">Close Chat - Customer</span>
                            </button>
                        </div>
                    </li>

                </ul>
            </div>

        </div>
    </div>
</template>
