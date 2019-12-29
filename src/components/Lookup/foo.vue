<template>
    <div class="slds-form-element">

        <label class="slds-form-element__label" for="combobox-id-5">
            Relate to
        </label>

        <div class="slds-form-element__control">
            <div class="slds-combobox_container slds-has-selection">
                <div role="combobox" class="slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click">

                    <div class="slds-combobox__form-element slds-input-has-icon slds-input-has-icon_left-right" role="none">

                        <span class="slds-icon_container slds-icon-standard-account slds-combobox__input-entity-icon" title="Account">
                            <svg class="slds-icon slds-icon_small" aria-hidden="true">
                                <use xlink:href="/assets/icons/standard-sprite/svg/symbols.svg#account"/>
                            </svg>
                            <span class="slds-assistive-text">Account</span>
                        </span>

                        <input
                            id="combobox-id-5"
                            type="text"
                            class="slds-input slds-combobox__input slds-combobox__input-value"
                            aria-controls="listbox-id-5"
                            autoComplete="off"
                            role="textbox"
                            placeholder="Select an Option"
                            readonly=""
                            value="Salesforce.com, Inc.">

                        <button class="slds-button slds-button_icon slds-input__icon slds-input__icon_right" title="Remove selected option">
                            <svg class="slds-button__icon" aria-hidden="true">
                                <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#close"/>
                            </svg>
                            <span class="slds-assistive-text">Remove selected option</span>
                        </button>

                    </div>

                    <div id="listbox-id-5" class="slds-dropdown slds-dropdown_length-with-icon-7 slds-dropdown_fluid" role="listbox">
                        <ul class="slds-listbox slds-listbox_vertical" role="presentation">
                            <li role="presentation" class="slds-listbox__item">
                                <div id="option1" class="slds-media slds-listbox__option slds-listbox__option_entity slds-listbox__option_has-meta" role="option">
                                    <span class="slds-media__figure slds-listbox__option-icon">
                                        <span class="slds-icon_container slds-icon-standard-account">
                                            <svg class="slds-icon slds-icon_small" aria-hidden="true">
                                                <use xlink:href="/assets/icons/standard-sprite/svg/symbols.svg#account"/>
                                            </svg>
                                        </span>
                                    </span>
                                    <span class="slds-media__body">
                                        <span class="slds-listbox__option-text slds-listbox__option-text_entity">Burlington Textiles Corp of America</span>
                                        <span class="slds-listbox__option-meta slds-listbox__option-meta_entity">Account • Burlington, NC</span>
                                    </span>
                                </div>
                            </li>
                            <li role="presentation" class="slds-listbox__item">
                                <div id="option2" class="slds-media slds-listbox__option slds-listbox__option_entity slds-listbox__option_has-meta" role="option">
                                    <span class="slds-media__figure slds-listbox__option-icon">
                                        <span class="slds-icon_container slds-icon-standard-account">
                                            <svg class="slds-icon slds-icon_small" aria-hidden="true">
                                                <use xlink:href="/assets/icons/standard-sprite/svg/symbols.svg#account"/>
                                            </svg>
                                        </span>
                                    </span>
                                    <span class="slds-media__body">
                                        <span class="slds-listbox__option-text slds-listbox__option-text_entity">Dickenson plc</span>
                                        <span class="slds-listbox__option-meta slds-listbox__option-meta_entity">Account • Lawrence, KS</span>
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>

    </div>
</template>