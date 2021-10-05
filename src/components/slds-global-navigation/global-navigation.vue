<template>
    <nav ref="nav">

        <!-- Tabs -->
        <div class="slds-context-bar slds-context-bar_tabs">

            <!-- App name -->
            <a class="slds-context-bar__primary slds-icon-waffle_container slds-text-link_reset" @click="onClickHome">
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
            <div ref="tabs" class="slds-context-bar__secondary">

                <div class="slds-context-bar__vertical-divider"/>

                <ul class="slds-grid tab-list">
                    <template v-if="isMounted">

                        <slds-tab
                            v-for="tab in visibleTabs"
                            :key="tab.id"
                            :has-sub-tabs="hasSubTabs"
                            :icon="tab.icon"
                            :is-active="tab.isActive"
                            :label="tab.label"
                            @click="onClickTab(tab)"
                            @close="onCloseTab(tab)"/>

                        <slds-more-tabs
                            v-if="hasOverflowedTabs"
                            :overflowed-tabs="overflowedTabs"
                            @click="onClickTab"/>

                    </template>
                </ul>

            </div>

        </div>

        <!-- Sub Tabs -->
        <div v-if="hasSubTabs" class="slds-show">
            <div class="slds-tabs_default slds-sub-tabs">
                <ul class="slds-tabs_default__nav">

                    <!-- Sub tabs -->
                    <slds-sub-tab
                        v-for="(subTab, index) in visibleSubTabs"
                        :key="subTab.id"
                        :icon="subTab.icon"
                        :is-active="subTab.isActive"
                        :is-main="index === 0"
                        :label="subTab.label"
                        @click="onClickSubTab(subTab)"
                        @close="onCloseSubTab(subTab)"/>

                    <!-- Overflow -->
                    <slds-more-sub-tabs
                        v-if="hasOverflowedSubTabs"
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
import lodash from 'lodash'

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

        subTabs: {
            type: Array,
            default: () => [],
        },

        tabs: {
            type: Array,
            required: true,
        },
    },

    data() {
        return {
            isMounted: false,
            navContainerWidth: 0,
            subTabsCacheKey: 0,
            tabsCacheKey: 0,
            tabsContainerWidth: 0,
        }
    },

    computed: {
        activeSubTab() {
            if (this.subTabs == null || this.subTabs.length === 0) return null
            return this.subTabs.find(subTab => subTab.isActive)
        },

        activeTab() {
            return this.tabs.find(tab => tab.isActive)
        },

        hasSubTabs() {
            return ((this.subTabs != null) && (this.subTabs.length > 1))
        },

        hasOverflowedSubTabs() {
            if (this.subTabs == null || this.subTabs.length === 0) return false
            return (this.subTabs.length > this.maxVisibleSubTabs)
        },

        hasOverflowedTabs() {
            if (this.tabs == null || this.tabs.length === 0) return false
            return (this.tabs.length > this.maxVisibleTabs)
        },

        maxVisibleSubTabs() {
            const tabWidth = 192
            return Math.floor(this.navContainerWidth / tabWidth)
        },

        maxVisibleTabs() {
            const tabWidth = 192
            return Math.floor(this.tabsContainerWidth / tabWidth)
        },

        overflowedSubTabs() {
            if (this.subTabsCacheKey < 0) throw 'Invalid cache key'
            if (this.subTabs == null || this.subTabs.length <= this.maxVisibleSubTabs) return []
            return this.subTabs.slice(this.maxVisibleSubTabs - 1)
        },

        overflowedTabs() {
            if (this.tabsCacheKey < 0) throw 'Invalid cache key'
            if (this.tabs == null || this.tabs.length <= this.maxVisibleTabs) return []
            return this.tabs.slice(this.maxVisibleTabs - 1)
        },

        visibleSubTabs() {
            if (this.subTabsCacheKey < 0) throw 'Invalid cache key'
            if (this.subTabs == null || this.subTabs.length === 0) return []
            if (this.subTabs.length <= this.maxVisibleSubTabs) return this.subTabs.slice(0, this.maxVisibleSubTabs)
            return this.subTabs.slice(0, this.maxVisibleSubTabs - 1)
        },

        visibleTabs() {
            if (this.tabsCacheKey < 0) throw 'Invalid cache key'
            if (this.tabs == null || this.tabs.length === 0) return []
            if (this.tabs.length <= this.maxVisibleTabs) return this.tabs.slice(0, this.maxVisibleTabs)
            return this.tabs.slice(0, this.maxVisibleTabs - 1)
        },
    },

    watch: {
        activeSubTab() {
            const index = this.subTabs.indexOf(this.activeSubTab)
            if (index < this.maxVisibleSubTabs - 1) return

            let temp = this.subTabs[index]
            this.subTabs[index] = this.subTabs[this.maxVisibleSubTabs - 2]
            this.subTabs[this.maxVisibleSubTabs - 2] = temp

            // Force computed to recalculate tab indexes
            this.subTabsCacheKey = (this.subTabsCacheKey === 0) ? 1 : 0
        },

        activeTab() {
            const index = this.tabs.indexOf(this.activeTab)
            if (index < this.maxVisibleTabs - 1) return

            let temp = this.tabs[index]
            this.tabs[index] = this.tabs[this.maxVisibleTabs - 2]
            this.tabs[this.maxVisibleTabs - 2] = temp

            // Force computed to recalculate tab indexes
            this.tabsCacheKey = (this.tabsCacheKey === 0) ? 1 : 0
        },
    },

    mounted() {
        window.addEventListener('resize', lodash.debounce(this.onWindowResize, 250))
        this.onWindowResize()

        this.isMounted = true
    },

    methods: {
        onClickHome() {
            this.$emit('click-home')
        },

        onClickTab(tab) {
            this.$emit('click-tab', tab)
        },

        onCloseTab(tab) {
            this.$emit('close-tab', tab)
        },

        onClickSubTab(subTab) {
            this.$emit('click-sub-tab', subTab)
        },

        onCloseSubTab(subTab) {
            this.$emit('close-sub-tab', subTab)
        },

        onWindowResize() {
            this.navContainerWidth = this.$refs.nav.offsetWidth
            this.tabsContainerWidth = this.$refs.tabs.offsetWidth
        },
    },
}
</script>

<style scoped lang="scss">
.slds-context-bar {
    z-index: 99;
    user-select: none;
}

.slds-sub-tabs {
    background-color: white;
}
</style>
