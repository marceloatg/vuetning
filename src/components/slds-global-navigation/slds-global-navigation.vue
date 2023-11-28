<template>
    <nav ref="nav">

        <!-- Tabs -->
        <div class="slds-context-bar slds-context-bar_tabs">

            <!-- App name -->
            <a
                class="slds-context-bar__primary slds-icon-waffle_container slds-text-link_reset"
                @click="handleClickHome"
            >
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

                        <slds-global-navigation-tab
                            v-for="(tab, index) in visibleTabs"
                            :key="index"
                            :has-sub-tabs="hasSubTabs"
                            :icon-name="tab.iconName"
                            :is-active="tab.isActive"
                            :label="tab.label"
                            @click="handleClickTab(tab)"
                            @close="handleCloseTab(tab)"
                        />

                        <slds-more-tabs
                            v-if="hasOverflowedTabs"
                            :overflowed-tabs="overflowedTabs"
                            @click="handleClickTab"
                        />

                    </template>
                </ul>

            </div>

        </div>

        <!-- Sub Tabs -->
        <div v-if="hasSubTabs" class="slds-show">
            <div class="slds-tabs_default slds-sub-tabs">
                <ul class="slds-tabs_default__nav">

                    <!-- Sub tabs -->
                    <slds-global-navigation-sub-tab
                        v-for="(subTab, index) in visibleSubTabs"
                        :key="index"
                        :icon-name="subTab.iconName"
                        :is-active="subTab.isActive"
                        :is-main="index === 0"
                        :label="subTab.label"
                        @click="handleClickSubTab(subTab)"
                        @close="handleCloseSubTab(subTab)"
                    />

                    <!-- Overflow -->
                    <slds-more-sub-tabs
                        v-if="hasOverflowedSubTabs"
                        :overflowed-sub-tabs="overflowedSubTabs"
                        @click="handleClickSubTab"
                    />

                </ul>
            </div>
        </div>

    </nav>
</template>

<script lang="ts">
/* eslint-disable vue/no-mutating-props */// TODO

import SldsGlobalNavigationSubTab from "./slds-global-navigation-sub-tab.vue"
import SldsGlobalNavigationTab from "./slds-global-navigation-tab.vue"
import SldsMoreTabs from "./slds-global-navigation-overflowed-tabs.vue"
import SldsMoreSubTabs from "./slds-global-navigation-overflowed-sub-tabs.vue"
import { EVENTS } from "../../constants"
import { useDebounceFn } from "@vueuse/core"
import { defineComponent, type PropType } from "vue"
import type { GlobalNavigationSubTab } from "./global-navigation-sub-tab"
import type { GlobalNavigationTab } from "./global-navigation-tab"

