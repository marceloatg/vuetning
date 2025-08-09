<template>
    <div class="slds-vertical-tabs">

        <!-- Navigation container -->
        <div ref="navContainer" class="slds-vertical-tabs__nav-container">

            <!-- Up navigation button -->
            <button
                v-if="showUpButton"
                aria-label="Navigate to previous tab"
                class="slds-vertical-tabs__nav-button slds-vertical-tabs__nav-button_up"
                @click="navigateUp"
            >
                <slds-icon icon-name="utility:up" size="x-small"/>
            </button>

            <!-- Vertical tabs -->
            <div ref="navScroll" class="slds-vertical-tabs__nav-scroll slds-vertical-tabs__nav">
                <ul
                    ref="tabsList"
                    role="tablist"
                    aria-orientation="vertical"
                >
                    <slds-vertical-tab
                        v-for="tab in tabs"
                        :key="tab.name"
                        :label="tab.label"
                        :description="tab.description"
                        :name="tab.name"
                        :left-icon-name="tab.leftIcon"
                        :right-icon-name="tab.rightIcon"
                        :is-active="active === tab.name"
                        @click.stop.prevent="handleClickTab(tab.name)"
                    />
                </ul>
            </div>

            <!-- Down navigation button -->
            <button
                v-if="showDownButton"
                aria-label="Navigate to next tab"
                class="slds-vertical-tabs__nav-button slds-vertical-tabs__nav-button_down"
                @click="navigateDown"
            >
                <slds-icon icon-name="utility:down" size="x-small"/>
            </button>

        </div>

        <!-- Tab content -->
        <slot v-if="!noContent" name="tabContent">
            <slds-vertical-tab-content
                v-for="tab in tabs"
                :key="tab.name"
                :is-active="active === tab.name"
                :name="tab.name"
            >
                <slot :name="tab.name"/>
            </slds-vertical-tab-content>
        </slot>

        <!-- Content -->
        <slot v-else name="content"/>

    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue"
import SldsVerticalTab from "./slds-vertical-tab.vue"
import VerticalTab from "./vertical-tab"
import { EVENTS } from "../../constants"
import SldsVerticalTabContent from "./slds-vertical-tab-content.vue"
import SldsIcon from "../slds-icon/slds-icon.vue"

