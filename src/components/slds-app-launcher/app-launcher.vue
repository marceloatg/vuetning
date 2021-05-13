<template>
    <section
        role="dialog"
        tabindex="-1"
        class="slds-modal slds-fade-in-open slds-modal_large slds-app-launcher"
        aria-labelledby="header43"
        aria-modal="true"
        aria-describedby="modal-content-id-1">
        <div class="slds-modal__container">
            <header class="slds-modal__header slds-grid slds-grid_align-spread slds-grid_vertical-align-center">
                <button class="slds-button slds-button_icon slds-modal__close slds-button_icon-inverse" title="Close">
                    <svg class="slds-button__icon slds-button__icon_large" aria-hidden="true">
                        <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#close"/>
                    </svg>
                    <span class="slds-assistive-text">Close</span>
                </button>
                <h2 id="header43" class="slds-text-heading_medium">
                    App launcher
                </h2>
                <div class="slds-app-launcher__header-search">
                    <div class="slds-form-element">
                        <label for="app-launcher-search" class="slds-form-element__label slds-assistive-text">
                            Find an app
                        </label>
                        <div class="slds-form-element__control slds-input-has-icon slds-input-has-icon_left">
                            <svg class="slds-input__icon" aria-hidden="true">
                                <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#search"/>
                            </svg>
                            <input id="app-launcher-search" type="search" class="slds-input" placeholder="Find an app">
                        </div>
                    </div>
                </div>
                <button class="slds-button slds-button_neutral">
                    App Exchange
                </button>
            </header>
            <div id="modal-content-id-1" class="slds-modal__content slds-app-launcher__content slds-p-around_medium">
                <div class="slds-section slds-is-open">
                    <h3 class="slds-section__title">
                        <button aria-controls="appsContent" aria-expanded="true" class="slds-button slds-section__title-action">
                            <svg class="slds-section__title-action-icon slds-button__icon slds-button__icon_left" aria-hidden="true">
                                <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#switch"/>
                            </svg>
                            <span class="slds-truncate" title="All Apps">All Apps</span>
                        </button>
                    </h3>
                    <div id="appsContent" aria-hidden="false" class="slds-section__content">
                        <div id="drag-live-region" class="slds-assistive-text" aria-live="assertive"/>
                        <ul class="slds-grid slds-grid_pull-padded slds-wrap">
                            <li class="slds-p-horizontal_small slds-size_1-of-1 slds-medium-size_1-of-3">
                                <div draggable="true" class="slds-app-launcher__tile slds-text-link_reset slds-is-draggable">
                                    <div class="slds-app-launcher__tile-figure">
                                        <span class="slds-avatar slds-avatar_large">
                                            <abbr class="slds-avatar__initials slds-icon-custom-27" title="Sales Cloud">SC</abbr>
                                        </span>
                                        <div class="slds-m-top_xxx-small">
                                            <button class="slds-button slds-button_icon" aria-pressed="false" title="Reorder">
                                                <svg class="slds-button__icon" aria-hidden="true">
                                                    <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#rows"/>
                                                </svg>
                                                <span class="slds-assistive-text">Reorder</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="slds-app-launcher__tile-body">
                                        <a href="javascript:void(0);">
                                            Sales Cloud
                                        </a>
                                        <p>The primary internal Salesforce org. Used to run our online sales business...
                                            <button aria-describedby="help-0" class="slds-button slds-button_reset slds-text-link">
                                                More
                                            </button>
                                        </p>
                                        <div id="help-0" class="slds-popover slds-popover_tooltip slds-nubbin_top slds-hide" role="tooltip" style="position:absolute;top:100px;left:165px">
                                            <div class="slds-popover__body"/>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li class="slds-p-horizontal_small slds-size_1-of-1 slds-medium-size_1-of-3">
                                <div draggable="true" class="slds-app-launcher__tile slds-text-link_reset slds-is-draggable">
                                    <div class="slds-app-launcher__tile-figure">
                                        <span class="slds-avatar slds-avatar_large">
                                            <abbr class="slds-avatar__initials slds-icon-custom-59" title="Marketing Cloud">MC</abbr>
                                        </span>
                                        <div class="slds-m-top_xxx-small">
                                            <button class="slds-button slds-button_icon" aria-pressed="false" title="Reorder">
                                                <svg class="slds-button__icon" aria-hidden="true">
                                                    <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#rows"/>
                                                </svg>
                                                <span class="slds-assistive-text">Reorder</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="slds-app-launcher__tile-body">
                                        <a href="javascript:void(0);">
                                            Marketing Cloud
                                        </a>
                                        <p>Salesforce Marketing Cloud lets businesses of any size...
                                            <button aria-describedby="help-1" class="slds-button slds-button_reset slds-text-link">
                                                More
                                            </button>
                                        </p>
                                        <div id="help-1" class="slds-popover slds-popover_tooltip slds-nubbin_top slds-hide" role="tooltip" style="position:absolute;top:100px;left:165px">
                                            <div class="slds-popover__body"/>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li class="slds-p-horizontal_small slds-size_1-of-1 slds-medium-size_1-of-3">
                                <div draggable="true" class="slds-app-launcher__tile slds-text-link_reset slds-is-draggable">
                                    <div class="slds-app-launcher__tile-figure">
                                        <span class="slds-avatar slds-avatar_large">
                                            <abbr class="slds-avatar__initials slds-icon-custom-10" title="HR Concierge">HR</abbr>
                                        </span>
                                        <div class="slds-m-top_xxx-small">
                                            <button class="slds-button slds-button_icon" aria-pressed="false" title="Reorder">
                                                <svg class="slds-button__icon" aria-hidden="true">
                                                    <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#rows"/>
                                                </svg>
                                                <span class="slds-assistive-text">Reorder</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="slds-app-launcher__tile-body">
                                        <a href="javascript:void(0);">
                                            HR Concierge
                                        </a>
                                        <p>Community for managing employee benefits and time off. </p>
                                        <div id="help-2" class="slds-popover slds-popover_tooltip slds-nubbin_top slds-hide" role="tooltip" style="position:absolute;top:100px;left:165px">
                                            <div class="slds-popover__body"/>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li class="slds-p-horizontal_small slds-size_1-of-1 slds-medium-size_1-of-3">
                                <div draggable="true" class="slds-app-launcher__tile slds-text-link_reset slds-is-draggable">
                                    <div class="slds-app-launcher__tile-figure">
                                        <span class="slds-avatar slds-avatar_large">
                                            <abbr class="slds-avatar__initials slds-icon-custom-6" title="My Money">MM</abbr>
                                        </span>
                                        <div class="slds-m-top_xxx-small">
                                            <button class="slds-button slds-button_icon" aria-pressed="false" title="Reorder">
                                                <svg class="slds-button__icon" aria-hidden="true">
                                                    <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#rows"/>
                                                </svg>
                                                <span class="slds-assistive-text">Reorder</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="slds-app-launcher__tile-body">
                                        <a href="javascript:void(0);">
                                            My Money
                                        </a>
                                        <p>Manage your finances across multiple financial platforms...
                                            <button aria-describedby="help-3" class="slds-button slds-button_reset slds-text-link">
                                                More
                                            </button>
                                        </p>
                                        <div id="help-3" class="slds-popover slds-popover_tooltip slds-nubbin_top slds-hide" role="tooltip" style="position:absolute;top:100px;left:165px">
                                            <div class="slds-popover__body"/>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li class="slds-p-horizontal_small slds-size_1-of-1 slds-medium-size_1-of-3">
                                <div draggable="true" class="slds-app-launcher__tile slds-text-link_reset slds-is-draggable">
                                    <div class="slds-app-launcher__tile-figure">
                                        <span class="slds-avatar slds-avatar_large">
                                            <abbr class="slds-avatar__initials slds-icon-custom-91" title="Call Center">CC</abbr>
                                        </span>
                                        <div class="slds-m-top_xxx-small">
                                            <button class="slds-button slds-button_icon" aria-pressed="false" title="Reorder">
                                                <svg class="slds-button__icon" aria-hidden="true">
                                                    <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#rows"/>
                                                </svg>
                                                <span class="slds-assistive-text">Reorder</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="slds-app-launcher__tile-body">
                                        <a href="javascript:void(0);">
                                            Call Center
                                        </a>
                                        <p>The key to call center and contact center management is more...
                                            <button aria-describedby="help-4" class="slds-button slds-button_reset slds-text-link">
                                                More
                                            </button>
                                        </p>
                                        <div id="help-4" class="slds-popover slds-popover_tooltip slds-nubbin_top slds-hide" role="tooltip" style="position:absolute;top:100px;left:165px">
                                            <div class="slds-popover__body"/>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li class="slds-p-horizontal_small slds-size_1-of-1 slds-medium-size_1-of-3">
                                <div draggable="true" class="slds-app-launcher__tile slds-text-link_reset slds-is-draggable">
                                    <div class="slds-app-launcher__tile-figure">
                                        <span class="slds-avatar slds-avatar_large">
                                            <abbr class="slds-avatar__initials slds-icon-custom-50" title="Customer Support Community">CS</abbr>
                                        </span>
                                        <div class="slds-m-top_xxx-small">
                                            <button class="slds-button slds-button_icon" aria-pressed="false" title="Reorder">
                                                <svg class="slds-button__icon" aria-hidden="true">
                                                    <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#rows"/>
                                                </svg>
                                                <span class="slds-assistive-text">Reorder</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="slds-app-launcher__tile-body">
                                        <a href="javascript:void(0);">
                                            Customer Support Community
                                        </a>
                                        <p>Areas of Focus are used to track customer support for your...
                                            <button aria-describedby="help-5" class="slds-button slds-button_reset slds-text-link">
                                                More
                                            </button>
                                        </p>
                                        <div id="help-5" class="slds-popover slds-popover_tooltip slds-nubbin_top slds-hide" role="tooltip" style="position:absolute;top:100px;left:165px">
                                            <div class="slds-popover__body"/>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <hr>
                <div class="slds-section slds-is-open">
                    <h3 class="slds-section__title">
                        <button aria-controls="itemsContent" aria-expanded="true" class="slds-button slds-section__title-action">
                            <svg class="slds-section__title-action-icon slds-button__icon slds-button__icon_left" aria-hidden="true">
                                <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#switch"/>
                            </svg>
                            <span class="slds-truncate" title="All Items">All Items</span>
                        </button>
                    </h3>
                    <div id="itemsContent" aria-hidden="false" class="slds-section__content">
                        <ul class="slds-grid slds-wrap">
                            <li class="slds-col_padded slds-p-vertical_xx-small slds-size_1-of-5">
                                <a href="javascript:void(0);" class="slds-truncate" title="Accounts">
                                    Accounts
                                </a>
                            </li>
                            <li class="slds-col_padded slds-p-vertical_xx-small slds-size_1-of-5">
                                <a href="javascript:void(0);" class="slds-truncate" title="Announcements">
                                    Announcements
                                </a>
                            </li>
                            <li class="slds-col_padded slds-p-vertical_xx-small slds-size_1-of-5">
                                <a href="javascript:void(0);" class="slds-truncate" title="Approvals">
                                    Approvals
                                </a>
                            </li>
                            <li class="slds-col_padded slds-p-vertical_xx-small slds-size_1-of-5">
                                <a href="javascript:void(0);" class="slds-truncate" title="Campaigns">
                                    Campaigns
                                </a>
                            </li>
                            <li class="slds-col_padded slds-p-vertical_xx-small slds-size_1-of-5">
                                <a href="javascript:void(0);" class="slds-truncate" title="Cases">
                                    Cases
                                </a>
                            </li>
                            <li class="slds-col_padded slds-p-vertical_xx-small slds-size_1-of-5">
                                <a href="javascript:void(0);" class="slds-truncate" title="Coaching">
                                    Coaching
                                </a>
                            </li>
                            <li class="slds-col_padded slds-p-vertical_xx-small slds-size_1-of-5">
                                <a href="javascript:void(0);" class="slds-truncate" title="Contacts">
                                    Contacts
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <div class="slds-backdrop slds-backdrop_open"/>
</template>

<script>
export default {
    name: "SldsAppLauncher"
}
</script>

<style scoped>

</style>
