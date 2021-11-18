<template>
    <table aria-multiselectable="true" class="slds-table slds-table_bordered slds-table_edit slds-table_fixed-layout slds-table_resizable-cols slds-tree slds-table_tree" role="treegrid">
        <thead>
            <tr class="slds-line-height_reset">
                <th class="slds-text-align_right" scope="col" style="width:3.25rem">
                    <span id="column-group-header" class="slds-assistive-text">Choose a row</span>
                    <div class="slds-th__action slds-th__action_form">
                        <div class="slds-checkbox">
                            <input
                                id="checkbox-unique-id-11"
                                type="checkbox"
                                name="options"
                                value="checkbox-unique-id-11"
                                tabindex="-1"
                                aria-labelledby="check-select-all-label column-group-header">
                            <label id="check-select-all-label" class="slds-checkbox__label" for="checkbox-unique-id-11">
                                <span class="slds-checkbox_faux"/>
                                <span class="slds-form-element__label slds-assistive-text">Select All</span>
                            </label>
                        </div>
                    </div>
                </th>
                <th aria-label="Account Name" aria-sort="none" class="slds-has-button-menu slds-is-resizable slds-is-sortable" scope="col">
                    <a class="slds-th__action slds-text-link_reset" href="javascript:void(0);" role="button" tabindex="-1">
                        <span class="slds-assistive-text">Sort by: </span>
                        <div class="slds-grid slds-grid_vertical-align-center slds-has-flexi-truncate">
                            <span class="slds-truncate" title="Account Name">Account Name</span>
                            <span class="slds-icon_container slds-icon-utility-arrowdown">
                                <svg class="slds-icon slds-icon-text-default slds-is-sortable__icon " aria-hidden="true">
                                    <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#arrowdown"/>
                                </svg>
                            </span>
                        </div>
                    </a>
                    <button class="slds-button slds-button_icon slds-th__action-button slds-button_icon-x-small" aria-haspopup="true" tabindex="-1" title="Show Account Name column actions">
                        <svg class="slds-button__icon slds-button__icon_hint slds-button__icon_small" aria-hidden="true">
                            <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#chevrondown"/>
                        </svg>
                        <span class="slds-assistive-text">Show Account Name column actions</span>
                    </button>
                    <div class="slds-resizable">
                        <input
                            id="cell-resize-handle-11"
                            type="range"
                            aria-label="Account Name column width"
                            class="slds-resizable__input slds-assistive-text"
                            max="1000"
                            min="20"
                            tabindex="-1">
                        <span class="slds-resizable__handle">
                            <span class="slds-resizable__divider"/>
                        </span>
                    </div>
                </th>
                <th aria-label="Employees" aria-sort="none" class="slds-has-button-menu slds-is-resizable slds-is-sortable" scope="col">
                    <a class="slds-th__action slds-text-link_reset" href="javascript:void(0);" role="button" tabindex="-1">
                        <span class="slds-assistive-text">Sort by: </span>
                        <div class="slds-grid slds-grid_vertical-align-center slds-has-flexi-truncate">
                            <span class="slds-truncate" title="Employees">Employees</span>
                            <span class="slds-icon_container slds-icon-utility-arrowdown">
                                <svg class="slds-icon slds-icon-text-default slds-is-sortable__icon " aria-hidden="true">
                                    <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#arrowdown"/>
                                </svg>
                            </span>
                        </div>
                    </a>
                    <button class="slds-button slds-button_icon slds-th__action-button slds-button_icon-x-small" aria-haspopup="true" tabindex="-1" title="Show Employees column actions">
                        <svg class="slds-button__icon slds-button__icon_hint slds-button__icon_small" aria-hidden="true">
                            <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#chevrondown"/>
                        </svg>
                        <span class="slds-assistive-text">Show Employees column actions</span>
                    </button>
                    <div class="slds-resizable">
                        <input
                            id="cell-resize-handle-12"
                            type="range"
                            aria-label="Employees column width"
                            class="slds-resizable__input slds-assistive-text"
                            max="1000"
                            min="20"
                            tabindex="-1">
                        <span class="slds-resizable__handle">
                            <span class="slds-resizable__divider"/>
                        </span>
                    </div>
                </th>
                <th aria-label="Phone Number" aria-sort="none" class="slds-has-button-menu slds-is-resizable slds-is-sortable" scope="col">
                    <a class="slds-th__action slds-text-link_reset" href="javascript:void(0);" role="button" tabindex="-1">
                        <span class="slds-assistive-text">Sort by: </span>
                        <div class="slds-grid slds-grid_vertical-align-center slds-has-flexi-truncate">
                            <span class="slds-truncate" title="Phone Number">Phone Number</span>
                            <span class="slds-icon_container slds-icon-utility-arrowdown">
                                <svg class="slds-icon slds-icon-text-default slds-is-sortable__icon " aria-hidden="true">
                                    <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#arrowdown"/>
                                </svg>
                            </span>
                        </div>
                    </a>
                    <button class="slds-button slds-button_icon slds-th__action-button slds-button_icon-x-small" aria-haspopup="true" tabindex="-1" title="Show Phone Number column actions">
                        <svg class="slds-button__icon slds-button__icon_hint slds-button__icon_small" aria-hidden="true">
                            <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#chevrondown"/>
                        </svg>
                        <span class="slds-assistive-text">Show Phone Number column actions</span>
                    </button>
                    <div class="slds-resizable">
                        <input
                            id="cell-resize-handle-13"
                            type="range"
                            aria-label="Phone Number column width"
                            class="slds-resizable__input slds-assistive-text"
                            max="1000"
                            min="20"
                            tabindex="-1">
                        <span class="slds-resizable__handle">
                            <span class="slds-resizable__divider"/>
                        </span>
                    </div>
                </th>
                <th aria-label="Account Owner" aria-sort="none" class="slds-has-button-menu slds-is-resizable slds-is-sortable" scope="col">
                    <a class="slds-th__action slds-text-link_reset" href="javascript:void(0);" role="button" tabindex="-1">
                        <span class="slds-assistive-text">Sort by: </span>
                        <div class="slds-grid slds-grid_vertical-align-center slds-has-flexi-truncate">
                            <span class="slds-truncate" title="Account Owner">Account Owner</span>
                            <span class="slds-icon_container slds-icon-utility-arrowdown">
                                <svg class="slds-icon slds-icon-text-default slds-is-sortable__icon " aria-hidden="true">
                                    <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#arrowdown"/>
                                </svg>
                            </span>
                        </div>
                    </a>
                    <button class="slds-button slds-button_icon slds-th__action-button slds-button_icon-x-small" aria-haspopup="true" tabindex="-1" title="Show Account Owner column actions">
                        <svg class="slds-button__icon slds-button__icon_hint slds-button__icon_small" aria-hidden="true">
                            <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#chevrondown"/>
                        </svg>
                        <span class="slds-assistive-text">Show Account Owner column actions</span>
                    </button>
                    <div class="slds-resizable">
                        <input
                            id="cell-resize-handle-14"
                            type="range"
                            aria-label="Account Owner column width"
                            class="slds-resizable__input slds-assistive-text"
                            max="1000"
                            min="20"
                            tabindex="-1">
                        <span class="slds-resizable__handle">
                            <span class="slds-resizable__divider"/>
                        </span>
                    </div>
                </th>
                <th aria-label="Billing City" aria-sort="none" class="slds-has-button-menu slds-is-resizable slds-is-sortable" scope="col">
                    <a class="slds-th__action slds-text-link_reset" href="javascript:void(0);" role="button" tabindex="-1">
                        <span class="slds-assistive-text">Sort by: </span>
                        <div class="slds-grid slds-grid_vertical-align-center slds-has-flexi-truncate">
                            <span class="slds-truncate" title="Billing City">Billing City</span>
                            <span class="slds-icon_container slds-icon-utility-arrowdown">
                                <svg class="slds-icon slds-icon-text-default slds-is-sortable__icon " aria-hidden="true">
                                    <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#arrowdown"/>
                                </svg>
                            </span>
                        </div>
                    </a>
                    <button class="slds-button slds-button_icon slds-th__action-button slds-button_icon-x-small" aria-haspopup="true" tabindex="-1" title="Show Billing City column actions">
                        <svg class="slds-button__icon slds-button__icon_hint slds-button__icon_small" aria-hidden="true">
                            <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#chevrondown"/>
                        </svg>
                        <span class="slds-assistive-text">Show Billing City column actions</span>
                    </button>
                    <div class="slds-resizable">
                        <input
                            id="cell-resize-handle-15"
                            type="range"
                            aria-label="Billing City column width"
                            class="slds-resizable__input slds-assistive-text"
                            max="1000"
                            min="20"
                            tabindex="-1">
                        <span class="slds-resizable__handle">
                            <span class="slds-resizable__divider"/>
                        </span>
                    </div>
                </th>
                <th class="" scope="col" style="width:3.25rem">
                    <div class="slds-truncate slds-assistive-text" title="Actions">
                        Actions
                    </div>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr
                aria-level="1"
                aria-posinset="1"
                aria-selected="false"
                aria-setsize="4"
                class="slds-hint-parent"
                tabindex="0">
                <td class="slds-text-align_right" role="gridcell" style="width:3.25rem">
                    <div class="slds-checkbox">
                        <input id="checkbox-08" type="checkbox" name="options" value="checkbox-08" aria-labelledby="check-button-label-08 column-group-header">
                        <label id="check-button-label-08" class="slds-checkbox__label" for="checkbox-08">
                            <span class="slds-checkbox_faux"/>
                            <span class="slds-form-element__label slds-assistive-text">Select item 8</span>
                        </label>
                    </div>
                </td>
                <th class="slds-tree__item" data-label="Account Name" scope="row">
                    <button class="slds-button slds-button_icon slds-button_icon-x-small slds-m-right_x-small slds-is-disabled" aria-hidden="true" tabindex="-1" title="Expand Rewis Inc">
                        <svg class="slds-button__icon slds-button__icon_small" aria-hidden="true">
                            <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#chevronright"/>
                        </svg>
                        <span class="slds-assistive-text">Collapse Rewis Inc</span>
                    </button>
                    <div class="slds-truncate" title="Rewis Inc">
                        <a href="javascript:void(0);" tabindex="-1">
                            Rewis Inc
                        </a>
                    </div>
                </th>
                <td data-label="Employees" role="gridcell">
                    <div class="slds-truncate" title="3,100">
                        3,100
                    </div>
                </td>
                <td data-label="Phone Number" role="gridcell">
                    <div class="slds-truncate" title="837-555-1212">
                        837-555-1212
                    </div>
                </td>
                <td data-label="Account Owner" role="gridcell">
                    <div class="slds-truncate" title="Jane Doe">
                        <a href="javascript:void(0);" tabindex="-1">
                            Jane Doe
                        </a>
                    </div>
                </td>
                <td data-label="Billing City" role="gridcell">
                    <div class="slds-truncate" title="Phoenix, AZ">
                        Phoenix, AZ
                    </div>
                </td>
                <td role="gridcell" style="width:3.25rem">
                    <button class="slds-button slds-button_icon slds-button_icon-border-filled slds-button_icon-x-small" aria-haspopup="true" tabindex="-1" title="More actions for Rewis Inc">
                        <svg class="slds-button__icon slds-button__icon_hint slds-button__icon_small" aria-hidden="true">
                            <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#down"/>
                        </svg>
                        <span class="slds-assistive-text">More actions for Rewis Inc</span>
                    </button>
                </td>
            </tr>
            <tr
                aria-expanded="false"
                aria-level="1"
                aria-posinset="2"
                aria-selected="false"
                aria-setsize="4"
                class="slds-hint-parent">
                <td class="slds-text-align_right" role="gridcell" style="width:3.25rem">
                    <div class="slds-checkbox">
                        <input id="checkbox-09" type="checkbox" name="options" value="checkbox-09" aria-labelledby="check-button-label-09 column-group-header">
                        <label id="check-button-label-09" class="slds-checkbox__label" for="checkbox-09">
                            <span class="slds-checkbox_faux"/>
                            <span class="slds-form-element__label slds-assistive-text">Select item 9</span>
                        </label>
                    </div>
                </td>
                <th class="slds-tree__item" data-label="Account Name" scope="row">
                    <button class="slds-button slds-button_icon slds-button_icon-x-small slds-m-right_x-small" aria-hidden="true" tabindex="-1" title="Expand Acme Corporation">
                        <svg class="slds-button__icon slds-button__icon_small" aria-hidden="true">
                            <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#chevronright"/>
                        </svg>
                        <span class="slds-assistive-text">Collapse Acme Corporation</span>
                    </button>
                    <div class="slds-truncate" title="Acme Corporation">
                        <a href="javascript:void(0);" tabindex="-1">
                            Acme Corporation
                        </a>
                    </div>
                </th>
                <td data-label="Employees" role="gridcell">
                    <div class="slds-truncate" title="10,000">
                        10,000
                    </div>
                </td>
                <td data-label="Phone Number" role="gridcell">
                    <div class="slds-truncate" title="837-555-1212">
                        837-555-1212
                    </div>
                </td>
                <td data-label="Account Owner" role="gridcell">
                    <div class="slds-truncate" title="John Doe">
                        <a href="javascript:void(0);" tabindex="-1">
                            John Doe
                        </a>
                    </div>
                </td>
                <td data-label="Billing City" role="gridcell">
                    <div class="slds-truncate" title="San Francisco, CA">
                        San Francisco, CA
                    </div>
                </td>
                <td role="gridcell" style="width:3.25rem">
                    <button class="slds-button slds-button_icon slds-button_icon-border-filled slds-button_icon-x-small" aria-haspopup="true" tabindex="-1" title="More actions for Acme Corporation">
                        <svg class="slds-button__icon slds-button__icon_hint slds-button__icon_small" aria-hidden="true">
                            <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#down"/>
                        </svg>
                        <span class="slds-assistive-text">More actions for Acme Corporation</span>
                    </button>
                </td>
            </tr>
            <tr
                aria-expanded="false"
                aria-level="1"
                aria-posinset="3"
                aria-selected="false"
                aria-setsize="4"
                class="slds-hint-parent">
                <td class="slds-text-align_right" role="gridcell" style="width:3.25rem">
                    <div class="slds-checkbox">
                        <input id="checkbox-010" type="checkbox" name="options" value="checkbox-010" aria-labelledby="check-button-label-010 column-group-header">
                        <label id="check-button-label-010" class="slds-checkbox__label" for="checkbox-010">
                            <span class="slds-checkbox_faux"/>
                            <span class="slds-form-element__label slds-assistive-text">Select item 10</span>
                        </label>
                    </div>
                </td>
                <th class="slds-tree__item" data-label="Account Name" scope="row">
                    <button class="slds-button slds-button_icon slds-button_icon-x-small slds-m-right_x-small" aria-hidden="true" tabindex="-1" title="Expand Rohde Enterprises">
                        <svg class="slds-button__icon slds-button__icon_small" aria-hidden="true">
                            <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#chevronright"/>
                        </svg>
                        <span class="slds-assistive-text">Collapse Rohde Enterprises</span>
                    </button>
                    <div class="slds-truncate" title="Rohde Enterprises">
                        <a href="javascript:void(0);" tabindex="-1">
                            Rohde Enterprises
                        </a>
                    </div>
                </th>
                <td data-label="Employees" role="gridcell">
                    <div class="slds-truncate" title="6,000">
                        6,000
                    </div>
                </td>
                <td data-label="Phone Number" role="gridcell">
                    <div class="slds-truncate" title="837-555-1212">
                        837-555-1212
                    </div>
                </td>
                <td data-label="Account Owner" role="gridcell">
                    <div class="slds-truncate" title="John Doe">
                        <a href="javascript:void(0);" tabindex="-1">
                            John Doe
                        </a>
                    </div>
                </td>
                <td data-label="Billing City" role="gridcell">
                    <div class="slds-truncate" title="New York, NY">
                        New York, NY
                    </div>
                </td>
                <td role="gridcell" style="width:3.25rem">
                    <button class="slds-button slds-button_icon slds-button_icon-border-filled slds-button_icon-x-small" aria-haspopup="true" tabindex="-1" title="More actions for Rohde Enterprises">
                        <svg class="slds-button__icon slds-button__icon_hint slds-button__icon_small" aria-hidden="true">
                            <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#down"/>
                        </svg>
                        <span class="slds-assistive-text">More actions for Rohde Enterprises</span>
                    </button>
                </td>
            </tr>
            <tr aria-level="1" aria-posinset="4" aria-selected="false" aria-setsize="4" class="slds-hint-parent">
                <td class="slds-text-align_right" role="gridcell" style="width:3.25rem">
                    <div class="slds-checkbox">
                        <input id="checkbox-011" type="checkbox" name="options" value="checkbox-011" aria-labelledby="check-button-label-011 column-group-header">
                        <label id="check-button-label-011" class="slds-checkbox__label" for="checkbox-011">
                            <span class="slds-checkbox_faux"/>
                            <span class="slds-form-element__label slds-assistive-text">Select item 11</span>
                        </label>
                    </div>
                </td>
                <th class="slds-tree__item" data-label="Account Name" scope="row">
                    <button class="slds-button slds-button_icon slds-button_icon-x-small slds-m-right_x-small slds-is-disabled" aria-hidden="true" tabindex="-1" title="Expand Cheese Corp">
                        <svg class="slds-button__icon slds-button__icon_small" aria-hidden="true">
                            <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#chevronright"/>
                        </svg>
                        <span class="slds-assistive-text">Collapse Cheese Corp</span>
                    </button>
                    <div class="slds-truncate" title="Cheese Corp">
                        <a href="javascript:void(0);" tabindex="-1">
                            Cheese Corp
                        </a>
                    </div>
                </th>
                <td data-label="Employees" role="gridcell">
                    <div class="slds-truncate" title="1,234">
                        1,234
                    </div>
                </td>
                <td data-label="Phone Number" role="gridcell">
                    <div class="slds-truncate" title="837-555-1212">
                        837-555-1212
                    </div>
                </td>
                <td data-label="Account Owner" role="gridcell">
                    <div class="slds-truncate" title="Jane Doe">
                        <a href="javascript:void(0);" tabindex="-1">
                            Jane Doe
                        </a>
                    </div>
                </td>
                <td data-label="Billing City" role="gridcell">
                    <div class="slds-truncate" title="Paris, France">
                        Paris, France
                    </div>
                </td>
                <td role="gridcell" style="width:3.25rem">
                    <button class="slds-button slds-button_icon slds-button_icon-border-filled slds-button_icon-x-small" aria-haspopup="true" tabindex="-1" title="More actions for Cheese Corp">
                        <svg class="slds-button__icon slds-button__icon_hint slds-button__icon_small" aria-hidden="true">
                            <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#down"/>
                        </svg>
                        <span class="slds-assistive-text">More actions for Cheese Corp</span>
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    name: 'SldsTreeGrid'
}
</script>

<style scoped>

</style>