export default defineComponent({
    name: "slds-vertical-tabs",

    components: { SldsVerticalTabContent, SldsVerticalTab, SldsIcon },

    props: {
        /**
         * Active tab name.
         */
        active: String,

        /**
         * Indicates when the tabs have no content.
         */
        noContent: Boolean,

        /**
         * Vertical tabs.
         */
        tabs: { type: Array as PropType<VerticalTab[]>, default: () => [] as VerticalTab[] },
    },

    data() {
        return {
            showUpButton: false,
            showDownButton: false,
            currentActiveIndex: 0,
            containerHeight: 0,
            scrollTop: 0,
        }
    },


    watch: {
        active: {
            handler(newActive: string) {
                if (newActive) {
                    this.currentActiveIndex = this.tabs.findIndex((tab: VerticalTab) => tab.name === newActive)
                    this.$nextTick(() => {
                        this.scrollToActiveTab()
                        this.updateNavigationButtons()
                    })
                }
            },
            immediate: true,
        },

        tabs: {
            handler() {
                this.$nextTick(() => {
                    this.updateNavigationButtons()
                })
            },
            deep: true,
        },
    },

    mounted() {
        this.updateNavigationButtons()
        window.addEventListener("resize", this.updateNavigationButtons)
    },

    unmounted() {
        window.removeEventListener("resize", this.updateNavigationButtons)
    },

    methods: {
        /**
         * Handle click tab.
         * @param tabName Tab name.
         */
        handleClickTab(tabName: string) {
            this.$emit(EVENTS.CLICK_TAB, tabName)
        },

        /**
         * Navigate to previous tab.
         */
        navigateUp(): void {
            if (this.currentActiveIndex > 0) {
                const prevTab = this.tabs[this.currentActiveIndex - 1]
                this.handleClickTab(prevTab.name)
            }
        },

        /**
         * Navigate to next tab.
         */
        navigateDown(): void {
            if (this.currentActiveIndex < this.tabs.length - 1) {
                const nextTab = this.tabs[this.currentActiveIndex + 1]
                this.handleClickTab(nextTab.name)
            }
        },

        /**
         * Scroll to make the active tab fully visible, ensuring it's never cut off.
         */
        scrollToActiveTab(): void {
            const navScroll = this.$refs.navScroll as HTMLElement
            const tabsList = this.$refs.tabsList as HTMLElement

            if (!navScroll || !tabsList) return

            const activeTabElement = tabsList.querySelector(".slds-is-active") as HTMLElement

            if (!activeTabElement) return

            const scrollContainer = navScroll
            const containerHeight = scrollContainer.clientHeight
            const activeTabTop = activeTabElement.offsetTop
            const activeTabHeight = activeTabElement.offsetHeight
            const activeTabBottom = activeTabTop + activeTabHeight

            // Current scroll position
            const currentScrollTop = scrollContainer.scrollTop
            const currentScrollBottom = currentScrollTop + containerHeight

            // Check if active tab is fully visible
            const isAboveView = activeTabTop < currentScrollTop
            const isBelowView = activeTabBottom > currentScrollBottom

            if (isAboveView) {
                // Scroll up - position active tab at the top with small margin
                scrollContainer.scrollTop = Math.max(0, activeTabTop - 8)
            }
            else if (isBelowView) {
                // Scroll down - position active tab so it's fully visible at the bottom with small margin
                scrollContainer.scrollTop = activeTabBottom - containerHeight + 8
            }

            this.scrollTop = scrollContainer.scrollTop
        },

        /**
         * Update navigation buttons visibility based on current state.
         */
        updateNavigationButtons(): void {
            const navContainer = this.$refs.navContainer as HTMLElement
            const navScroll = this.$refs.navScroll as HTMLElement
            const tabsList = this.$refs.tabsList as HTMLElement

            if (!navContainer || !navScroll || !tabsList || this.tabs.length === 0) {
                this.showUpButton = false
                this.showDownButton = false
                return
            }

            // Get actual dimensions
            const availableHeight = navScroll.clientHeight
            const totalTabsHeight = tabsList.scrollHeight

            // Check if content overflows and navigation is needed
            const needsNavigation = totalTabsHeight > availableHeight

            if (!needsNavigation) {
                this.showUpButton = false
                this.showDownButton = false
                return
            }

            // Show buttons based on scroll position and current active tab
            // Up button: show if not on first tab AND there's content above current view
            this.showUpButton = this.currentActiveIndex > 0

            // Down button: show if not on last tab AND there's content below current view
            this.showDownButton = this.currentActiveIndex < (this.tabs.length - 1)
        },
    },
})
</script>

<style scoped lang="scss">

.slds-vertical-tabs__nav-container {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%; // Ocupa 100% da altura disponível
    min-height: 200px; // Minimum height for navigation
    background-color: #f3f3f3; // Background da mesma cor das abas não selecionadas
}

.slds-vertical-tabs__nav-scroll {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    scroll-behavior: smooth;

    // Hide scrollbar but keep functionality
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */

    &::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Opera */
    }
}

.slds-vertical-tabs__nav-button {
    height: 13px; // Reduced height for thinner buttons
    background: #f3f3f3;
    border: 1px solid #d8dde6;
    border-radius: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.1s ease;
    flex-shrink: 0;
    padding: 0;

    &:hover {
        background: #e5e5e5;
    }

    &:active {
        background: #d8dde6;
    }

    &:focus {
        outline: 2px solid #1589ee;
        outline-offset: -2px;
    }

    &_up {
        border-top: none;
        border-left: none;
    }

    &_down {
        border-bottom: none;
        border-left: none;
    }

    // Ensure icons are properly sized
    :deep(.slds-icon) {
        width: 12px !important;
        height: 12px !important;
    }
}

</style>
