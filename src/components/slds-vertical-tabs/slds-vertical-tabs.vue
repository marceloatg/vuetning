<template>
    <div class="slds-vertical-tabs" @keydown="handleGlobalKeyDownAsync">

        <!-- Vertical tabs -->
        <ul
            ref="tabList"
            class="slds-vertical-tabs__nav"
            role="tablist"
            aria-orientation="vertical"
            @keydown="handleKeyDownAsync"
        >
            <slds-vertical-tab
                v-for="(tab, index) in tabs"
                :key="tab.name"
                ref="tabRefs"
                :label="tab.label"
                :description="tab.description"
                :name="tab.name"
                :left-icon-name="tab.leftIcon"
                :right-icon-name="tab.rightIcon"
                :is-active="active === tab.name"
                :tab-index="index"
                @click.stop.prevent="handleClickTab(tab.name)"
                @keydown="handleTabKeyDownAsync($event, tab.name)"
            />
        </ul>

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
import SldsVerticalTabContent from "./slds-vertical-tab-content.vue"
import VerticalTab from "./vertical-tab"
import { EVENTS, KEYS } from "../../constants"

export default defineComponent({
    name: "slds-vertical-tabs",

    components: { SldsVerticalTabContent, SldsVerticalTab },

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

    computed: {
        /**
         * Get current active tab index.
         */
        activeTabIndex(): number {
            return this.tabs.findIndex((tab: VerticalTab) => tab.name === this.active)
        },
    },

    methods: {
        /**
         * Focus currently active tab.
         */
        async focusActiveTabAsync(): Promise<void> {
            if (this.activeTabIndex >= 0) {
                await this.focusTabAsync(this.activeTabIndex)
            }
        },

        /**
         * Focus specific tab by index.
         */
        async focusTabAsync(tabIndex: number): Promise<void> {
            await this.$nextTick()
            const tabRefs = this.$refs.tabRefs as any[]
            if (tabRefs && tabRefs[tabIndex]) {
                const tabElement = tabRefs[tabIndex].$el?.querySelector("[role=\"tab\"]")
                if (tabElement) tabElement.focus()
            }
        },

        /**
         * Focus tab panel content.
         */
        async focusTabPanelAsync(tabName: string): Promise<void> {
            await this.$nextTick()
            const panelElement = document.getElementById(`vertical-tab-content-${tabName}`)

            if (panelElement) {
                // Try to focus first focusable element in panel
                const focusableElements = panelElement.querySelectorAll(
                    "a[href], button, input, select, textarea, [tabindex]:not([tabindex=\"-1\"])",
                )

                if (focusableElements.length > 0) {
                    const firstElement = focusableElements[0] as HTMLElement
                    firstElement.focus()
                } else {
                    // If no focusable elements, make panel focusable and focus it
                    if (panelElement.getAttribute("tabindex") === "-1") {
                        panelElement.setAttribute("tabindex", "0")
                    }

                    panelElement.focus()
                }
            } else {
                console.warn(`Panel element not found for tab: ${tabName}`)
            }
        },

        /**
         * Handle click tab.
         * @param tabName Tab name.
         */
        handleClickTab(tabName: string): void {
            this.$emit(EVENTS.CLICK_TAB, tabName)
        },

        /**
         * Handle keyboard events on the entire vertical tabs component.
         */
        async handleGlobalKeyDownAsync(event: KeyboardEvent): Promise<void> {
            // Handle Shift+Tab from panels back to tabs
            if (event.key === "Tab" && event.shiftKey) {
                const activeElement = document.activeElement as HTMLElement
                const activeTabName = this.active

                if (activeTabName && activeElement) {
                    const panelElement = document.getElementById(`vertical-tab-content-${activeTabName}`)

                    // Check if focus is on first element in active panel
                    if (panelElement && panelElement.contains(activeElement)) {
                        const focusableElements = panelElement.querySelectorAll(
                            "a[href], button, input, select, textarea, [tabindex]:not([tabindex=\"-1\"])",
                        )

                        if (focusableElements.length > 0 && activeElement === focusableElements[0]) {
                            event.preventDefault()
                            await this.focusActiveTabAsync()
                        }
                    }
                }
            }
        },

        /**
         * Handle keyboard navigation on tab list.
         */
        async handleKeyDownAsync(event: KeyboardEvent): Promise<void> {
            const { key } = event

            // Arrow keys navigation
            if (key === KEYS.ARROW_UP || key === KEYS.ARROW_DOWN) {
                event.preventDefault()
                await this.navigateWithArrowsAsync(key === KEYS.ARROW_UP ? -1 : 1)
            }
        },

        /**
         * Handle keyboard events on individual tabs.
         */
        async handleTabKeyDownAsync(event: KeyboardEvent, tabName: string): Promise<void> {
            const { key } = event

            if (key === KEYS.ENTER || key === " ") {
                event.preventDefault()
                this.handleClickTab(tabName)
            } else if (key === "Tab" && !event.shiftKey && tabName === this.active) {
                // Tab key moves focus to tab panel only if this is the active tab
                event.preventDefault()
                await this.focusTabPanelAsync(tabName)
            }
        },

        /**
         * Navigate tabs with arrow keys.
         */
        async navigateWithArrowsAsync(direction: number): Promise<void> {
            const currentIndex = this.activeTabIndex
            if (currentIndex === -1) return

            const tabCount = this.tabs.length
            let newIndex = currentIndex + direction

            // Wrap around
            if (newIndex < 0) newIndex = tabCount - 1
            if (newIndex >= tabCount) newIndex = 0

            const newTab = this.tabs[newIndex]
            if (newTab) {
                this.handleClickTab(newTab.name)
                await this.focusTabAsync(newIndex)
            }
        },
    },
})
</script>


