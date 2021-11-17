<template>
    <div class="slds-form-element" role="group" aria-labelledby="picklist-group-label">
        <span id="picklist-group-label" class="slds-form-element__label slds-form-element__legend">Select Options</span>
        <div class="slds-form-element__control">
            <div class="slds-dueling-list">
                <div id="drag-live-region" class="slds-assistive-text" aria-live="assertive"/>
                <div id="option-drag-label" class="slds-assistive-text">
                    Press space bar when on an item, to move it within the list. Cmd/Ctrl plus left and right arrow keys, to move items between lists.
                </div>
                <div class="slds-dueling-list__column">
                    <span id="label-7" class="slds-form-element__label">First Category</span>
                    <div class="slds-dueling-list__options">
                        <ul aria-describedby="option-drag-label" aria-labelledby="label-7" aria-multiselectable="true" class="slds-listbox slds-listbox_vertical" role="listbox">
                            <li role="presentation" class="slds-listbox__item">
                                <div class="slds-listbox__option slds-listbox__option_plain slds-media slds-media_small slds-media_inline" aria-selected="false" draggable="true" role="option" tabindex="0">
                                    <span class="slds-media__body">
                                        <span class="slds-truncate" title="Option 1">Option 1</span>
                                    </span>
                                </div>
                            </li>
                            <li role="presentation" class="slds-listbox__item">
                                <div class="slds-listbox__option slds-listbox__option_plain slds-media slds-media_small slds-media_inline" aria-selected="false" draggable="true" role="option" tabindex="-1">
                                    <span class="slds-media__body">
                                        <span class="slds-truncate" title="Option 2">Option 2</span>
                                    </span>
                                </div>
                            </li>
                            <li role="presentation" class="slds-listbox__item">
                                <div class="slds-listbox__option slds-listbox__option_plain slds-media slds-media_small slds-media_inline" aria-selected="false" draggable="true" role="option" tabindex="-1">
                                    <span class="slds-media__body">
                                        <span class="slds-truncate" title="Option 3">Option 3</span>
                                    </span>
                                </div>
                            </li>
                            <li role="presentation" class="slds-listbox__item">
                                <div class="slds-listbox__option slds-listbox__option_plain slds-media slds-media_small slds-media_inline" aria-selected="false" draggable="true" role="option" tabindex="-1">
                                    <span class="slds-media__body">
                                        <span class="slds-truncate" title="Option 6">Option 6</span>
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="slds-dueling-list__column">
                    <button class="slds-button slds-button_icon slds-button_icon-container" title="Move Selection to Second Category">
                        <svg class="slds-button__icon" aria-hidden="true">
                            <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#right"/>
                        </svg>
                        <span class="slds-assistive-text">Move Selection to Second Category</span>
                    </button>
                    <button class="slds-button slds-button_icon slds-button_icon-container" title="Move Selection to First Category">
                        <svg class="slds-button__icon" aria-hidden="true">
                            <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#left"/>
                        </svg>
                        <span class="slds-assistive-text">Move Selection to First Category</span>
                    </button>
                </div>
                <div class="slds-dueling-list__column">
                    <span id="label-8" class="slds-form-element__label">Second Category</span>
                    <div class="slds-dueling-list__options">
                        <ul aria-describedby="option-drag-label" aria-labelledby="label-8" aria-multiselectable="true" class="slds-listbox slds-listbox_vertical" role="listbox">
                            <li role="presentation" class="slds-listbox__item">
                                <div class="slds-listbox__option slds-listbox__option_plain slds-media slds-media_small slds-media_inline" aria-selected="false" draggable="true" role="option" tabindex="0">
                                    <span class="slds-media__body">
                                        <span class="slds-truncate" title="Option 4">Option 4</span>
                                    </span>
                                </div>
                            </li>
                            <li role="presentation" class="slds-listbox__item">
                                <div class="slds-listbox__option slds-listbox__option_plain slds-media slds-media_small slds-media_inline" aria-selected="false" draggable="true" role="option" tabindex="-1">
                                    <span class="slds-media__body">
                                        <span class="slds-truncate" title="Option 5">Option 5</span>
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="slds-dueling-list__column">
                    <button class="slds-button slds-button_icon slds-button_icon-container" title="Move Selection Up">
                        <svg class="slds-button__icon" aria-hidden="true">
                            <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#up"/>
                        </svg>
                        <span class="slds-assistive-text">Move Selection Up</span>
                    </button>
                    <button class="slds-button slds-button_icon slds-button_icon-container" title="Move Selection Down">
                        <svg class="slds-button__icon" aria-hidden="true">
                            <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#down"/>
                        </svg>
                        <span class="slds-assistive-text">Move Selection Down</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SldsDuelingPicklist'
}
</script>

<style scoped>

</style>
