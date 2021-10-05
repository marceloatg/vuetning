<template>
    <div class="slds-path">
        <div class="slds-grid slds-path__track">
            <div class="slds-grid slds-path__scroller-container">
                <div class="slds-path__scroller">
                    <div class="slds-path__scroller_inner">
                        <ul class="slds-path__nav" role="listbox" aria-orientation="horizontal">
                            <li class="slds-path__item slds-is-current slds-is-active" role="presentation">
                                <a
                                    id="path-1"
                                    aria-selected="true"
                                    class="slds-path__link"
                                    href="javascript:void(0);"
                                    role="option"
                                    tabindex="0">
                                    <span class="slds-path__stage">
                                        <svg class="slds-icon slds-icon_x-small" aria-hidden="true">
                                            <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#check"/>
                                        </svg>
                                        <span class="slds-assistive-text">Current Stage:</span>
                                    </span>
                                    <span class="slds-path__title">Contacted</span>
                                </a>
                            </li>
                            <li class="slds-path__item slds-is-incomplete" role="presentation">
                                <a
                                    id="path-2"
                                    aria-selected="false"
                                    class="slds-path__link"
                                    href="javascript:void(0);"
                                    role="option"
                                    tabindex="-1">
                                    <span class="slds-path__stage">
                                        <svg class="slds-icon slds-icon_x-small" aria-hidden="true">
                                            <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#check"/>
                                        </svg>
                                    </span>
                                    <span class="slds-path__title">Open</span>
                                </a>
                            </li>
                            <li class="slds-path__item slds-is-incomplete" role="presentation">
                                <a
                                    id="path-3"
                                    aria-selected="false"
                                    class="slds-path__link"
                                    href="javascript:void(0);"
                                    role="option"
                                    tabindex="-1">
                                    <span class="slds-path__stage">
                                        <svg class="slds-icon slds-icon_x-small" aria-hidden="true">
                                            <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#check"/>
                                        </svg>
                                    </span>
                                    <span class="slds-path__title">Unqualified</span>
                                </a>
                            </li>
                            <li class="slds-path__item slds-is-incomplete" role="presentation">
                                <a
                                    id="path-4"
                                    aria-selected="false"
                                    class="slds-path__link"
                                    href="javascript:void(0);"
                                    role="option"
                                    tabindex="-1">
                                    <span class="slds-path__stage">
                                        <svg class="slds-icon slds-icon_x-small" aria-hidden="true">
                                            <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#check"/>
                                        </svg>
                                    </span>
                                    <span class="slds-path__title">Nurturing</span>
                                </a>
                            </li>
                            <li class="slds-path__item slds-is-incomplete" role="presentation">
                                <a
                                    id="path-5"
                                    aria-selected="false"
                                    class="slds-path__link"
                                    href="javascript:void(0);"
                                    role="option"
                                    tabindex="-1">
                                    <span class="slds-path__stage">
                                        <svg class="slds-icon slds-icon_x-small" aria-hidden="true">
                                            <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#check"/>
                                        </svg>
                                    </span>
                                    <span class="slds-path__title">Closed</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="slds-grid slds-path__action">
                <span class="slds-path__stage-name">Stage: Unqualified</span>
                <button class="slds-button slds-button_brand slds-path__mark-complete">
                    <svg class="slds-button__icon slds-button__icon_left" aria-hidden="true">
                        <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#check"/>
                    </svg>Mark Status as Complete</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SldsPath'
}
</script>

<style scoped>

</style>
