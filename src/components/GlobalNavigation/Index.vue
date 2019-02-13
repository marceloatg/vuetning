<template>
    <div class="slds-context-bar slds-context-bar_tabs">

        <!-- App name -->
        <a @click="$emit('homeClick')" class="slds-context-bar__primary slds-icon-waffle_container slds-text-link_reset">
            <div class="slds-context-bar__item">

                <!-- Icon -->
                <div class="slds-context-bar__icon-action">
                    <div class="slds-context-bar__button">
                        <span class="slds-icon-waffle">
                            <span class="slds-r1"></span>
                            <span class="slds-r2"></span>
                            <span class="slds-r3"></span>
                            <span class="slds-r4"></span>
                            <span class="slds-r5"></span>
                            <span class="slds-r6"></span>
                            <span class="slds-r7"></span>
                            <span class="slds-r8"></span>
                            <span class="slds-r9"></span>
                        </span>
                    </div>
                </div>

                <!-- App name -->
                <span class="slds-context-bar__label-action slds-context-bar__app-name">
                    <span class="slds-truncate" :title="appName">
                        {{ appName }}
                    </span>
                </span>

            </div>
        </a>

        <!-- Tabs -->
        <div class="slds-context-bar__secondary">
            <div class="slds-context-bar__vertical-divider"></div>
            <ul class="slds-grid" role="tablist">

                <!-- Tab -->
                <li class="slds-context-bar__item slds-context-bar__item_tab" role="presentation">

                    <!-- Identification -->
                    <a href="javascript:void(0);" tabindex="-1" role="tab" title="Home"
                       class="slds-context-bar__label-action">

                        <!-- Indicator -->
                        <span class="slds-indicator-container"></span>

                        <!-- Icon -->
                        <span class="slds-icon_container" title="Home">
                            <slds-svg icon-name="standard:home" class="slds-icon slds-icon_small slds-icon-text-default"/>
                        </span>

                        <!-- Text -->
                        <span class="slds-truncate" title="Home">
                            Home
                        </span>

                    </a>

                    <!-- Dropdown menu -->
                    <div class="slds-context-bar__icon-action slds-context-bar__dropdown-trigger slds-dropdown-trigger slds-dropdown-trigger_hover slds-p-left_none slds-p-right_none">
                        <button class="slds-button slds-button_icon slds-button_icon-current-color slds-button_icon-container slds-button_icon-x-small"
                                tabindex="-1" title="Actions for Home">
                            <slds-svg icon-name="utility:chevrondown" class="slds-button__icon"/>
                        </button>
                        <div class="slds-dropdown slds-dropdown_right">
                            <ul class="slds-dropdown__list" role="menu">
                                <li class="slds-dropdown__item" role="presentation">
                                    <a href="javascript:void(0);" role="menuitem" tabindex="-1">
                                        <span class="slds-truncate" title="Refresh Tab">Refresh Tab</span>
                                        <span class="slds-text-body_small slds-text-color_weak slds-p-left_large">
                                            <span class="slds-assistive-text">:</span>r
                                        </span>
                                    </a>
                                </li>
                                <li class="slds-dropdown__item" role="presentation">
                                    <a href="javascript:void(0);" role="menuitem" tabindex="-1">
                                        <span class="slds-truncate"
                                              title="Open in a new window">Open in a new window</span>
                                        <span class="slds-text-body_small slds-text-color_weak slds-p-left_large">
                                            <span class="slds-assistive-text">:</span>⇧ + n
                                        </span>
                                    </a>
                                </li>
                                <li class="slds-dropdown__item" role="presentation">
                                    <a href="javascript:void(0);" role="menuitem" tabindex="-1">
                                        <span class="slds-truncate" title="Pin Tab">Pin Tab</span>
                                        <span class="slds-text-body_small slds-text-color_weak slds-p-left_large">
                                            <span class="slds-assistive-text">:</span>p
                                        </span>
                                    </a>
                                </li>
                                <li class="slds-dropdown__item" role="presentation">
                                    <a href="javascript:void(0);" role="menuitem" tabindex="-1">
                                        <span class="slds-truncate" title="Close Tab">Close Tab</span>
                                        <span class="slds-text-body_small slds-text-color_weak slds-p-left_large">
                                            <span class="slds-assistive-text">:</span>w
                                        </span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <!-- Close button -->
                    <div class="slds-context-bar__icon-action slds-col_bump-left slds-p-left_none">
                        <button tabindex="-1" title="Close Home"
                                class="slds-button slds-button_icon slds-button_icon-current-color slds-button_icon-container slds-button_icon-x-small">
                            <slds-svg icon-name="utility:close" class="slds-button__icon"/>
                        </button>
                    </div>

                </li>

            </ul>
        </div>

    </div>
</template>

<script>
    export default {
        name: "GlobalNavigation",
        props: {
            appName: {
                type: String,
                default: 'App Name'
            }
        }
    }
</script>

<style scoped lang="scss">

</style>