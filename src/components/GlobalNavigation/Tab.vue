<template>
    <li
        class="slds-context-bar__item slds-context-bar__item_tab"
        :class="[{'slds-is-active': tab.isActive}, {'slds-has-sub-tabs': tab.subTabs.length > 0}]"
        role="presentation">

        <!-- Identification -->
        <a
            tabindex="-1"
            role="tab"
            :title="tab.title"
            class="slds-context-bar__label-action">

            <!-- Indicator -->
            <span class="slds-indicator-container"/>

            <!-- Icon -->
            <span class="slds-icon_container">
                <slds-svg :icon-name="tab.icon" class="slds-icon slds-icon_small slds-icon-text-default"/>
            </span>

            <!-- Text -->
            <span class="slds-truncate">
                {{ tab.title }}
            </span>

        </a>

        <!-- Dropdown menu -->
        <div class="slds-context-bar__icon-action slds-context-bar__dropdown-trigger slds-dropdown-trigger slds-dropdown-trigger_hover slds-p-left_none slds-p-right_none">

            <slds-button-icon
                icon-name="utility:chevrondown"
                container="bare"
                size="x-small"
                class="slds-button_icon-current-color"/>

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
                            <span
                                class="slds-truncate"
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
            <slds-button-icon
                icon-name="utility:close"
                size="x-small"
                container="bare"
                title="Close"
                class="slds-button_icon-current-color"
                @click="onClickClose"/>
        </div>

    </li>
</template>

<script>
    export default {
        props: {
            tab: {
                type: Object,
                required: true,
            },
        },
        methods: {
            onClickClose() {
                this.$emit('close');
            },
        },
    }
</script>

<style scoped>

</style>
