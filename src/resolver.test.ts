import { describe, expect, it } from "vitest"

import * as components from "./components"
import * as stencils from "./stencils"
import { componentMap, stencilMap, VuetningResolver } from "./resolver"

describe("VuetningResolver", () => {
    const resolver = VuetningResolver()

    it("returns undefined for non-vuetning component names", () => {
        expect(resolver.resolve("ElButton")).toBeUndefined()
        expect(resolver.resolve("MyCustomComponent")).toBeUndefined()
        expect(resolver.resolve("")).toBeUndefined()
    })

    it("resolves a simple component to its directory subpath", () => {
        expect(resolver.resolve("SldsButton")).toEqual({
            name: "SldsButton",
            from: "vuetning/components/slds-button",
        })
    })

    it("resolves co-located sub-components to the same directory as their parent", () => {
        expect(resolver.resolve("SldsAccordionSection")).toEqual({
            name: "SldsAccordionSection",
            from: "vuetning/components/slds-accordion",
        })
        expect(resolver.resolve("SldsColumn")).toEqual({
            name: "SldsColumn",
            from: "vuetning/components/slds-grid",
        })
        expect(resolver.resolve("SldsTab")).toEqual({
            name: "SldsTab",
            from: "vuetning/components/slds-tabs",
        })
    })

    it("resolves stencils to their stencils/ subpath", () => {
        expect(resolver.resolve("PlaceholderCard")).toEqual({
            name: "PlaceholderCard",
            from: "vuetning/stencils/stencil-card",
        })
        expect(resolver.resolve("PlaceholderDataTable")).toEqual({
            name: "PlaceholderDataTable",
            from: "vuetning/stencils/stencil-data-table",
        })
        expect(resolver.resolve("StencilForm")).toEqual({
            name: "StencilForm",
            from: "vuetning/stencils/stencil-form",
        })
        expect(resolver.resolve("StencilPageHeader")).toEqual({
            name: "StencilPageHeader",
            from: "vuetning/stencils/stencil-page-header",
        })
    })

    it("respects a custom importPath", () => {
        const customResolver = VuetningResolver({ importPath: "@my/vuetning/components" })
        expect(customResolver.resolve("SldsButton")).toEqual({
            name: "SldsButton",
            from: "@my/vuetning/components/slds-button",
        })
    })

    it("respects a custom stencilImportPath", () => {
        const customResolver = VuetningResolver({ stencilImportPath: "@my/vuetning/stencils" })
        expect(customResolver.resolve("PlaceholderCard")).toEqual({
            name: "PlaceholderCard",
            from: "@my/vuetning/stencils/stencil-card",
        })
    })

    it("declares itself as a component-type resolver", () => {
        expect(resolver.type).toBe("component")
    })

    it("has an entry for every component exported from src/components", () => {
        const exportedNames = Object.keys(components).filter(name => name.startsWith("Slds"))
        const mapNames = new Set(Object.keys(componentMap))
        const missing = exportedNames.filter(name => !mapNames.has(name))
        expect(missing).toEqual([])
    })

    it("has an entry for every stencil exported from src/stencils", () => {
        const exportedNames = Object.keys(stencils)
        const mapNames = new Set(Object.keys(stencilMap))
        const missing = exportedNames.filter(name => !mapNames.has(name))
        expect(missing).toEqual([])
    })

    it("does not declare a subpath for any component that is not exported", () => {
        const exportedNames = new Set(Object.keys(components))
        const orphans = Object.keys(componentMap).filter(name => !exportedNames.has(name))
        expect(orphans).toEqual([])
    })

    it("does not declare a subpath for any stencil that is not exported", () => {
        const exportedNames = new Set(Object.keys(stencils))
        const orphans = Object.keys(stencilMap).filter(name => !exportedNames.has(name))
        expect(orphans).toEqual([])
    })
})
