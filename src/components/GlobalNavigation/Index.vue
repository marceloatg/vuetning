<template>
    <nav>

        <!-- Tabs -->
        <div class="slds-context-bar slds-context-bar_tabs">

            <!-- App name -->
            <a class="slds-context-bar__primary slds-icon-waffle_container slds-text-link_reset" @click="$emit('homeClick')">
                <div class="slds-context-bar__item">

                    <!-- Icon -->
                    <div class="slds-context-bar__icon-action">
                        <div class="slds-context-bar__button">
                            <span class="slds-icon-waffle">
                                <span class="slds-r1"/>
                                <span class="slds-r2"/>
                                <span class="slds-r3"/>
                                <span class="slds-r4"/>
                                <span class="slds-r5"/>
                                <span class="slds-r6"/>
                                <span class="slds-r7"/>
                                <span class="slds-r8"/>
                                <span class="slds-r9"/>
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

                <div class="slds-context-bar__vertical-divider"/>

                <ul class="slds-grid tab-list">

                    <slds-tab
                        v-for="(tab, index) in tabs"
                        :key="tab.id"
                        :tab="tab"
                        @click="onClick(index, tab)"
                        @close="onClose(index, tab)"/>

                    <slds-more-tabs
                        v-if="overflowedTabs.length > 0"
                        :overflowed-tabs="overflowedTabs"
                        @click="onClick"/>

                </ul>

            </div>

        </div>

        <!-- Sub Tabs -->
        <div v-if="showingSubTabs" class="slds-show">
            <div class="slds-tabs_default slds-sub-tabs">
                <ul class="slds-tabs_default__nav" role="tablist">

                    <li class="slds-tabs_default__item slds-sub-tabs__item slds-grid slds-grid_vertical-align-center slds-active" role="presentation">
                        <a
                            id="subtab-tabitem-01"
                            aria-controls="subtab-tabpanel-01"
                            aria-selected="true"
                            class="slds-tabs_default__link slds-p-horizontal_xx-small"
                            href="javascript:void(0);"
                            role="tab"
                            tabindex="0"
                            title="00071938">
                            <span class="slds-indicator-container"/>
                            <span class="slds-icon_container" title="Case">
                                <svg class="slds-icon slds-icon_small slds-icon-text-default" aria-hidden="true">
                                    <use xlink:href="/assets/icons/standard-sprite/svg/symbols.svg#case"/>
                                </svg>
                                <span class="slds-assistive-text">Case</span>
                            </span>
                            <span class="slds-truncate" title="00071938">00071938</span>
                        </a>
                        <div class="slds-col_bump-left slds-p-left_none slds-p-right_none">
                            <button class="slds-button slds-button_icon slds-button_icon-container slds-button_icon-x-small" tabindex="0" title="Close 00071938">
                                <svg class="slds-button__icon" aria-hidden="true">
                                    <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#close"/>
                                </svg>
                                <span class="slds-assistive-text">Close 00071938</span>
                            </button>
                        </div>
                    </li>

                    <li class="slds-tabs_default__item slds-sub-tabs__item slds-grid slds-grid_vertical-align-center" role="presentation">
                        <a
                            id="subtab-tabitem-02"
                            aria-controls="subtab-tabpanel-02"
                            aria-selected="false"
                            class="slds-tabs_default__link slds-p-horizontal_xx-small"
                            href="javascript:void(0);"
                            role="tab"
                            tabindex="-1"
                            title="Chat - Customer">
                            <span class="slds-indicator-container"/>
                            <span class="slds-icon_container" title="Live Chat">
                                <svg class="slds-icon slds-icon_small slds-icon-text-default" aria-hidden="true">
                                    <use xlink:href="/assets/icons/standard-sprite/svg/symbols.svg#live_chat"/>
                                </svg>
                                <span class="slds-assistive-text">Live Chat</span>
                            </span>
                            <span class="slds-truncate" title="Chat - Customer">Chat - Customer</span>
                        </a>
                        <div class="slds-col_bump-left slds-p-left_none slds-p-right_none">
                            <button class="slds-button slds-button_icon slds-button_icon-container slds-button_icon-x-small" tabindex="-1" title="Close Chat - Customer">
                                <svg class="slds-button__icon" aria-hidden="true">
                                    <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#close"/>
                                </svg>
                                <span class="slds-assistive-text">Close Chat - Customer</span>
                            </button>
                        </div>
                    </li>

                </ul>
            </div>

        </div>

    </nav>
</template>

<script>
    import SldsTab from './Tab'
    import SldsMoreTabs from './MoreTabs'

    export default {
        components: {
            SldsMoreTabs,
            SldsTab,
        },
        props: {
            appName: {
                type: String,
                required: true,
            },
            tabs: {
                type: Array,
                required: true,
            },
            overflowedTabs: {
                type: Array,
                default: () => [],
            },
        },
        computed: {
            showingSubTabs() {
                const activeTab = this.tabs.find(tab => tab.isActive);
                if (activeTab == null) return false;
                return (activeTab.subTabs.length > 0);
            },
        },
        methods: {
            onClick(index, tab) {
                this.$emit('click', index, tab);
            },
            onClose(index, tab) {
                this.$emit('close', index, tab);
            },
        },
    }
</script>

<style scoped lang="scss">
    .slds-context-bar {
        z-index: 99;
    }
</style>
