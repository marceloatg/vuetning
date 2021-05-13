<template>
    <header class="slds-global-header_container">
        <div class="slds-global-header slds-grid slds-grid_align-spread">

            <!-- Logo -->
            <div class="slds-global-header__item">
                <template v-if="!noLogo">

                    <slot v-if="$slots.logo" name="logo"/>

                    <div v-else class="slds-global-header__logo">
                        <span class="slds-assistive-text">
                            {{ logoAssistiveText }}
                        </span>
                    </div>

                </template>
            </div>

            <!-- Global search -->
            <div class="slds-global-header__item slds-global-header__item_search">
                <div v-if="!noSearch" class="slds-form-element">
                    <label class="slds-form-element__label slds-assistive-text" for="combobox-id-2">Search
                        Salesforce</label>
                    <div class="slds-form-element__control">
                        <div class="slds-combobox-group">
                            <div class="slds-combobox_object-switcher slds-combobox-addon_start">
                                <div class="slds-form-element">
                                    <label class="slds-form-element__label slds-assistive-text" for="objectswitcher-combobox-id-2">Filter
                                        Search by:</label>
                                    <div class="slds-form-element__control">
                                        <div class="slds-combobox_container">
                                            <div class="slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click" aria-controls="primary-search-combobox-id-1" aria-expanded="false" aria-haspopup="listbox" role="combobox">
                                                <div class="slds-combobox__form-element slds-input-has-icon slds-input-has-icon_right" role="none">
                                                    <input
                                                        id="objectswitcher-combobox-id-2"
                                                        type="text"
                                                        class="slds-input slds-combobox__input slds-combobox__input-value"
                                                        aria-controls="objectswitcher-listbox-id-2"
                                                        autocomplete="off"
                                                        role="textbox"
                                                        placeholder=" "
                                                        value="Accounts"
                                                    >
                                                    <span class="slds-icon_container slds-icon-utility-down slds-input__icon slds-input__icon_right">
                                                        <svg class="slds-icon slds-icon slds-icon_xx-small slds-icon-text-default" aria-hidden="true">
                                                            <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#down"/>
                                                        </svg>
                                                    </span>
                                                </div>
                                                <div id="objectswitcher-listbox-id-2" class="slds-dropdown slds-dropdown_length-5 slds-dropdown_x-small slds-dropdown_left" role="listbox">
                                                    <ul class="slds-listbox slds-listbox_vertical" role="group" aria-label="Suggested for you">
                                                        <li role="presentation" class="slds-listbox__item">
                                                            <div id="object0" class="slds-media slds-listbox__option slds-listbox__option_plain slds-media_small" role="presentation">
                                                                <h3 class="slds-listbox__option-header" role="presentation">
                                                                    Suggested for you</h3>
                                                            </div>
                                                        </li>
                                                        <li role="presentation" class="slds-listbox__item">
                                                            <div id="object1" aria-checked="true" class="slds-media slds-listbox__option slds-listbox__option_plain slds-media_small slds-is-selected" role="option">
                                                                <span class="slds-media__figure slds-listbox__option-icon">
                                                                    <span class="slds-icon_container slds-icon-utility-check slds-current-color">
                                                                        <svg class="slds-icon slds-icon_x-small" aria-hidden="true">
                                                                            <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#check"/>
                                                                        </svg>
                                                                    </span>
                                                                </span>
                                                                <span class="slds-media__body">
                                                                    <span class="slds-truncate" title="Accounts">Accounts</span>
                                                                </span>
                                                            </div>
                                                        </li>
                                                        <li role="presentation" class="slds-listbox__item">
                                                            <div id="object2" class="slds-media slds-listbox__option slds-listbox__option_plain slds-media_small" role="option">
                                                                <span class="slds-media__figure slds-listbox__option-icon"/>
                                                                <span class="slds-media__body">
                                                                    <span class="slds-truncate" title="Reports">Reports</span>
                                                                </span>
                                                            </div>
                                                        </li>
                                                        <li role="presentation" class="slds-listbox__item">
                                                            <div id="object3" class="slds-media slds-listbox__option slds-listbox__option_plain slds-media_small" role="option">
                                                                <span class="slds-media__figure slds-listbox__option-icon"/>
                                                                <span class="slds-media__body">
                                                                    <span class="slds-truncate" title="Contacts">Contacts</span>
                                                                </span>
                                                            </div>
                                                        </li>
                                                        <li role="presentation" class="slds-listbox__item">
                                                            <div id="object4" class="slds-media slds-listbox__option slds-listbox__option_plain slds-media_small" role="option">
                                                                <span class="slds-media__figure slds-listbox__option-icon"/>
                                                                <span class="slds-media__body">
                                                                    <span class="slds-truncate" title="Files">Files</span>
                                                                </span>
                                                            </div>
                                                        </li>
                                                        <li role="presentation" class="slds-listbox__item">
                                                            <div id="object5" class="slds-media slds-listbox__option slds-listbox__option_plain slds-media_small" role="option">
                                                                <span class="slds-media__figure slds-listbox__option-icon"/>
                                                                <span class="slds-media__body">
                                                                    <span class="slds-truncate" title="Groups">Groups</span>
                                                                </span>
                                                            </div>
                                                        </li>
                                                        <li role="presentation" class="slds-listbox__item">
                                                            <div id="object6" class="slds-media slds-listbox__option slds-listbox__option_plain slds-media_small" role="option">
                                                                <span class="slds-media__figure slds-listbox__option-icon"/>
                                                                <span class="slds-media__body">
                                                                    <span class="slds-truncate" title="Leads">Leads</span>
                                                                </span>
                                                            </div>
                                                        </li>
                                                        <li role="presentation" class="slds-listbox__item">
                                                            <div id="object7" class="slds-media slds-listbox__option slds-listbox__option_plain slds-media_small" role="option">
                                                                <span class="slds-media__figure slds-listbox__option-icon"/>
                                                                <span class="slds-media__body">
                                                                    <span class="slds-truncate" title="Notes">Notes</span>
                                                                </span>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="slds-combobox_container slds-combobox-addon_end">
                                <div id="primary-search-combobox-id-1" class="slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click" aria-expanded="false" aria-haspopup="listbox" role="combobox">
                                    <div class="slds-combobox__form-element slds-input-has-icon slds-input-has-icon_left slds-global-search__form-element" role="none">
                                        <span class="slds-icon_container slds-icon-utility-search slds-input__icon slds-input__icon_left">
                                            <svg class="slds-icon slds-icon slds-icon_xx-small slds-icon-text-default" aria-hidden="true">
                                                <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#search"/>
                                            </svg>
                                        </span>
                                        <input
                                            id="combobox-id-2"
                                            type="text"
                                            class="slds-input slds-combobox__input"
                                            aria-autocomplete="list"
                                            aria-controls="search-listbox-id-1"
                                            autocomplete="off"
                                            role="textbox"
                                            placeholder="Search Salesforce">
                                    </div>
                                    <div id="search-listbox-id-1" class="slds-dropdown slds-dropdown_length-with-icon-7 slds-dropdown_fluid" role="listbox">
                                        <ul class="slds-listbox slds-listbox_vertical" role="group" aria-label="Recent Items">
                                            <li role="presentation" class="slds-listbox__item">
                                                <div id="option0" class="slds-media slds-listbox__option slds-listbox__option_plain slds-media_center" role="presentation">
                                                    <h3 class="slds-listbox__option-header" role="presentation">Recent
                                                        Items</h3>
                                                </div>
                                            </li>
                                            <li role="presentation" class="slds-listbox__item">
                                                <div id="option1" class="slds-media slds-listbox__option slds-listbox__option_entity slds-listbox__option_has-meta" role="option">
                                                    <span class="slds-media__figure slds-listbox__option-icon">
                                                        <span class="slds-icon_container slds-icon-standard-opportunity">
                                                            <svg class="slds-icon slds-icon_small" aria-hidden="true">
                                                                <use xlink:href="/assets/icons/standard-sprite/svg/symbols.svg#opportunity"/>
                                                            </svg>
                                                        </span>
                                                    </span>
                                                    <span class="slds-media__body">
                                                        <span class="slds-listbox__option-text slds-listbox__option-text_entity">Salesforce
                                                            - 1,000 Licenses</span>
                                                        <span class="slds-listbox__option-meta slds-listbox__option-meta_entity">Opportunity
                                                            • Propecting</span>
                                                    </span>
                                                </div>
                                            </li>
                                            <li role="presentation" class="slds-listbox__item">
                                                <div id="option2" class="slds-media slds-listbox__option slds-listbox__option_entity slds-listbox__option_has-meta" role="option">
                                                    <span class="slds-media__figure slds-listbox__option-icon">
                                                        <span class="slds-icon_container slds-icon-standard-contact">
                                                            <svg class="slds-icon slds-icon_small" aria-hidden="true">
                                                                <use xlink:href="/assets/icons/standard-sprite/svg/symbols.svg#contact"/>
                                                            </svg>
                                                        </span>
                                                    </span>
                                                    <span class="slds-media__body">
                                                        <span class="slds-listbox__option-text slds-listbox__option-text_entity">Art
                                                            Vandelay</span>
                                                        <span class="slds-listbox__option-meta slds-listbox__option-meta_entity">Contact
                                                            • avandelay@vandelay.com</span>
                                                    </span>
                                                </div>
                                            </li>
                                            <li role="presentation" class="slds-listbox__item">
                                                <div id="option3" class="slds-media slds-listbox__option slds-listbox__option_entity slds-listbox__option_has-meta" role="option">
                                                    <span class="slds-media__figure slds-listbox__option-icon">
                                                        <span class="slds-icon_container slds-icon-standard-account">
                                                            <svg class="slds-icon slds-icon_small" aria-hidden="true">
                                                                <use xlink:href="/assets/icons/standard-sprite/svg/symbols.svg#account"/>
                                                            </svg>
                                                        </span>
                                                    </span>
                                                    <span class="slds-media__body">
                                                        <span class="slds-listbox__option-text slds-listbox__option-text_entity">Vandelay
                                                            Industries</span>
                                                        <span class="slds-listbox__option-meta slds-listbox__option-meta_entity">Account
                                                            • San Francisco</span>
                                                    </span>
                                                </div>
                                            </li>
                                            <li role="presentation" class="slds-listbox__item">
                                                <div id="option4" class="slds-media slds-listbox__option slds-listbox__option_entity slds-listbox__option_has-meta" role="option">
                                                    <span class="slds-media__figure slds-listbox__option-icon">
                                                        <span class="slds-icon_container slds-icon-standard-event">
                                                            <svg class="slds-icon slds-icon_small" aria-hidden="true">
                                                                <use xlink:href="/assets/icons/standard-sprite/svg/symbols.svg#event"/>
                                                            </svg>
                                                        </span>
                                                    </span>
                                                    <span class="slds-media__body">
                                                        <span class="slds-listbox__option-text slds-listbox__option-text_entity">Salesforce
                                                            UK 2016 Events</span>
                                                        <span class="slds-listbox__option-meta slds-listbox__option-meta_entity">Event
                                                            • $20,000</span>
                                                    </span>
                                                </div>
                                            </li>
                                            <li role="presentation" class="slds-listbox__item">
                                                <div id="option5" class="slds-media slds-listbox__option slds-listbox__option_entity slds-listbox__option_has-meta" role="option">
                                                    <span class="slds-media__figure slds-listbox__option-icon">
                                                        <span class="slds-icon_container slds-icon-standard-lead">
                                                            <svg class="slds-icon slds-icon_small" aria-hidden="true">
                                                                <use xlink:href="/assets/icons/standard-sprite/svg/symbols.svg#lead"/>
                                                            </svg>
                                                        </span>
                                                    </span>
                                                    <span class="slds-media__body">
                                                        <span class="slds-listbox__option-text slds-listbox__option-text_entity">H.E.
                                                            Pennypacker</span>
                                                        <span class="slds-listbox__option-meta slds-listbox__option-meta_entity">Lead
                                                            • Nursing</span>
                                                    </span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Global actions -->
            <div class="slds-global-header__item">
                <ul class="slds-global-actions">
                    <slot name="actions"/>
                </ul>
            </div>

        </div>
    </header>
</template>

<script>
export default {
    name: 'SldsGlobalHeader',

    props: {
        logoAssistiveText: String,
        noLogo: Boolean,
        noSearch: Boolean,
    }
}
</script>

<style scoped lang="scss">
.slds-global-header_container {
    position: static;

    .slds-global-header {
        .slds-global-header__name {
            padding-left: 3rem;
            font-size: 22px;
            line-height: 2.5rem;
        }
    }
}
</style>
