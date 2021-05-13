<template>
    <div>
        <section
            role="dialog"
            tabindex="-1"
            class="slds-modal slds-fade-in-open slds-modal_large slds-list-builder"
            aria-labelledby="id-of-modalheader-h2"
            aria-modal="true"
            aria-describedby="modal-content-id-1">
            <div class="slds-modal__container">
                <header class="slds-modal__header">
                    <button class="slds-button slds-button_icon slds-modal__close slds-button_icon-inverse" title="Close">
                        <svg class="slds-button__icon slds-button__icon_large" aria-hidden="true">
                            <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#close"/>
                        </svg>
                        <span class="slds-assistive-text">Close</span>
                    </button>
                    <h2 id="id-of-modalheader-h2" class="slds-text-heading_medium">
                        Add products
                    </h2>
                    <p class="slds-m-top_x-small">
                        Pricebook: Salesforce Products
                    </p>
                </header>
                <div id="modal-content-id-1" class="slds-modal__content slds-grid slds-grow">
                    <div class="slds-grid slds-grid_vertical">
                        <div class="slds-p-vertical_x-small slds-p-horizontal_large slds-shrink-none slds-theme_shade">
                            <div class="slds-form-element">
                                <label class="slds-form-element__label slds-assistive-text" for="combobox-unique-id-3">
                                    Search
                                </label>
                                <div class="slds-form-element__control">
                                    <div class="slds-combobox_container">
                                        <div class="slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click" aria-expanded="false" aria-haspopup="listbox" role="combobox">
                                            <div class="slds-combobox__form-element slds-input-has-icon slds-input-has-icon_right" role="none">
                                                <input
                                                    id="combobox-unique-id-3"
                                                    type="text"
                                                    class="slds-input slds-combobox__input"
                                                    aria-autocomplete="list"
                                                    autoComplete="off"
                                                    role="textbox"
                                                    placeholder="Search Salesforce">
                                                <span class="slds-icon_container slds-icon-utility-search slds-input__icon slds-input__icon_right">
                                                    <svg class="slds-icon slds-icon slds-icon_x-small slds-icon-text-default" aria-hidden="true">
                                                        <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#search"/>
                                                    </svg>
                                                </span>
                                            </div>
                                            <div id="listbox-unique-id" role="listbox" class="slds-dropdown slds-dropdown_fluid">
                                                <ul class="slds-listbox slds-listbox_vertical" role="presentation">
                                                    <li role="presentation" class="slds-listbox__item">
                                                        <div id="listbox-option-unique-id-01" class="slds-media slds-listbox__option slds-listbox__option_entity slds-listbox__option_has-meta" role="option">
                                                            <span class="slds-media__figure">
                                                                <span class="slds-icon_container slds-icon-standard-account">
                                                                    <svg class="slds-icon slds-icon_small" aria-hidden="true">
                                                                        <use xlink:href="/assets/icons/standard-sprite/svg/symbols.svg#account"/>
                                                                    </svg>
                                                                </span>
                                                            </span>
                                                            <span class="slds-media__body">
                                                                <span class="slds-listbox__option-text slds-listbox__option-text_entity">Acme</span>
                                                                <span class="slds-listbox__option-meta slds-listbox__option-meta_entity">Account
                                                                    • San Francisco</span>
                                                            </span>
                                                        </div>
                                                    </li>
                                                    <li role="presentation" class="slds-listbox__item">
                                                        <div id="listbox-option-unique-id-02" class="slds-media slds-listbox__option slds-listbox__option_entity slds-listbox__option_has-meta" role="option">
                                                            <span class="slds-media__figure">
                                                                <span class="slds-icon_container slds-icon-standard-account">
                                                                    <svg class="slds-icon slds-icon_small" aria-hidden="true">
                                                                        <use xlink:href="/assets/icons/standard-sprite/svg/symbols.svg#account"/>
                                                                    </svg>
                                                                </span>
                                                            </span>
                                                            <span class="slds-media__body">
                                                                <span class="slds-listbox__option-text slds-listbox__option-text_entity">Salesforce.com,
                                                                    Inc.</span>
                                                                <span class="slds-listbox__option-meta slds-listbox__option-meta_entity">Account
                                                                    • San Francisco</span>
                                                            </span>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="slds-text-title slds-m-top_x-small" aria-live="polite">
                                0 Item(s) Selected
                            </div>
                        </div>
                        <div class="slds-scrollable slds-grow">
                            <div class="slds-scrollable_none">
                                <table aria-multiselectable="true" class="slds-table slds-no-row-hover slds-table_bordered slds-table_fixed-layout slds-table_resizable-cols" role="grid">
                                    <thead>
                                        <tr class="slds-line-height_reset">
                                            <th class="" scope="col" style="width:3.75rem"/>
                                            <th aria-label="Name" aria-sort="none" class="slds-is-resizable slds-is-sortable" scope="col">
                                                <a class="slds-th__action slds-text-link_reset" href="javascript:void(0);" role="button" tabindex="-1">
                                                    <span class="slds-assistive-text">Sort by: </span>
                                                    <div class="slds-grid slds-grid_vertical-align-center slds-has-flexi-truncate">
                                                        <span class="slds-truncate" title="Name">Name</span>
                                                        <span class="slds-icon_container slds-icon-utility-arrowdown">
                                                            <svg class="slds-icon slds-icon-text-default slds-is-sortable__icon " aria-hidden="true">
                                                                <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#arrowdown"/>
                                                            </svg>
                                                        </span>
                                                    </div>
                                                </a>
                                                <div class="slds-resizable">
                                                    <input
                                                        id="cell-resize-handle-9"
                                                        type="range"
                                                        aria-label="Name column width"
                                                        class="slds-resizable__input slds-assistive-text"
                                                        max="1000"
                                                        min="20"
                                                        tabindex="-1">
                                                    <span class="slds-resizable__handle">
                                                        <span class="slds-resizable__divider"/>
                                                    </span>
                                                </div>
                                            </th>
                                            <th aria-label="Product Code" aria-sort="none" class="slds-is-resizable slds-is-sortable" scope="col">
                                                <a class="slds-th__action slds-text-link_reset" href="javascript:void(0);" role="button" tabindex="-1">
                                                    <span class="slds-assistive-text">Sort by: </span>
                                                    <div class="slds-grid slds-grid_vertical-align-center slds-has-flexi-truncate">
                                                        <span class="slds-truncate" title="Product Code">Product Code</span>
                                                        <span class="slds-icon_container slds-icon-utility-arrowdown">
                                                            <svg class="slds-icon slds-icon-text-default slds-is-sortable__icon " aria-hidden="true">
                                                                <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#arrowdown"/>
                                                            </svg>
                                                        </span>
                                                    </div>
                                                </a>
                                                <div class="slds-resizable">
                                                    <input
                                                        id="cell-resize-handle-10"
                                                        type="range"
                                                        aria-label="Product Code column width"
                                                        class="slds-resizable__input slds-assistive-text"
                                                        max="1000"
                                                        min="20"
                                                        tabindex="-1">
                                                    <span class="slds-resizable__handle">
                                                        <span class="slds-resizable__divider"/>
                                                    </span>
                                                </div>
                                            </th>
                                            <th aria-label="List Price" aria-sort="none" class="slds-is-resizable slds-is-sortable" scope="col">
                                                <a class="slds-th__action slds-text-link_reset" href="javascript:void(0);" role="button" tabindex="-1">
                                                    <span class="slds-assistive-text">Sort by: </span>
                                                    <div class="slds-grid slds-grid_vertical-align-center slds-has-flexi-truncate">
                                                        <span class="slds-truncate" title="List Price">List Price</span>
                                                        <span class="slds-icon_container slds-icon-utility-arrowdown">
                                                            <svg class="slds-icon slds-icon-text-default slds-is-sortable__icon " aria-hidden="true">
                                                                <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#arrowdown"/>
                                                            </svg>
                                                        </span>
                                                    </div>
                                                </a>
                                                <div class="slds-resizable">
                                                    <input
                                                        id="cell-resize-handle-11"
                                                        type="range"
                                                        aria-label="List Price column width"
                                                        class="slds-resizable__input slds-assistive-text"
                                                        max="1000"
                                                        min="20"
                                                        tabindex="-1">
                                                    <span class="slds-resizable__handle">
                                                        <span class="slds-resizable__divider"/>
                                                    </span>
                                                </div>
                                            </th>
                                            <th aria-label="Product Family" aria-sort="none" class="slds-is-resizable slds-is-sortable" scope="col">
                                                <a class="slds-th__action slds-text-link_reset" href="javascript:void(0);" role="button" tabindex="-1">
                                                    <span class="slds-assistive-text">Sort by: </span>
                                                    <div class="slds-grid slds-grid_vertical-align-center slds-has-flexi-truncate">
                                                        <span class="slds-truncate" title="Product Family">Product
                                                            Family</span>
                                                        <span class="slds-icon_container slds-icon-utility-arrowdown">
                                                            <svg class="slds-icon slds-icon-text-default slds-is-sortable__icon " aria-hidden="true">
                                                                <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#arrowdown"/>
                                                            </svg>
                                                        </span>
                                                    </div>
                                                </a>
                                                <div class="slds-resizable">
                                                    <input
                                                        id="cell-resize-handle-12"
                                                        type="range"
                                                        aria-label="Product Family column width"
                                                        class="slds-resizable__input slds-assistive-text"
                                                        max="1000"
                                                        min="20"
                                                        tabindex="-1">
                                                    <span class="slds-resizable__handle">
                                                        <span class="slds-resizable__divider"/>
                                                    </span>
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr aria-selected="false" class="slds-hint-parent">
                                            <td class="slds-text-align_right" role="gridcell" tabindex="0">
                                                <label class="slds-checkbox-button" for="example-unique-id-17">
                                                    <input id="example-unique-id-17" type="checkbox" class="slds-assistive-text" value="example-unique-id-17" tabindex="-1">
                                                    <span class="slds-icon_container slds-icon-utility-add slds-current-color" title="Description of icon when needed">
                                                        <svg class="slds-icon slds-icon_x-small" aria-hidden="true">
                                                            <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#add"/>
                                                        </svg>
                                                        <span class="slds-assistive-text">Add product</span>
                                                    </span>
                                                </label>
                                            </td>
                                            <th scope="row">
                                                <div class="slds-truncate" title="Analytics">
                                                    Analytics
                                                </div>
                                            </th>
                                            <td role="gridcell">
                                                <div class="slds-truncate" title="ANTLY">
                                                    ANTLY
                                                </div>
                                            </td>
                                            <td role="gridcell">
                                                <div class="slds-truncate" title="5000.00">
                                                    5000.00
                                                </div>
                                            </td>
                                            <td role="gridcell">
                                                <div class="slds-truncate" title="Analytics Product">
                                                    Analytics Product
                                                </div>
                                            </td>
                                        </tr>
                                        <tr aria-selected="false" class="slds-hint-parent">
                                            <td class="slds-text-align_right" role="gridcell">
                                                <label class="slds-checkbox-button" for="example-unique-id-18">
                                                    <input id="example-unique-id-18" type="checkbox" class="slds-assistive-text" value="example-unique-id-18" tabindex="-1">
                                                    <span class="slds-icon_container slds-icon-utility-add slds-current-color" title="Description of icon when needed">
                                                        <svg class="slds-icon slds-icon_x-small" aria-hidden="true">
                                                            <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#add"/>
                                                        </svg>
                                                        <span class="slds-assistive-text">Add product</span>
                                                    </span>
                                                </label>
                                            </td>
                                            <th scope="row">
                                                <div class="slds-truncate" title="Analytics">
                                                    Analytics
                                                </div>
                                            </th>
                                            <td role="gridcell">
                                                <div class="slds-truncate" title="ANTLY">
                                                    ANTLY
                                                </div>
                                            </td>
                                            <td role="gridcell">
                                                <div class="slds-truncate" title="5000.00">
                                                    5000.00
                                                </div>
                                            </td>
                                            <td role="gridcell">
                                                <div class="slds-truncate" title="Analytics Product">
                                                    Analytics Product
                                                </div>
                                            </td>
                                        </tr>
                                        <tr aria-selected="false" class="slds-hint-parent">
                                            <td class="slds-text-align_right" role="gridcell">
                                                <label class="slds-checkbox-button" for="example-unique-id-19">
                                                    <input id="example-unique-id-19" type="checkbox" class="slds-assistive-text" value="example-unique-id-19" tabindex="-1">
                                                    <span class="slds-icon_container slds-icon-utility-add slds-current-color" title="Description of icon when needed">
                                                        <svg class="slds-icon slds-icon_x-small" aria-hidden="true">
                                                            <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#add"/>
                                                        </svg>
                                                        <span class="slds-assistive-text">Add product</span>
                                                    </span>
                                                </label>
                                            </td>
                                            <th scope="row">
                                                <div class="slds-truncate" title="Analytics">
                                                    Analytics
                                                </div>
                                            </th>
                                            <td role="gridcell">
                                                <div class="slds-truncate" title="ANTLY">
                                                    ANTLY
                                                </div>
                                            </td>
                                            <td role="gridcell">
                                                <div class="slds-truncate" title="5000.00">
                                                    5000.00
                                                </div>
                                            </td>
                                            <td role="gridcell">
                                                <div class="slds-truncate" title="Analytics Product">
                                                    Analytics Product
                                                </div>
                                            </td>
                                        </tr>
                                        <tr aria-selected="false" class="slds-hint-parent">
                                            <td class="slds-text-align_right" role="gridcell">
                                                <label class="slds-checkbox-button" for="example-unique-id-20">
                                                    <input id="example-unique-id-20" type="checkbox" class="slds-assistive-text" value="example-unique-id-20" tabindex="-1">
                                                    <span class="slds-icon_container slds-icon-utility-add slds-current-color" title="Description of icon when needed">
                                                        <svg class="slds-icon slds-icon_x-small" aria-hidden="true">
                                                            <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#add"/>
                                                        </svg>
                                                        <span class="slds-assistive-text">Add product</span>
                                                    </span>
                                                </label>
                                            </td>
                                            <th scope="row">
                                                <div class="slds-truncate" title="Analytics">
                                                    Analytics
                                                </div>
                                            </th>
                                            <td role="gridcell">
                                                <div class="slds-truncate" title="ANTLY">
                                                    ANTLY
                                                </div>
                                            </td>
                                            <td role="gridcell">
                                                <div class="slds-truncate" title="5000.00">
                                                    5000.00
                                                </div>
                                            </td>
                                            <td role="gridcell">
                                                <div class="slds-truncate" title="Analytics Product">
                                                    Analytics Product
                                                </div>
                                            </td>
                                        </tr>
                                        <tr aria-selected="false" class="slds-hint-parent">
                                            <td class="slds-text-align_right" role="gridcell">
                                                <label class="slds-checkbox-button" for="example-unique-id-21">
                                                    <input id="example-unique-id-21" type="checkbox" class="slds-assistive-text" value="example-unique-id-21" tabindex="-1">
                                                    <span class="slds-icon_container slds-icon-utility-add slds-current-color" title="Description of icon when needed">
                                                        <svg class="slds-icon slds-icon_x-small" aria-hidden="true">
                                                            <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#add"/>
                                                        </svg>
                                                        <span class="slds-assistive-text">Add product</span>
                                                    </span>
                                                </label>
                                            </td>
                                            <th scope="row">
                                                <div class="slds-truncate" title="Analytics">
                                                    Analytics
                                                </div>
                                            </th>
                                            <td role="gridcell">
                                                <div class="slds-truncate" title="ANTLY">
                                                    ANTLY
                                                </div>
                                            </td>
                                            <td role="gridcell">
                                                <div class="slds-truncate" title="5000.00">
                                                    5000.00
                                                </div>
                                            </td>
                                            <td role="gridcell">
                                                <div class="slds-truncate" title="Analytics Product">
                                                    Analytics Product
                                                </div>
                                            </td>
                                        </tr>
                                        <tr aria-selected="false" class="slds-hint-parent">
                                            <td class="slds-text-align_right" role="gridcell">
                                                <label class="slds-checkbox-button" for="example-unique-id-22">
                                                    <input id="example-unique-id-22" type="checkbox" class="slds-assistive-text" value="example-unique-id-22" tabindex="-1">
                                                    <span class="slds-icon_container slds-icon-utility-add slds-current-color" title="Description of icon when needed">
                                                        <svg class="slds-icon slds-icon_x-small" aria-hidden="true">
                                                            <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#add"/>
                                                        </svg>
                                                        <span class="slds-assistive-text">Add product</span>
                                                    </span>
                                                </label>
                                            </td>
                                            <th scope="row">
                                                <div class="slds-truncate" title="Analytics">
                                                    Analytics
                                                </div>
                                            </th>
                                            <td role="gridcell">
                                                <div class="slds-truncate" title="ANTLY">
                                                    ANTLY
                                                </div>
                                            </td>
                                            <td role="gridcell">
                                                <div class="slds-truncate" title="5000.00">
                                                    5000.00
                                                </div>
                                            </td>
                                            <td role="gridcell">
                                                <div class="slds-truncate" title="Analytics Product">
                                                    Analytics Product
                                                </div>
                                            </td>
                                        </tr>
                                        <tr aria-selected="false" class="slds-hint-parent">
                                            <td class="slds-text-align_right" role="gridcell">
                                                <label class="slds-checkbox-button" for="example-unique-id-23">
                                                    <input id="example-unique-id-23" type="checkbox" class="slds-assistive-text" value="example-unique-id-23" tabindex="-1">
                                                    <span class="slds-icon_container slds-icon-utility-add slds-current-color" title="Description of icon when needed">
                                                        <svg class="slds-icon slds-icon_x-small" aria-hidden="true">
                                                            <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#add"/>
                                                        </svg>
                                                        <span class="slds-assistive-text">Add product</span>
                                                    </span>
                                                </label>
                                            </td>
                                            <th scope="row">
                                                <div class="slds-truncate" title="Analytics">
                                                    Analytics
                                                </div>
                                            </th>
                                            <td role="gridcell">
                                                <div class="slds-truncate" title="ANTLY">
                                                    ANTLY
                                                </div>
                                            </td>
                                            <td role="gridcell">
                                                <div class="slds-truncate" title="5000.00">
                                                    5000.00
                                                </div>
                                            </td>
                                            <td role="gridcell">
                                                <div class="slds-truncate" title="Analytics Product">
                                                    Analytics Product
                                                </div>
                                            </td>
                                        </tr>
                                        <tr aria-selected="false" class="slds-hint-parent">
                                            <td class="slds-text-align_right" role="gridcell">
                                                <label class="slds-checkbox-button" for="example-unique-id-24">
                                                    <input id="example-unique-id-24" type="checkbox" class="slds-assistive-text" value="example-unique-id-24" tabindex="-1">
                                                    <span class="slds-icon_container slds-icon-utility-add slds-current-color" title="Description of icon when needed">
                                                        <svg class="slds-icon slds-icon_x-small" aria-hidden="true">
                                                            <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#add"/>
                                                        </svg>
                                                        <span class="slds-assistive-text">Add product</span>
                                                    </span>
                                                </label>
                                            </td>
                                            <th scope="row">
                                                <div class="slds-truncate" title="Analytics">
                                                    Analytics
                                                </div>
                                            </th>
                                            <td role="gridcell">
                                                <div class="slds-truncate" title="ANTLY">
                                                    ANTLY
                                                </div>
                                            </td>
                                            <td role="gridcell">
                                                <div class="slds-truncate" title="5000.00">
                                                    5000.00
                                                </div>
                                            </td>
                                            <td role="gridcell">
                                                <div class="slds-truncate" title="Analytics Product">
                                                    Analytics Product
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <footer class="slds-modal__footer">
                    <button class="slds-button slds-button_neutral">
                        Cancel
                    </button>
                    <button class="slds-button slds-button_brand">
                        Next
                    </button>
                </footer>
            </div>
        </section>
        <div class="slds-backdrop slds-backdrop_open"/>
    </div>
</template>

<script>
export default {
    name: "SldsListBuilder"
}
</script>

<style scoped>

</style>
