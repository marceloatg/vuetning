/**
 * Imports MUST respect this order, otherwise the css imported from main will have a higher priority
 * over the scoped css from components, making them not apply correctly.
 */
import "./assets/styles/main.scss"

import type { App } from "vue"
import * as components from "./components"
import * as stencils from "./stencils"

export default { install }
export * from "./constants"
export * from "./components/types"

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
