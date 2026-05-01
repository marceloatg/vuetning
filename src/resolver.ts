/**
 * Component-name → subpath maps for `unplugin-vue-components`.
 * Both maps must stay in sync with `src/components/index.ts` and
 * `src/stencils/index.ts`; the resolver test verifies that every export
 * from each barrel has an entry here.
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

export const stencilMap: Record<string, string> = {
    PlaceholderCard: "stencil-card",
    PlaceholderDataTable: "stencil-data-table",
    StencilForm: "stencil-form",
    StencilPageHeader: "stencil-page-header",
}

export interface ComponentInfo {
    name: string
    from: string
}

export interface VuetningResolverOptions {
    /**
     * Override the import path for components. Defaults to `vuetning/components`.
     * Useful for monorepo setups that alias the package locally.
     */
    importPath?: string

    /**
     * Override the import path for stencils. Defaults to `vuetning/stencils`.
     */
    stencilImportPath?: string
}

/**
 * Resolver for `unplugin-vue-components` that auto-imports vuetning
 * components and stencils from their per-component subpaths so tree-shaking
 * still works.
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
    const stencilImportPath = options.stencilImportPath ?? "vuetning/stencils"
    return {
        type: "component" as const,
        resolve(name: string): ComponentInfo | undefined {
            const componentSubpath = componentMap[name]
            if (componentSubpath) {
                return { name, from: `${importPath}/${componentSubpath}` }
            }
            const stencilSubpath = stencilMap[name]
            if (stencilSubpath) {
                return { name, from: `${stencilImportPath}/${stencilSubpath}` }
            }
            return undefined
        },
    }
}
