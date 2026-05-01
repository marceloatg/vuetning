import { describe, expect, it } from "vitest"

import * as components from "./components"
import { componentMap, VuetningResolver } from "./resolver"

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

    it("respects a custom importPath", () => {
        const customResolver = VuetningResolver({ importPath: "@my/vuetning/components" })
        expect(customResolver.resolve("SldsButton")).toEqual({
            name: "SldsButton",
            from: "@my/vuetning/components/slds-button",
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

    it("does not declare a subpath for any component that is not exported", () => {
        const exportedNames = new Set(Object.keys(components))
        const orphans = Object.keys(componentMap).filter(name => !exportedNames.has(name))
        expect(orphans).toEqual([])
    })
})