export default defineComponent({
    name: "SldsGlobalNavigation",

    components: {
        SldsMoreTabs,
        SldsMoreSubTabs,
        SldsGlobalNavigationSubTab,
        SldsGlobalNavigationTab,
    },

    props: {
        appName: { type: String, required: true },

        subTabs: { type: Array as PropType<GlobalNavigationSubTab[]>, default: () => [] },

        tabs: { type: Array as PropType<GlobalNavigationTab[]>, default: () => [] },
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
        activeSubTab(): GlobalNavigationSubTab | undefined {
            if (!this.hasSubTabs) return undefined
            return this.subTabs.find(subTab => subTab.isActive)
        },

        activeTab(): GlobalNavigationTab | undefined {
            return this.tabs.find(tab => tab.isActive)
        },

        hasSubTabs(): boolean {
            return (this.subTabs.length > 1)
        },

        hasOverflowedSubTabs(): boolean {
            if (!this.hasSubTabs) return false
            return Boolean(this.subTabs.length > this.maxVisibleSubTabs)
        },

        hasOverflowedTabs(): boolean {
            if (this.tabs.length === 0) return false
            return (this.tabs.length > this.maxVisibleTabs)
        },

        maxVisibleSubTabs(): number {
            const tabWidth = 192
            return Math.floor(this.navContainerWidth / tabWidth)
        },

        maxVisibleTabs(): number {
            const tabWidth = 192
            return Math.floor(this.tabsContainerWidth / tabWidth)
        },

        overflowedSubTabs(): GlobalNavigationSubTab[] {
            if (this.subTabsCacheKey < 0) throw "Invalid cache key"
            if (this.subTabs.length <= this.maxVisibleSubTabs) return []

            return this.subTabs.slice(this.maxVisibleSubTabs - 1)
        },

        overflowedTabs(): GlobalNavigationTab[] {
            if (this.tabsCacheKey < 0) throw "Invalid cache key"
            if (this.tabs.length <= this.maxVisibleTabs) return []

            return this.tabs.slice(this.maxVisibleTabs - 1)
        },

        visibleSubTabs(): GlobalNavigationSubTab[] {
            if (this.subTabsCacheKey < 0) throw "Invalid cache key"
            if (this.subTabs.length === 0) return []
            if (this.subTabs.length <= this.maxVisibleSubTabs) return this.subTabs.slice(0, this.maxVisibleSubTabs)

            return this.subTabs.slice(0, this.maxVisibleSubTabs - 1)
        },

        visibleTabs(): GlobalNavigationTab[] {
            if (this.tabsCacheKey < 0) throw "Invalid cache key"
            if (this.tabs.length === 0) return []
            if (this.tabs.length <= this.maxVisibleTabs) return this.tabs.slice(0, this.maxVisibleTabs)

            return this.tabs.slice(0, this.maxVisibleTabs - 1)
        },
    },

    watch: {
        activeSubTab() {
            if (!this.activeSubTab) return

            const index = this.subTabs.indexOf(this.activeSubTab)
            if (index < this.maxVisibleSubTabs - 1) return

            const temp = this.subTabs[index]
            this.subTabs[index] = this.subTabs[this.maxVisibleSubTabs - 2]
            this.subTabs[this.maxVisibleSubTabs - 2] = temp

            // Force computed to recalculate tab indexes
            this.subTabsCacheKey = (this.subTabsCacheKey === 0) ? 1 : 0
        },

        activeTab() {
            if (!this.activeTab) return

            const index = this.tabs.indexOf(this.activeTab)
            if (index < this.maxVisibleTabs - 1) return

            const temp = this.tabs[index]
            this.tabs[index] = this.tabs[this.maxVisibleTabs - 2]
            this.tabs[this.maxVisibleTabs - 2] = temp

            // Force computed to recalculate tab indexes
            this.tabsCacheKey = (this.tabsCacheKey === 0) ? 1 : 0
        },
    },

    mounted() {
        const debouncedWindowResizeHandler = useDebounceFn(() => this.handleWindowResize, 250)

        window.addEventListener(EVENTS.RESIZE, debouncedWindowResizeHandler)
        this.handleWindowResize()

        this.isMounted = true
    },

    methods: {
        handleClickHome(): void {
            this.$emit(EVENTS.CLICK_HOME)
        },

        handleClickSubTab(subTab: GlobalNavigationSubTab): void {
            this.$emit(EVENTS.CLICK_SUB_TAB, subTab)
        },

        handleClickTab(tab: GlobalNavigationTab): void {
            this.$emit(EVENTS.CLICK_TAB, tab)
        },

        handleCloseSubTab(subTab: GlobalNavigationSubTab): void {
            this.$emit(EVENTS.CLOSE_SUB_TAB, subTab)
        },

        handleCloseTab(tab: GlobalNavigationTab): void {
            this.$emit(EVENTS.CLOSE_TAB, tab)
        },

        handleWindowResize(): void {
            this.navContainerWidth = (this.$refs.nav as HTMLDivElement).offsetWidth
            this.tabsContainerWidth = (this.$refs.tabs as HTMLDivElement).offsetWidth
        },
    },
})
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
