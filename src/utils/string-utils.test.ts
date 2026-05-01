import { describe, it, expect } from "vitest"

import stringUtils from "./string-utils"

describe("stringUtils", () => {
    describe("kebabCase", () => {
        it("converts a camelCase string to kebab-case", () => {
            expect(stringUtils.kebabCase("camelCaseString")).toBe("camel-case-string")
        })

        it("converts a PascalCase string to kebab-case", () => {
            expect(stringUtils.kebabCase("PascalCaseString")).toBe("pascal-case-string")
        })

        it("preserves consecutive uppercase letters as a group", () => {
            expect(stringUtils.kebabCase("XMLParser")).toBe("xml-parser")
        })

        it("includes numeric segments", () => {
            // The matcher keeps numbers attached to the preceding word.
            expect(stringUtils.kebabCase("version2Beta")).toBe("version2-beta")
        })

        it("returns the empty string for an empty input", () => {
            expect(stringUtils.kebabCase("")).toBe("")
        })

        it("returns falsy when given null or undefined", () => {
            expect(stringUtils.kebabCase(null as unknown as string)).toBeFalsy()
            expect(stringUtils.kebabCase(undefined as unknown as string)).toBeFalsy()
        })
    })
})
