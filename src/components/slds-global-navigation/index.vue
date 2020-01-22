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
                        :has-sub-tabs="hasSubTabs"
                        :icon="tab.icon"
                        :is-active="tab.isActive"
                        :title="tab.title"
                        @click="onClickTab(index, tab)"
                        @close="onCloseTab(index, tab)"/>

                    <slds-more-tabs
                        v-if="overflowedTabs.length > 0"
                        :overflowed-tabs="overflowedTabs"
                        @click="onClickTab"/>

                </ul>

            </div>

        </div>

        <!-- Sub Tabs -->
        <div v-if="hasSubTabs" class="slds-show">
            <div class="slds-tabs_default slds-sub-tabs">
                <ul class="slds-tabs_default__nav">

                    <slds-sub-tab
                        v-for="(subTab, index) in subTabs"
                        :key="subTab.id"
                        :icon="subTab.icon"
                        :is-active="subTab.isActive"
                        :is-main="subTab.isMain"
                        :title="subTab.title"
                        @click="onClickSubTab(index, subTab)"
                        @close="onCloseSubTab(index, subTab)"/>

                    <slds-more-sub-tabs
                        v-if="overflowedSubTabs.length > 0"
                        :overflowed-sub-tabs="overflowedSubTabs"
                        @click="onClickSubTab"/>

                </ul>
            </div>

        </div>

    </nav>
</template>

<script>
    import SldsSubTab from './sub-tab'
    import SldsTab from './tab'
    import SldsMoreTabs from './more-tabs'
    import SldsMoreSubTabs from './more-sub-tabs'

    export default {
        name: 'SldsGlobalNavigation',
        components: {
            SldsMoreTabs,
            SldsMoreSubTabs,
            SldsSubTab,
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
            subTabs: {
                type: Array,
                default: () => [],
            },
            overflowedTabs: {
                type: Array,
                default: () => [],
            },
            overflowedSubTabs: {
                type: Array,
                default: () => [],
            },
        },
        computed: {
            hasSubTabs() {
                return ((this.subTabs != null) && (this.subTabs.length > 0));
            },
        },
        methods: {
            onClickTab(index, tab) {
                this.$emit('clicktab', index, tab);
            },
            onCloseTab(index, tab) {
                this.$emit('closetab', index, tab);
            },
            onClickSubTab(index, subTab) {
                this.$emit('clicksubtab', index, subTab);
            },
            onCloseSubTab(index, subTab) {
                this.$emit('closesubtab', index, subTab);
            },
        },
    }
</script>

<style scoped lang="scss">
    .slds-context-bar {
        z-index: 99;
    }
</style>
