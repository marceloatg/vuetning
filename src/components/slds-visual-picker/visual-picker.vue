<template>
    <fieldset class="slds-form-element">
        <legend class="slds-form-element__legend slds-form-element__label">
            Select an app
        </legend>
        <div class="slds-form-element__control">
            <div class="slds-visual-picker slds-visual-picker_small">
                <input id="visual-picker-6" type="radio" value="visual-picker-6" name="options">
                <label for="visual-picker-6">
                    <span class="slds-visual-picker__figure slds-visual-picker__icon slds-align_absolute-center">
                        <span class="slds-is-selected">
                            <span class="slds-icon_container">
                                <svg class="slds-icon slds-icon_large slds-icon-action-check" aria-hidden="true">
                                    <use xlink:href="/assets/icons/action-sprite/svg/symbols.svg#check"/>
                                </svg>
                            </span>
                        </span>
                        <span class="slds-is-not-selected">
                            <span class="slds-icon_container">
                                <svg class="slds-icon slds-icon-utility-connected_apps slds-icon_large slds-icon-text-default" aria-hidden="true">
                                    <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#connected_apps"/>
                                </svg>
                            </span>
                        </span>
                    </span>
                    <span class="slds-visual-picker__body">
                        <span class="slds-text-title">Connected App</span>
                    </span>
                </label>
            </div>
            <div class="slds-visual-picker slds-visual-picker_small">
                <input id="visual-picker-7" type="radio" value="visual-picker-7" name="options">
                <label for="visual-picker-7">
                    <span class="slds-visual-picker__figure slds-visual-picker__icon slds-align_absolute-center">
                        <span class="slds-is-selected">
                            <span class="slds-icon_container">
                                <svg class="slds-icon slds-icon_large slds-icon-action-check" aria-hidden="true">
                                    <use xlink:href="/assets/icons/action-sprite/svg/symbols.svg#check"/>
                                </svg>
                            </span>
                        </span>
                        <span class="slds-is-not-selected">
                            <span class="slds-icon_container">
                                <svg class="slds-icon slds-icon-utility-custom_apps slds-icon_large slds-icon-text-default" aria-hidden="true">
                                    <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#custom_apps"/>
                                </svg>
                            </span>
                        </span>
                    </span>
                    <span class="slds-visual-picker__body">
                        <span class="slds-text-title">Custom App</span>
                    </span>
                </label>
            </div>
        </div>
    </fieldset>
</template>

<script>
export default {
    name: "SldsVisualPicker"
}
</script>

<style scoped>

</style>
