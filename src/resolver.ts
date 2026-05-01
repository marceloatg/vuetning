/**
 * Component-name → subpath map for `unplugin-vue-components`.
 * Must stay in sync with `src/components/index.ts`; the resolver test
 * verifies that every export from the barrel has an entry here.
 */
export const componentMap: Record<string, string> = {
    SldsAccordion: "slds-accordion",
    SldsAccordionSection: "slds-accordion",
    SldsActivityTimeline: "slds-activity-timeline",
    SldsActivityTimelineItem: "slds-activity-timeline",
    SldsAlert: "slds-alert",
    SldsAvatar: "slds-avatar",
    SldsBadge: "slds-badge",
    SldsBrandBand: "slds-brand-band",
    SldsBreadcrumbs: "slds-breadcrumbs",
    SldsButton: "slds-button",
    SldsButtonGroup: "slds-button-group",
    SldsButtonIcon: "slds-button-icon",
    SldsCard: "slds-card",
    SldsCheckbox: "slds-checkbox",
    SldsCheckboxButton: "slds-checkbox-button",
    SldsCheckboxButtonGroup: "slds-checkbox-button-group",
    SldsCheckboxButtonOption: "slds-checkbox-button-group",
    SldsCheckboxGroup: "slds-checkbox-group",
    SldsCheckboxGroupOption: "slds-checkbox-group",
    SldsCheckboxOutput: "slds-checkbox-output",
    SldsCheckboxOutputGroup: "slds-checkbox-output-group",
    SldsCheckboxOutputGroupOption: "slds-checkbox-output-group",
    SldsCheckboxToggle: "slds-checkbox-toggle",
    SldsColumn: "slds-grid",
    SldsColumnGrid: "slds-grid",
    SldsCombobox: "slds-combobox",
    SldsContainer: "slds-container",
    SldsCounter: "slds-counter",
    SldsDataTable: "slds-data-table",
    SldsDatepicker: "slds-datepicker",
    SldsDatetimeOutput: "slds-datetime-output",
    SldsDuelingPicklist: "slds-dueling-picklist",
    SldsExpandableSection: "slds-expandable-section",
    SldsFormElement: "slds-form-element",
    SldsGlobalAction: "slds-global-header",
    SldsGlobalActionAvatar: "slds-global-header",
    SldsGlobalActionFavorites: "slds-global-header",
    SldsGlobalActionNotifications: "slds-global-header",
    SldsGlobalHeader: "slds-global-header",
    SldsGlobalNavigation: "slds-global-navigation",
    SldsGrid: "slds-grid",
    SldsIcon: "slds-icon",
    SldsIllustration: "slds-illustration",
    SldsInput: "slds-input",
    SldsLookup: "slds-lookup",
    SldsMediaObject: "slds-media-object",
    SldsMenu: "slds-menu",
    SldsModal: "slds-modal",
    SldsMultiPicklist: "slds-multi-picklist",
    SldsOutput: "slds-output",
    SldsPageHeader: "slds-page-header",
    SldsPageHeaderDetail: "slds-page-header",
    SldsPagination: "slds-pagination",
    SldsPanel: "slds-panel",
    SldsPicklist: "slds-picklist",
    SldsPill: "slds-pill",
    SldsPillContainer: "slds-pill",
    SldsProgressBar: "slds-progress-bar",
    SldsPrompt: "slds-prompt",
    SldsPublisher: "slds-publisher",
    SldsRadioGroup: "slds-radio-group",
    SldsScopedNotification: "slds-scoped-notification",
    SldsScopedTabs: "slds-scoped-tabs",
    SldsSpinner: "slds-spinner",
    SldsSpinnerContainer: "slds-spinner",
    SldsSvg: "slds-svg",
    SldsTab: "slds-tabs",
    SldsTabContent: "slds-tabs",
    SldsTabs: "slds-tabs",
    SldsText: "slds-text",
    SldsTextArea: "slds-text-area",
    SldsTile: "slds-tile",
    SldsTileArticle: "slds-tile",
    SldsTileItem: "slds-tile",
    SldsToast: "slds-toasts",
    SldsToastContainer: "slds-toasts",
    SldsTooltip: "slds-tooltip",
    SldsTrialBar: "slds-trial-bar",
    SldsVerticalNavigation: "slds-vertical-navigation",
    SldsVerticalNavigationItem: "slds-vertical-navigation",
    SldsVerticalNavigationSection: "slds-vertical-navigation",
    SldsWideRadioGroup: "slds-wide-radio-group",
}

export interface ComponentInfo {
    name: string
    from: string
}

export interface VuetningResolverOptions {
    /**
     * Override the import path prefix. Defaults to `vuetning/components`.
     * Useful for monorepo setups that alias the package locally.
     */
    importPath?: string
}

/**
 * Resolver for `unplugin-vue-components` that auto-imports vuetning
 * components from their per-component subpaths so tree-shaking still works.
 *
 * @example
 * ```ts
 * // vite.config.ts
 * import Components from "unplugin-vue-components/vite"
 * import { VuetningResolver } from "vuetning/resolver"
 *
 * export default {
 *     plugins: [vue(), Components({ resolvers: [VuetningResolver()] })],
 * }
 * ```
 */
export function VuetningResolver(options: VuetningResolverOptions = {}) {
    const importPath = options.importPath ?? "vuetning/components"
    return {
        type: "component" as const,
        resolve(name: string): ComponentInfo | undefined {
            const subpath = componentMap[name]
            if (!subpath) return undefined
            return { name, from: `${importPath}/${subpath}` }
        },
    }
}
