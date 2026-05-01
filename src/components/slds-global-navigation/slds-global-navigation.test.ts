import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import SldsGlobalNavigation from "./slds-global-navigation.vue"
import type { GlobalNavigationSubTab } from "./global-navigation-sub-tab"
import type { GlobalNavigationTab } from "./global-navigation-tab"

const TABS: GlobalNavigationTab[] = [
    { hasSubTabs: false, iconName: "standard:account", isActive: true, label: "Accounts" },
    { hasSubTabs: false, iconName: "standard:contact", isActive: false, label: "Contacts" },
    { hasSubTabs: false, iconName: "standard:case", isActive: false, label: "Cases" },
]

const SUB_TABS: GlobalNavigationSubTab[] = [
    { iconName: "standard:account", isActive: true, isMain: true, label: "Acme", name: "acme" },
    { iconName: "standard:account", isActive: false, isMain: false, label: "Beta", name: "beta" },
]

describe("SldsGlobalNavigation", () => {
    it("renders the nav with the app name", () => {
        const wrapper = mount(SldsGlobalNavigation, {
            props: { appName: "App", tabs: TABS },
        })

        expect(wrapper.find("nav").exists()).toBe(true)
        expect(wrapper.text()).toContain("App")
    })

    it("renders the context bar tabs container", () => {
        const wrapper = mount(SldsGlobalNavigation, {
            props: { appName: "App", tabs: TABS },
        })

        expect(wrapper.find(".slds-context-bar__secondary").exists()).toBe(true)
    })

    it("emits click-home when the app name area is clicked", async () => {
        const wrapper = mount(SldsGlobalNavigation, {
            props: { appName: "App", tabs: TABS },
            attachTo: document.body,
        })

        await wrapper.find(".slds-context-bar__primary").trigger("click")
        expect(wrapper.emitted("click-home")).toBeTruthy()

        wrapper.unmount()
    })

    it("renders the sub-tabs row when more than one sub-tab is provided", () => {
        const wrapper = mount(SldsGlobalNavigation, {
            props: { appName: "App", tabs: TABS, subTabs: SUB_TABS },
            attachTo: document.body,
        })

        expect(wrapper.find(".slds-sub-tabs").exists()).toBe(true)

        wrapper.unmount()
    })

    it("does not render the sub-tabs row when there is only one sub-tab", () => {
        const wrapper = mount(SldsGlobalNavigation, {
            props: { appName: "App", tabs: TABS, subTabs: [SUB_TABS[0]] },
            attachTo: document.body,
        })

        expect(wrapper.find(".slds-sub-tabs").exists()).toBe(false)

        wrapper.unmount()
    })

    it("emits click-tab with the tab payload via handleClickTab", () => {
        const wrapper: any = mount(SldsGlobalNavigation, {
            props: { appName: "App", tabs: TABS },
            attachTo: document.body,
        })

        wrapper.vm.handleClickTab(TABS[1])
        expect(wrapper.emitted("click-tab")).toBeTruthy()
        expect(wrapper.emitted("click-tab")![0]).toEqual([TABS[1]])

        wrapper.unmount()
    })

    it("emits close-tab with the tab payload via handleCloseTab", () => {
        const wrapper: any = mount(SldsGlobalNavigation, {
            props: { appName: "App", tabs: TABS },
            attachTo: document.body,
        })

        wrapper.vm.handleCloseTab(TABS[0])
        expect(wrapper.emitted("close-tab")).toBeTruthy()
        expect(wrapper.emitted("close-tab")![0]).toEqual([TABS[0]])

        wrapper.unmount()
    })

    it("emits click-sub-tab with the sub-tab payload via handleClickSubTab", () => {
        const wrapper: any = mount(SldsGlobalNavigation, {
            props: { appName: "App", tabs: TABS, subTabs: SUB_TABS },
            attachTo: document.body,
        })

        wrapper.vm.handleClickSubTab(SUB_TABS[0])
        expect(wrapper.emitted("click-sub-tab")).toBeTruthy()
        expect(wrapper.emitted("click-sub-tab")![0]).toEqual([SUB_TABS[0]])

        wrapper.unmount()
    })

    it("emits close-sub-tab with the sub-tab payload via handleCloseSubTab", () => {
        const wrapper: any = mount(SldsGlobalNavigation, {
            props: { appName: "App", tabs: TABS, subTabs: SUB_TABS },
            attachTo: document.body,
        })

        wrapper.vm.handleCloseSubTab(SUB_TABS[1])
        expect(wrapper.emitted("close-sub-tab")).toBeTruthy()
        expect(wrapper.emitted("close-sub-tab")![0]).toEqual([SUB_TABS[1]])

        wrapper.unmount()
    })

    it("computes activeTab from the active flag", () => {
        const wrapper: any = mount(SldsGlobalNavigation, {
            props: { appName: "App", tabs: TABS },
            attachTo: document.body,
        })

        expect(wrapper.vm.activeTab).toEqual(TABS[0])

        wrapper.unmount()
    })

    it("computes activeSubTab only when sub-tabs are present", () => {
        const wrapper: any = mount(SldsGlobalNavigation, {
            props: { appName: "App", tabs: TABS, subTabs: SUB_TABS },
            attachTo: document.body,
        })

        expect(wrapper.vm.activeSubTab).toEqual(SUB_TABS[0])

        wrapper.unmount()
    })

    it("returns undefined for activeSubTab when sub-tabs are absent", () => {
        const wrapper: any = mount(SldsGlobalNavigation, {
            props: { appName: "App", tabs: TABS },
            attachTo: document.body,
        })

        expect(wrapper.vm.activeSubTab).toBeUndefined()

        wrapper.unmount()
    })

    it("renders visible tabs when the container has measurable width", async () => {
        const wrapper: any = mount(SldsGlobalNavigation, {
            props: { appName: "App", tabs: TABS },
            attachTo: document.body,
        })

        // Force width so visibleTabs computes positively (each tab = 192px wide)
        wrapper.vm.tabsContainerWidth = 1024
        wrapper.vm.navContainerWidth = 1024
        await wrapper.vm.$nextTick()

        expect(wrapper.findAll(".tab-list > *").length).toBeGreaterThan(0)
        expect(wrapper.vm.hasOverflowedTabs).toBe(false)

        wrapper.unmount()
    })

    it("flags hasOverflowedTabs when tabs exceed measured width capacity", async () => {
        const manyTabs: GlobalNavigationTab[] = Array.from({ length: 10 }, (_, i) => ({
            hasSubTabs: false,
            iconName: "standard:account",
            isActive: i === 0,
            label: `Tab ${i}`,
        }))
        const wrapper: any = mount(SldsGlobalNavigation, {
            props: { appName: "App", tabs: manyTabs },
            attachTo: document.body,
        })

        // 192 * 3 = 576 -> only 3 fit, the remaining go to overflow
        wrapper.vm.tabsContainerWidth = 576
        wrapper.vm.navContainerWidth = 576
        await wrapper.vm.$nextTick()

        expect(wrapper.vm.hasOverflowedTabs).toBe(true)
        expect(wrapper.vm.overflowedTabs.length).toBeGreaterThan(0)
        expect(wrapper.vm.visibleTabs.length).toBeLessThan(manyTabs.length)

        wrapper.unmount()
    })

    it("flags hasOverflowedSubTabs when sub-tabs exceed capacity", async () => {
        const manySubTabs: GlobalNavigationSubTab[] = Array.from({ length: 8 }, (_, i) => ({
            iconName: "standard:account",
            isActive: i === 0,
            isMain: i === 0,
            label: `Sub ${i}`,
            name: `sub-${i}`,
        }))
        const wrapper: any = mount(SldsGlobalNavigation, {
            props: { appName: "App", tabs: TABS, subTabs: manySubTabs },
            attachTo: document.body,
        })

        wrapper.vm.navContainerWidth = 576
        wrapper.vm.tabsContainerWidth = 576
        await wrapper.vm.$nextTick()

        expect(wrapper.vm.hasOverflowedSubTabs).toBe(true)
        expect(wrapper.vm.overflowedSubTabs.length).toBeGreaterThan(0)

        wrapper.unmount()
    })

    it("returns no overflow / empty visible arrays when tabs prop is empty", async () => {
        const wrapper: any = mount(SldsGlobalNavigation, {
            props: { appName: "App", tabs: [] },
            attachTo: document.body,
        })

        wrapper.vm.tabsContainerWidth = 1024
        wrapper.vm.navContainerWidth = 1024
        await wrapper.vm.$nextTick()

        expect(wrapper.vm.hasOverflowedTabs).toBe(false)
        expect(wrapper.vm.visibleTabs).toEqual([])
        expect(wrapper.vm.overflowedTabs).toEqual([])

        wrapper.unmount()
    })

    it("returns hasOverflowedSubTabs=false when sub-tabs are absent", async () => {
        const wrapper: any = mount(SldsGlobalNavigation, {
            props: { appName: "App", tabs: TABS },
            attachTo: document.body,
        })

        expect(wrapper.vm.hasOverflowedSubTabs).toBe(false)

        wrapper.unmount()
    })

    it("invokes handleWindowResize and updates the container widths", async () => {
        const wrapper: any = mount(SldsGlobalNavigation, {
            props: { appName: "App", tabs: TABS },
            attachTo: document.body,
        })

        wrapper.vm.handleWindowResize()
        await wrapper.vm.$nextTick()

        // After mount + manual call the values should be numeric (>= 0)
        expect(typeof wrapper.vm.navContainerWidth).toBe("number")
        expect(typeof wrapper.vm.tabsContainerWidth).toBe("number")

        wrapper.unmount()
    })

    it("activeTab watcher early-returns when no active tab is found", async () => {
        const inactive: GlobalNavigationTab[] = TABS.map(t => ({ ...t, isActive: false }))
        const wrapper: any = mount(SldsGlobalNavigation, {
            props: { appName: "App", tabs: [...TABS] },
            attachTo: document.body,
        })

        wrapper.vm.tabsContainerWidth = 1024
        wrapper.vm.navContainerWidth = 1024
        await wrapper.vm.$nextTick()

        await wrapper.setProps({ tabs: inactive })
        await wrapper.vm.$nextTick()

        expect(wrapper.vm.activeTab).toBeUndefined()

        wrapper.unmount()
    })

    it("activeTab watcher early-returns when active tab fits within visible range", async () => {
        const wrapper: any = mount(SldsGlobalNavigation, {
            props: { appName: "App", tabs: [...TABS] },
            attachTo: document.body,
        })

        // Plenty of room for all tabs
        wrapper.vm.tabsContainerWidth = 4096
        wrapper.vm.navContainerWidth = 4096
        await wrapper.vm.$nextTick()

        const switched = TABS.map((t, i) => ({ ...t, isActive: i === 1 }))
        await wrapper.setProps({ tabs: switched })
        await wrapper.vm.$nextTick()

        expect(wrapper.vm.activeTab?.label).toBe("Contacts")
        // Cache key untouched because it short-circuited
        expect(wrapper.vm.tabsCacheKey).toBe(0)

        wrapper.unmount()
    })

    it("activeTab watcher swaps an overflowed active tab into the visible range", async () => {
        const manyTabs: GlobalNavigationTab[] = Array.from({ length: 6 }, (_, i) => ({
            hasSubTabs: false,
            iconName: "standard:account",
            isActive: i === 0,
            label: `Tab ${i}`,
        }))
        const wrapper: any = mount(SldsGlobalNavigation, {
            props: { appName: "App", tabs: manyTabs },
            attachTo: document.body,
        })

        // 192*3=576 -> only 3 fit, indexes >= 2 overflow
        wrapper.vm.tabsContainerWidth = 576
        wrapper.vm.navContainerWidth = 576
        await wrapper.vm.$nextTick()

        // Activate an overflowed tab to trigger the swap branch
        const swapped = manyTabs.map((t, i) => ({ ...t, isActive: i === 4 }))
        await wrapper.setProps({ tabs: swapped })
        await wrapper.vm.$nextTick()

        expect(wrapper.vm.tabsCacheKey).toBe(1)

        wrapper.unmount()
    })

    it("activeSubTab watcher swaps an overflowed active sub-tab into the visible range", async () => {
        const manySubTabs: GlobalNavigationSubTab[] = Array.from({ length: 6 }, (_, i) => ({
            iconName: "standard:account",
            isActive: i === 0,
            isMain: i === 0,
            label: `Sub ${i}`,
            name: `sub-${i}`,
        }))
        const wrapper: any = mount(SldsGlobalNavigation, {
            props: { appName: "App", tabs: TABS, subTabs: manySubTabs },
            attachTo: document.body,
        })

        wrapper.vm.navContainerWidth = 576
        wrapper.vm.tabsContainerWidth = 576
        await wrapper.vm.$nextTick()

        const swapped = manySubTabs.map((s, i) => ({ ...s, isActive: i === 4 }))
        await wrapper.setProps({ subTabs: swapped })
        await wrapper.vm.$nextTick()

        expect(wrapper.vm.subTabsCacheKey).toBe(1)

        wrapper.unmount()
    })

    it("activeSubTab watcher early-returns when active sub-tab is already visible", async () => {
        const wrapper: any = mount(SldsGlobalNavigation, {
            props: { appName: "App", tabs: TABS, subTabs: [...SUB_TABS] },
            attachTo: document.body,
        })

        wrapper.vm.navContainerWidth = 4096
        wrapper.vm.tabsContainerWidth = 4096
        await wrapper.vm.$nextTick()

        const switched = SUB_TABS.map((s, i) => ({ ...s, isActive: i === 1 }))
        await wrapper.setProps({ subTabs: switched })
        await wrapper.vm.$nextTick()

        expect(wrapper.vm.activeSubTab?.label).toBe("Beta")
        expect(wrapper.vm.subTabsCacheKey).toBe(0)

        wrapper.unmount()
    })

    it.todo("axe a11y check — anchor 'app name' has no href and tab anchors lack href; needs triage")
})
