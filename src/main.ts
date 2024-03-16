import { type App } from "vue"
import "./assets/styles/main.scss"

import * as components from "./components"
import * as stencils from "./stencils"

export * as components from "./components"
export * as stencils from "./stencils"
export * from "./constants"

export type { AccordionSection } from "./components/slds-accordion/accordion-section"
export type { Breadcrumb } from "./components/slds-breadcrumbs/breadcrumb"
export type { CheckboxGroupOption } from "./components/slds-checkbox-group/checkbox-group-option"
export type { CheckboxButtonGroupOption } from "./components/slds-checkbox-button-group/checkbox-button-group-option"
export type { DataTableColumn } from "./components/slds-data-table/data-table-column"
export type { DropdownOption } from "./components/slds-dropdown/dropdown-option"
export type { GlobalNavigationTab } from "./components/slds-global-navigation/global-navigation-tab"
export type { GlobalNavigationSubTab } from "./components/slds-global-navigation/global-navigation-sub-tab"
export type { Option } from "./components/commons/option"
export type { PageHeaderDropdownOption } from "./components/slds-page-header/page-header-dropdown-option"
export type { Tab } from "./components/slds-tabs/tab"
export type { WideRadioGroupOption } from "./components/slds-wide-radio-group/wide-radio-group-option"

export default { install }

interface ComponentDictionary {
    [key: string]: any
}

function install(app: App) {
    for (const key in components) {
        app.component(key, (components as ComponentDictionary)[key])
    }

    for (const key in stencils) {
        app.component(key, (stencils as ComponentDictionary)[key])
    }
}
